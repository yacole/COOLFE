<?php

$time = time();
// 从浏览器直接输出
header("Pragma: public");
header("Expires: 0");
header("Cache-Control:must-revalidate, post-check=0, pre-check=0");
header("Content-Type:application/force-download");
header("Content-Type: application/vnd.ms-excel;");
header("Content-Type:application/octet-stream");
header("Content-Type:application/download");
header("Content-Disposition:attachment;filename=\"grid_$time.csv\"");
header("Content-Transfer-Encoding:binary");
$exportedData = mb_convert_encoding( $_POST['exp'],"gb2312", "UTF-8");
echo $exportedData;

?> 