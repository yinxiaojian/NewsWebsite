var express = require('express');
var router = express.Router();
var videoFetch = require('../models/videofetch');
router.get('/content/:group_id', function(req, res, next) {
    videoFetch.getVideoOriginalURL(req.params.group_id, function (response) {
        console.log('test');
        console.log(response);
        res.send(response);
    });
});

router.get('/comment/:group_id/:item_id/:offset', function(req, res, next) {
    videoFetch.getComment(req.params.group_id, req.params.item_id, req.params.offset, function (response) {
        res.send(response);
    });
});

module.exports = router;