/**
 * Created by Administrator on 2017/5/3.
 */

var base_url = "http://toutiao.com/api/pc/feed/?category=";
var category_temp = "";
var time = 0;
var as_param;
var cp_param;
var max_behot_time = 0;

$(function(){
    pageSetting();
    getCarousel();
    var param = getParam();
    as_param = param.as;
    cp_param = param.cp;
    getList();
    time ++;
});

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

function getCarousel() {
    $.ajax({
        url:"http://www.toutiao.com/api/pc/focus/?"+"callback=analyseCarousel",
        type:'get',
        dataType:'jsonp',
        jsonp:'analyseCarousel'//mean of this ???
    });
}
function getList(){
    $.ajax({
        url:base_url + category_temp + "&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true"
        +"&as="+as_param+"&cp="+cp_param+"&callback=analyseList",
        type:'get',
        dataType:'jsonp',
        jsonp:'analyseList'
    });
}

function analyseCarousel(data) {
    var tarray = []
    if(data.message == "success") {
        var adata = data.data;
        adata = adata.pc_feed_focus;
        for (var i = 0; i < adata.length; i ++) {
            var temp = {};
            var title = adata[i].title;
            var group_id = adata[i].group_id;
            var image_url = adata[i].image_url;
            temp['title'] = title;
            temp['group_id'] = group_id;
            temp['image_url'] = image_url;
            tarray.push(temp);
        }
        //maybe for can do this, but i don't know :)
        $("#carousel-foucus-href").attr('href', '/'+category_temp+'/'+adata[0].display_url.slice(7,adata[0].display_url.length-1));
        $("#carousel-foucus-img").attr('src', adata[0].image_url);
        $("#carousel-foucus-text").text(adata[0].title);

        $("#carousel-society-href").attr('href', '/'+category_temp+'/'+adata[1].display_url.slice(7,adata[1].display_url.length-1));
        $("#carousel-society-img").attr('src', adata[1].image_url);
        $("#carousel-society-text").text(adata[1].title);

        $("#carousel-entir-href").attr('href', '/'+category_temp+'/'+adata[2].display_url.slice(7,adata[2].display_url.length-1));
        $("#carousel-entir-img").attr('src', adata[2].image_url);
        $("#carousel-entir-text").text(adata[2].title);

        $("#carousel-sport-href").attr('href', '/'+category_temp+'/'+adata[3].display_url.slice(7,adata[2].display_url.length-1));
        $("#carousel-sport-img").attr('src', adata[3].image_url);
        $("#carousel-sport-text").text(adata[3].title);

        $("#carousel-military-href").attr('href', '/'+category_temp+'/'+adata[4].display_url.slice(7,adata[4].display_url.length-1));
        $("#carousel-military-img").attr('src', adata[4].image_url);
        $("#carousel-military-text").text(adata[4].title);

        $("#carousel-idol-href").attr('href', '/'+category_temp+'/'+adata[5].display_url.slice(7,adata[5].display_url.length-1));
        $("#carousel-idol-img").attr('src', adata[5].image_url);
        $("#carousel-idol-text").text(adata[5].title);

        console.log('set carousel success')
    }
    else {
        console.log('get carousel error');
    }
}

function analyseList(data){
    var currentTime = getNowFormatDate();
    var time_label = '<li class="time-label"><span class="bg-red">'+currentTime+'</span></li>';
    $(".timeline").append(time_label);
    var tarray = [];
    if(data.message == "success"){
        var adata = data.data;
        for(var i = 0; i < adata.length; i++){
            var comments_count = 0;//remove undefined
            if(adata[i].hasOwnProperty("comments_count"))
                comments_count = adata[i].comments_count;
            var source = "匿名";
            if(adata[i].hasOwnProperty("source"))
                source = adata[i].source;

            var content = getContent(adata[i]);

            if(adata[i].media_avatar_url){
                var newItem = '<li> ' +
                    '<img class="fa img-circle img-sm" alt="User Image" src='+ adata[i].media_avatar_url +'> ' +
                    '<div class="timeline-item"> ' +
                    '<span class="time"><i class="fa fa-clock-o"></i>'+ milliToDate(adata[i].behot_time) +'</span> ' +
                    '<div class="timeline-header"> ' +
                    '<a>'+ source +'</a>' + ' · ' +
                    '<i class="fa fa-comments-o"></i> ' + comments_count +
                    '</div> ' +
                    '<div class="timeline-body"><div class="row"> ' + content + '</div>' +
                    '</div> ' +
                    '</div> ' +
                    '</li>';
                $(".timeline").append(newItem);
            }
        }
        console.log('success')
    }
    console.log(tarray)
}

