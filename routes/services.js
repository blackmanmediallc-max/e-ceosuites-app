const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ availability: true });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Add a new service
router.post('/', async (req, res) => {
  try {
    const { name, description, price, type } = req.body;
    const service = new Service({ name, description, price, type });
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: 'Invalid service data' });
  }
});

module.exports = router;
