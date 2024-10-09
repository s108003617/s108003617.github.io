<?php
require __DIR__. '/parts/admin-required.php';
require __DIR__ . '/config/pdo-connect.php';

header('Content-Type: application/json');

$output = [
  'success' => false, # 是不是新增成功
  'bodyData' => $_POST, # 檢查用
  'pk' => 0,
];

// TODO: 要做欄位資料檢查

$sql = "INSERT INTO `ProductReviews` (`product_id`, `user_id`, `review_text`, `rating`, `review_date`) VALUES (?, ?, ?, ?, ?)";

$stmt = $pdo->prepare($sql); # 會先檢查 sql 語法

$stmt->execute([
  $_POST['product_id'],
  $_POST['user_id'],
  $_POST['review_text'],
  $_POST['rating'],
  $_POST['review_date']
]);

$output['success'] = !!$stmt->rowCount();
$output['pk'] = $pdo->lastInsertId(); # 取得最新新增資料的 primary key (通常是流水號)

echo json_encode($output);
