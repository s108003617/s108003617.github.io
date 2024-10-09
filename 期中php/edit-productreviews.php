<?php
require __DIR__. '/parts/admin-required.php';
require __DIR__ . '/config/pdo-connect.php';

$sid = isset($_GET['sid']) ? intval($_GET['sid']) : 0;

if (empty($sid)) {
  header('Location: list5.php');
  exit; # 結束 php 程式, die()
}

$sql = "SELECT * FROM ProductReviews WHERE sid=$sid";
$row = $pdo->query($sql)->fetch();

# 如果沒有這個編號的資料, 轉向回列表頁
if (empty($row)) {
  header('Location: list5.php');
  exit; # 結束 php 程式, die()
}

$title = '編輯商品評論';

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
          <h5 class="card-title">編輯商品評論資料</h5>
          <form name="form1" onsubmit="sendData(event)">
            <input type="hidden" name="sid" value="<?= $row['sid'] ?>">
            <div class="mb-3">
              <label for="sid" class="form-label">編號</label>
              <input type="text" class="form-control" value="<?= $row['sid'] ?>" disabled>
            </div>
            <div class="mb-3">
              <label for="product_id" class="form-label"><span class="required">**</span> 商品ID</label>
              <input type="number" class="form-control" id="product_id" name="product_id" value="<?= $row['product_id'] ?>">
              <div class="form-text"></div>
            </div>

            <div class="mb-3">
              <label for="user_id" class="form-label"><span class="required">**</span> 使用者ID</label>
              <input type="number" class="form-control" id="user_id" name="user_id" value="<?= $row['user_id'] ?>">
              <div class="form-text"></div>
            </div>

            <div class="mb-3">
              <label for="review_text" class="form-label"><span class="required">**</span> 評論內容</label>
              <textarea class="form-control" id="review_text" name="review_text" rows="3"><?= $row['review_text'] ?></textarea>
              <div class="form-text"></div>
            </div>

            <div class="mb-3">
              <label for="rating" class="form-label">評分</label>
              <input type="number" class="form-control" id="rating" name="rating" min="1" max="5" value="<?= $row['rating'] ?>">
              <div class="form-text"></div>
            </div>

            <div class="mb-3">
              <label for="review_date" class="form-label">評論日期</label>
              <input type="date" class="form-control" id="review_date" name="review_date" value="<?= $row['review_date'] ?>">
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
          商品評論資料修改成功
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">繼續修改</button>
        <a href="list5.php" class="btn btn-primary">到列表頁</a>
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
          資料沒有修改
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">繼續修改</button>
        <a href="list5.php" class="btn btn-primary">到列表頁</a>
      </div>
    </div>
  </div>
</div>
<?php include __DIR__ . '/parts/scripts.php' ?>
<script>
  const productIDField = document.form1.product_id;
  const userIDField = document.form1.user_id;
  const reviewTextField = document.form1.review_text;
  const ratingField = document.form1.rating;
  const reviewDateField = document.form1.review_date;

  function validateRating(rating) {
    // 檢查評分是否在範圍內
    return rating >= 1 && rating <= 5;
  }

  const sendData = e => {
    e.preventDefault();

    // 回復沒有提示的狀態
    productIDField.style.border = '1px solid #CCCCCC';
    productIDField.nextElementSibling.innerHTML = '';
    userIDField.style.border = '1px solid #CCCCCC';
    userIDField.nextElementSibling.innerHTML = '';
    reviewTextField.style.border = '1px solid #CCCCCC';
    reviewTextField.nextElementSibling.innerHTML = '';
    ratingField.style.border = '1px solid #CCCCCC';
    ratingField.nextElementSibling.innerHTML = '';
    reviewDateField.style.border = '1px solid #CCCCCC';
    reviewDateField.nextElementSibling.innerHTML = '';

    let isPass = true; // 有沒有通過檢查

    // TODO: 要做欄位資料檢查
    if (productIDField.value === '') {
      isPass = false;
      // 跳提示用戶
      productIDField.style.border = '1px solid red';
      productIDField.nextElementSibling.innerHTML = '請填寫商品ID';
    }

    if (userIDField.value === '') {
      isPass = false;
      userIDField.style.border = '1px solid red';
      userIDField.nextElementSibling.innerHTML = '請填寫使用者ID';
    }

    if (reviewTextField.value === '') {
      isPass = false;
      reviewTextField.style.border = '1px solid red';
      reviewTextField.nextElementSibling.innerHTML = '請填寫評論內容';
    }

    if (!validateRating(ratingField.value)) {
      isPass = false;
      ratingField.style.border = '1px solid red';
      ratingField.nextElementSibling.innerHTML = '請填寫正確的評分，介於1到5之間';
    }

    if (reviewDateField.value === '') {
      isPass = false;
      reviewDateField.style.border = '1px solid red';
      reviewDateField.nextElementSibling.innerHTML = '請填寫評論日期';
    }

    // 如果欄位資料都有通過檢查
    if (isPass) {
      const fd = new FormData(document.form1); // 建立一個只有資料的表單物件

      fetch('edit-productreviews-api.php', {
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
