const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('serviceId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Add a new booking
router.post('/', async (req, res) => {
  try {
    const { serviceId, customerName, customerEmail, date, durationHours } = req.body;
    const booking = new Booking({ serviceId, customerName, customerEmail, date, durationHours });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: 'Invalid booking data' });
  }
});

module.exports = router;
