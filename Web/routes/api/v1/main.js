module.exports = function(router) {
  router.get('/', function(req, res, next) {
    res.json({ message: 'Version: 0.0.1' });
  });
}