<?php
/**
 * Created by PhpStorm.
 * User: kernel
 * Date: 2016/4/17
 * Time: 13:24
 */
// 如果Content-Type:  text/json 则回调函数参数类型则为object
// 如果Content-Type:  text/html 则回调函数参数类型则为string
header("Content-Type: text/json; charset=utf8");
include "retData.php";
include "connect.php";

$sqlGetTables = "SHOW TABLES";
$result = $con->query($sqlGetTables);
if ($result->num_rows == 0) {
    $retData["errNum"] = 1;
    $retData["retMsg"] = "没有数据表";
} elseif ($result->num_rows > 0) {
    $retData["errNum"] = 0;
    $retData["retMsg"] = "成功读取数据表";
    $retData["retData"] = [];

    $i = 0;
    while($row = $result->fetch_row()) {
        $retData["retData"][$i]["table"] = $row[0];

        $sqlGetFields = "SHOW FULL FIELDS FROM $row[0]";
        $result2 = $con->query($sqlGetFields);
        $j = 0;
        while ($row2 = $result2->fetch_assoc()) {
            $retData["retData"][$i]["field"][$j++] = $row2["Field"];
        }

        $i++;
    }
}

$result->close();
$con->close();
exit(json_encode($retData));
