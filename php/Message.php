<?php
	include('config.php');
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		$message_text = $request->message;
		session_start();
		$strSQL = 
			" INSERT INTO `message`(`Message_id`, `Message_text`, `Message_time`, `User_id`) 
			VALUES ('','".$message_text."',CURRENT_TIMESTAMP,'".$_SESSION['ID']."') ";
		$objQuery = mysqli_query($objConnect, $strSQL);
		mysqli_close($objConnect);
?>
