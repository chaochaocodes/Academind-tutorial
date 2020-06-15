var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// localhost:8000/users/detail, app.js already navigates to /users
router.get('/detail', function(req, res, next) {
  res.send(`you're so cool`);
});

module.exports = router;




