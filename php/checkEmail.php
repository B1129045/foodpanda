<?php

$email = $_GET['email'];                                      //得到email
$conn = new mysqli('localhost','root','','login_table_user');
$sql = "SELECT * FROM user WHERE email = '".$email."';";       //理由邮箱地址查询数据库
$rs = $conn->query($sql);
$row = $rs->fetch_assoc();
//如果查询结果为空，返回1，如果不为空返回0 前端根据返回值验证
if($row){
    echo '1';
}else{
    echo '0';
}
$conn->close();
?>