function getContent(data) {
    var imageContent;
    var title = data.title;
    var item;

    if(data.article_genre == "article") {
        if(data.hasOwnProperty("image_url"))
            imageContent = '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12"> ' +
                '<div class="hovereffect"> ' +
                '<img width="100%" class="img-responsive" src='+data.image_url+' alt=""> ' +
                '<div class="overlay"> '  +
                '<a class="info" href="/"><i class="fa fa-thumbs-up"></i></a> ' +
                '<a class="info" href="#"><i class="fa fa-thumbs-down"></i></a> ' +
                '</div> ' +
                '</div> ' +
                '</div>';
        var abstract = data.abstract;
        if(imageContent)
            item = imageContent+
                '<div class="col-lg-9 col-md-8 col-sm-6 col-xs-12"><h3><a href="/' +
                category_temp+'/'+data.group_id+'"'+'>' + title +
                '</a></h3><p>' + abstract +
                '</p>';
        else
            item = '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><h3><a href="/' +
                category_temp+'/'+data.group_id+'"'+'>' + title +
                '</a></h3><p>' + abstract +
                '</p>';
    }

    else if(data.article_genre == "video")
    {
        if(data.hasOwnProperty("image_url"))
            imageContent = '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12"> ' +
                '<div class="hovereffect"> ' +
                '<img width="100%" class="img-responsive" src='+data.image_url+' alt=""> ' +
                '<div class="overlay"> '  +
                '<a class="info" href="/"><i class="fa fa-thumbs-up"></i></a> ' +
                '<a class="info" href="#"><i class="fa fa-thumbs-down"></i></a> ' +
                '</div> ' +
                '</div> ' +
                '</div>';
        var abstract = data.abstract;
        if(abstract!=undefined)
            item = imageContent+
                '<div class="col-lg-9 col-md-8 col-sm-6 col-xs-12"><h3><a href="/' +
                category_temp+'/'+data.group_id+'"'+'>' + title +
                '</a></h3><p>' + abstract +
                '</p>';
        else
            item = imageContent+
                '<div class="col-lg-9 col-md-8 col-sm-6 col-xs-12"><h3><a href="/' +
                category_temp+'/'+data.group_id+'"'+'>' + title +
                '</a></h3><p>' + title +
                '</p>';
    }

    else if(data.article_genre == "gallery") {
        if(data.hasOwnProperty("image_url")) {
            var image_list = data.image_list;
            imageContent =  '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'+
                '<div class="hovereffect"> ';
            for(var i = 0; i < image_list.length; i ++) {
                imageContent += '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3"> ' +
                    '<img width="100%" class="img-responsive" src='+image_list[i].url +' alt=""> ' +
                    '</div>';
            }
            imageContent += '<div class="overlay"> '  +
                '<a class="info" href="/"><i class="fa fa-thumbs-up"></i></a> ' +
                '<a class="info" href="#"><i class="fa fa-thumbs-down"></i></a> ' +
                '</div> ' +
                '</div>';
        }
        item = imageContent + '<div class="col-lg-9 col-md-8 col-sm-6 col-xs-12"><h3><a href="/' +
            category_temp+'/'+data.group_id+'"'+'>' + title + '</a></h3>';
    }
    return item;
}

