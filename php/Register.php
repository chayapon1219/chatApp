<?php
	include('config.php');
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$usernamed = $request->username;
	$passwordd = $request->password;
	$name = $request->name;
	$url = $request->url;


	//
	$flag = "1";
	$strSQLselect = "SELECT username FROM user";
	$objQueryselect = mysqli_query($objConnect, $strSQLselect);	
	while($objResult = mysqli_fetch_array($objQueryselect)) {				
		if($usernamed == $objResult['username']) {
			$flag = "0";
		}};

	$arr = array();

	if($flag == "0" ) { 
		echo "Username already have";
	}
	else {
		$passwordd = md5($passwordd);
		$sql = mysqli_query($objConnect,"INSERT INTO user VALUES ('','$usernamed','$passwordd','$name','$url','0')");
		if($sql) echo "Register Success!";
	}

	mysqli_close($objConnect);
?>	