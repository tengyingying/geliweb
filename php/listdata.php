<?php
include "conn.php";
$result=$conn->query("select * from taobaogoods");
$num=$result->num_rows;

$pagesize=12;
$pagenum=ceil($num/$pagesize);
if(inset($GET['page'])){
    $pagevalue=$_GET['page'];
}else{
    $pagevalu=1;
}
$page=($pagevalue-1)*$pagesize;
$sql1="select * from taobaogoods limit $page,$pagesize";
$res =$conn->query($sql1);
$arr=array();
for($i=0;$i<$res->num_rows;$i++){
    $arr[$i]=$res->fetch_assoc();
}
echo json_encode($arr);