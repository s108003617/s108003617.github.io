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

# preg_match() 使用 regular expression
# filter_var('bob@example.com', FILTER_VALIDATE_EMAIL) 檢查是不是 email 格式 
# mb_strlen() 回傳字串的長度, mb_ 表 multi-byte

$price = floatval($_POST['price']); // 转换价格为浮点数

$sql = "INSERT INTO `products` (`name`, `description`, `price`, `quantity`, `created_at`) VALUES (?, ?, ?, ?, NOW())";

$stmt = $pdo->prepare($sql); # 會先檢查 sql 語法

$stmt->execute([
  $_POST['name'],
  $_POST['description'],
  $price,
  $_POST['quantity']
]);

/*
// 錯誤的寫法, 有 SQL injection 的漏洞
$sql = sprintf("INSERT INTO `products` 
(
  `name`, `description`, `price`, `quantity`, `created_at`
) VALUES (
  '%s', '%s', '%s', '%s', NOW()
  )",
  $_POST['name'],
  $_POST['description'],
  $_POST['price'],
  $_POST['quantity']
);
$stmt = $pdo->query($sql);
*/


$output['success'] = !!$stmt->rowCount();
$output['pk'] = $pdo->lastInsertId(); # 取得最新新增資料的 primary key (通常是流水號)


echo json_encode($output);
?>
