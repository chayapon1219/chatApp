<?php
//print_r($_POST);
//print_r($_GET);
//print_r($_REQUEST);

$host = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "angularchat";
$objConnect = mysqli_connect($host,$username,$password,$dbname);
session_start();


$login_name = $_SESSION['name'];
$arr = array();

//WHERE name = '$login_name'

$sql = mysqli_query($objConnect,"SELECT * FROM user WHERE User_id = '".$_SESSION['ID']."'");
while($objResult = mysqli_fetch_array($sql))
{
	/*
	echo "<br/>";
	echo $objResult["user_id"] ;
	echo $objResult["username"];
	echo $objResult["password"];
	echo $objResult["name"];
	*/
	 $arr[] = $objResult;
}

echo $json_response = json_encode($arr);
mysqli_close($objConnect);
	

//echo $usernamed;
//echo $passwordd;
//echo $name;


?>
