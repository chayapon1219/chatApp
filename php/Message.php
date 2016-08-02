<?php
//print_r($_POST);
//print_r($_GET);
//print_r($_REQUEST);

$host = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "angularchat";
$objConnect = mysqli_connect($host,$username,$password,$dbname);


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$message_text = $request->message;

session_start();
$addmsgSQL = "INSERT INTO `message`(`Message_id`, `Message_text`, `Message_time`, `User_id`) VALUES ('','".$message_text."',CURRENT_TIMESTAMP,'".$_SESSION['ID']."')";
$objQuery = mysqli_query($objConnect, $addmsgSQL);

mysqli_close($objConnect);
	

//echo $usernamed;
//echo $passwordd;
//echo $name;


?>
