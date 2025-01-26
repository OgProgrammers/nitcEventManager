const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String, 
    required: true 
  },
  venue: {
    type: String,
    required: true
  },
  count: {
    type: String,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'decline'],
    default: 'pending'
  },
  participants: [
    {
      studentId: String,
      name: String,
      email: String,
      department: String,
      year: Number
    }
  ]
});

module.exports = mongoose.model('Event', eventSchema);