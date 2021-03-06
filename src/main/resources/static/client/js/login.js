
define(['common'],function(common){
	var isAccountValidate=false;
	var isPasswordValidate=false;
	//1.失去光标时验证用户名
	function accountCheck(){
		$("#username").blur(function(){
			isAccountValidate= checkAccount();
		});
	}
	//2.失去光标时验证密码
	function pwdCheck(){
		$("#password").blur(function(){
			isPasswordValidate= checkPwd();
		});
	}
	//登录
	function loginBtn(){
		//创建单击事件
		$("#login_btn").click(function(){
			console.log("hello");
			//判断验证信息
			//失败返回信息
			if(!isAccountValidate){
				checkAccount();
			}
			
			if(!isPasswordValidate){
				checkPwd();
			}
			//成功进入接口登录
			console.log("下面进入ajax");
			$.ajax({
				url:baseUrl+"user/do_login",
				type:"post",
				data:{account:$("#username").val(),password:$("#password").val()},
				xhrFields: {withCredentials: true},
		       	crossDomain: true,
				success:function(data){
					//判断是否登陆成功
					if(data.status==0){
						//成功判断是否是管理员
						var path;
						if(data.data.role ==1){
							$(window).attr("location","http://127.0.0.1:8080/admin/home");
						}else{
							$(window).attr("location","http://127.0.0.1:8080/home");
						}

					}else{
						console.log("登陆失败!");
						$("#passwordError").css({display:"block"});
						$("#passwordError").html(data.msg);
					}
				}
			});
		});		
	}


	return {
		accountCheck:accountCheck,
		pwdCheck:pwdCheck,
		loginBtn:loginBtn
	};

	//检查用户名
	function checkAccount(){
		//获取用户名
		var account = $("#username").val();
		$("#usernameError").css({display:"none"});
		if(account == ""){
			$("#usernameError").css({display:"block"});
			$("#usernameError").html("用户名不能为空！");
			return false;
		}
		return true;
	}
	//检查密码
	function checkPwd(){
		//获取输入密码
		var pwd = $("#username").val();
		$("#passwordError").css({display:"none"});
		if(pwd == ""){
			$("#passwordError").css({display:"block"});
			$("#passwordError").html("密码不能为空！");
			return false;
		}
		return true;
	}

});
