<?php
	include('config.php');
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$user_id = $request->username;
	$pass_id = $request->password;


	if($user_id == '' || $pass_id == '') {
		echo 'Please enter your username and password.';
		mysqli_close($objConnect);
	} else {
		
		$pass_id = md5($pass_id);
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


	}



?>