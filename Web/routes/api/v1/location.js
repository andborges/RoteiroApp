var controller = {};

var mongoose = require('mongoose');
var models = require('../../../models/index.js');

controller.search = function(req, res, next) {
  var query = { $or: [{ name: new RegExp(req.params.text, "i") }, { country: new RegExp(req.params.text, "i") }] };

  models.Location.find(query).exec(function(err, locations) {
    if (err) return next(err);
    res.json(locations);
  });
};

controller.itinerary = function(req, res, next) {
  var query = { 'itineraries._id': req.params.id };
  
  var options = {
    path: 'itineraries.days.morning itineraries.days.afternoon itineraries.days.night itineraries.days.lunch itineraries.days.dinner',
    model: 'Place'
  };

  models.Location.findOne(query, { 'itineraries.$': 1 }).populate(options).exec(function(err, location) {
    if (err) return next(err);
    res.json(location.itineraries[0]);
  });
};

module.exports = function(router) {
  router.route('/location/search/:text').get(controller.search);
  router.route('/itinerary/:id').get(controller.itinerary);
}