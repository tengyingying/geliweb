//渲染
;
! function($) {
    const list = $('.main_list .list_box');
    $.ajax({
        url: 'http://192.168.11.65/h5/umyjs/taobaoitem_test/php/list.php',
        dataType: 'json'
    }).done(function(data) {
        console.log(data);
        let strhtml = '';
        $.each(data, function(index, value) {
            strhtml += `
            <a href="detail.html">
        <div>
        <em><img src="${value.url}"></em>
          <p>${value.title}</p>
          <span>格力董明珠店</span>
        <b>￥${value.price}</b><strong>包邮</strong>
           <em>已有<i>2631</i>人购买</em>
        </div>
        </a>
        `;
        });
        list.html(strhtml);
    });
}(jQuery);