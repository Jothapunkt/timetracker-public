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

if (isset($_GET["title"])) { array_push($values, "title='" . mysqli_real_escape_string($db,$_GET["title"]) . "'"); }
if (isset($_GET["invoiceTemplate"])) { array_push($values, "invoiceTemplate='" . mysqli_real_escape_string($db,$_GET["invoiceTemplate"]) . "'"); }
if (isset($_GET["hoursTemplate"])) { array_push($values, "hoursTemplate='" . mysqli_real_escape_string($db,$_GET["hoursTemplate"]) . "'"); }
if (isset($_GET["sender"])) { array_push($values, "sender='" . mysqli_real_escape_string($db,$_GET["sender"]) . "'"); }
if (isset($_GET["recipient"])) { array_push($values, "recipient='" . mysqli_real_escape_string($db,$_GET["recipient"]) . "'"); }
if (isset($_GET["rate"])) { array_push($values, "rate= " . mysqli_real_escape_string($db,$_GET["rate"])); }

if (count($values) == 0) { raise("No values set"); }

$valueString = join(", ", $values);

$result = "UPDATE project SET $valueString WHERE code='$code'";

$query = $db->prepare("UPDATE project SET $valueString WHERE code='$code'");
if ($query === false) {
	raise("Prepare() failed: " . htmlspecialchars($db->error));
}
if ($query->execute() === false) {
	raise ("Execute failed: " . htmlspecialchars($query->error));
}

$result = "Edited successfully";
stop();
?>
