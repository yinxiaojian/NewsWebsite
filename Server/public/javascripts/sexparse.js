var pageId = 1;
var category_temp = "";
var girlsId = 0;
var images = null;
var _viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    _viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

$(function(){
    if ($('title').text()!=='美女')
    {
        girlsId = $('title').text();
        magnificPopup();
        getDetail();
        offCanvass();
        mobileMenuOutsideClick();
    }
    else
    {
        getList();
        offCanvass();
        mobileMenuOutsideClick();
    }
});

// OffCanvass
var offCanvass = function() {
    $('body').on('click', '.js-fh5co-menu-btn, .js-fh5co-offcanvass-close', function(){
        $('#fh5co-offcanvass').toggleClass('fh5co-awake');
    });
};

// Click outside of offcanvass
var mobileMenuOutsideClick = function() {
    $(document).click(function (e) {
        var container = $("#fh5co-offcanvass, .js-fh5co-menu-btn");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ( $('#fh5co-offcanvass').hasClass('fh5co-awake') ) {
                $('#fh5co-offcanvass').removeClass('fh5co-awake');
            }
        }
    });

    $(window).scroll(function(){
        if ( $(window).scrollTop() > 500 ) {
            if ( $('#fh5co-offcanvass').hasClass('fh5co-awake') ) {
                $('#fh5co-offcanvass').removeClass('fh5co-awake');
            }
        }
    });
};

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

function isSuccess(status) {
    return status === "success"
}
//get the newest picture id
function getList() {
    $.get('/sex/list/'+pageId, function (result, status) {
        if( isSuccess(status)){
            console.log(result);
            for (let i=0;i<result.href.length;i++)
            {
                let html = '<div class="item"> ' +
                    '<div class="animate-box"><div class="image-popup fh5co-board-img">'  +
                    showImg(result.src[i])+'</div> ' +
                    '<div class="fh5co-desc"><a href="/sex/'+result.href[i]+'">'+result.title[i]+result.time[i]+'</a></div>' +
                    '</div> </div>';
                var grid = document.querySelector('#fh5co-board');
                var item = document.createElement('item');
                salvattore.appendElements(grid, [item]);
                item.outerHTML = html;
            }
            images=$("#fh5co-main").find("img");
            $('.animate-box').waypoint(
                function( direction ) {

                    if( direction === 'down' && !$(this).hasClass('animated') ) {
                        $(this.element).addClass('bounceIn animated');
                    }

                }, { offset: '75%' });
            pageId += 1;

        }else{
            console.log('status = ' + status)
        }
    })
}
//get detail images with girl's id
function getDetail() {
    $.get('/sex/detail/'+girlsId, function (result, status) {
        if( isSuccess(status)){
            $('.callout').append('<p>'+result.title+' '+result.time+ '</p>');
            for (let i=1;i<=result.num;i++)
            {
                let src= "http://img.mmjpg.com/"+result.year+'/'+result.girls_id+'/' + i + '.jpg';
                let html = '<div class="item"> ' +
                    '<div class="animate-box"><div class="image-popup fh5co-board-img">'
                    + showImg(src) + '</div></div></div>';

                var grid = document.querySelector('#fh5co-board');
                var item = document.createElement('item');

                salvattore.appendElements(grid, [item]);
                item.outerHTML = html;
            }
            images=$("#fh5co-main").find("img");
            $('.animate-box').waypoint(
                function( direction ) {

                    if( direction === 'down' && !$(this).hasClass('animated') ) {
                        $(this.element).addClass('bounceIn animated');
                    }

                }, { offset: '75%' });
        }else{
            console.log('status = ' + status)
        }
    })
}
function magnificPopup() {
    $('#fh5co-board').on('click', function (e) {
        e.preventDefault();

        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            closeBtnInside: true,
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                verticalFit: true,
                titleSrc: function() {
                    return $(this).attr('title') + ' &middot; <a class="image-source-link" href="' + $(this).attr('data-source')+'" target="_blank">image source</a>';
                }
            },
            zoom: {
                enabled: true
            }
        }).magnificPopup('open');
    });
}

function showImg( url ) {
    let frameid = 'frameimg' + Math.random();
    window.img = '<img id="img" width="100%" src=\''+url+'?'+Math.random()+'\' />' +'<script>window.onload = function() { parent.document.getElementById('+'"'+frameid+'"'+').height = document.getElementById("img").height; }'+'</script>';

    return '<iframe width="100%" id="'+frameid+'" src="javascript:parent.img;" frameBorder="0" scrolling="no" ></iframe>';
}

window.addEventListener("scroll", function(e) {
    load(images);
}, false);

function isOnHorizontalViewPort(ele) {
    let rect = ele.getBoundingClientRect();
    return rect.left > 0 && rect.left <= _viewPortWidth;
}

function isOnVerticalViewPort(ele) {
    let rect = ele.getBoundingClientRect(); // 获取距离视窗的位置信息
    return rect.top > 0 && rect.top <= _viewPortHeight;
}

function load(images) {
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        if (isOnVerticalViewPort(img) && isOnHorizontalViewPort(img) && !img.isload) {
            var url = img.getAttribute('src'); // 获取图片资源的地址
            img.setAttribute("src", url);
            img.isload = true; // 加载过后的图片设置加载标记，以免重复加载
        }
    }
}

$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    if (scrollTop + windowHeight == scrollHeight) {
        getList();
    }
});