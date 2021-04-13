<?php
include_once("./_common.php");

$language = $_POST['language'];
$input = $_POST['input'];
$time = (int)$_POST['time'];

if(!$language)
	jsonResult(false, "language가 누락되었습니다.");

if(!$input)
	$input = "";

if(!$time)
	jsonResult(false, "time이 누락되었습니다.");

set_time_limit($time);
$startedAt = getTime();

file_put_contents("./src/input.txt", $input);
$responses = array();

switch($language) {
case "c++":
	exec("bin\\main < src\\input.txt 2>&1", $responses);
	break;
case "python":
	exec("py ./src/main.py < src\\input.txt 2>&1", $responses);
	break;
case "pypy3":
	exec("pypy3 ./src/main.py < src\\input.txt 2>&1", $responses);
	break;
case "nodejs":
	exec("node ./src/main.js < src\\input.txt 2>&1", $responses);
	break;
default:
	jsonResult(false, "지원하지 않는 언어입니다.");
}

$result = "";
foreach($responses as $response) {
	$result .= iconv("EUC-KR", "UTF-8", $response) . PHP_EOL;
}

$endAt = getTime();

jsonResult(true, array("result"=>rtrim($result), "time"=>(int)(($endAt - $startedAt) * 1000)));