var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { pagetype: '推荐' });
});
router.get('/news_hot', function(req, res, next) {
    res.render('index', { pagetype:'热门'});
});
router.get('/news_video', function(req, res, next) {
    res.render('index', { pagetype:'视频'});
});
router.get('/news_image', function(req, res, next) {
    res.render('index', { pagetype:'图片'});
});
router.get('/news_society', function(req, res, next) {
    res.render('index', { pagetype:'社会'});
});
router.get('/news_entertainment', function(req, res, next) {
    res.render('index', { pagetype:'娱乐'});
});
router.get('/news_tech', function(req, res, next) {
    res.render('index', { pagetype:'科技'});
});
router.get('/news_sports', function(req, res, next) {
    res.render('index', { pagetype:'体育'});
});
router.get('/news_car', function(req, res, next) {
    res.render('index', { pagetype:'汽车'});
});
router.get('/news_finance', function(req, res, next) {
    res.render('index', { pagetype:'财经'});
});
router.get('/funny', function(req, res, next) {
    res.render('index', { pagetype:'搞笑'});
});
router.get('/sex', function(req, res, next) {
    res.render('sex', { pagetype: '美女' , title: '美女'});
});

router.get('/__all__/:type/:newsid', function(req, res, next) {
    res.render(req.params.type, { pagetype:'推荐', nid:'newsid' });
});
router.get('/news_hot/:type/:newsid', function(req, res, next) {
    res.render(req.params.type, { pagetype:'热门', nid:'newsid' });
});
router.get('/news_video/:type/:newsid', function(req, res, next) {
    res.render(req.params.type, { pagetype:'视频', nid:'newsid' });
});
router.get('/news_image/:type/:newsid', function(req, res, next) {
    res.render(req.params.type, { pagetype:'图片', nid:'newsid' });
});
router.get('/news_society/:type/:newsid', function(req, res, next) {
    res.render(req.params.type, { pagetype:'社会', nid:'newsid' });
});
router.get('/news_entertainment/:type/:newsid', function(req, res, next) {
    res.render(req.params.type, { pagetype:'娱乐', nid:'newsid' });
});
router.get('/news_tech/:type/:newsid', function(req, res, next) {
    res.render(req.params.type, { pagetype:'科技', nid:'newsid' });
});
router.get('/news_sports/:type/:newsid', function(req, res, next) {
    res.render(req.params.type, { pagetype:'体育', nid:'newsid' });
});
router.get('/news_car/:type/:newsid', function(req, res, next) {
    res.render(req.params.type, { pagetype:'汽车', nid:'newsid' });
});
router.get('/news_finance/:type/:newsid', function(req, res, next) {
    res.render(req.params.type, { pagetype:'财经', nid:'newsid' });
});
router.get('/funny/:type/:newsid', function(req, res, next) {
    res.render(req.params.type, { pagetype:'搞笑', nid:'newsid' });
});
router.get('/sex/:girlsid', function(req, res, next) {
    res.render('sex', { pagetype:'美女', title: req.params.girlsid});
});

module.exports = router;
