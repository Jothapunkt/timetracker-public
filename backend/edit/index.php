<?php
include "../include/allow_cors.php";
include "../include/db_connect.php";
include "../include/init.php"

if (isset($_GET["id"])) {
	$id = $_GET["id"];
	if (!is_numeric($id) || $id != round($id, 0)) {
		raise(htmlspecialchars("Invalid value for id: $id"));
	}
} else {
	raise("No data for id");
}

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
	if (!is_numeric($day) || $day < 0 || $day != round($day, 0)) {
		raise(htmlspecialchars("Invalid value for day: $day"));
	}
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

$values = array();

if (isset($day)) { array_push($values, "day= " . mysqli_real_escape_string($db,$day)); }
if (isset($month)) { array_push($values, "month= " . mysqli_real_escape_string($db,$month)); }
if (isset($year)) { array_push($values, "year= " . mysqli_real_escape_string($db,$year)); }

if (isset($duration)) { array_push($values, "duration= " . mysqli_real_escape_string($db,$duration)); }
if (isset($description)) { array_push($values, "description= '" . mysqli_real_escape_string($db,$description) . "'"); }
if (isset($highlighted)) { array_push($values, "highlighted= " . mysqli_real_escape_string($db,$highlighted)); }
if (isset($strike)) { array_push($values, "strike= " . mysqli_real_escape_string($db,$strike)); }

if (count($values) == 0) { raise("No values set"); }

$valueString = join(", ", $values);
$result = "UPDATE arbeitsblock SET $valueString WHERE id=$id";

$query = $db->prepare("UPDATE arbeitsblock SET $valueString WHERE id=$id");
if ($query === false) {
	raise("Prepare() failed: " . htmlspecialchars($db->error));
}
if ($query->execute() === false) {
	raise ("Execute failed: " . htmlspecialchars($query->error));
}

$result = "Edited successfully";
stop();
?>
