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

# preg_match() 使用 regular expression
# filter_var('bob@example.com', FILTER_VALIDATE_EMAIL) 檢查是不是 email 格式 
# mb_strlen() 回傳字串的長度, mb_ 表 multi-byte

$sid = isset($_POST['sid']) ? intval($_POST['sid']) : 0;
if (empty($sid)) {
  # 沒有給 primary key
  $output['code'] = 400;
  echo json_encode($output);
  exit;
}

$birthday = strtotime($_POST['birthday']);
if ($birthday === false) {
  $birthday = null;
} else {
  $birthday = date('Y-m-d', $birthday);
}

$sql = "UPDATE `address_book` SET 
`name`=?,
`email`=?,
`mobile`=?,
`birthday`=?,
`address`=?
  WHERE sid=?";

$stmt = $pdo->prepare($sql); # 會先檢查 sql 語法

$stmt->execute([
  $_POST['name'],
  $_POST['email'],
  $_POST['mobile'],
  $birthday,
  $_POST['address'],
  $sid
]);

$output['success'] = !! $stmt->rowCount();

echo json_encode($output);
