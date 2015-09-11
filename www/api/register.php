<?php
if(isset($_POST['submitform'])){

$name = trim(mysql_escape_string($_POST['name']));
$email = trim(mysql_escape_string($_POST['email']));
$passwords = trim(mysql_escape_string($_POST['pwd']));
$password = md5($passwords);

$query_verify_email = "SELECT * FROM <span id="IL_AD7" class="IL_AD">register</span> WHERE email ='$email' and isactive = 1";
$verified_email = mysqli_query($con,$query_verify_email);
if (!$verified_email) {
echo ' System Error';
}
if (mysqli_num_rows($verified_email) == 0) {
// Generate a unique code:
$hash = md5(uniqid(rand(), true));
$query_create_user = "INSERT INTO `register` ( `name`, `email`, `password`, `hash`) VALUES ( '$name', '$email', '$password', '$hash')";
$created_user = mysqli_query($con,$query_create_user);
if (!$created_user) {
echo 'Query Failed ';
}

if (mysqli_affected_rows($con) == 1) { //If the Insert Query was successfull.

$subject = 'Activate Your Email';

$headers = "From: admin@infotuts.com \r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$url= BASE_PATH . '/verify.php?email=' . urlencode($email) . "&key=$hash";

$message ='<p>To <span id="IL_AD2" class="IL_AD">activate your account</span> please click on Activate buttton</p>';
$message.='<table cellspacing="0" cellpadding="0"> <tr>';
$message .= '<td align="center" width="300" height="40" bgcolor="#000091" style="-webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px;

color: #ffffff; display: block;">';

$message .= '<a href="'.$url.'" style="color: #ffffff; font-size:16px; font-weight: bold; font-family: Helvetica, Arial, sans-serif; text-decoration: none;

line-height:40px; width:100%; display:inline-block">Click to Activate</a>';
$message .= '</td> </tr> </table>';

mail($email, $subject, $message, $headers);

echo '<div>A confirmation email
has been sent to <b>'. $email.' </b> Please click on the Activate Button to Activate your account </div>';
} else { // If it did not run OK.
echo '<div>You could not be registered due to a system
error. We apologize for any
inconvenience.</div>';
}
}
else{
echo '<div>Email already registered</div>';}
}

?>