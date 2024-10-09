<?php
require __DIR__. '/parts/admin-required.php';

if(! isset($_SESSION)) {
  # 如果沒有設定 $_SESSION, 才啟動
  session_start();
}
$title = '新增員工資料';
$pageName = 'employee_add';

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
              <label for="name" class="form-label"><span class="required">**</span> 姓名</label>
              <input type="text" class="form-control" id="name" name="name">
              <div class="form-text"></div>
            </div>

            <div class="mb-3">
              <label for="department" class="form-label"><span class="required">**</span> 部門</label>
              <input type="text" class="form-control" id="department" name="department">
              <div class="form-text"></div>
            </div>

            <div class="mb-3">
              <label for="position" class="form-label">職位</label>
              <input type="text" class="form-control" id="position" name="position">
              <div class="form-text"></div>
            </div>

            <div class="mb-3">
              <label for="hire_date" class="form-label">入職日期</label>
              <input type="date" class="form-control" id="hire_date" name="hire_date">
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
        <a href="list3.php" class="btn btn-primary">到列表頁</a>
      </div>
    </div>
  </div>
</div>
<?php include __DIR__ . '/parts/scripts.php' ?>
<script>
  const nameField = document.form1.name;

  const sendData = e => {
    e.preventDefault();

    // 回復沒有提示的狀態
    nameField.style.border = '1px solid #CCCCCC';
    nameField.nextElementSibling.innerHTML = '';

    let isPass = true; // 有沒有通過檢查

    // 檢查欄位資料
    if (nameField.value.length < 2) {
      isPass = false;
      // 跳提示用戶
      nameField.style.border = '1px solid red';
      nameField.nextElementSibling.innerHTML = '請填寫正確的姓名';
    }

    // 如果欄位資料都有通過檢查
    if (isPass) {
      const fd = new FormData(document.form1); // 建立一個只有資料的表單物件

      fetch('add-employee-api.php', {
          method: 'POST',
          body: fd, // 預設的 Content-Type: multipart/form-data
        })
        .then(r => r.json())
        .then(data => {
          console.log(data);
          if (data.success) {
            myModal.show();
          } else {
            console.log(`資料新增失敗`);
          }
        }).catch(ex => {
          console.log(`fetch() 發生錯誤, 回傳的 JSON 格式是錯的`);
          console.log(ex);
        })
    }
  }

  const myModal = new bootstrap.Modal('#exampleModal');
</script>
<?php include __DIR__ . '/parts/html-foot.php' ?>
