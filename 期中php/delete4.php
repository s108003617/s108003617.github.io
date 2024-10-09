<?php
require __DIR__. '/parts/admin-required.php';
require __DIR__ . '/config/pdo-connect.php';

$sid = isset($_GET['sid']) ? intval($_GET['sid']) : 0;

if(! empty($sid)) {
  # $sid 不是空的 (不是 0)
  $sql = "DELETE FROM address_book WHERE sid=$sid";
  $pdo->query($sql);
}

# $_SERVER['HTTP_REFERER'], 人從哪裡來

$comeFrom = 'list.php'; # 預設值
if(! empty($_SERVER['HTTP_REFERER'])){
  $comeFrom = $_SERVER['HTTP_REFERER'];
}

header('Location: '. $comeFrom);