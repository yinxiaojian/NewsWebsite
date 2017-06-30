$(function(){
    tableInitial();
});

function isSuccess(status) {
    return status === "success"
}

function tableInitial() {
    $('#custom-form-check input').iCheck({
        checkboxClass: 'icheckbox_flat-green'
    });
    $('#custom-form-radio input').iCheck({
        radioClass: 'iradio_flat-red'
    });
    $.get('/users/session', function (result, status) {
        if( isSuccess(status) ){
            if(result.code == 9)
            {
                $("#box-col").hide();
                $("#box-skin").hide();
                $("#callout-custom").html('<h4>未登录无法进行个性化设置</h4>')
                $("#custom-save").attr('disabled',"true")
            }
            else
            {
                for(let i = 0; i<result.col.length; i++)
                {

                    if(result.col.charAt(i)=='1') {
                        let id = "#inlinecheckbox" + (i+1).toString();
                        console.log(id);
                        $(id).iCheck('check');
                    }
                }
                let id = "#inlineRadio-"+result.skin;
                $(id).iCheck('check');
            }
        }else{
            console.log('status = ' + status)
        }
    })
}

$("#custom-save").click(function () {
    let skin = $('#custom-form-radio input:radio:checked').val();
    var _col = ['0','0','0','0','0','0','0','0'];
    $('#custom-form-check input:checkbox:checked').each(function (i) {
        console.log($(this).val());
        _col[$(this).val()-1] = '1';

    });
    col="";
    for(let i=0;i<8;i++)
        col+=_col[i];

    $.post('/users/custom',
        {
            skin : skin,
            col: col
        },
        function (result, status) {
            if( isSuccess(status) ){
                if(result.code == 7)
                    window.location.reload();
            } else {
                console.log('status = ' + status)
            }
        }
    );
});
