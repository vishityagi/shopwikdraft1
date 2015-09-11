
<?php
 session_start();
 if($_SESSION['user_name'] == '')
 {
 	header('Location: ../page2.html');
  exit;
 }
header('Location: template/tabs.html');
 echo "Hi ".$_SESSION['user_name'];
?>
