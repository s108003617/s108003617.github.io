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

$review_date = $_POST['review_date']; // 評論日期不需要轉換格式

$sql = "UPDATE `ProductReviews` SET 
`product_id`=?,
`user_id`=?,
`review_text`=?,
`rating`=?,
`review_date`=?
  WHERE sid=?";

$stmt = $pdo->prepare($sql); # 會先檢查 sql 語法

$stmt->execute([
  $_POST['product_id'],
  $_POST['user_id'],
  $_POST['review_text'],
  $_POST['rating'],
  $review_date,
  $sid
]);

$output['success'] = !! $stmt->rowCount();

echo json_encode($output);
