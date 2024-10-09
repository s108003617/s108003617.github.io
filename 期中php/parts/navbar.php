<?php
if (!isset($pageName)) $pageName = '';
?>
<style>
  .navbar-nav .nav-link.active {
    border-radius: 6px;
    background-color: #0d6efd;
    color: white;
    font-weight: 900;
  }
</style>
<div class="container">
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="index_.php">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link <?= $pageName === 'ab_list' ? 'active' : '' ?>" href="list.php">會員資料</a>
          </li>
          <li class="nav-item">
            <a class="nav-link <?= $pageName === 'ab_list2' ? 'active' : '' ?>" href="list2.php">商品列表</a>
          </li>
          <li class="nav-item">
            <a class="nav-link <?= $pageName === 'ab_list3' ? 'active' : '' ?>" href="list3.php">員工資料</a>
          </li>
          <li class="nav-item">
            <a class="nav-link <?= $pageName === 'ab_list4' ? 'active' : '' ?>" href="list4.php">銷售額</a>
          </li>
          <li class="nav-item">
            <a class="nav-link <?= $pageName === 'ab_list5' ? 'active' : '' ?>" href="list5.php">管理評論</a>
          </li>
          <li class="nav-item">
            <a class="nav-link <?= $pageName === 'ab_list6' ? 'active' : '' ?>" href="list6.php">訂單</a>
          </li>
          

        </ul>


        <ul class="navbar-nav mb-2 mb-lg-0">
          <?php if (isset($_SESSION['admin'])) : ?>
            <li class="nav-item">
              <a class="nav-link"><?= $_SESSION['admin']['nickname'] ?></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="logout.php">登出</a>
            </li>
          <?php else : ?>
            <li class="nav-item">
              <a class="nav-link <?= $pageName === 'login' ? 'active' : '' ?>" href="login.php">登入</a>
            </li>
            <li class="nav-item">
              <a class="nav-link <?= $pageName === 'register' ? 'active' : '' ?>" href="register.php">註冊</a>
            </li>
          <?php endif; ?>

        </ul>
      </div>
    </div>
  </nav>
</div>