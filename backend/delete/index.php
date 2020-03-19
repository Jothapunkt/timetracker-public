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

$query = $db->prepare("DELETE FROM arbeitsblock WHERE id=$id");
if ($query === false) {
	raise("Prepare() failed: " . htmlspecialchars($db->error));
}
if ($query->execute() === false) {
	raise ("Execute failed: " . htmlspecialchars($query->error));
}

$result = "Deleted successfully";
stop();
?>
