<?php

# 啟動 session
if(! isset($_SESSION)) {
  # 如果沒有設定 $_SESSION, 才啟動
  session_start();
}

if(! isset($_SESSION['admin'])) {
  # 沒有登入管理者, 轉到登入頁, 以下的 php 程式就執行
  header('Location: login.php');
  exit;
}