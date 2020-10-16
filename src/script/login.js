! function($) {
    $('.button').on('click', function() {
        $.ajax({
            type: 'post',
            url: 'http://192.168.11.65/h5/umyjs/taobaoitem_test/php/login.php',
            data: {
                user: $('.input').val(),
                pass: hex_sha1($('.password').val())
            }
        }).done(function(result) {
            if (result) {
                location.href = "index1.html";
                localStorage.setItem('username', $('.input').val());
            } else {
                $('.password').val('');
                alert('用户名或者密码错误');
            }
        });
    });
}(jQuery);