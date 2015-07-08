var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema ({
  _id: String,
  location_id: String,
  name: String,
  description: String,
  loc: { type: [Number], index: '2dsphere' },
  duration: Number
});

var ItinerarySchema = new mongoose.Schema ({
  _id: String,
  name: String,
  days: [{
    number: Number,
    morning: [{ type: String, ref: 'Place' }],
    afternoon: [{ type: String, ref: 'Place' }],
    night: [{ type: String, ref: 'Place' }],
    lunch: { type: String, ref: 'Place' },
    dinner: { type: String, ref: 'Place' }
  }]
});

var LocationSchema = new mongoose.Schema ({
  _id: String,
  name: String,
  state: String,
  country: String,
  description: String,
  itineraries: [ItinerarySchema]
});

exports.Location = mongoose.model('Location', LocationSchema);
exports.Place = mongoose.model('Place', PlaceSchema);