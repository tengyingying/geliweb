! function($) {
    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        let sid = $.cookie('cookiesid').split(',');
        let num = $.cookie('cookienum').split(',');
        for (let i = 0; i < sid.length; i++) {
            rendercart(sid[i], num[i])
        }
    }

    function rendercart(sid, num) { //sid：编号  num：数量

        $.ajax({
            url: 'http://192.168.11.65/h5/umyjs/taobaoitem_test/php/listdata.php',
            dataType: 'json'
        }).done(function(data) {
            console.log(data);
            $.each(data, function(index, value) {
                if (sid == value.sid) {
                    let strhtml = '';
                    strhtml += `
                    <div class="goods-item goods-item-sele">
                        <div class="dong"><input type="checkbox" checked="">&nbsp;&nbsp;董明珠格力店</div>
                        <div class="goods-info">
                        <div class="dange">
                            <div class="cell b-checkbox">
                                <div class="cart-checkbox">
                                    <input type="checkbox" checked="" name="" id="" value="" />
                                    <span class="line-circle"></span>
                                </div>
                            </div>
                            <div class="cell b-goods">
                                <div class="goods-name">
                                    <div class="goods-pic">
                                        <a href=""><img src="${value.url}" alt="" /></a>
                                    </div>
                                    <div class="goods-msg">
                                        <div class="goods-d-info">
                                            <a href="">${value.title}</a>
                                        </div>
                                        <div class="goods-ex">
                                            <span class="promise"></span>
                                            <span class="promise">
                                                        <i></i><a href="">颜色：浮光金</a>
                                                    </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
                            <div class="cell b-price">
                                <strong>${value.price}</strong>
                            </div>
                        
                        <div class="cell b-quantity">
                            <div class="quantity-form">
                                <a class="quantity-down" href="javascript:void(0)">-</a>
                                <input class="input-btn" type="text" value="${num}" />
                                <a class="quantity-add" href="javascript:void(0)">+</a>
                            </div>
                        </div>
                        <div class="cell b-sum">
                            <strong>${(value.price*num).toFixed(2)}</strong>
                        </div>
                        <div class="cell b-action">
                            <a href="javascript:void(0)">删除</a>
                        </div>
                    </div>
                    </div>
            </div>
        `;
                    $('.item-list').append(strhtml);

                    calc(); //计算总价
                }
            });

        });
    }

    //3.计算总价
    function calc() {
        var allprice = 0; //总价
        var allcount = 0; //件数
        $('.goods-item').each(function(index, element) {
            if ($(this).find('.cart-checkbox input').prop('checked')) {
                allcount += parseInt($(this).find('.input-btn').val());
                allprice = parseFloat($(this).find('.b-price strong').html()) * allcount;
            }
        });
        $('.b-sum strong').html(allprice.toFixed(2));
        $('.totalprice').html(allprice.toFixed(2));
        $('.amount-sum em').html(allcount);

    }


    //4.全选
    $('.allsel').on('change', function() {
        $('.goods-item:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.allsel').prop('checked', $(this).prop('checked'));
        calc(); //计算总价
    });
    var $inputs = $('.goods-item:visible').find(':checkbox');
    $('.item-list').on('change', $inputs, function() {
        //$(this):被委托的元素，checkbox
        if ($('.goods-item:visible').find(':checkbox').length === $('.goods-item:visible').find('input:checked').size()) {
            $('.allsel').prop('checked', true);
        } else {
            $('.allsel').prop('checked', false);
        }
        calc(); //计算总价
    });

    // 加减号改变件数
    $('.item-list').on('click', '.quantity-add', function() {
        var num = $(this).siblings('input').val();
        num++;

        $(this).siblings('input').val(num);

        calc();
        console.log(calc());
    });
    $('.item-list').on('click', '.quantity-down', function() {

        var num = $(this).siblings('input').val();
        if (num > 1) {
            num--;
        }

        $(this).siblings('input').val(num);

        calc();
    });
    // input数量变更
    $('.input-btn').on('input', function() {
        var $reg = /^\d+$/g; //只能输入数字
        var $value = $(this).val();
        if (!$reg.test($value)) { //不是数字
            $(this).val(1);
        }
        $(this).siblings('.b-sum strong').val();
        // $(this).$('.b-sum strong').html(calc($(this)));
        calc(); //计算总价

    });


    // $('.quantity-form input').on('input', function() {

    //     var $reg = /^\d+$/g; //只能输入数字
    //     var $value = $(this).val();
    //     if (!$reg.test($value)) { //不是数字
    //         $(this).val(1);
    //     }
    //     $(this).$('.b-sum strong').html(calc($(this)));
    //     calc(); //计算总价

    // });

    // //计算单价
    // function calc(obj) { //obj元素对象
    //     var $dj = parseFloat(obj.parents('.goods-item').find('.b-price strong').html());
    //     var $num = parseInt(obj.parents('.goods-item').find('.quantity-form input').val());
    //     return ($dj * $num).toFixed(2)
    // }


    // //将改变后的数量存放到cookie中
    // var arrsid = []; //存储商品的编号。
    // var arrnum = []; //存储商品的数量。
    // function cookietoarray() {
    //     if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
    //         arrsid = $.cookie.get('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
    //         arrnum = $.cookie.get('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
    //     } else {
    //         arrsid = [];
    //         arrnum = [];
    //     }
    // }

    // function setcookie(obj) {
    //     cookietoarray();
    //     var $sid = obj.parents('.goods-item').find('img').attr('sid');
    //     arrnum[$.inArray($sid, arrsid)] = obj.parents('.goods-item').find('.quantity-form input').val();
    //     jscookie.add('cookienum', arrnum, 10);
    // }


    // //6.删除
    // function delcookie(sid, arrsid) { //sid:当前删除的sid  arrsid:存放sid的数组[3,5,6,7]
    //     var $index = -1; //删除的索引位置
    //     $.each(arrsid, function(index, value) {
    //         if (sid === value) {
    //             $index = index;
    //         }
    //     });
    //     arrsid.splice($index, 1);
    //     arrnum.splice($index, 1);

    //     jscookie.add('cookiesid', arrsid, 10);
    //     jscookie.add('cookienum', arrnum, 10);
    // }
    // $('.b-action a').on('click', function() {
    //     cookietoarray();
    //     if (window.confirm('你确定要删除吗?')) {
    //         $(this).parents('.goods-item').remove();
    //         delcookie($(this).parents('.goods-item').find('img').attr('sid'), arrsid);
    //         calc(); //计算总价
    //     }
    // });

    // $('.operation a').on('click', function() {
    //     cookietoarray();
    //     if (window.confirm('你确定要全部删除吗?')) {
    //         $('.goods-item:visible').each(function() {
    //             if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
    //                 $(this).remove();
    //                 delcookie($(this).find('img').attr('sid'), arrsid);
    //             }
    //         });
    //         calc(); //计算总价
    //     }
    // });
}(jQuery);