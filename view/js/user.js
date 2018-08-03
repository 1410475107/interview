window.onload = function () {
    reg();
}


function reg() {
    $('.regbtn').click(function(){
        //各种验证

        //把数据提交到服务器
        $.ajax({
            url:'/reg',
            type:'post',
            dataType:'JSON',
            data:$('#regform').serialize(),
            success:function (result) {
                if(result.r == 'success'){
                    window.location.href = '/login';
                }else if(result.r == 'username_existed'){
                    $('#username').next('span').html('该账号已存在，请重新注册');
                }else{
                    alert('出错了，请重新注册!');
                }
            }
        });
    });
}