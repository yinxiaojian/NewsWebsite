$(function () {
    $("#form-register").validate({
        submitHandler: function () {
            $.post("/users/register",
                {
                    name: $("#register-name").val(),
                    email : $("#register-email").val(),
                    password:$.md5($("#register-password").val())
                },
                function(result) {
                    let validator = $("#form-register").validate();
                    switch (result.code) {
                        case 0:
                            console.log("server error");
                            break;
                        case 1:
                            validator.showErrors({
                                "email": "该邮箱已注册"
                            });
                            break;
                        case 2:
                            validator.showErrors({
                                "name": "用户名已存在"
                            });
                            break;
                        case 3:
                            alert("注册成功");

                            $("#form-register")[0].reset();
                            $('.form-group').removeClass('has-success');

                            $("#control-register").removeClass("active");
                            $("#control-login").addClass("active");
                            $("#register").removeClass("active");
                            $("#login").addClass("active");
                            break;
                        default:
                            console.log("-_~");
                    }
                }
            )
        },
        errorElement : 'span',
        errorClass : 'help-block',
        focusInvalid : true,
        rules: {
            repassword: {
                equalTo: "#register-password"
            }
        },

        messages: {
            name: {
                required: "请输入用户名",
                minlength: "用户名不能小于{0}个字符"
            },
            email: {
                required: "请输入邮箱",
                email: "邮箱格式不正确"
            },
            password: {
                required: "请输入密码",
                minlength: "密码不能小于{0}个字符"
            },
            repassword: {
                required: "请再次输入密码",
                equalTo: "两次密码输入不同"
            }
        },

        highlight : function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },

        success : function(label) {
            // var el=label.closest('.form-group').find("input");
            // el.next().hide();
            // el.after('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
            label.closest('.form-group').removeClass('has-error').addClass("has-feedback has-success");
            label.remove();
        },

        errorPlacement : function(error, element) {
            // var el=element.closest('.form-group').find("input");
            // el.next().hide();
            // el.after('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
            element.parent('div').append(error);
        }
    })
});