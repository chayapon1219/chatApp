<?php
	include('config.php');
	include('postUserDetail.php');

	$strSQL = "SELECT * FROM user WHERE username = '".$user_id."'and password = '".$pass_id."'";
	$objQuery = mysqli_query($objConnect, $strSQL);
	$objResult = mysqli_fetch_array($objQuery);

	if($objResult) {
		$_SESSION['name'] = $objResult['name'];
		$_SESSION['ID'] = $objResult['User_id'];
		echo $objResult['username'];		
		session_write_close();
	} else {
		echo "Username and Password Incorrect!";
	}


?>