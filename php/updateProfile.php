<?php
	include('config.php');
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

	if($objQuery) {
		echo 'SUCCESS !!';		
		session_write_close();
	}
?>