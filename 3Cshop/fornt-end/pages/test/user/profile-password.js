import React, { useState } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { updatePassword } from '@/services/user';
import { useAuth } from '@/hooks/use-auth';

const initUserPassword = {
  origin: '',
  new: '',
  confirm: '',
};

export default function PasswordChange() {
  const { auth } = useAuth();
  const [userPassword, setUserPassword] = useState(initUserPassword);

  const handleFieldChange = (e) => {
    setUserPassword({ ...userPassword, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userPassword.new || !userPassword.origin || !userPassword.confirm) {
      toast.error('密碼欄位為必填');
      return;
    }

    if (userPassword.new !== userPassword.confirm) {
      toast.error('新密碼與確認密碼不同');
      return;
    }

    const password = { origin: userPassword.origin, new: userPassword.new };
    const res = await updatePassword(auth.userData.id, password);

    if (res.data.status === 'success') {
      toast.success('會員密碼修改成功');
      setUserPassword(initUserPassword); // Reset form after successful change
    } else {
      toast.error('會員密碼修改失敗');
    }
  };

  if (!auth.isAuth) return null;

  return (
    <div className="container-fluid d-flex flex-column vh-100">
      <div className="row flex-grow-1">
        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link href="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/test/user/profile" className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/test/user/profile-password" className="nav-link active">
                  Change Password
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex flex-column">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">會員資料修改(密碼)</h1>
          </div>

          <p className="text-muted">
            規則: 需要輸入目前密碼(原密碼)在伺服器上驗証通過後，才能更新密碼
          </p>
          <p className="text-muted">
            注意: 這頁面沒有初始載入的動作。一般會員資料不在這裡修改，因機制不一樣，在
            <Link href="/test/user/profile" className="text-decoration-none">會員資料修改(一般)</Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-4 flex-grow-1">
            <div className="mb-3">
              <label htmlFor="origin" className="form-label">目前密碼</label>
              <input
                type="password"
                className="form-control"
                id="origin"
                name="origin"
                value={userPassword.origin}
                onChange={handleFieldChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="new" className="form-label">新密碼</label>
              <input
                type="password"
                className="form-control"
                id="new"
                name="new"
                value={userPassword.new}
                onChange={handleFieldChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirm" className="form-label">新密碼確認</label>
              <input
                type="password"
                className="form-control"
                id="confirm"
                name="confirm"
                value={userPassword.confirm}
                onChange={handleFieldChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">修改</button>
          </form>
        </main>
      </div>
      <Toaster />
    </div>
  );
}