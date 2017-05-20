var itemId;
var groupId;
var content;
var offset = 0;

$(function(){
    initial();
    pageSetting();
    analyseNews();
});

function isSuccess(status) {
    return status === "success"
}

function initial() {
    var url = window.location.pathname;
    console.log(url);
    groupId = url.substr(url.lastIndexOf('/')+1);
}

function pageSetting() {
    var category = document.getElementById("category").innerText;
    console.log(category);
    switch(category) {
        case '当前栏目：推荐':
            $("#category-recommend").addClass("active");
            category_temp = "__all__";
            break;
        case '当前栏目：热门':
            $("#category-hot").addClass("active");
            category_temp = "news_hot";
            console.log(category);
            break;
        default:
            console.log('something error')
    }
}

function analyseNews() {
    var content;
    $.get('/news/content/' + groupId, function (result, status) {
        if( isSuccess(status) ){
            parsingRes(result);
            analyseComment();
        }else{
            console.log('status = ' + status)
        }
    })
}

function parsingRes(data) {
    itemId = data.item_id;
    content = data.article_content;
    console.log('parsing finish');
}

function analyseComment() {
    $.get('/news/comment/'+groupId+'/'+itemId+'/'+offset, function (result, status) {
        if( isSuccess(status) ){
            offset+=10;
            console.log(result);
        }else{
            console.log('status = ' + status)
        }
    })
}