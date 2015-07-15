var controller = {};

var mongoose = require('mongoose');
var models = require('../../../models/index.js');

controller.list = function(req, res, next) {
  var result = {};

  models.Location.findById(req.params.location_id).select("_id name").exec(function(err, location) {
    if (err) return next(err);

    result._id = location._id;
    result.name = location.name;
    
    models.Place.find({ location_id: req.params.location_id }).exec(function(err, places) {
      if (err) return next(err);

      result.places = places;

      res.json(result);
    });
  });
};

controller.create = function(req, res, next) {
  var place = new models.Place();

  place.location_id = req.body.location_id;
  place.name = req.body.name;
  place.description = req.body.description;
  place.price = req.body.price;
  place.duration = req.body.duration;

  place.save(function(err) {
    if (err) return next(err);
    res.json({ message: 'Place created' });
  });
};

module.exports = function(router) {
  router.route('/location/:location_id/place').get(controller.list);
  router.route('/location/:location_id/place/create').post(controller.create);
}