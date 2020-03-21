<?php
include "../include/allow_cors.php";
include "../include/db_connect.php";
include "../include/init.php";

$template = '';
if (isset($_GET["template"])) {
    $template = "../templates/" . str_replace(array('/', '.', '\\'), '', $_GET["template"]);
}

$file = fopen($template, "r") or raise("Unable to open file!");
$result = fread($file,filesize($template));
fclose($file);;

stop();
?>
