<?php
include "../include/allow_cors.php";
include "../include/db_connect.php";
include "../include/init.php";

$query = "SELECT * FROM arbeitsblock where deleted = true";

$result = array();

$response = $db->query($query);
while ($row = $response->fetch_assoc()) {
    array_push($result, $row);
}

stop();
?>
