//渲染
;
! function($) {
    const list = $('.floorlist ul');
    $.ajax({
        url: 'http://192.168.11.65/h5/umyjs/taobaoitem_test/php/list.php',
        dataType: 'json'
    }).done(function(data) {
        console.log(data);
        let strhtml = '';
        $.each(data, function(index, value) {
            strhtml += `
            <a href="detail.html">
        <li>
        <em><img src="${value.url}"></em>
        
       
         <b>${value.title}</b>
          <p>${value.title}</p>
        <span>￥${value.price}</span>
           
        </li>
        </a>
        `;
        });
        list.html(strhtml);
    });
}(jQuery);


//楼梯
function scroll() {
    let top = $(window).scrollTop();
    top >= 1000 ? $('#leftBar').show() : $('#leftBar').hide();
    $('.floor1').each(function(index, element) {
        let loutop = $(this).offset().top;
        if (loutop >= top) {
            $('#leftBar li').removeClass('active');
            $('#leftBar li').eq($(this).index()).addClass('active');
            return false;
        }
    });
}
scroll();
$(window).on('scroll', function() {
    scroll();
});
$('#leftBar li').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    let loutop = $('.floor1').eq($(this).index()).offset().top;
    $('html').animate({
        scrollTop: loutop
    });
})

//轮播图
var curIndex = 0,
    imgLen = $(".imgList li").length; //图片总数
$(".imgList").css("width", (imgLen + 1) * 1920 + "px");
var autoChange = setInterval(function() {
    if (curIndex < imgLen - 1) {
        curIndex++;
    } else {
        curIndex = 0;
    }
    changeTo(curIndex);
}, 3000);

function autoChangeAgain() {
    autoChange = setInterval(function() {
        if (curIndex < imgLen - 1) {
            curIndex++;
        } else {
            curIndex = 0;
        }
        changeTo(curIndex);
    }, 3000);
}

function changeTo(num) {
    var goLeft = num * 1920;
    $(".imgList").animate({
        left: "-" + goLeft + "px"
    }, 500);
}



// require(['config'], function() {
//     require(['jquery'], ['jq_lazyload'], function() {
//         ! function() {

//         }(jQuery)
//     })
// })