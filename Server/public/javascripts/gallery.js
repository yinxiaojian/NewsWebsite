var itemId;
var groupId;
var content;
var title;
var label;
var media;
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
    let url = window.location.pathname;
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
    $.get('/gallery/content/' + groupId, function (result, status) {
        if( isSuccess(status) ){
            parsingRes(result);
            analyseComment();
        }else{
            console.log('status = ' + status);
        }
    })
}

function parsingRes(data) {
    itemId = data.item_id;
    title = data.gallery_title;
    content = data.gallery_content;
    label = data.labels;
    media = data.media;
    $(".carousel-inner div img").attr('src',content[0].url);
    $("#gallery-content").html('<h4>'+title+'</h4>'+'<p>'+ eval("'" + content[0].abstract + "'")+'</p>');
    for (let i = 0; i < label.length; i ++)
        $("#gallery-content").append(eval("'"+label[i]+"'")+'|');
    $("#gallery-title").append()
    $("#gallery-title").html('<img class="fa img-circle img-sm bg-yellow" alt="Media Avatar" src='+ media.avatarUrl +'>' +
        '<h5 >'+media.name+'</h5>');
    for(let i = 1; i < content.length; i ++)
    {
        let item = '<div class="item"> ' +
            '<img src="'+content[i].url+'" width="100%"> ' +
            '</div>';
        $(".carousel-inner").append(item);
        item = '<li data-target="#carousel-gallery" data-slide-to="'+i+'"></li>';
        $(".carousel-indicators").append(item);
    }
    console.log('parsing finish');
}

$('#carousel-gallery').on('slide.bs.carousel', function (event) {
    let $hoder = $('#carousel-gallery').find('.item'),
        $items = $(event.relatedTarget);

    let index= $hoder.index($items);
    $("#gallery-content").html('<h4>'+title+'</h4>'+'<p>'+ eval("'" + content[index].abstract + "'")+'</p>');
    for (let i = 0; i < label.length; i ++)
        $("#gallery-content").append(eval("'"+label[i]+"'")+'|');
});

function analyseComment() {
    $.get('/gallery/comment/'+groupId+'/'+itemId+'/'+offset, function (result, status) {
        if( isSuccess(status) ){
            offset+=10;
            if(result.message == "success"){
                let adata = result.data.comments;
                for(let i = 0; i < adata.length; i++){
                    let replyCount = adata[i].reply_count;
                    let agreeCount = adata[i].digg_count;
                    let source = adata[i].user.name;
                    let avatar_url = adata[i].user.avatar_url;
                    let content = adata[i].text;
                    let newItem = '<li> ' +
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
    let oDate = new Date(milliSecond*1000),
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