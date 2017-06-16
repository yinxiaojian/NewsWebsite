var express = require('express');
var router = express.Router();
var sexFetch = require('../models/sexfetch');

router.get('/list/:page_id', function(req, res, next) {
    sexFetch.getList(req.params.page_id, function (response) {
        res.send(response);
    })
});

router.get('/detail/:girls_id', function(req, res, next) {
    sexFetch.getDetail(req.params.girls_id, function (response) {
        res.send(response);
    });
});

module.exports = router;