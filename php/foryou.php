<?php

//连接数据库  取任意数据渲染八条到年货
            $page=$_POST['page'];
            $limit=$_POST['limit'];
            $con = mysqli_connect('localhost','root','123456','goods');


            $sql = "SELECT * FROM `goods` LIMIT $page,$limit";

            $res = mysqli_query($con,$sql);

            if (!$res) {
            die('error for mysql: ' . mysqli_error($con));
            }

            $row = mysqli_fetch_assoc($res);
            $arr = array();
            
            $row = mysqli_fetch_assoc($res);
            while($row){
                    array_push($arr,$row);
                    $row = mysqli_fetch_assoc($res);
            } 
            
        
            echo json_encode($arr)

?>