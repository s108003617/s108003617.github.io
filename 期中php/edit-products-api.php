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

$price = isset($_POST['price']) ? floatval($_POST['price']) : 0;
if ($price <= 0) {
  # 價格不得小於等於零
  $output['code'] = 401;
  echo json_encode($output);
  exit;
}

$quantity = isset($_POST['quantity']) ? intval($_POST['quantity']) : 0;
if ($quantity < 0) {
  # 數量不得小於零
  $output['code'] = 402;
  echo json_encode($output);
  exit;
}

$sql = "UPDATE `products` SET 
`name`=?,
`description`=?,
`price`=?,
`quantity`=?
  WHERE sid=?";

$stmt = $pdo->prepare($sql); # 會先檢查 sql 語法

$stmt->execute([
  $_POST['name'],
  $_POST['description'],
  $price,
  $quantity,
  $sid
]);

$output['success'] = !! $stmt->rowCount();

echo json_encode($output);
