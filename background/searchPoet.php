<?php
include "searchPoetClass.php";
// isset
$type = $_GET["type"];
switch ($type) {
case "0":
	$getAllPinyins = new getAllPinyins();
	echo json_encode($getAllPinyins->getDatas());
	break;
case "1":
	$getAllBihuas = new getAllBihuas();
	echo json_encode($getAllBihuas->getBihuas());
	break;
case "2":
	$pinyin = $_GET["value"];
	$searchSurnameByPinyin = new searchSurnameByPinyin($pinyin);
	echo json_encode($searchSurnameByPinyin->getsurnames());
	break;
case "3":
	$bihua = $_GET["value"];
	$searchSurnameByBihua = new searchSurnameByBihua($bihua);
	echo json_encode($searchSurnameByBihua->getsurnames());
	break;
case "4":
	$surname = $_GET["value"];
	$searchNameBySurname = new searchNameBySurname($surname);
	echo json_encode($searchNameBySurname->getDatas());
	break;
case "5":
	$poet_id = $_GET["value"];
	$searchPoet = new searchPoet($poet_id);
	//$searchPoet->printPoetData();
	echo json_encode($searchPoet->getObj());
	break;
case "id":
	$get_poet_id = $_GET["value"];
	
default:
	break;
}

