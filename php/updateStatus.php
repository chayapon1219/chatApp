<?php
	include('config.php');
		$strSQL = "UPDATE user SET onlineStatus='1' WHERE user_id = '".$_SESSION['ID']."'";
		$objQuery = mysqli_query($objConnect, $strSQL);
		$objResult = mysqli_fetch_array($objQuery);
		session_write_close();
?>