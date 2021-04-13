<?php
include_once("./_common.php");

$language = $_POST['language'];
$text = $_POST['text'];

if(!$language)
	jsonResult(false, "language가 누락되었습니다.");

if(!$text)
	jsonResult(false, "text가 누락되었습니다.");

switch($language) {
case "c++":
	file_put_contents("./src/main.cpp", $text);

	exec("gcc -o ./bin/main.exe ./src/main.cpp -lstdc++ 2>&1", $responses, $return);

	if($return > 0) {
		$errorMessage = "";
		foreach($responses as $response) {
			$errorMessage .= iconv("EUC-KR", "UTF-8", $response) . PHP_EOL;
		}
		jsonResult(false, $errorMessage);
	} else {
		jsonResult(true);
	}

case "python":
case "pypy3":
	file_put_contents("./src/main.py", $text);
	jsonResult(true);

case "nodejs":
	file_put_contents("./src/main.js", $text);
	jsonResult(true);

default:
	jsonResult(false, "지원하지 않는 언어입니다.");
}