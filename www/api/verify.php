<?php
$email = trim(mysql_escape_string($_GET['email']));

$key = trim(mysql_escape_string($_GET['key']));

$query_verify_email = "SELECT * FROM register WHERE email ='$email' and isactive = 1";
$result_verify_email = mysqli_query($con,$query_verify_email);

if (mysqli_num_rows($result_verify_email) == 1)
{
echo '<div>Your Account already exists. Please <a href="login.html">Login Here</a></div>';

}
else
{

if (isset($email) && isset($key))

{

mysqli_query($con, "UPDATE register SET isactive=1 WHERE email ='".$email."' AND hash='".$key."' ") or die(mysql_error());

if (mysqli_affected_rows($con) == 1)
{
echo '<div>Your Account has been <span id="IL_AD8" class="IL_AD">activated</span>. Please <a href="login.html">Login Here</a></div>';

} else
{
echo '<div>Account couldnot be activated.</div>';

}
}
mysqli_close($con);

}?>