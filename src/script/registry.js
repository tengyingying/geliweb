! function($) {
    const btns = $('button');
    const items = $('.item');
    btns.on('click', function() {
        $(this).addClass('active').siblings('button').removeClass('active');
        items.eq($(this).index()).show().siblings('.item').hide();
    });

}(jQuery);