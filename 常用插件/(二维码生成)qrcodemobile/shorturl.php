<?php
	
	if($_POST['url']){
		$ch=curl_init();
		curl_setopt($ch,CURLOPT_URL,"http://dwz.cn/create.php");
		curl_setopt($ch,CURLOPT_POST,true);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		$data=array('url'=>$_POST['url']);
		curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
		$strRes=curl_exec($ch);
		curl_close($ch);
		$arrResponse=json_decode($strRes,true);
		if($arrResponse['status']==0)
		{
			/**错误处理*/
			echo iconv('UTF-8','GBK',$arrResponse['err_msg'])."\n";
		}
			// echo$arrResponse['tinyurl']."\n";

			$rst = array(
				"status" => 200,
				"url" => $arrResponse['tinyurl']
			);

			echo json_encode($rst);

	}else{
		echo '缺少URL参数';
	}

?>