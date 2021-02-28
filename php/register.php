<?php


        $userName=$_POST['userName'];
        $pwd=$_POST['pwd'];

        $con=mysqli_connect('localhost','root','123456','goods');

        $sql="SELECT * FROM `user` WHERE `name`='$userName'";

        $res=mysqli_query($con,$sql);

        if(!$res){
            die('数据库连接失败'.mysqli_error($con));
        }

        $row=mysqli_fetch_assoc($res);

        if($row){
          print_r("用户名已注册");
        }
        else{
            $sql1="INSERT INTO `user` VALUES (null,'$userName','$pwd')";
            $res1=mysqli_query($con,$sql1);
            print_r("注册成功");
        }


















?>