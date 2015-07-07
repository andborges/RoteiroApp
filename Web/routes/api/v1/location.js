var controller = {};

var mongoose = require('mongoose');
var models = require('../../../models/index.js');

controller.search = function(req, res, next) {
  var query = { $or: [{ name: new RegExp(req.params.text, "i") }, { country: new RegExp(req.params.text, "i") }] };

  models.Location.find(query).select("_id name country description").exec(function(err, locations) {
    if (err) return next(err);
    res.json(locations);
  });
};

controller.get = function(req, res, next) {
  var query = { '_id': req.params.id };

  models.Location.findOne(query).exec(function(err, location) {
    if (err) return next(err);
    res.json(location);
  });
};

controller.itinerary = function(req, res, next) {
  var query = { 'itineraries._id': req.params.id };
  
  var options = {
    path: 'itineraries.days.morning itineraries.days.afternoon itineraries.days.night itineraries.days.lunch itineraries.days.dinner',
    model: 'Place'
  };

  models.Location.findOne(query).select("_id name country description itineraries.$").populate(options).exec(function(err, location) {
    if (err) return next(err);
    res.json(location);
  });
};

module.exports = function(router) {
  router.route('/location/search/:text').get(controller.search);
  router.route('/location/:id').get(controller.get);
  router.route('/itinerary/:id').get(controller.itinerary);
}