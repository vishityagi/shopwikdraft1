<?php
 session_start();
 include('configdb.php');
$e=$_SESSION['user_name'];
$query = " UPDATE user SET session = 'locked' WHERE username = '$e'";
mysqli_query($link,$query)or die(mysqli_error($link));
 unset($_SESSION['user_name']);
 session_destroy();
 header('Location: ../#/login');
?>