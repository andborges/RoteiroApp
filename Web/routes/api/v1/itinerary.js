var controller = {};

var mongoose = require('mongoose');
var models = require('../../../models/index.js');

controller.get = function(req, res, next) {
  var query = { 'itineraries._id': req.params.id };
  
  var options = {
    path: 'itineraries.days.morning itineraries.days.afternoon itineraries.days.night itineraries.days.lunch itineraries.days.dinner',
    model: 'Place'
  };

  models.Location.findOne(query).select("_id code name country description itineraries.$").populate(options).exec(function(err, location) {
    if (err) return next(err);
    res.json(location);
  });
};

controller.getByCode = function(req, res, next) {
  var query = { 'itineraries.code': req.params.code };
  
  var options = {
    path: 'itineraries.days.morning itineraries.days.afternoon itineraries.days.night itineraries.days.lunch itineraries.days.dinner',
    model: 'Place'
  };

  models.Location.findOne(query).select("_id code name country description itineraries.$").populate(options).exec(function(err, location) {
    if (err) return next(err);
    res.json(location);
  });
};

module.exports = function(router) {
  router.route('/itinerary/:id').get(controller.get);
  router.route('/itinerary/code/:code').get(controller.getByCode);
}