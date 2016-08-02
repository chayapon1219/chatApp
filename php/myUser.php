<?php
	include('config.php');
		$arr = array();
		$sql = mysqli_query($objConnect,"SELECT * FROM user WHERE User_id = '".$_SESSION['ID']."'");
	include('fetchJson.php');
?>
