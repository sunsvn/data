<?php

	//填写微信公众号的appid和appsecret
	//要求：网页所在域名必须要在该对应公众号的安全域名中
	$options = array(
		'appid'=>'wx394822fd107b5e95', 
		'appsecret'=>'628765b7e834ebc198d8f5ddf1ec992d' 
	);

	require 'wxshare.classs.php';

	if(isset($_GET['url']) && $_GET['url']){
		//获取传入的请求地址
		$url = $_GET['url'];

		$jssdk = new JSSDK($options, $url);

		$signPackage = $jssdk->getSignPackage();

		$data = json_encode(
			array(
				'appId'=>$signPackage["appId"],
				'timestamp'=>$signPackage["timestamp"],
				'nonceStr'=>$signPackage["nonceStr"],
				'signature'=>$signPackage["signature"],
				'url'=>$signPackage["url"]
			)
		);

		// var_dump($signPackage);exit;

		$callback = $_GET['callback'];
		// echo json_encode($data);
		echo $callback.'('.$data.')';
		exit;

	}




	