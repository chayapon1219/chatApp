<?php
	include('config.php');
		$login_name = $_SESSION['name'];
		$arr = array();
		$sql = mysqli_query($objConnect,"
			SELECT message.Message_text, message.Message_time, user.User_id, user.image, user.name
			FROM message
			INNER JOIN user
			ON user.User_id=message.User_id
			ORDER BY message.Message_time; 
		");
	include('fetchJson.php');
?>
