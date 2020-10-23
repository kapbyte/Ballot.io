const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  options: [{
    type: Object,
    required: true
  }],
  totalVotes: {
    type: Number,
    count: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Poll', pollSchema);