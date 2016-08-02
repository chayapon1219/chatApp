<?php
//print_r($_POST);
//print_r($_GET);
//print_r($_REQUEST);


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$usernamed = $request->username;
$passwordd = $request->password;
$name = $request->name;


$host = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "angularchat";
$objConnect = mysqli_connect($host,$username,$password,$dbname);


if($objConnect)
{
	echo "MySQL Connected";
}
else
{
	echo "MySQL Connect Failed";
}

$sql = mysqli_query($objConnect,'SELECT * FROM user');
while($objResult = mysqli_fetch_array($sql))
{
	echo $objResult["user_id"];
	echo $objResult["username"];
	echo $objResult["password"];
	echo $objResult["name"];
}


//INSERT INTO Database 
mysqli_query($objConnect,"INSERT INTO user VALUES (7,'$usernamed','$passwordd','$name')");

mysqli_close($objConnect);
	

//echo $usernamed;
//echo $passwordd;
//echo $name;


?>
