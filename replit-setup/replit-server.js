// Express backend for e-CEO Suites app
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Storage for uploaded images
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({ storage: storage });

// In-memory data stores (for demo)
const mailNotifications = [];
const bookings = [];

// Routes

// Health check
app.get('/', (req, res) => {
  res.send('e-CEO Suites backend running');
});

// Add mail notification (simulate uploading mail picture and notify customer)
app.post('/mail', upload.single('image'), (req, res) => {
  const { customerId, message } = req.body;
  if (!customerId || !message || !req.file) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const mailItem = {
    id: mailNotifications.length + 1,
    customerId,
    message,
    imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
    timestamp: new Date().toISOString(),
  };
  mailNotifications.push(mailItem);
  res.json(mailItem);
});

// Get mail notifications for a customer
app.get('/mail/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  const notifications = mailNotifications.filter(m => m.customerId === customerId);
  res.json(notifications);
});

// Room booking
app.post('/bookings', (req, res) => {
  const { customerId, roomType, startTime, endTime } = req.body;
  if (!customerId || !roomType || !startTime || !endTime) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const booking = {
    id: bookings.length + 1,
    customerId,
    roomType,
    startTime,
    endTime,
  };
  bookings.push(booking);
  res.json(booking);
});

// Get bookings for customer
app.get('/bookings/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  const customerBookings = bookings.filter(b => b.customerId === customerId);
  res.json(customerBookings);
});

// Serve uploaded images
app.use('/uploads', express.static(uploadDir));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
