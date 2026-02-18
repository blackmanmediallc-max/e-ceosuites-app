const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  date: { type: Date, required: true },
  durationHours: { type: Number, default: 1 },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
