 <?php
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
?>
