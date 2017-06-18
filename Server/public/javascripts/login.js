

$(function () {
    $("#form-login").validate({
        submitHandler: function () {
            $.post("/users/login",
                {
                    email : $("#login-email").val(),
                    password:$.md5($("#login-password").val())
                },
                function(result) {
                    let validator = $( "#form-login" ).validate();
                    switch (result.code) {
                        case 0:
                            console.log("server error");
                            break;
                        case 1:
                            validator.showErrors({
                                "email": "该邮箱未注册"
                            });
                            break;
                        case 2:
                            validator.showErrors({
                                "password": "密码错误"
                            });
                            break;
                        case 3:
                            alert("登陆成功");
                            $("#form-login")[0].reset();
                            $("#form-register")[0].reset();
                            $('.form-group').removeClass('has-success');
                            $('.form-group').removeClass('has-error');
                            $('.user-name').text(result.name);
                            $('.user-email').text("邮箱："+result.email);
                            $('#myModal').modal('hide');
                            $('#btn-login').hide();
                            break;
                        default:
                            console.log("+_!");
                    }
                }
            )
        },
        errorElement : 'span',
        errorClass : 'help-block',
        focusInvalid : true,
        messages: {
            email: {
                required: "请输入邮箱",
                email: "邮箱格式不正确"
            },
            password: {
                required: "请输入密码",
                minlength: "密码不能小于{0}个字符"
            }
        },

        highlight : function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },

        success : function(label) {
            // var el=label.closest('.form-group').find("input");
            // el.next().remove();
            // el.after('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
            label.closest('.form-group').removeClass('has-error').addClass("has-feedback has-success");
            label.remove();
        },

        errorPlacement : function(error, element) {
            // var el=element.closest('.form-group').find("input");
            // el.next().remove();
            // el.after('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
            element.parent('div').append(error);
        }
    })
});
$("#btn-logout").click(function () {
    $.get("/users/logout",function (result) {
        if (result.code == 4)
        {
            alert("注销成功");
            $('.user-name').text("访客");
            $('.user-email').text("邮箱：huaji@huaji.com");
            $('#btn-login').show();
        }
    });
});
