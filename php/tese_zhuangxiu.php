<?php

            $goods_price=$_POST['goods_price'];
            $con = mysqli_connect('localhost','root','123456','goods');


            $sql = "SELECT * FROM `goods` WHERE `goods_price`='$goods_price' LIMIT 0,4 ";

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