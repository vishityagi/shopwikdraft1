<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Member page</title>
</head>
<body>
<?php
 session_start();
 if($_SESSION['user_name'] == '')
 {
  header("Location: index.php");
  exit;
 }
 echo "Hi ".$_SESSION['user_name'];
?>
<a href="logout.php">Logout</a>
</body>
</html>