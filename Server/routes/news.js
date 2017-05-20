var express = require('express');
var router = express.Router();
var newsFetch = require('../models/newsfetch')
router.get('/content/:group_id', function(req, res, next) {
    newsFetch.getContent(req.params.group_id, function (response) {
       res.send(response);
    });
});

router.get('/comment/:group_id/:item_id/:offset', function(req, res, next) {
    newsFetch.getComment(req.params.group_id, req.params.item_id, req.params.offset, function (response) {
        res.send(response);
    });
});

module.exports = router;