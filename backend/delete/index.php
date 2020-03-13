<?php
include "../include/db_connect.php";

$success = true;
$error = "none";
$result = "";

function stop() {
	global $success, $error, $result, $db, $query;
	$out = array();
	$out["success"] = $success;
	$out["error"] = $error;
	$out["result"] = $result;
	
	if (isset($query) && isset($query->close)) {
		$query->close();
	}
	$db->close();
	
	die(json_encode($out));
}

function raise($msg) {
	global $success, $error;
	$success = false;
	$error = $msg;
	stop();
}

if ($db->connect_error) {
    raise("Connection failed: " . htmlspecialchars($db->connect_error));
}

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