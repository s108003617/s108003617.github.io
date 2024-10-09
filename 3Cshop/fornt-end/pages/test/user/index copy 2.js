import React, { useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { initUserData, useAuth } from '@/hooks/use-auth';
import { checkAuth, login, logout, getUserById } from '@/services/user';
import { Toaster, toast } from 'react-hot-toast';

const parseJwt = (token) => {
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  return JSON.parse(payload.toString());
};

export default function UserTest() {
  const [user, setUser] = useState({ username: '', password: '' });
  const { setAuth } = useAuth();
  const router = useRouter();

  const handleFieldChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const res = await login(user);
    if (res.data.status === 'success') {
      const jwtUser = parseJwt(res.data.data.accessToken);
      const res1 = await getUserById(jwtUser.id);
      if (res1.data.status === 'success') {
        const dbUser = res1.data.data.user;
        const userData = { ...initUserData };
        for (const key in userData) {
          if (Object.hasOwn(dbUser, key)) {
            userData[key] = dbUser[key];
          }
        }
        setAuth({ isAuth: true, userData });
        toast.success('已成功登入');
        // Redirect to profile page after successful login
        router.push('/test/user/profile');
      } else {
        toast.error('登入後無法得到會員資料');
      }
    } else {
      toast.error(`登入失敗`);
    }
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res.data.status === 'success') {
      toast.success('已成功登出');
      setAuth({ isAuth: false, userData: initUserData });
    } else {
      toast.error(`登出失敗`);
    }
  };

  const handleCheckAuth = async () => {
    const res = await checkAuth();
    if (res.data.status === 'success') {
      toast.success('已登入會員');
    } else {
      toast.error(`非會員身份`);
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title className="text-center mb-4">會員登入認証&授權測試(JWT)</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>帳號:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={user.username}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>密碼:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="secondary" onClick={() => setUser({ username: 'herry', password: '11111' })}>
                一鍵輸入範例
              </Button>
              <Button variant="primary" onClick={handleLogin}>登入(login)</Button>
              <Button variant="danger" onClick={handleLogout}>登出(logout)</Button>
              <Button variant="info" onClick={handleCheckAuth}>檢查登入狀況(check login)</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Body>
          <Card.Title>測試連結</Card.Title>
          <Alert variant="info">
            以下連結為測試會員註冊與更新個人資料
          </Alert>
          <ul className="list-group">
            <li className="list-group-item"><Link href="/test/user/register">註冊(不需登入)</Link></li>
            <li className="list-group-item"><Link href="/test/user/profile">修改個人資料(一般)(需登入)</Link></li>
            <li className="list-group-item"><Link href="/test/user/profile-password">修改個人資料(密碼)(需登入)</Link></li>
          </ul>
          <Alert variant="warning" className="mt-3">
            以下連結為測試會員隱私資料頁，如果未登入完成會跳轉回登入頁(本頁)，實作程式碼詳見useAuth勾子
          </Alert>
          <ul className="list-group">
            <li className="list-group-item"><Link href="/test/user/status">存取會員隱私資料</Link></li>
          </ul>
          <Alert variant="secondary" className="mt-3">
            以下連結為第三方整合，在測試或整合前，務必先看說明文件先準備好資料
          </Alert>
          <ul className="list-group">
            <li className="list-group-item"><Link href="/test/user/google-login">Google第三方登入(firebase, 重定向, JWT)</Link></li>
            <li className="list-group-item"><Link href="/test/user/line-login">Line第三方登入(重定向, JWT)</Link></li>
          </ul>
          <Alert variant="info" className="mt-3">
            以下連結為忘記密碼與OTP整合，在測試或整合前，務必先看說明文件先準備好資料
          </Alert>
          <ul className="list-group">
            <li className="list-group-item"><Link href="/test/user/forget-password">忘記密碼(OTP, 一次性密碼)</Link></li>
          </ul>
        </Card.Body>
      </Card>
      <Toaster />
    </Container>
  );
}