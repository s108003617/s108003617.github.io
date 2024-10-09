<?php

session_start();

$_SESSION['admin'] = [
  'id' => 3,
  'email'=> 'shin@gg.com',
  'nickname' => '小新新',
];

header('Location: index_.php');
