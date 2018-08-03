window.onload = function () {
    reg();
    codeimg();
    login();
    //上传头像用的
    uploadheader();

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


function codeimg() {
    $('.codeimg').click(function(){
        $(this).attr('src', '/coderimg?' + new Date());
    });
}


//登录的处理
function login() {
    $('.login').click(function(){
        //各种检查

        //到服务器验证
        $.ajax({
            url:'/login',
            type:'POST',
            data:$('#loginform').serialize(),
            dataType:'JSON',
            success:function (result) {
                if(result.r == 'ok'){
                    window.location.href = '/user/';
                }
            }
        });
    });
}


function uploadheader() {
    $('.uploadheader').click(function(){
        $('#header').click();
    });
    //处理上传头像
    $('#header').change(function(){
        let formdata = new FormData();  //<form></form>
        formdata.append('editimages', $('#header')[0].files[0]);//input file  value=""
        $.ajax({
            url:'/upload',
            type:'POST',
            dataType:'JSON',
            data:formdata,
            cache:false,
            contentType:false,
            processData:false,
            success:function(data){
                console.log(data.data[0]);
                $('#myheader').attr('src', data.data[0]);
                // <input type="hidden" name="myheader" value="">
                $('input[name="myheader"]').val(data.data[0]);
            }
        });
    });

    //把头像数据保存到数据库
    $('.saveheader').click(function(){
        $.ajax({
            url:'/user/saveheader',
            type:'POST',
            dataType:'JSON',
            data:{header:$('input[name="myheader"]').val()},
            success:function (data) {
                console.log(data);
            }
        });
    });

    
}