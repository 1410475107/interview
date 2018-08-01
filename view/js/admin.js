window.onload = function () {
    addClass();
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