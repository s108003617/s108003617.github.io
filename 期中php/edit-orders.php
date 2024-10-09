<?php
require __DIR__. '/parts/admin-required.php';
require __DIR__ . '/config/pdo-connect.php';

$sid = isset($_GET['sid']) ? intval($_GET['sid']) : 0;

if (empty($sid)) {
  header('Location: list6.php');
  exit; # 結束 php 程式, die()
}

$sql = "SELECT * FROM orders WHERE sid=$sid"; // 修改這裡的查詢
$row = $pdo->query($sql)->fetch();

# 如果沒有這個編號的資料, 轉向回列表頁
if (empty($row)) {
  header('Location: list6.php');
  exit; # 結束 php 程式, die()
}

$title = '編輯訂單'; // 修改標題

?>
<?php include __DIR__ . '/parts/html-head.php' ?>
<?php include __DIR__ . '/parts/navbar.php' ?>
<style>
  .required {
    color: red;
  }

  .form-text {
    color: red;
  }
</style>
<div class="container">
  <div class="row">
    <div class="col-6">
      <div class="card">

        <div class="card-body">
          <h5 class="card-title">編輯訂單資料</h5> <!-- 修改卡片標題 -->
          <form name="form1" onsubmit="sendData(event)">
            <input type="hidden" name="sid" value="<?= $row['sid'] ?>">
            <div class="mb-3">
              <label for="customer_id" class="form-label">客戶編號</label> <!-- 修改欄位標籤及值 -->
              <input type="text" class="form-control" value="<?= $row['customer_id'] ?>" disabled>
            </div>
            <div class="mb-3">
              <label for="order_date" class="form-label"><span class="required">**</span> 訂單日期</label> <!-- 修改欄位標籤及值 -->
              <input type="date" class="form-control" id="order_date" name="order_date" value="<?= $row['order_date'] ?>">
              <div class="form-text"></div>
            </div>

            <div class="mb-3">
              <label for="total_amount" class="form-label">總金額</label> <!-- 修改欄位標籤及值 -->
              <input type="number" class="form-control" id="total_amount" name="total_amount" value="<?= $row['total_amount'] ?>">
              <div class="form-text"></div>
            </div>

            <div class="mb-3">
              <label for="status" class="form-label">訂單狀態</label> <!-- 修改欄位標籤及值 -->
              <input type="text" class="form-control" id="status" name="status" value="<?= $row['status'] ?>">
              <div class="form-text"></div>
            </div>

            <button type="submit" class="btn btn-primary">修改</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">資料修改結果</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="alert alert-success" role="alert">
          訂單資料修改成功 <!-- 修改提示訊息 -->
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">繼續修改</button>
        <a href="list6.php" class="btn btn-primary">到列表頁</a>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel2">資料修改結果</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="alert alert-danger" role="alert">
          資料沒有修改 <!-- 修改提示訊息 -->
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">繼續修改</button>
        <a href="list6.php" class="btn btn-primary">到列表頁</a>
      </div>
    </div>
  </div>
</div>
<?php include __DIR__ . '/parts/scripts.php' ?>
<script>
  const orderDateField = document.form1.order_date;
  const totalAmountField = document.form1.total_amount;

  function validateTotalAmount(totalAmount) {
    // 檢查總金額是否大於0
    return totalAmount > 0;
  }

  const sendData = e => {
    e.preventDefault();

    // 回復沒有提示的狀態
    orderDateField.style.border = '1px solid #CCCCCC';
    orderDateField.nextElementSibling.innerHTML = '';
    totalAmountField.style.border = '1px solid #CCCCCC';
    totalAmountField.nextElementSibling.innerHTML = '';

    let isPass = true; // 有沒有通過檢查

    // TODO: 要做欄位資料檢查
    if (orderDateField.value === '') {
      isPass = false;
      // 跳提示用戶
      orderDateField.style.border = '1px solid red';
      orderDateField.nextElementSibling.innerHTML = '請填寫正確的訂單日期';
    }

    if (!validateTotalAmount(totalAmountField.value)) {
      isPass = false;
      totalAmountField.style.border = '1px solid red';
      totalAmountField.nextElementSibling.innerHTML = '請填寫正確的總金額';
    }


    // 如果欄位資料都有通過檢查
    if (isPass) {
      const fd = new FormData(document.form1); // 建立一個只有資料的表單物件

      fetch('edit-orders-api.php', {
          method: 'POST',
          body: fd, // 預設的 Content-Type: multipart/form-data
        })
        .then(r => r.json())
        .then(data => {
          console.log(data);
          if (data.success) {
            myModal.show();
          } else {
            myModal2.show();
          }
        }).catch(ex => {
          console.log(`fetch() 發生錯誤, 回傳的 JSON 格式是錯的`);
          console.log(ex);
        })
    }
  }

  const myModal = new bootstrap.Modal('#exampleModal');
  const myModal2 = new bootstrap.Modal('#exampleModal2');
</script>
<?php include __DIR__ . '/parts/html-foot.php' ?>
