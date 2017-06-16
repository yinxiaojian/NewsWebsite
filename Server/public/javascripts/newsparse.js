var itemId;
var groupId;
var content;
var title;
var offset = 0;
var category_temp = "";

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
            break;
        case '当前栏目：视频':
            $("#category-video").addClass("active");
            category_temp = "news_video";
            break;
        case '当前栏目：图片':
            $("#category-gallery").addClass("active");
            category_temp = "news_image";
            break;
        case '当前栏目：社会':
            $("#category-society").addClass("active");
            category_temp = "news_society";
            break;
        case '当前栏目：娱乐':
            $("#category-entertainment").addClass("active");
            category_temp = "news_entertainment";
            break;
        case '当前栏目：科技':
            $("#category-tech").addClass("active");
            category_temp = "news_tech";
            break;
        case '当前栏目：体育':
            $("#category-sports").addClass("active");
            category_temp = "news_sports";
            break;
        case '当前栏目：汽车':
            $("#category-car").addClass("active");
            category_temp = "news_car";
            break;
        case '当前栏目：财经':
            $("#category-finance").addClass("active");
            category_temp = "news_finance";
            break;
        case '当前栏目：搞笑':
            $("#category-funny").addClass("active");
            category_temp = "funny";
            break;
        default:
            console.log('something error');
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
    title = data.article_title;
    content = data.article_content;
    $("#article-content").html(content);
    $("#article-title").text(title);
    $("img").each(function () {
        $(this).attr("width","100%");
    });
    console.log('parsing finish');
}

function analyseComment() {
    $.get('/news/comment/'+groupId+'/'+itemId+'/'+offset, function (result, status) {
        if( isSuccess(status) ){
            offset+=10;
            if(result.message == "success"){
                var adata = result.data.comments;
                for(var i = 0; i < adata.length; i++){
                    var replyCount = adata[i].reply_count;
                    var agreeCount = adata[i].digg_count;
                    var source = adata[i].user.name;
                    var avatar_url = adata[i].user.avatar_url;
                    var content = adata[i].text;
                    var newItem = '<li> ' +
                        '<img class="fa img-circle img-sm" alt="User Image" src='+ avatar_url +'> ' +
                        '<div class="timeline-item"> ' +
                        '<span class="time"><i class="fa fa-clock-o"></i>'+ milliToDate(adata[i].create_time) +'</span> ' +
                        '<div class="timeline-header"> ' +
                        '<a>'+ source +'</a>' + ' · ' +
                        '<i class="fa fa-commenting-o"></i> ' + replyCount +
                        '</a>' + ' · ' +
                        '<i class="fa fa-thumbs-o-up"></i> ' + agreeCount +
                        '</div> ' +
                        '<div class="timeline-body">' + content +
                        '</div> ' +
                        '</div> ' +
                        '</li>';
                    $(".timeline").append(newItem);
                }
                console.log('success')
            }
        }else{
            console.log('status = ' + status)
        }
    })
}

$("#more-comment").click(function () {
    analyseComment();
});
//transform millisecond to date xxxx/xx/xx xx:xx:xx
function milliToDate(milliSecond) {
    var oDate = new Date(milliSecond*1000),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
    return oTime;
}

//fill zero
function getzf(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}