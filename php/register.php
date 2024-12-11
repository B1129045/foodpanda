<?php
/**
 * Created by PhpStorm.
 * User: vvv
 * Date: 2017/3/18
 * Time: 14:18
 */
require 'smtp.class.php';             //导入smtp邮件类
//验证是否为空
if(!(empty($_GET["raccount"])&&empty($_GET["rpassword"]))) {
    $raccount = $_GET["raccount"];          //账号
    $rpassword = md5($_GET["rpassword"]);   //得到用md5加密的密码
    $email = $_GET['email'];                //邮件
    $regtime = time();                      //当前时间
    $token = md5($raccount.$_GET['rpassword'].$regtime);        //链接账号密码时间，md5加密得到token
    $token_exptime = time()+60*60*24;   //过期时间24小时
    $conn = new mysqli('localhost', 'root', '', 'login_table_user');
    if (mysqli_connect_errno()) {
        echo "數據庫連接失敗";
    }
    //插入数据
    $str = "INSERT INTO user(account, password, email, token, token_exptime, regtime, status) VALUES('$raccount', '$rpassword', '$email', '$token', '$token_exptime', '$regtime', 1);";
    $result = $conn->query($str);
    /*if($result){
        echo "1";
    }else{
        echo "0";
    }*/
    if ($result) {
        header("Location: ../profile.html");
        exit();
    } else {
        echo "註冊失敗！<a href='../html/register.html'>返回</a>";
    }
}
?>