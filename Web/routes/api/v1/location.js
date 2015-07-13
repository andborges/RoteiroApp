var controller = {};

var mongoose = require('mongoose');
var models = require('../../../models/index.js');

controller.search = function(req, res, next) {
  var query = { $or: [{ name: new RegExp(req.params.text, "i") }, { country: new RegExp(req.params.text, "i") }] };

  models.Location.find(query).select("_id code name country description").exec(function(err, locations) {
    if (err) return next(err);
    res.json(locations);
  });
};

controller.list = function(req, res, next) {
  models.Location.find().exec(function(err, locations) {
    if (err) return next(err);
    res.json(locations);
  });
};

controller.get = function(req, res, next) {
  models.Location.findById(req.params.id).exec(function(err, location) {
    if (err) return next(err);
    res.json(location);
  });
};

controller.getByCode = function(req, res, next) {
  models.Location.findOne({ code: req.params.code }).exec(function(err, location) {
    if (err) return next(err);
    res.json(location);
  });
};

controller.create = function(req, res, next) {
  var location = new models.Location();

  location.code = req.body.code;
  location.name = req.body.name;
  location.state = req.body.state;
  location.country = req.body.country;
  location.description = req.body.description;

  location.save(function(err) {
    if (err) return next(err);
    res.json({ message: 'Location created' });
  });
};

controller.save = function(req, res, next) {
  models.Location.findById(req.params.id).exec(function(err, location) {
    if (err) return next(err);

    location.code = req.body.code;
    location.name = req.body.name;
    location.state = req.body.state;
    location.country = req.body.country;
    location.description = req.body.description;

    location.save(function(err) {
      if (err) return next(err);
      res.json({ message: 'Location updated' });
    });
  });
};

module.exports = function(router) {
  router.route('/location/search/:text').get(controller.search);
  router.route('/location').get(controller.list);
  router.route('/location/:id').get(controller.get);
  router.route('/location/code/:code').get(controller.getByCode);
  router.route('/location').post(controller.create);
  router.route('/location/:id').put(controller.save);
}