function getParam(){
    var asas;
    var cpcp;
    var t = Math.floor((new Date).getTime() / 1e3)
        , e = t.toString(16).toUpperCase()
        , i = md5(t).toString().toUpperCase();
    if (8 != e.length){
        asas = "479BB4B7254C150";
        cpcp = "7E0AC8874BB0985";
    }else{
        for (var n = i.slice(0, 5), o = i.slice(-5), a = "", s = 0; 5 > s; s++){
            a += n[s] + e[s];
        }
        for (var r = "", c = 0; 5 > c; c++){
            r += e[c + 3] + o[c];
        }
        asas = "A1" + a + e.slice(-3);
        cpcp= e.slice(0, 3) + r + "E1";
    }
    var info = {"as":asas, "cp":cpcp};
    return info;
}

!function(e) {
    "use strict";
    function t(e, t) {
        var n = (65535 & e) + (65535 & t)
            , r = (e >> 16) + (t >> 16) + (n >> 16);
        return r << 16 | 65535 & n
    }
    function n(e, t) {
        return e << t | e >>> 32 - t
    }
    function r(e, r, o, i, a, u) {
        return t(n(t(t(r, e), t(i, u)), a), o)
    }
    function o(e, t, n, o, i, a, u) {
        return r(t & n | ~t & o, e, t, i, a, u)
    }
    function i(e, t, n, o, i, a, u) {
        return r(t & o | n & ~o, e, t, i, a, u)
    }
    function a(e, t, n, o, i, a, u) {
        return r(t ^ n ^ o, e, t, i, a, u)
    }
    function u(e, t, n, o, i, a, u) {
        return r(n ^ (t | ~o), e, t, i, a, u)
    }
    function s(e, n) {
        e[n >> 5] |= 128 << n % 32,
            e[(n + 64 >>> 9 << 4) + 14] = n;
        var r, s, c, l, f, p = 1732584193, d = -271733879, h = -1732584194, m = 271733878;
        for (r = 0; r < e.length; r += 16)
            s = p,
                c = d,
                l = h,
                f = m,
                p = o(p, d, h, m, e[r], 7, -680876936),
                m = o(m, p, d, h, e[r + 1], 12, -389564586),
                h = o(h, m, p, d, e[r + 2], 17, 606105819),
                d = o(d, h, m, p, e[r + 3], 22, -1044525330),
                p = o(p, d, h, m, e[r + 4], 7, -176418897),
                m = o(m, p, d, h, e[r + 5], 12, 1200080426),
                h = o(h, m, p, d, e[r + 6], 17, -1473231341),
                d = o(d, h, m, p, e[r + 7], 22, -45705983),
                p = o(p, d, h, m, e[r + 8], 7, 1770035416),
                m = o(m, p, d, h, e[r + 9], 12, -1958414417),
                h = o(h, m, p, d, e[r + 10], 17, -42063),
                d = o(d, h, m, p, e[r + 11], 22, -1990404162),
                p = o(p, d, h, m, e[r + 12], 7, 1804603682),
                m = o(m, p, d, h, e[r + 13], 12, -40341101),
                h = o(h, m, p, d, e[r + 14], 17, -1502002290),
                d = o(d, h, m, p, e[r + 15], 22, 1236535329),
                p = i(p, d, h, m, e[r + 1], 5, -165796510),
                m = i(m, p, d, h, e[r + 6], 9, -1069501632),
                h = i(h, m, p, d, e[r + 11], 14, 643717713),
                d = i(d, h, m, p, e[r], 20, -373897302),
                p = i(p, d, h, m, e[r + 5], 5, -701558691),
                m = i(m, p, d, h, e[r + 10], 9, 38016083),
                h = i(h, m, p, d, e[r + 15], 14, -660478335),
                d = i(d, h, m, p, e[r + 4], 20, -405537848),
                p = i(p, d, h, m, e[r + 9], 5, 568446438),
                m = i(m, p, d, h, e[r + 14], 9, -1019803690),
                h = i(h, m, p, d, e[r + 3], 14, -187363961),
                d = i(d, h, m, p, e[r + 8], 20, 1163531501),
                p = i(p, d, h, m, e[r + 13], 5, -1444681467),
                m = i(m, p, d, h, e[r + 2], 9, -51403784),
                h = i(h, m, p, d, e[r + 7], 14, 1735328473),
                d = i(d, h, m, p, e[r + 12], 20, -1926607734),
                p = a(p, d, h, m, e[r + 5], 4, -378558),
                m = a(m, p, d, h, e[r + 8], 11, -2022574463),
                h = a(h, m, p, d, e[r + 11], 16, 1839030562),
                d = a(d, h, m, p, e[r + 14], 23, -35309556),
                p = a(p, d, h, m, e[r + 1], 4, -1530992060),
                m = a(m, p, d, h, e[r + 4], 11, 1272893353),
                h = a(h, m, p, d, e[r + 7], 16, -155497632),
                d = a(d, h, m, p, e[r + 10], 23, -1094730640),
                p = a(p, d, h, m, e[r + 13], 4, 681279174),
                m = a(m, p, d, h, e[r], 11, -358537222),
                h = a(h, m, p, d, e[r + 3], 16, -722521979),
                d = a(d, h, m, p, e[r + 6], 23, 76029189),
                p = a(p, d, h, m, e[r + 9], 4, -640364487),
                m = a(m, p, d, h, e[r + 12], 11, -421815835),
                h = a(h, m, p, d, e[r + 15], 16, 530742520),
                d = a(d, h, m, p, e[r + 2], 23, -995338651),
                p = u(p, d, h, m, e[r], 6, -198630844),
                m = u(m, p, d, h, e[r + 7], 10, 1126891415),
                h = u(h, m, p, d, e[r + 14], 15, -1416354905),
                d = u(d, h, m, p, e[r + 5], 21, -57434055),
                p = u(p, d, h, m, e[r + 12], 6, 1700485571),
                m = u(m, p, d, h, e[r + 3], 10, -1894986606),
                h = u(h, m, p, d, e[r + 10], 15, -1051523),
                d = u(d, h, m, p, e[r + 1], 21, -2054922799),
                p = u(p, d, h, m, e[r + 8], 6, 1873313359),
                m = u(m, p, d, h, e[r + 15], 10, -30611744),
                h = u(h, m, p, d, e[r + 6], 15, -1560198380),
                d = u(d, h, m, p, e[r + 13], 21, 1309151649),
                p = u(p, d, h, m, e[r + 4], 6, -145523070),
                m = u(m, p, d, h, e[r + 11], 10, -1120210379),
                h = u(h, m, p, d, e[r + 2], 15, 718787259),
                d = u(d, h, m, p, e[r + 9], 21, -343485551),
                p = t(p, s),
                d = t(d, c),
                h = t(h, l),
                m = t(m, f);
        return [p, d, h, m]
    }
    function c(e) {
        var t, n = "";
        for (t = 0; t < 32 * e.length; t += 8)
            n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
        return n
    }
    function l(e) {
        var t, n = [];
        for (n[(e.length >> 2) - 1] = void 0,
                 t = 0; t < n.length; t += 1)
            n[t] = 0;
        for (t = 0; t < 8 * e.length; t += 8)
            n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
        return n
    }
    function f(e) {
        return c(s(l(e), 8 * e.length))
    }
    function p(e, t) {
        var n, r, o = l(e), i = [], a = [];
        for (i[15] = a[15] = void 0,
             o.length > 16 && (o = s(o, 8 * e.length)),
                 n = 0; 16 > n; n += 1)
            i[n] = 909522486 ^ o[n],
                a[n] = 1549556828 ^ o[n];
        return r = s(i.concat(l(t)), 512 + 8 * t.length),
            c(s(a.concat(r), 640))
    }
    function d(e) {
        var t, n, r = "0123456789abcdef", o = "";
        for (n = 0; n < e.length; n += 1)
            t = e.charCodeAt(n),
                o += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
        return o
    }
    function h(e) {
        return unescape(encodeURIComponent(e))
    }
    function m(e) {
        return f(h(e))
    }
    function g(e) {
        return d(m(e))
    }
    function v(e, t) {
        return p(h(e), h(t))
    }
    function y(e, t) {
        return d(v(e, t))
    }
    function b(e, t, n) {
        return t ? n ? v(t, e) : y(t, e) : n ? m(e) : g(e)
    }
    "function" == typeof define && define.amd ? define("static/js/lib/md5", ["require"], function() {
        return b
    }) : "object" == typeof module && module.exports ? module.exports = b : e.md5 = b
}(this)

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

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