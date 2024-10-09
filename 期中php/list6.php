<?php
require __DIR__ . '/config/pdo-connect.php';
$title = '訂單資料表';
$pageName = 'ab_list6';

$t_sql = "SELECT COUNT(1) FROM orders";

$perPage = 25;

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
if ($page < 1) {
  header('Location: ?page=1');
  exit;
}

$totalRows = $pdo->query($t_sql)->fetch(PDO::FETCH_NUM)[0];
$totalPages = 0;
$rows = [];
if ($totalRows > 0) {
  $totalPages = ceil($totalRows / $perPage);
  if ($page > $totalPages) {
    header('Location: ?page=' . $totalPages);
    exit;
  }

  $sql = sprintf(
    "SELECT * FROM orders ORDER BY sid DESC LIMIT %s, %s",
    ($page - 1) * $perPage,
    $perPage
  );
  $rows = $pdo->query($sql)->fetchAll();
}
?>
<?php include __DIR__ . '/parts/html-head.php' ?>
<?php include __DIR__ . '/parts/navbar.php' ?>
<style>
  .aclass:hover {
    background-color: pink;
  }
  .aclass{
    font-size:30px
    
  }
</style>
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
          <a class="nav-link aclass<?= $pageName === 'orders_add' ? 'active' : '' ?>" href="add-orders.php">新增訂單資料</a>
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
            <th>客戶ID</th>
            <th>訂單日期</th>
            <th>總金額</th>
            <th>狀態</th>
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
              <td><?= $r['customer_id'] ?></td>
              <td><?= $r['order_date'] ?></td>
              <td><?= $r['total_amount'] ?></td>
              <td><?= $r['status'] ?></td>
              <td>
                <a href="edit-orders.php?sid=<?= $r['sid'] ?>">
                  <i class="fa-solid fa-pen-to-square"></i>
                </a>
              </td>
            </tr>
          <?php endforeach ?>
        </tbody>
      </table>
    </div>
  </div>
</div>
<?php include __DIR__ . '/parts/scripts.php' ?>
<script>
  const deleteOne = sid => {
    if(confirm(`是否要刪除編號為 ${sid} 的資料?`)){
      location.href = `delete6.php?sid=${sid}`;
    }
  }
</script>
<?php include __DIR__ . '/parts/html-foot.php' ?>
