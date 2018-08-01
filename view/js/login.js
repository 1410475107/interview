window.onload = function () {
    login();
}


function login() {
    $('.login').click(function () {
        $('.form-group').removeClass('has-error');
        //各种验证自己写
        let reg_usernaem = /^[\w\u4e00-\u9fa5]{2,12}$/i;
        if(!reg_usernaem.test($('#username').val())){
            $('#username').focus();
            $('#username').parent().addClass('has-error');
            return ;
        }

        if($('#passwd').val().length < 6 || $('#passwd').val().length > 16){
            $('#passwd').focus();
            $('#passwd').parent().addClass('has-error');
            return ;
        }
        //如果没有错误，进行数据提交
        $.ajax({
            url: './login',
            type: 'POST',
            dataType: 'JSON',
            data: $('#loginform').serialize(),
            success: function (result) {
                //TODO：各种提示验证没有写
                //如果登录成功，进行跳转
                if (result.r == 'ok') {
                    window.location.href = '/admin/qclass';
                }
            }
        });
    });
}