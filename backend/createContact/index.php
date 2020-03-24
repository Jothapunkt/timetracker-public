<?php
include "../include/allow_cors.php";
include "../include/db_connect.php";
include "../include/init.php";

$code = '';
$fullname = '';
$phone = '';
$mail = '';
$address = '';

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

if (isset($_GET["fullname"])) {
    $fullname = $_GET["fullname"];
} else {
    raise("No name set");
}

if (isset($_GET["phone"])) {
    $phone = $_GET["phone"];
}

if (isset($_GET["mail"])) {
    $mail = $_GET["mail"];
}

if (isset($_GET["address"])) {
    $address = $_GET["address"];
}


$generated_code = false;
while (!$generated_code) {
    $code = random_code();
    $query = "SELECT id FROM contact where code='$code';";
    $result = $db->query($query);
    if ($result->num_rows == 0) {
        $generated_code = true;
    }
}


$query = $db->prepare("INSERT INTO contact (code, fullname, phone, mail, address) VALUES (?, ?, ?, ?, ?);");

if ($query === false) {
	raise("Prepare() failed: " . htmlspecialchars($db->error));
}

if ($query->bind_param("sssss", $code, $fullname, $phone, $mail, $address) === false) {
	raise ("Bind failed: " . htmlspecialchars($query->error));
}
if ($query->execute() === false) {
	raise ("Execute failed: " . htmlspecialchars($query->error));
}

$result = $code;
stop();
?>
