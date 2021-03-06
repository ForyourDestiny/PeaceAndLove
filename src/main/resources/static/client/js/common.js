var baseUrl="http://127.0.0.1:8080/";
define(function(){
	//获取url中的参数
	function getParam(name){
		//构造一个含有目标参数的正则表达式对象
		var reg = new RegExp("(^|&)"+ name+"=([^&]*)(&|$)");
		//匹配目标参数
		var r = window.location.search.substr(1).match(reg);
		//返回参数值
		if(r !=null) return decodeURI(r[2]);return null;
	}
	//加载登录用户信息
	
	function getUserInfo(){
		//向服务器请求数据
		$.ajax({
			url:baseUrl+"user/getuserinfo",
			xhrFields:{withCredentials:true},
			crossDomain:true,
			success:function(user){
				//判断是否成功
				if(user.status==0){
					//隐藏登录时span标签
					$("#register_info").css({display:"none"});
					//显示登陆后span标签
					$("#login_info").css({display:"block"});
					//将用户名添加
					$("#headerUsername").html(user.data.account);
				}
			}
		});
	}

	//用户登出
	function loginOut(){
		//给退出按钮挂上单击事件
		$("#headerLogout").click(function(){
			//向服务器请求数据
			$.ajax({
				url:baseUrl+"user/do_logout",
				xhrFields:{withCredentials:true},
				crossDomain:true,
				success:function(rs){
					 if(rs.status==0){
						//显示登录时span标签
						$("#register_info").css({display:"block"});
						//隐藏登陆后span标签
						$("#login_info").css({display:"none"});
					 }
				}
			});
		});
	}
	return{
		getParam:getParam,
		getUserInfo:getUserInfo,
		loginOut:loginOut		
	};
});