var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { pagetype: '推荐' });
});

router.get('/news_hot', function(req, res, next) {
    res.render('index', { pagetype:'热门'});
});

router.get('/news_hot/article/:newsid', function(req, res, next) {
    res.render('article', { pagetype:'热门', nid:'newsid' });
});
module.exports = router;
