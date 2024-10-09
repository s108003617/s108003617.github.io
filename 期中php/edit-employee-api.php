<?php
require __DIR__. '/parts/admin-required.php';
require __DIR__ . '/config/pdo-connect.php';

header('Content-Type: application/json');

$output = [
  'success' => false, # 是不是編輯成功
  'bodyData' => $_POST, # 檢查用
  'code' => 0, # 追踪功能的編號
];

// TODO: 要做欄位資料檢查

$sid = isset($_POST['sid']) ? intval($_POST['sid']) : 0;
if (empty($sid)) {
  # 沒有給 primary key
  $output['code'] = 400;
  echo json_encode($output);
  exit;
}

$sql = "UPDATE `employee_data` SET 
`name`=?,
`department`=?,
`position`=?,
`hire_date`=?
  WHERE sid=?";

$stmt = $pdo->prepare($sql);

$stmt->execute([
  $_POST['name'],
  $_POST['department'],
  $_POST['position'],
  $_POST['hire_date'],
  $sid
]);

$output['success'] = !! $stmt->rowCount();

echo json_encode($output);
