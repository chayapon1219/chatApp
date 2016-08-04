<?php
	include('config.php');
		$login_name = $_SESSION['name'];
		$last_id = file_get_contents("php://input");

		$arr = array();
		$sql = mysqli_query($objConnect,"
			SELECT message.Message_id, message.Message_text, message.Message_time, user.User_id, user.image, user.name
			FROM message
			INNER JOIN user
			ON user.User_id=message.User_id AND message.Message_id > '$last_id'
			ORDER BY message.Message_time; 
		");

		if(mysqli_num_rows($sql) != 0){				
				while($objResult = mysqli_fetch_array($sql))
					{				
						$arr[] = $objResult;
					}//while
					echo $json_response = json_encode($arr);			
				}

?>
