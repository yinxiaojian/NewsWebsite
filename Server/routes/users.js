var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/login', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
