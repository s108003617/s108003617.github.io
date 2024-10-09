<?php

require __DIR__. '/db-settings.php';

$dsn = "mysql:host={$db_host};dbname={$db_name};port={$db_port};charset=utf8mb4";

$pdo_options = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

$pdo = new PDO($dsn, $db_user, $db_pass, $pdo_options);


# 啟動 session
if(! isset($_SESSION)) {
  # 如果沒有設定 $_SESSION, 才啟動
  session_start();
}