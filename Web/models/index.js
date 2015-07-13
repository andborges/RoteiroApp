var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema ({
  _id: { type: mongoose.Schema.ObjectId, default: function () { return new mongoose.Types.ObjectId()} },
  location_id: mongoose.Schema.ObjectId,
  name: String,
  description: String,
  loc: { type: [Number], index: '2dsphere' },
  duration: Number
});

var ItinerarySchema = new mongoose.Schema ({
  _id: { type: mongoose.Schema.ObjectId, default: function () { return new mongoose.Types.ObjectId()} },
  code: String,
  name: String,
  mapCenter: [Number],
  mapZoom: Number,
  days: [{
    number: Number,
    morning: [{ type: mongoose.Schema.ObjectId, ref: 'Place' }],
    afternoon: [{ type: mongoose.Schema.ObjectId, ref: 'Place' }],
    night: [{ type: mongoose.Schema.ObjectId, ref: 'Place' }],
    lunch: { type: mongoose.Schema.ObjectId, ref: 'Place' },
    dinner: { type: mongoose.Schema.ObjectId, ref: 'Place' }
  }]
});

var LocationSchema = new mongoose.Schema ({
  _id: { type: mongoose.Schema.ObjectId, default: function () { return new mongoose.Types.ObjectId()} },
  code: String,
  name: String,
  state: String,
  country: String,
  description: String,
  itineraries: [ItinerarySchema]
});

exports.Location = mongoose.model('Location', LocationSchema);
exports.Place = mongoose.model('Place', PlaceSchema);