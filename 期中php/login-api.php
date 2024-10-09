<?php
require __DIR__ . '/config/pdo-connect.php';

header('Content-Type: application/json');

$output = [
  'success' => false, # 是不是登入成功
  'bodyData' => $_POST, # 檢查用
  'code' => 0, # 追踪的編號
];

# 兩個欄位中, 只要有一個沒有值, 就不做登入
if (empty($_POST['email']) or empty($_POST['password'])) {
  echo json_encode($output);
  exit;
}

$sql = "SELECT * FROM members WHERE email=?";
$stmt = $pdo->prepare($sql);

$stmt->execute([$_POST['email']]);
$row = $stmt->fetch();

if (empty($row)) {
  # 找不到對應的資料, 帳號是錯的
  $output['code'] = 400;
  echo json_encode($output);
  exit;
}

if (password_verify($_POST['password'], $row['password'])) {
  # 密碼是對的
  $output['code'] = 200;
  $output['success'] = true;
  # $output['row'] = $row;

  $_SESSION['admin'] = [
    'id' => $row['id'],
    'email'=> $row['email'],
    'nickname' => $row['nickname'],
  ];

} else {
  # 密碼是錯的
  $output['code'] = 420;
}


echo json_encode($output);
