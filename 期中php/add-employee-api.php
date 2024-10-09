<?php
require __DIR__. '/parts/admin-required.php';
require __DIR__ . '/config/pdo-connect.php';

header('Content-Type: application/json');

$output = [
  'success' => false, # 是不是新增成功
  'bodyData' => $_POST, # 檢查用
  'pk' => 0,
];

// 檢查欄位資料

$hire_date = strtotime($_POST['hire_date']);
if ($hire_date === false) {
  $hire_date = null;
} else {
  $hire_date = date('Y-m-d', $hire_date);
}

$sql = "INSERT INTO `employee_data` (`name`, `department`, `position`, `hire_date`) VALUES (?, ?, ?, ?)";

$stmt = $pdo->prepare($sql);

$stmt->execute([
  $_POST['name'],
  $_POST['department'],
  $_POST['position'],
  $hire_date
]);

$output['success'] = !!$stmt->rowCount();
$output['pk'] = $pdo->lastInsertId(); # 取得最新新增資料的 primary key

echo json_encode($output);
