<?php
include "../include/allow_cors.php";
include "../include/db_connect.php";
include "../include/init.php";

if (isset($_GET["id"])) {
	$id = $_GET["id"];
	if (!is_numeric($id) || $id != round($id, 0)) {
		raise(htmlspecialchars("Invalid value for id: $id"));
	}
} else {
	raise("No data for id");
}

$code = '';
if (isset($_GET["code"])) {
    $code = $db->real_escape_string($_GET["code"]);
} else {
    raise("No code set");
};

$query = $db->prepare("UPDATE arbeitsblock SET deleted=true WHERE id=$id AND project='$code'");
if ($query === false) {
	raise("Prepare() failed: " . htmlspecialchars($db->error));
}
if ($query->execute() === false) {
	raise ("Execute failed: " . htmlspecialchars($query->error));
}

$result = "Edited successfully";
stop();
?>
