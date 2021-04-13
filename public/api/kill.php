<?php
include_once("./_common.php");

$language = $_POST['language'];

if(!$language)
	jsonResult(false, "language가 누락되었습니다.");

$taskNames = array(
	"c++" => "main.exe",
	"python" => "Python.exe",
	"pypy3" => "pypy3.exe",
	"javascript" => "node.exe",
);

if(!$taskNames[$language])
	jsonResult(false, "지원하지 않는 언어입니다.");

exec("taskkill /im {$taskNames[$language]} /F 2>&1");
jsonResult(true);