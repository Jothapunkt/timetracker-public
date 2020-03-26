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

$values = array();

if (isset($_GET["fullname"])) { array_push($values, "fullname='" . mysqli_real_escape_string($db,$_GET["fullname"]) . "'"); }
if (isset($_GET["phone"])) { array_push($values, "phone='" . mysqli_real_escape_string($db,$_GET["phone"]) . "'"); }
if (isset($_GET["mail"])) { array_push($values, "mail='" . mysqli_real_escape_string($db,$_GET["mail"]) . "'"); }
if (isset($_GET["address"])) { array_push($values, "address='" . mysqli_real_escape_string($db,$_GET["address"]) . "'"); }

if (count($values) == 0) { raise("No values set"); }

$valueString = join(", ", $values);

$result = "UPDATE contact SET $valueString WHERE code='$code'";

$query = $db->prepare("UPDATE contact SET $valueString WHERE code='$code'");
if ($query === false) {
	raise("Prepare() failed: " . htmlspecialchars($db->error));
}
if ($query->execute() === false) {
	raise ("Execute failed: " . htmlspecialchars($query->error));
}

$result = "Edited successfully";
stop();
?>
