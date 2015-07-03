var controller = {};

var mongoose = require('mongoose');
var models = require('../../../models/index.js');

controller.search = function(req, res, next) {
  models.Location.find({ name: new RegExp(req.params.text, "i") }, function(err, locations) {
    if (err) return next(err);
    res.json(locations);
  });
};

module.exports = function(router) {
  router.route('/location/search/:text').get(controller.search);
}