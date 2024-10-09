<?php
require __DIR__. '/parts/admin-required.php';

if(! isset($_SESSION)) {
  session_start();
}
$title = '新增訂單';
$pageName = 'orders_add';

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
          <h5 class="card-title">新增資料</h5>
          <form name="form1" onsubmit="sendData(event)">
            <div class="mb-3">
              <label for="customer_id" class="form-label"><span class="required">**</span> 客戶ID</label>
              <input type="text" class="form-control" id="customer_id" name="customer_id">
              <div class="form-text"></div>
            </div>

            <div class="mb-3">
              <label for="order_date" class="form-label"><span class="required">**</span> 訂單日期</label>
              <input type="date" class="form-control" id="order_date" name="order_date">
              <div class="form-text"></div>
            </div>

            <div class="mb-3">
              <label for="total_amount" class="form-label"><span class="required">**</span> 總金額</label>
              <input type="text" class="form-control" id="total_amount" name="total_amount">
              <div class="form-text"></div>
            </div>

            <div class="mb-3">
              <label for="status" class="form-label">狀態</label>
              <input type="text" class="form-control" id="status" name="status">
              <div class="form-text"></div>
            </div>

            <button type="submit" class="btn btn-primary">新增</button>
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
        <h1 class="modal-title fs-5" id="exampleModalLabel">資料新增結果</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="alert alert-success" role="alert">
          資料新增成功
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">繼續新增</button>
        <a href="list6.php" class="btn btn-primary">到列表頁</a>
      </div>
    </div>
  </div>
</div>
<?php include __DIR__ . '/parts/scripts.php' ?>
<script>
  const customer_idField = document.form1.customer_id;
  const order_dateField = document.form1.order_date;

  function sendData(e) {
    e.preventDefault();

    customer_idField.style.border = '1px solid #CCCCCC';
    customer_idField.nextElementSibling.innerHTML = '';
    order_dateField.style.border = '1px solid #CCCCCC';
    order_dateField.nextElementSibling.innerHTML = '';

    let isPass = true;

    if (customer_idField.value.length === 0) {
      isPass = false;
      customer_idField.style.border = '1px solid red';
      customer_idField.nextElementSibling.innerHTML = '請填寫客戶ID';
    }

    if (order_dateField.value.length === 0) {
      isPass = false;
      order_dateField.style.border = '1px solid red';
      order_dateField.nextElementSibling.innerHTML = '請填寫訂單日期';
    }

    if (isPass) {
      const fd = new FormData(document.form1);

      fetch('add-orders-api.php', {
          method: 'POST',
          body: fd,
        })
        .then(r => r.json())
        .then(data => {
          console.log(data);
          if (data.success) {
            myModal.show();
          } else {
            console.log('資料新增失敗');
          }
        }).catch(ex => {
          console.log('fetch() 發生錯誤, 回傳的 JSON 格式是錯的');
          console.log(ex);
        })
    }
  }

  const myModal = new bootstrap.Modal('#exampleModal');
</script>
<?php include __DIR__ . '/parts/html-foot.php' ?>
