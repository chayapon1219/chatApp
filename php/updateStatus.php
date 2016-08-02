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
$user_id = $request->username;
$pass_id = $request->password;

$strSQL = "UPDATE user SET onlineStatus='1' WHERE name = '".$_SESSION['name']."'";
$objQuery = mysqli_query($objConnect, $strSQL);
$objResult = mysqli_fetch_array($objQuery);

if($objResult){
		//$_SESSION['name'] = $objResult['name'];
		//echo $objResult['username'];		
		session_write_close();
		}
		else{
			//$_SESSION['name'] = "555";
		    //echo $_SESSION['name'];
			//echo "Username and Password Incorrect!";
			}


?>