<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	ini_set('memory_limit', '-1');
	error_reporting(E_ALL);
	header('Content-Encoding: gzip');
	$file = $_REQUEST['file'];
	$result = file_get_contents($file);
	//$array = json_decode($result, true);
	//echo json_encode($array);
	echo gzencode(json_encode($result));
?>
