<?php
	include('config.php');
	$strSQL = "UPDATE user SET onlineStatus='0' WHERE name = '".$_SESSION['name']."'";
	$objQuery = mysqli_query($objConnect, $strSQL);
	session_destroy();
	session_write_close();
?>
