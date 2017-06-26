var express = require('express');
var router = express.Router();

var name_def = '访客';
var email_def = 'huaji@huaji.com';
var col_def = '111111111';
var skin_def = 'red';

/* GET home page. */
router.get('/', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype: '推荐',user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin});
    else
        res.render('index', { pagetype: '推荐',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_hot', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'热门', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin});
    else
        res.render('index', { pagetype: '推荐',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_video', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'视频', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin});
    else
        res.render('index', { pagetype: '推荐',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_image', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'图片', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin});
    else
        res.render('index', { pagetype: '推荐',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_society', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'社会', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin});
    else
        res.render('index', { pagetype: '社会',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_entertainment', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'娱乐', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin});
    else
        res.render('index', { pagetype: '娱乐',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_tech', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'科技', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin});
    else
        res.render('index', { pagetype: '科技',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_sports', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'体育', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin});
    else
        res.render('index', { pagetype: '体育',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_car', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'汽车', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin});
    else
        res.render('index', { pagetype: '汽车',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_finance', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'财经', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin});
    else
        res.render('index', { pagetype: '财经',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/funny', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('index', { pagetype:'搞笑', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin});
    else
        res.render('index', { pagetype: '搞笑',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/sex', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('sex', { pagetype: '美女' , title: '美女', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin});
    else
        res.render('sex', { pagetype: '美女', title: '美女',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});

router.get('/__all__/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'推荐', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin });
    res.render(req.params.type, { pagetype: '推荐', user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_hot/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'热门', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin });
    res.render(req.params.type, { pagetype: '热门',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_video/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'视频', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin });
    res.render(req.params.type, { pagetype: '视频',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_image/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'图片', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin });
    res.render(req.params.type, { pagetype: '图片',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_society/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'社会', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin });
    res.render(req.params.type, { pagetype: '社会', user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_entertainment/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'娱乐', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin });
    res.render(req.params.type, { pagetype: '娱乐', user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_tech/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'科技', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin });
    res.render(req.params.type, { pagetype: '科技',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_sports/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'体育', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin });
    res.render(req.params.type, { pagetype: '体育', user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_car/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'汽车', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin });
    res.render(req.params.type, { pagetype: '汽车',user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/news_finance/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'财经', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin });
    res.render(req.params.type, { pagetype: '财经', user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/funny/:type/:newsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render(req.params.type, { pagetype:'搞笑', user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin });
    res.render(req.params.type, { pagetype: '搞笑', user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});
router.get('/sex/:girlsid', function(req, res, next) {
    let user = req.session.user;
    if (user!=null)
        res.render('sex', { pagetype:'美女', title: req.params.girlsid, user_name:user.name, user_email:user.email,user_col:user.col,user_skin:user.skin });
    res.render('sex', { pagetype: '美女', title: req.params.girlsid, user_name:name_def,user_email:email_def,user_col:col_def, user_skin:skin_def});
});

module.exports = router;
