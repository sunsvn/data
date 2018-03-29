<?php
	
	// var_dump($_POST)

	define('UPLOAD_DIR', 'save/');

	$imgData = $_POST['data'];

	$data = base64_decode($imgData);

	$file = UPLOAD_DIR . uniqid() . '.png';
	$success = file_put_contents($file, $data);

	print $success ? $file : '无法保存';

?>