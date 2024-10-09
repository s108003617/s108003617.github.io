<?php
require __DIR__. '/parts/admin-required.php';
require __DIR__ . '/config/pdo-connect.php';

header('Content-Type: application/json');

$output = [
  'success' => false,
  'bodyData' => $_POST,
  'pk' => 0,
];

$order_date = strtotime($_POST['order_date']);
if ($order_date === false) {
  $order_date = null;
} else {
  $order_date = date('Y-m-d', $order_date);
}

$sql = "INSERT INTO `orders` (`customer_id`, `order_date`, `total_amount`, `status`) VALUES (?, ?, ?, ?)";

$stmt = $pdo->prepare($sql);

$stmt->execute([
  $_POST['customer_id'],
  $order_date,
  $_POST['total_amount'],
  $_POST['status']
]);

$output['success'] = !!$stmt->rowCount();
$output['pk'] = $pdo->lastInsertId();

echo json_encode($output);
