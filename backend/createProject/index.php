<?php
include "../include/allow_cors.php";
include "../include/db_connect.php";
include "../include/init.php";

$code = '';
$title = '';
$rate = '10';
$invoice_template = 'invoice';
$hours_template = 'hours';

function random_code() {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHJIKLMNOPQRSTUVWXYZ1234567890";
    $c = "";
    $length = 10;

    for($i = 0; $i < $length; $i++) {
        $pos = mt_rand(0, strlen($chars) - 1);
        $c = $c . substr($chars, $pos, 1);
    }

    return $c;
}

if (isset($_GET["invoice_template"])) {
    $invoice_template = $_GET["invoice_template"];
}

if (isset($_GET["hours_template"])) {
    $hours_template = $_GET["hours_template"];
}

if (isset($_GET["title"])) {
    $title = $_GET["title"];
} else {
    raise("No title entered");
}

if (isset($_GET["rate"])) {
    $rate = $_GET["rate"];
    if (!is_numeric($rate)) {
        raise("Rate must be a number, received instead: $rate");
    }
}

$generated_code = false;
while (!$generated_code) {
    $code = random_code();
    $query = "SELECT id FROM project where code='$code';";
    $result = $db->query($query);
    if ($result->num_rows == 0) {
        $generated_code = true;
    }
}


$query = $db->prepare("INSERT INTO project (code, title, invoice_template, hours_template, rate) VALUES (?, ?, ?, ?, ?);");

if ($query === false) {
	raise("Prepare() failed: " . htmlspecialchars($db->error));
}

if ($query->bind_param("sssss", $code, $title, $invoice_template, $hours_template, $rate) === false) {
	raise ("Bind failed: " . htmlspecialchars($query->error));
}
if ($query->execute() === false) {
	raise ("Execute failed: " . htmlspecialchars($query->error));
}

$result = $code;
stop();
?>
