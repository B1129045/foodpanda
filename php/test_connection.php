<?php
$mysqli = new mysqli("localhost", "root", "", "login");

if ($mysqli->connect_error) {
    die("連接失敗: " . $mysqli->connect_error);
}
echo "連接成功";
?>
