<?php
	//填写微信公众号的appid和appsecret
	//要求：网页所在域名必须要在该对应公众号的“授权获取用户信息”域名中
	$options = array(
		'appid'=>'wx394822fd107b5e95', 
		'appsecret'=>'628765b7e834ebc198d8f5ddf1ec992d' 
	);


	//引入微信操作类
	require 'wxlogin.class.php';

	//实例化微信操作类
	$webchat = new Wechat($options);

	//判断请求类型
	if(isset($_GET['type'])){
		//如果前台传type=login，表示要使用微信登录
		if($_GET['type'] == 'login'){
			$clientRedirectUri = $_GET['backUrl'] ? $_GET['backUrl'] : $_SERVER['HTTP_HOST'];
			$codeRedirectUrl = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
			//拉起微信登录页面
			$getAuthUrl = $webchat->getOauthRedirect($codeRedirectUrl, $clientRedirectUri);
			header('Location: ' . $getAuthUrl);
		}
	}

	//获取微信access_token
	$access_tokenArr = $webchat->getOauthAccessToken();
	if($access_tokenArr){
		$selfUrl = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
		$clientRedirectUri = $_GET['state'] ? $_GET['state'] : $selfUrl;
		$access_token = $access_tokenArr['access_token'];
		$refresh_token = $access_tokenArr['refresh_token'];
		$openid = $access_tokenArr['openid'];
    	if(in_array('unionid', $access_tokenArr)){
    		$unionid = $access_tokenArr['unionid'];
		}

		//获取用户信息
		$userinfo = $webchat->getOauthUserinfo($access_token, $openid);
		if($userinfo){
			//将用户信息存储到cookie中，跳转回原网页
			setcookie('open_id', $userinfo['openid']);
			setcookie('nickname', $userinfo['nickname']);
			setcookie('sex', $userinfo['sex']);
			setcookie('headimgurl', $userinfo['headimgurl']);
			setcookie('unionid', $userinfo['unionid']);
			//将openid拼接到回调地址中，使原网页可以据此作判断
			echo "<script>";
			echo "window.location.href='" . $clientRedirectUri. "?openid=" . $userinfo['openid'] . "'";
			echo "</script>";
		}
	}