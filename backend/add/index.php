<?php
include "../include/allow_cors.php";
include "../include/db_connect.php";
include "../include/init.php";

$day = date("d");
$month = date("m");
$year = date("Y");
$maxday = date("n");

$duration = 0;
$description = "";
$highlighted = false;
$strike = false;
$deleted = false;

if (isset($_GET["year"])) {
	$year = $_GET["year"];
	if (!is_numeric($year) || $year < 2020 || $year != round($year, 0)) {
		raise(htmlspecialchars("Invalid value for year: $year"));
	}
}

if (isset($_GET["month"])) {
	$month = $_GET["month"];
	if (!is_numeric($month) || $month < 1 || $month > 12 || $month != round($month, 0)) {
		raise(htmlspecialchars("Invalid value for month: $month"));
	}
}

if (isset($_GET["day"])) {
	$day = $_GET["day"];
	$maxday = date("t", mktime(0, 0, 0, $month, $day, $year));
	if (!is_numeric($day) || $day < 0 || $day != round($day, 0) || $day > $maxday) {
		raise(htmlspecialchars("Invalid value for day: $day"));
	}
} else {
	raise("No data for day");
}

if (isset($_GET["duration"])) {
	$duration = $_GET["duration"];
	if (!is_numeric($duration) || $duration < 0) {
		raise(htmlspecialchars("Invalid value for duration: $duration"));
	}
}

if (isset($_GET["description"])) {
	$description = $_GET["description"];
}

if (isset($_GET["highlighted"])) {
	$highlighted = filter_var($_GET["highlighted"], FILTER_VALIDATE_BOOLEAN);
}

if (isset($_GET["strike"])) {
	$strike = filter_var($_GET["strike"], FILTER_VALIDATE_BOOLEAN);
}

$query = $db->prepare("INSERT INTO arbeitsblock (day, month, year, duration, description, highlighted, strike, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?);");

if ($query === false) {
	raise("Prepare() failed: " . htmlspecialchars($db->error));
}

if ($query->bind_param("iiidssss", $day, $month, $year, $duration, $description, $highlighted, $strike, $deleted) === false) {
	raise ("Bind failed: " . htmlspecialchars($query->error));
}
if ($query->execute() === false) {
	raise ("Execute failed: " . htmlspecialchars($query->error));
}

$result = "Added successfully";
stop();
?>
