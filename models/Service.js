const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  type: { type: String, enum: ['private_office', 'meeting_room', 'virtual_office', 'other'], default: 'other' },
  availability: { type: Boolean, default: true }
});

module.exports = mongoose.model('Service', ServiceSchema);
