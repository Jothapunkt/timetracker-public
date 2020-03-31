<?php
	$db_server = "127.0.0.1";
	$db_name = "${{ secrets.database_username }}";
	$db_pw = "${{ secrets.database_password }}";
	$db_user = "ni163258_1sql1";

	$db = new mysqli($db_server, $db_user, $db_pw, $db_name);
	$db->query("SET CHARSET utf8;");
?>
