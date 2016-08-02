<?php
	include('config.php');
		$arr = array();
		$sql = mysqli_query($objConnect,"SELECT DISTINCT * FROM user");
	include('fetchJson.php');
?>
