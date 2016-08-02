<?php
$host = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "angularchat";
$objConnect = mysqli_connect($host,$username,$password,$dbname);

/*
if($objConnect)
{
	//echo "MySQL Connected";
	}
else
{
	//echo "MySQL Connect Failed";
}
*/

session_start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$usernamed = $request->username;
$passwordd = $request->password;
$name = $request->name;
$url = $request->url;

$_SESSION['name'] = $name;
$strSQL = "UPDATE user SET username='$usernamed', password='$passwordd', image='$url', name='$name' WHERE User_id = '".$_SESSION['ID']."' ";
$objQuery = mysqli_query($objConnect, $strSQL);
$objResult = mysqli_fetch_array($objQuery);

if($objQuery){
		echo 'SUCCESS !!';		
		session_write_close();
		}
		else{
			//$_SESSION['name'] = "555";
		    //echo $_SESSION['name'];
			//echo "Username and Password Incorrect!";
			}


?>