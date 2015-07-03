var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema ({
  name: {
    required: true,
    type: String,
    max: 500,
    trim: true
  },
  state: {
    type: String,
    trim: true,
    max: 200
  },
  country: {
    type: String,
    trim: true,
    max: 200
  },
  description: {
    type: String,
    trim: true,
    max: 2000
  }
});

exports.Location = mongoose.model('Location', LocationSchema);