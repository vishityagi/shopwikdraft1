<<?php 
 session_start();
 //echo "hi";
 include('configdb.php');
 if (isset($_SESSION['user_name']) == false){
    header('Location: #/login');

    die('Not authorised');
}
else{
  $username=$_SESSION['user_name'];
  $query = "SELECT * FROM customers WHERE customer_id='$id'";
  $result = mysqli_query($link,$query)or die(mysqli_error($link));
  $num_row = mysqli_num_rows($result);
  $date=date(y-m-d);
  //$row=mysqli_fetch_array($result);
  if( $num_row ==0 ){
   $query1 = "INSERT INTO customers (customer_id, customer_name, customer_email, customer_num) VALUES ('$customer_id','$customer_name','$customer_email','$customer_num')"; 
   $query2 = "INSERT INTO shops (owner_id, owner_name, owner_email, owner_num) VALUES ('$owner_id','$owner_name','$owner_email','$owner_num')";
   $query3 = "INSERT INTO relation(customer_id, owner_id, last_visit_date, last_visit_amout, total_purchase, no_of_visits) VALUES ('$customer_id','$owner_id','$date',0,1)";
   $result1 = mysqli_query($link,$query1)or die(mysqli_error($link));
   $result2 = mysqli_query($link,$query2)or die(mysqli_error($link));
   $result3 = mysqli_query($link,$query3)or die(mysqli_error($link));
  }
  else{
    
echo 'failed';
      //$json = json_encode($row);
    //echo $json;
  }
}

 ?>