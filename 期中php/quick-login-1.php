<?php

session_start();

$_SESSION['admin'] = [
  'id' => 7,
  'email'=> 'ming@gg.com',
  'nickname' => '大明明',
];

header('Location: index_.php');
