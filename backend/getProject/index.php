<?php
include "../include/allow_cors.php";
include "../include/db_connect.php";
include "../include/init.php";

$code = '';
if (isset($_GET["code"])) {
    $code = $db->real_escape_string($_GET["code"]);
} else {
    raise("No code set");
};

$query = "SELECT * FROM project where code = '$code'";

$result = array();

$response = $db->query($query);
while ($row = $response->fetch_assoc()) {
    array_push($result, $row);
}

stop();
?>
