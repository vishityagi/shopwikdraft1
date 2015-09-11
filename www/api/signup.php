<?php
echo "bhuhyguy";
define('DB_HOST', 'localhost');
define('DB_NAME', 'members');
define('DB_USER','root');
define('DB_PASSWORD','');
$con=mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die("Failed to connect to MySQL: " . mysql_error());
$db=mysql_select_db(DB_NAME,$con) or die("Failed to connect to MySQL: " . mysql_error());
function NewUser() { 
	$name = $_POST['name']; 
	$mobNum = $_POST['mobnum']; 
	$email = $_POST['email']; 
	$password = $_POST['pass']; 
	$query = "INSERT INTO appcustomers (name,email,mobnum,pass) VALUES ('$name','$email','$mobNum',$password')"; 
	$data = mysql_query ($query)or die(mysql_error()); if($data) { echo "YOUR REGISTRATION IS COMPLETED..."; } 
	} 
function SignUp() 
{ 
	if(!empty($_POST['email'])) //checking the 'user' name which is from Sign-Up.html, is it empty or have some text 
	{ 
		$query = mysql_query("SELECT * FROM appcustomers WHERE name = '$_POST[name]' AND pass = '$_POST[pass]'") or die(mysql_error()); 
		if(!$row = mysql_fetch_array($query) or die(mysql_error())) 
			{ newuser(); } 
		else { echo "SORRY...YOU ARE ALREADY REGISTERED USER..."; } 
	} 
} if(isset($_POST['submit'])) { SignUp(); } 
echo "huhgiugiyug";
	?>

