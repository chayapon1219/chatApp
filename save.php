<?php

    $data = file_get_contents("php://input");
    $myfile = fopen("chatApp.json", "w") or die("Unable to open file!");
    fwrite($myfile, $data.json_decode(json));
    fclose($myfile);
?>

