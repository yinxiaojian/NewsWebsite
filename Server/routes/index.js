var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype: '推荐', user_name:user.name, user_email:user.email});
    else
        res.render('index', { pagetype: '推荐', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_hot', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'热门', user_name:user.name, user_email:user.email});
    else
        res.render('index', { pagetype: '推荐', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_video', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'视频', user_name:user.name, user_email:user.email});
    else
        res.render('index', { pagetype: '推荐', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_image', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'图片', user_name:user.name, user_email:user.email});
    else
        res.render('index', { pagetype: '推荐', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_society', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'社会', user_name:user.name, user_email:user.email});
    else
        res.render('index', { pagetype: '社会', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_entertainment', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'娱乐', user_name:user.name, user_email:user.email});
    else
        res.render('index', { pagetype: '娱乐', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_tech', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'科技', user_name:user.name, user_email:user.email});
    else
        res.render('index', { pagetype: '科技', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_sports', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'体育', user_name:user.name, user_email:user.email});
    else
        res.render('index', { pagetype: '体育', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_car', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'汽车', user_name:user.name, user_email:user.email});
    else
        res.render('index', { pagetype: '汽车', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_finance', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'财经', user_name:user.name, user_email:user.email});
    else
        res.render('index', { pagetype: '财经', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/funny', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'搞笑', user_name:user.name, user_email:user.email});
    else
        res.render('index', { pagetype: '搞笑', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/sex', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('sex', { pagetype: '美女' , title: '美女', user_name:user.name, user_email:user.email});
    else
        res.render('index', { pagetype: '美女', title: '美女', user_name:"访客",user_email:"huaji@huaji.com"});
});

router.get('/__all__/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'推荐', user_name:user.name, user_email:user.email });
    res.render(req.params.type, { pagetype: '推荐', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_hot/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'热门', user_name:user.name, user_email:user.email });
    res.render(req.params.type, { pagetype: '热门', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_video/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'视频', user_name:user.name, user_email:user.email });
    res.render(req.params.type, { pagetype: '视频', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_image/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'图片', user_name:user.name, user_email:user.email });
    res.render(req.params.type, { pagetype: '图片', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_society/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'社会', user_name:user.name, user_email:user.email });
    res.render(req.params.type, { pagetype: '社会', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_entertainment/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'娱乐', user_name:user.name, user_email:user.email });
    res.render(req.params.type, { pagetype: '娱乐', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_tech/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'科技', user_name:user.name, user_email:user.email });
    res.render(req.params.type, { pagetype: '科技', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_sports/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'体育', user_name:user.name, user_email:user.email });
    res.render(req.params.type, { pagetype: '体育', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_car/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'汽车', user_name:user.name, user_email:user.email });
    res.render(req.params.type, { pagetype: '汽车', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/news_finance/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'财经', user_name:user.name, user_email:user.email });
    res.render(req.params.type, { pagetype: '财经', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/funny/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'搞笑', user_name:user.name, user_email:user.email });
    res.render(req.params.type, { pagetype: '搞笑', user_name:"访客",user_email:"huaji@huaji.com"});
});
router.get('/sex/:girlsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('sex', { pagetype:'美女', title: req.params.girlsid, user_name:user.name, user_email:user.email });
    res.render(req.params.type, { pagetype: '美女', title: req.params.girlsid, user_name:"访客",user_email:"huaji@huaji.com"});
});

module.exports = router;
