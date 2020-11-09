const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 1024
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024
  },
  totalPollCreated: {
    type: Number,
    count: 0
  },
  resetPasswordLink: {
    data: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);