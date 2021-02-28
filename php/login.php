<?php

    $username=$_POST['username'];
    $password=$_POST['password'];


    $con=mysqli_connect('localhost','root','123456','goods');

    $sql="SELECT * FROM `user` WHERE `name`='$username' AND `pass`='$password'";

    $res=mysqli_query($con,$sql);

    if(!$res){
        die('数据库连接失败'.mysqli_error($con));
    }

    $row=mysqli_fetch_assoc($res);


    if (!$row) {
        // 没有匹配的数据 登录失败
        echo json_encode(array(
          "code" => 0,
          "message" => "登录失败"
        ));
      } else {
        // 有匹配的数据 登录成功
        echo json_encode(array(
          "code" => 1,
          "message" => "登录成功"
        ));
      }
    

    

?>