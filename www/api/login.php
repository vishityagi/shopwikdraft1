
<?php
 session_start();
 //echo "hi";
 include('configdb.php');

  $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$email = $request->email;
    @$password = $request->pass;
    $s='logged_in';
   // print_r($request);
  $query = "SELECT * FROM user WHERE email='$email' AND password='$password'";
  $result = mysqli_query($link,$query)or die(mysqli_error($link));
  $num_row = mysqli_num_rows($result);
  $row=mysqli_fetch_array($result);
  if( $num_row ==1 )
         {
          $code=0;
  $squery="UPDATE user SET session='$s' WHERE email = '$email'";
  mysqli_query($link,$squery)or die(mysqli_error($link));
   $_SESSION['user_name']=$row['username'];
   $_SESSION['status']=$row['session'];
   echo '#/tab';
   exit();
  }
  else
         {
          $code=-1;
          exit();
  }

?>