<?php
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
//include("check_status.php");

session_start();

if (isset($_SESSION['user_name']) == false){
    //header('Location: ../#/login');
    //echo '#/login';
    die('#/login');
}

else
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$num = $request->num;
    @$text = $request->text;
    $loc='&phone='.$num.'&text='.$text.'&priority=dnd&stype=normal';
	 //header('Location: 	http://bhashsms.com/api/sendmsg.php?user=vishi&pass=33635&sender=Sender ID&'.$loc);
	 echo '#/tab/Messages';
exit();

?>
