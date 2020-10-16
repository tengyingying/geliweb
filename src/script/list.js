//渲染
;
! function($) {
    var array_default = [];
    var array = [];
    var prev = null;
    var next = null;
    const list = $('.main_list .list_box');
    $.ajax({
        url: 'http://192.168.11.65/h5/umyjs/taobaoitem_test/php/listdata.php',
        dataType: 'json'
    }).done(function(data) {
        console.log(data);
        var strhtml = '';
        $.each(data, function(index, value) {
            strhtml += `
           
        <li>
        <a href="detail.html?sid=${value.sid}">
        <em><img class="lazy" data-original="${value.url}"></em>
          <p>${value.title}</p>
          <span class="geli">格力董明珠店</span>
         <b class="jiage">￥${value.price}</b><strong>包邮</strong>
           <span class="span">已有<i>2631</i>人购买</span>
           <span class="car">加入购物车</span>
           </a>
        </li>
       
        `;
        });
        list.html(strhtml);
        //懒加载
        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
        $('.main_list .list_box li').each(function(index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });
    //分页
    $('.page').pagination({
        pageCount: 3,
        jump: true,
        prevContent: '上一页',
        nextContent: '下一页',
        callback: function(api) {
            console.log(api.getCurrent());
            $.ajax({
                url: 'http://192.168.11.65/h5/umyjs/taobaoitem_test/php/listdata.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function(data) {
                var strhtml = '';
                $.each(data, function(index, value) {
                    strhtml += `
            
        <li href="detail.html">
        <a href="detail.html?sid=${value.sid}">
        <em><img class="lazy" data-original="${value.url}"></em>
          <p>${value.title}</p>
          <span class="geli">格力董明珠店</span>
         <b class="jiage">￥${value.price}</b><strong>包邮</strong>
           <span class="span">已有<i>2631</i>人购买</span>
           <span class="car">加入购物车</span>
           </a>
        </li>
      
                    `;
                });
                list.html(strhtml);
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
                $('.list_box li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            })
        }
    });
    //3.排序
    // 默认排序
    $('.paixu').eq(0).on('click', function() {
        $.each(array_default, function(index, value) {
            $('.main_list .list_box').append(value);
        });
        return;
    });
    // 价格升序
    $('.paixu').eq(1).on('click', function() {
        for (var i = 0; i < array.length - 1; i++) {
            for (var j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.jiage').html().substring(1));
                next = parseFloat(array[j + 1].find('.jiage').html().substring(1));
                if (prev > next) {
                    var temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }

        $.each(array, function(index, value) {
            $('.main_list .list_box').append(value);
        });
        return;
    });
    //价格降序
    $('.paixu').eq(2).on('click', function() {
        for (var i = 0; i < array.length - 1; i++) {
            for (var j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.jiage').html().substring(1));
                next = parseFloat(array[j + 1].find('.jiage').html().substring(1));
                if (prev < next) {
                    var temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }

        $.each(array, function(index, value) {
            $('.main_list .list_box').append(value);
        });
        return;
    });
}(jQuery);