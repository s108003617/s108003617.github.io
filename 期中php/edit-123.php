<?php
require __DIR__. '/parts/admin-required.php';
require __DIR__ . '/config/pdo-connect.php';

header('Content-Type: application/json');

$output = [
  'success' => false, # 是否編輯成功
  'bodyData' => $_POST, # 檢查用
  'code' => 0, # 追踪功能的編號
];

// TODO: 要做欄位資料檢查

# preg_match() 使用 regular expression
# filter_var('bob@example.com', FILTER_VALIDATE_EMAIL) 檢查是不是 email 格式 
# mb_strlen() 回傳字串的長度, mb_ 表 multi-byte

$OrderID = isset($_POST['OrderID']) ? intval($_POST['OrderID']) : 0;
if (empty($OrderID)) {
  # 沒有給 primary key
  $output['code'] = 400;
  echo json_encode($output);
  exit;
}

$AppointmentDate = strtotime($_POST['AppointmentDate']);
if ($AppointmentDate === false) {
  $AppointmentDate = null;
} else {
  $AppointmentDate = date('Y-m-d', $AppointmentDate);
}

$StartTime = isset($_POST['StartTime']) ? $_POST['StartTime'] : null;
$EndTime = isset($_POST['EndTime']) ? $_POST['EndTime'] : null;

$sql = "UPDATE `AppointmentOrders` SET 
`CustomerID`=?,
`AppointmentDate`=?,
`StartTime`=?,
`EndTime`=?,
`ServiceID`=?,
`EmployeeID`=?,
`Status`=?,
`Notes`=?
  WHERE OrderID=?";

$stmt = $pdo->prepare($sql); # 會先檢查 sql 語法

$stmt->execute([
  $_POST['CustomerID'],
  $AppointmentDate,
  $StartTime,
  $EndTime,
  $_POST['ServiceID'],
  $_POST['EmployeeID'],
  $_POST['Status'],
  $_POST['Notes'],
  $OrderID
]);

$output['success'] = !! $stmt->rowCount();

echo json_encode($output);
