import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = '';

function App() {
  const [customerId, setCustomerId] = useState('');
  const [mailMessage, setMailMessage] = useState('');
  const [mailImage, setMailImage] = useState(null);
  const [mailNotifications, setMailNotifications] = useState([]);
  const [bookingRoomType, setBookingRoomType] = useState('conference');
  const [bookingStart, setBookingStart] = useState('');
  const [bookingEnd, setBookingEnd] = useState('');
  const [bookings, setBookings] = useState([]);

  // Fetch mail notifications
  useEffect(() => {
    if (customerId) {
      axios.get(`${BACKEND_URL}/mail/${customerId}`)
        .then(res => setMailNotifications(res.data))
        .catch(e => console.error(e));
      axios.get(`${BACKEND_URL}/bookings/${customerId}`)
        .then(res => setBookings(res.data))
        .catch(e => console.error(e));
    }
  }, [customerId]);

  // Upload mail picture and message
  const handleUploadMail = () => {
    if (!customerId || !mailMessage || !mailImage) {
      alert('Please fill customerId, message, and select an image');
      return;
    }
    const formData = new FormData();
    formData.append('customerId', customerId);
    formData.append('message', mailMessage);
    formData.append('image', mailImage);

    axios.post(`${BACKEND_URL}/mail`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
      alert('Mail notification sent');
      setMailMessage('');
      setMailImage(null);
      // Refresh mail list
      return axios.get(`${BACKEND_URL}/mail/${customerId}`);
    }).then(res => setMailNotifications(res.data))
      .catch(e => console.error(e));
  };

  // Book a room
  const handleBookRoom = () => {
    if (!customerId || !bookingStart || !bookingEnd) {
      alert('Please fill all booking fields');
      return;
    }
    axios.post(`${BACKEND_URL}/bookings`, {
      customerId,
      roomType: bookingRoomType,
      startTime: bookingStart,
      endTime: bookingEnd,
    }).then(res => {
      alert('Room booked');
      // Refresh bookings
      return axios.get(`${BACKEND_URL}/bookings/${customerId}`);
    }).then(res => setBookings(res.data))
      .catch(e => console.error(e));
  };

  return (
    <div style={{maxWidth: 600, margin: 'auto', fontFamily: 'Arial'}}>
      <h1>e-CEO Suites App</h1>

      <section>
        <h2>Mail Notifications</h2>
        <input type="text" placeholder="Customer ID" value={customerId} onChange={e => setCustomerId(e.target.value)} />
        <br />
        <textarea placeholder="Mail message" value={mailMessage} onChange={e => setMailMessage(e.target.value)} />
        <br />
        <input type="file" onChange={e => setMailImage(e.target.files[0])} />
        <br />
        <button onClick={handleUploadMail}>Upload Mail Notification</button>
        <div>
          {mailNotifications.map(mail => (
            <div key={mail.id} style={{border: '1px solid #ccc', margin: 10, padding: 10}}>
              <p>{mail.message}</p>
              {mail.imageUrl && <img src={mail.imageUrl} alt="Mail" style={{maxWidth: '100%'}} />}
              <small>{new Date(mail.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Room Booking</h2>
        <select value={bookingRoomType} onChange={e => setBookingRoomType(e.target.value)}>
          <option value="conference">Conference Room</option>
          <option value="private-office">Private Office</option>
        </select>
        <br />
        <label>Start Time: <input type="datetime-local" value={bookingStart} onChange={e => setBookingStart(e.target.value)} /></label>
        <br />
        <label>End Time: <input type="datetime-local" value={bookingEnd} onChange={e => setBookingEnd(e.target.value)} /></label>
        <br />
        <button onClick={handleBookRoom}>Book Room</button>

        <h3>Your Bookings</h3>
        <ul>
          {bookings.map(b => (
            <li key={b.id}>{b.roomType} from {new Date(b.startTime).toLocaleString()} to {new Date(b.endTime).toLocaleString()}</li>
          ))}
        </ul>
      </section>

    </div>
  );
}

export default App;
