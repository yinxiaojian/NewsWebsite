/*
* get news content
* a simple spider
*/
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');

exports.getContent = function(id, callback) {
    request('http://www.toutiao.com/a'+id+'/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(body);
            content = $('.article-content').html();
            title = $('.article-title').text();
            var index = body.lastIndexOf("item_id");
            var index1 = body.indexOf("'",index);
            var index2 = body.indexOf("'",index1+1);
            //initial
            var groupId = id;
            var itemId = body.slice(index1+1,index2);
            var jsonData = {
                group_id: groupId,
                item_id: itemId,
                article_title: title,
                article_content: content
            }
            return callback(jsonData);
        } else {
            return callback(error);
        }
    });
};

exports.getComment = function (groupId, itemId, offSet, callback) {
    var jsonData = {
        group_id: groupId,
        item_id: itemId,
        offset: offSet,
        count: 10
    };
    request.post({url:'http://www.toutiao.com/api/comment/list/', form: jsonData}, function(error, response, body){
        if (!error && response.statusCode == 200) {
            return callback(JSON.parse(body));
        } else {
            return callback(error);
        }
    });
};