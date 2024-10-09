import React, { useState, useEffect } from 'react';
import {
  updateProfile,
  getUserById,
  updateProfileAvatar,
} from '@/services/user';
import { useAuth } from '@/hooks/use-auth';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import PreviewUploadImage from '@/components/user-test/preview-upload-image';
import { avatarBaseUrl } from '@/configs';

const initUserProfile = {
  name: '',
  sex: '',
  phone: '',
  birth_date: '',
  avatar: '',
};

export default function Profile() {
  const { auth } = useAuth();
  const [userProfile, setUserProfile] = useState(initUserProfile);
  const [hasProfile, setHasProfile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const getUserData = async (id) => {
    const res = await getUserById(id);
    if (res.data.status === 'success') {
      const dbUser = res.data.data.user;
      const dbUserProfile = { ...initUserProfile };
      for (const key in dbUserProfile) {
        if (Object.hasOwn(dbUser, key)) {
          dbUserProfile[key] = dbUser[key] || '';
        }
      }
      setUserProfile(dbUserProfile);
      toast.success('會員資料載入成功');
    } else {
      toast.error('會員資料載入失敗');
    }
  };

  useEffect(() => {
    if (auth.isAuth) {
      getUserData(auth.userData.id);
    }
  }, [auth]);

  useEffect(() => {
    if (userProfile.name) {
      setHasProfile(true);
    }
  }, [userProfile]);

  const handleFieldChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { avatar, ...user } = userProfile;
    const res = await updateProfile(auth.userData.id, user);

    if (selectedFile) {
      const formData = new FormData();
      formData.append('avatar', selectedFile);
      const res2 = await updateProfileAvatar(formData);
      if (res2.data.status === 'success') {
        toast.success('會員頭像修改成功');
      }
    }

    if (res.data.status === 'success') {
      toast.success('會員資料修改成功');
    } else {
      toast.error('會員資料修改失敗');
    }
  };

  if (!auth.isAuth) return null;

  return (
    <div className="container-fluid">
      <div className="row">
        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link href="/dashboard" className="nav-link active">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/test/user/profile" className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/test/user/profile-password" className="nav-link">
                  Change Password
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">會員資料修改(一般)</h1>
          </div>

          <p className="text-muted">
            規則: username與email不能修改(這與註冊機制或網站會員的安全機制的有關)
          </p>
          <p className="text-muted">
            注意: 密碼不在這裡修改，因機制不一樣，在
            <Link href="/test/user/profile-password" className="text-decoration-none">會員資料修改(密碼)</Link>
          </p>

          <div className="mb-4">
            {hasProfile ? (
              <PreviewUploadImage
                avatarImg={userProfile.avatar}
                avatarBaseUrl={avatarBaseUrl}
                setSelectedFile={setSelectedFile}
                selectedFile={selectedFile}
              />
            ) : (
              <div>
                <img src="/blank.webp" alt="" width="200" height="200" className="img-fluid" />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">姓名</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={userProfile.name}
                onChange={handleFieldChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">姓別</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sex"
                    id="male"
                    value="男"
                    checked={userProfile.sex === '男'}
                    onChange={handleFieldChange}
                  />
                  <label className="form-check-label" htmlFor="male">男</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sex"
                    id="female"
                    value="女"
                    checked={userProfile.sex === '女'}
                    onChange={handleFieldChange}
                  />
                  <label className="form-check-label" htmlFor="female">女</label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">電話</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={userProfile.phone}
                onChange={handleFieldChange}
                maxLength={10}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="birth_date" className="form-label">生日</label>
              <input
                type="date"
                className="form-control"
                id="birth_date"
                name="birth_date"
                value={userProfile.birth_date}
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