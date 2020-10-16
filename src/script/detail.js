//渲染
;
! function($) {
    var sid = location.search.substring(1).split('=')[1];
    if (!sid) {
        sid = 1;
    }
    $.ajax({
        url: 'http://192.168.11.65/h5/umyjs/taobaoitem_test/php/getsid.php',

        data: {
            sid: sid
        },
        dataType: 'json'
    }).done(function(data) {
        console.log(data);
        $('#spic img').attr('src', data.url);
        $('.loadtitle').html(data.title);
        $('.loadpcp').html(data.price);



        $('#list ul').html(strhtml);
    });

    //小图切换
    $('#list ul').on('click', 'li', function() {
        //$(this):当前操作的li
        var $imgurl = $(this).find('img').attr('src');
        $smallpic.attr('src', $imgurl);
        $bpic.attr('src', $imgurl);
    });
    //左右箭头事件
    // var $num = 6; //列表显示的图片个数
    // $right.on('click', function() {
    //     var $lists = $('#list ul li');
    //     if ($lists.size() > $num) { //限制点击的条件
    //         $num++;
    //         $left.css('color', '#333');
    //         if ($lists.size() == $num) {
    //             $right.css('color', '#fff');
    //         }
    //         $('#list ul').animate({
    //             left: -($num - 6) * $lists.eq(0).outerWidth(true)
    //         });
    //     }
    // });
    // $left.on('click', function() {
    //     var $lists = $('#list ul li');
    //     if ($num > 6) { //限制点击的条件
    //         $num--;
    //         $right.css('color', '#333');
    //         if ($num <= 6) {
    //             $left.css('color', '#fff');
    //         }
    //         $('#list ul').animate({
    //             left: -($num - 6) * $lists.eq(0).outerWidth(true)
    //         });
    //     }
    // });
    //添加到购物车
    var arrsid = []; //编号。
    var arrnum = []; //数量。
    function getcookie() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(',');
            arrnum = $.cookie('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    }
    $('.p-btn a').on('click', function() {
        getcookie();

        if ($.inArray(sid, arrsid) != -1) {
            let index = $.inArray(sid, arrsid);
            let num = parseInt(arrnum[index]);
            arrnum[index] = num + parseInt($('#count').val());
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        } else {

            arrsid.push(sid);
            console.log(arrsid)
            $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
            arrnum.push($('#count').val());
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        }

    });
}(jQuery);

class Scale {
    constructor() {
        this.scale = document.querySelector('.wrap');
        this.spic = document.querySelector('#spic');
        this.sf = document.querySelector('#sf');
        this.bf = document.querySelector('#bf');
        this.bpic = document.querySelector('#bpic');
    }
    init() {
        this.scale.onmouseover = () => {
            this.sf.style.visibility = 'visible';
            this.bf.style.visibility = 'visible';
            this.spic.onmousemove = (ev) => {
                var ev = ev || window.event;
                let left = ev.clientX - this.scale.offsetLeft - this.sf.offsetWidth / 2;
                let top = ev.clientY - this.scale.offsetTop - this.sf.offsetHeight / 2;
                if (left <= 0) {
                    left = 0;
                } else if (left >= this.spic.offsetWidth - this.sf.offsetWidth) {
                    left = this.spic.offsetWidth - this.sf.offsetWidth;
                }

                if (top <= 0) {
                    top = 0;
                } else if (top >= this.spic.offsetHeight - this.sf.offsetHeight) {
                    top = this.spic.offsetHeight - this.sf.offsetHeight;
                }
                this.bili = this.bpic.offsetWidth / this.spic.offsetWidth;
                this.sf.style.left = left + 'px';
                this.sf.style.top = top + 'px';

                this.bpic.style.left = -this.bili * left + 'px';
                this.bpic.style.top = -this.bili * top + 'px';
            }
        }
        this.scale.onmouseout = () => {
            this.sf.style.visibility = 'hidden';
            this.bf.style.visibility = 'hidden';
        }
        this.sf.style.width = this.spic.offsetWidth * this.bf.offsetWidth / this.bpic.offsetWidth + 'px';
        this.sf.style.height = this.spic.offsetHeight * this.bf.offsetHeight / this.bpic.offsetHeight + 'px';
    }
}
new Scale().init();

function Fn(num) {
    this.num = num;
}

Fn.prototype.show = function() {
    return this.num;
}

let f1 = new Fn(200);
console.log(f1.show());
class Fn1 {
    constructor(num) {
        this.num = num;
    }
    show() {
        return this.num;
    }
}
let f2 = new Fn1(400);
console.log(f2.show());

console.log(typeof Fn);
console.log(typeof Fn1);