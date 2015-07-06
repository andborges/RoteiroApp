var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Roteiro' });
});

router.get('/search/:text', function(req, res, next) {
  res.render('index', { title: 'Roteiro' });
});

module.exports = router;