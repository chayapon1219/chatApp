<?php
	while($objResult = mysqli_fetch_array($sql)) {
		$arr[] = $objResult;
	}

	echo $json_response = json_encode($arr);
	mysqli_close($objConnect);
?>
