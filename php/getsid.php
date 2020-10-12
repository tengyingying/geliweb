<?php
include "conn.php";
if(isset($_GET['datasid'])){
    $sid=$_GET['datasid'];
    $result=$conn->query("select * from datageli where sid=$sid");
    echo json_encode($result->fetch_assoc());
}