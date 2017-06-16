/*
* http://www.mmjpg.com/
* */
/*
 * get news content
 * a simple spider
 */
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
exports.getList = function (id, callback) {
    let url = 'http://www.mmjpg.com/';
    if (id !== '1')
        url = url + 'home/' + id;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let href = [];
            let src = [];
            let title = [];
            let time = [];
            let $ = cheerio.load(body);
            $('ul li').each(function(i, elem) {
                let temp_href = $(this).children('a').attr("href");
                href.push(temp_href.substr(temp_href.lastIndexOf('/')+1));
                src.push($(this).children('a').children('img').attr("src"));
                title.push($(this).children('a').children('img').attr("alt"));
                time.push($(this).children('span').eq(1).text());
            });
            let jsonData = {
                href: href,
                src: src,
                title: title,
                time: time
            };
            return callback(jsonData);
        } else {
            console.log(error);
            return callback(error);
        }
    });

};

exports.getDetail = function (id, callback) {
    request('http://www.mmjpg.com/mm/'+id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(body);
            let title = $('.article h2').text();
            let time = $('.article .info').children('i').eq(0).text();
            let script = $('div.clearfloat').text();
            let index1 = script.indexOf('[');
            let index2 = script.indexOf(',',index1);
            let index3 = script.indexOf(',',index2+1);
            let index4 = script.indexOf(']',index3+1);
            let year = script.slice(index1+1,index2);
            let girls_id = script.slice(index2+1,index3);
            let num = script.slice(index3+1,index4);
            let jsonData = {
                title:title,
                time:time,
                year:year,
                girls_id:girls_id,
                num:num
            };
            return callback(jsonData);
        } else {
            console.log(error);
            return callback(error);
        }
    });
}
