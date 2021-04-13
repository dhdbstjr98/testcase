<?php
//error_reporting( E_CORE_ERROR | E_CORE_WARNING | E_COMPILE_ERROR | E_ERROR | E_WARNING | E_PARSE | E_USER_ERROR | E_USER_WARNING );
error_reporting(0);
header("Access-Control-Allow-Origin: *");

function jsonResult($success, $data = null) {
	if($data === null)
		echo json_encode(array(
			"success" => $success
		), JSON_UNESCAPED_UNICODE);
	else
		echo json_encode(array(
			"success" => $success,
			"data" => $data
		), JSON_UNESCAPED_UNICODE);
	exit;
}

function getTime() {
	$time = explode(' ', microtime());
	return (float)$time[0] + (float)$time[1];
}

function fetchError() {
	$err = error_get_last();

	if($err !== null)
		jsonResult(false, $err['message']);
}

register_shutdown_function("fetchError");