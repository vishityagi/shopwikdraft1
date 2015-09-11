<?php
/**
 *  Cors usage example. 
 *  @author Georgi Naumov
 *  gonaumov@gmail.com for contacts and 
 *  suggestions. 
 **/ 
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
//include("check_status.php");

session_start();
if (isset($_SESSION['user_name']) == false){
    header('Location: ../#/login');

    die('Not authorised');
}

else
	 header('Location: ../#/tab');
exit();

?>
