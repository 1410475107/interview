window.onload = function () {
    addClass();
    updateClass();
    delClass();

    //添加试题
    addQuestion();
    //试题分类查询
    classQuestion();
    //修改试题
    updateQuestion();
}

function addClass() {
    $('.saveclass').click(function () {
        if (!$('#qcname').val()) {
            $('#qcname').focus();
            return;
        }

        //直接把数据提交到服务器
        $.ajax({
            url: './addclasssubmit',
            type: 'POST',
            data: {
                qcname: $('#qcname').val()
            },
            dataType: 'JSON',
            success: function (data) {
                if (data.r == 'ok') {
                    window.location.href = '/admin/qclass/';
                }
            }
        });
    });

}
function delClass() {
    $('.delc').click(function () {
        if(!confirm('是否确认删除？')){
            return ;
        }
        //删除 对应 的信息  ： 通过主键来对应
        let $qcid = $(this).attr('qcid');
        let This = this;
        $.ajax({
            url:'/admin/qclass/del',
            type:'POST',
            data:{qcid:$qcid},
            dataType:'JSON',
            success:function(result){
                console.log(result);
                if(result.r == 'ok'){
                    $(This).parent().parent().remove();
                }
            }
        });

    });
}
function updateClass() {
    $('.updateclass').click(function () {
        if (!$('#qcname').val()) {
            $('#qcname').focus();
            return;
        }

        //直接把数据提交到服务器
        $.ajax({
            url: '/admin/qclass/updatesubmit',
            type: 'POST',
            data: {
                qcid:$('#qcid').val(),
                qcname: $('#qcname').val()
            },
            dataType: 'JSON',
            success: function (data) {
                if (data.r == 'ok') {
                    window.location.href = '/admin/qclass/';
                }
            }
        });
    });

}


//添加试题
function addQuestion() {
    $('.savequestion').click(function () {
        //各种检查

        //直接把数据提交到服务器
        $.ajax({
            url: './addquestionsubmit',
            type: 'POST',
            data: $('#addquestion').serialize(),
            dataType: 'JSON',
            success: function (data) {
                if (data.r == 'ok') {
                    window.location.href = '/admin/question/';
                }
            }
        });
    });

}

//根据分类筛选试题
function classQuestion() {
    $('.csearch').change(function () {
        window.location.href = '/admin/question?qcid=' + $(this).val();
    });
}


//修改试题
function updateQuestion() {
    $('.updatequestion').click(function () {
        //各种检查

        //直接把数据提交到服务器
        $.ajax({
            url: './updatequestionsubmit',
            type: 'POST',
            data: $('#updatequestion').serialize(),
            dataType: 'JSON',
            success: function (data) {
                if (data.r == 'ok') {
                    window.location.href = '/admin/question/';
                }
            }
        });
    });

}