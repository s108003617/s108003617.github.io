import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useInterval from '@/hooks/use-interval';
import { requestOtpToken, resetPassword } from '@/services/user';
import toast, { Toaster } from 'react-hot-toast';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [disableBtn, setDisableBtn] = useState(false);

  const [count, setCount] = useState(60);
  const [delay, setDelay] = useState(null);

  const router = useRouter();

  useInterval(() => {
    setCount(count - 1);
  }, delay);

  useEffect(() => {
    if (count <= 0) {
      setDelay(null);
      setDisableBtn(false);
    }
  }, [count]);

  const handleRequestOtpToken = async () => {
    if (delay !== null) {
      toast.error('錯誤 - 60s內無法重新獲得驗証碼');
      return;
    }

    const res = await requestOtpToken(email);

    if (res.data.status === 'success') {
      toast.success('資訊 - 驗証碼已寄送到電子郵件中');
      setCount(60);
      setDelay(1000);
      setDisableBtn(true);
    } else {
      toast.error(`錯誤 - ${res.data.message}`);
    }
  };

  const handleResetPassword = async () => {
    const res = await resetPassword(email, password, token);

    if (res.data.status === 'success') {
      toast.success('資訊 - 密碼已成功修改');
      // 等待 toast 消息顯示後再跳轉
      setTimeout(() => {
        router.push('/test/user'); // 假設登入頁面的路徑是 '/login'
      }, 2000);
    } else {
      toast.error(`錯誤 - ${res.data.message}`);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">忘記密碼</h2>
              <div className="alert alert-info" role="alert">
                <h5 className="alert-heading">測試前請先確認以下項目:</h5>
                <ul className="mb-0">
                  <li>SMTP寄信與可寄信的Email信箱</li>
                  <li>資料表otp與user都有符合後端api路由</li>
                  <li>後端api/reset-password路由先測通</li>
                </ul>
              </div>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">電子郵件信箱</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2 mb-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleRequestOtpToken}
                    disabled={disableBtn}
                  >
                    {delay ? `${count}秒後可以再次取得驗証碼` : '取得驗証碼'}
                  </button>
                </div>
                <div className="mb-3">
                  <label htmlFor="token" className="form-label">一次性驗証碼</label>
                  <input
                    type="text"
                    className="form-control"
                    id="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">新密碼</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleResetPassword}
                  >
                    重設密碼
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}