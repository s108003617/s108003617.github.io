<?php

require __DIR__ . '/config/pdo-connect.php';
$title = '商品列表';
$pageName = 'ab_list2';

$t_sql = "SELECT COUNT(1) FROM products";

$perPage = 25; # 每一頁最多有幾筆資料

# 取得用戶要看第幾頁
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
if ($page < 1) {
  # 頁碼小於 1 跳轉到頁碼為 1
  header('Location: ?page=1');
  exit;
}

# 取得資料總筆數
$totalRows = $pdo->query($t_sql)->fetch(PDO::FETCH_NUM)[0];
# 預設值
$totalPages = 0;
$rows = [];
if ($totalRows > 0) {
  # 如果有資料才去取得分頁資料
  $totalPages = ceil($totalRows / $perPage);
  if ($page > $totalPages) {
    # 頁碼大於總頁數時
    header('Location: ?page=' . $totalPages);
    exit;
  }

  $sql = sprintf(
    "SELECT * FROM products ORDER BY sid DESC LIMIT %s, %s",
    ($page - 1) * $perPage,
    $perPage
  );
  $rows = $pdo->query($sql)->fetchAll();
}





?>
<?php include __DIR__ . '/parts/html-head.php' ?>
<?php include __DIR__ . '/parts/navbar.php' ?>
<div class="container">
  <div class="row">
    <div class="col">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item <?= $page == 1 ? 'disabled' : '' ?>">
            <a class="page-link" href="?page=1">
              <i class="fa-solid fa-angles-left"></i>
            </a>
          </li>
          <li class="page-item <?= $page == 1 ? 'disabled' : '' ?>">
            <a class="page-link" href="?page=<?= $page - 1 ?>">
              <i class="fa-solid fa-angle-left"></i>
            </a>
          </li>
          <?php for ($i = $page - 5; $i <= $page + 5; $i++) :
            if ($i >= 1 and $i <= $totalPages) :
          ?>
              <li class="page-item <?= $page == $i ? 'active' : '' ?>">
                <a class="page-link" href="?page=<?= $i ?>"><?= $i ?></a>
              </li>
          <?php endif;
          endfor; ?>
          <li class="page-item <?= $page == $totalPages ? 'disabled' : '' ?>">
            <a class="page-link" href="?page=<?= $page + 1 ?>">
              <i class="fa-solid fa-angle-right"></i>
            </a>
          </li>
          <li class="page-item <?= $page == $totalPages ? 'disabled' : '' ?>">
            <a class="page-link" href="?page=<?= $totalPages ?>">
              <i class="fa-solid fa-angles-right"></i>
            </a>
          </li>
         
          <a class="nav-link <?= $pageName === 'ab_add' ? 'active' : '' ?>" href="add-products.php">新增User</a>
        
          
        </ul>
      </nav>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th><i class="fa-solid fa-trash"></i></th>
            <th>編號</th>
            <th>商品名稱</th>
            <th>商品描述</th>
            <th>商品價格</th>
            <th>商品庫存數量</th>
            <th>商品創建時間</th>
            <th><i class="fa-solid fa-pen-to-square"></i></th>
           
          </tr>
        </thead>
        <tbody>
          <?php foreach ($rows as $r) : ?>
            <tr>
              <td>
                <a href="javascript: deleteOne(<?= $r['sid'] ?>)">
                  <i class="fa-solid fa-trash"></i>
                </a>
              </td>
              <td><?= $r['sid'] ?></td>
              <td><?= $r['name'] ?></td>
              <td><?= htmlentities($r['description']) ?></td>
              <td><?= $r['price'] ?></td>
              <td><?= $r['quantity'] ?></td>
              <!-- htmlentities() 避免 XSS 攻擊 -->
              <td><?= ($r['created_at']) ?></td>
              <td>
                <a href="edit-products.php?sid=<?= $r['sid'] ?>">
                  <i class="fa-solid fa-pen-to-square"></i>
                </a>
              </td>
              
            </tr>
          <?php endforeach ?>
        </tbody>
      </table>
    </div>
  </div>



  <?php /*
  <pre><?php
        print_r([
          'perPage' => $perPage,
          'totalRows' => $totalRows,
          'totalPages' => $totalPages,
          'rows' => $rows,
        ]);
        ?></pre>
        */ ?>
</div>
<?php include __DIR__ . '/parts/scripts.php' ?>
<script>
  const deleteOne = sid => {
    if(confirm(`是否要刪除編號為 ${sid} 的資料?`)){
      location.href = `delete2.php?sid=${sid}`;
    }
  }
</script>
<?php include __DIR__ . '/parts/html-foot.php' ?>