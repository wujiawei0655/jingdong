<?php

//连接数据库  取任意数据渲染十条到年货
            $con = mysqli_connect('localhost','root','123456','goods');


            $sql = "SELECT * FROM `goods`";

            $res = mysqli_query($con,$sql);

            if (!$res) {
            die('error for mysql: ' . mysqli_error($con));
            }

            $row = mysqli_fetch_assoc($res);
            $arr = array();
            
            $row = mysqli_fetch_assoc($res);
            for($n=0;$n<10;$n++){
                    array_push($arr,$row);
                    $row = mysqli_fetch_assoc($res);
            } 
            
        
            echo json_encode($arr)

?>