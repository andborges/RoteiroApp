var express = require('express');
var router = express.Router();

require('./main.js')(router);
require('./location.js')(router);
require('./itinerary.js')(router);

module.exports = router;