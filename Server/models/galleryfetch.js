var request = require('request');
var cheerio = require('cheerio');

exports.getGalleryUrl = function(id, callback) {
    request('http://www.toutiao.com/a'+id+'/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(body);
            let title = $('title').html();
            let index = body.lastIndexOf("item_id");
            let index1 = body.indexOf("'",index);
            let index2 = body.indexOf("'",index1+1);
            //initial
            let groupId = id;
            let itemId = body.slice(index1+1,index2);
            let data = getContent(body);
            let labels = getLabel(body);
            let media = getMediaInfo(body);
            let jsonData = {
                group_id: groupId,
                item_id: itemId,
                gallery_title: title,
                gallery_content: data,
                labels: labels,
                media: media
            };
            return callback(jsonData);
        } else {
            return callback(error);
        }
    });
};

function getContent(html) {
    let regUri = /"uri":"[0-9a-zA-z\/]*"/g;
    let index1 = html.indexOf('"sub_abstracts"');
    let index2 = html.indexOf(']',index1+1);
    let regAbstract = /"[a-zA-Z0-9\\\- "]*"/g;
    let uri = html.match(regUri);
    let abstract = html.slice(index1+17,index2).match(regAbstract);
    console.log(abstract);
    let res=[];
    if(uri.length!=abstract.length)
    {
        console.log('error');
        return;
    }
    for (let i = 0; i < uri.length; i ++)
    {
        let temp = {
            url: 'http://pb1.pstatp.com/'+uri[i].slice(7,uri[i].length-1).replace('\\',''),
            abstract: abstract[i].slice(1,abstract[i].length-1)
        };
        res.push(temp);
    }
    return res;
}

function getLabel(html) {
    let regLabel = /"[~\\\/ 0-9a-zA-z]*"/g;
    let index1 = html.indexOf('"labels"');
    let index2 = html.indexOf(']',index1+1);
    let res = html.slice(index1+9,index2).match(regLabel);
    for (let i = 0; i < res.length; i ++)
        res[i] = res[i].slice(1,res[i].length-1);
    return res;
}

function getMediaInfo(html) {
    let index1 = html.indexOf('mediaInfo =');
    const regName = /name: '[\u4e00-\u9fa5\-A-Za-z0-9]*'/;
    const regAvator = /avatarUrl: '[:.\/0-9a-zA-Z]*'/;
    let name = html.substr(index1).match(regName);
    let avatarUrl = html.substr(index1).match(regAvator);
    let res = {
        name: name[0].slice(7,name[0].length-1),
        avatarUrl: avatarUrl[0].slice(12,avatarUrl[0].length-1)
    };
    console.log(name[0]);
    console.log(avatarUrl[0]);
    return res;
}
exports.getComment = function (groupId, itemId, offSet, callback) {
    let jsonData;
    jsonData = {
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