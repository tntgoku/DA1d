import { useState } from 'react';
import { login as loginService } from '../service/Authentication';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    const requestData = {
      username: formData.email,
      passwordHash: formData.password
    };

    try {
      const data = await loginService(requestData.username, requestData.passwordHash);
      console.log('Login successful:', data);
      setIsLoggedIn(true);
      setUserInfo(data);
      return { success: true, data };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return {
    isLoading,
    isLoggedIn,
    userInfo,
    handleLogin,
    handleLogout
  };
};

// Keep backward compatibility
export const useAuthen = () => {
  const { handleLogin } = useLogin();
  
  const handleSubmit = (e, formData) => {
    e.preventDefault();
    handleLogin(formData)
      .then(result => {
        if (result.success) {
          alert('Đăng nhập thành công!');
        } else {
          alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        }
      });
  };

  return { handleSubmit };
};
