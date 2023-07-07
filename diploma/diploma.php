<?php

$mysqli = mysqli_connect("mysql-191588.srv.hoster.ru", "srv191588_galina", "6661313", "srv191588_frontend");
if ($mysqli == false) {
  print("error");
} else {

  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];


    $mysqli->set_charset("utf8");
    $mysqli->query("INSERT INTO `diploma`(`name`,  `email`, `message`) VALUES ('$name', '$email', '$message')");
  }
?>
