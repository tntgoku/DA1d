import { useState } from 'react';
import { login as loginService } from '../services/Authentication';
import { useAuth } from '../hooks/AuthContext';
import { useNotificationContext } from '../components/NotificationProvider';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login: authLogin, logout: authLogout } = useAuth();
  const { showSuccess, showError } = useNotificationContext();

  const handleLogin = async (formData) => {
    setIsLoading(true);
    const requestData = {
      username: formData.email,
      passwordHash: formData.password
    };

    try {
      const data = await loginService(requestData.username, requestData.passwordHash);
      console.log('Login successful:', data);
      
      // Extract user data from response for auth context
      const userData = data && data.data ? {
        name: data.data.name,
        email: requestData.username,
        token: data.data.token
      } : null;
        console.log('User data:', userData);
      // Update auth context with user data
      if (userData && userData.token) {
        authLogin(userData);
        showSuccess('Đăng nhập thành công!');
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Login failed:', error);
      
      // Show error notification based on error type
      let errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    authLogout();
  };

  return {
    isLoading,
    handleLogin,
    handleLogout
  };
};

// Keep backward compatibility
export const useAuthen = () => {
  const { handleLogin } = useLogin();
  const { showError } = useNotificationContext();
  const handleSubmit = (e, formData) => {
    e.preventDefault();
    handleLogin(formData)
      .then(result => {
        if (result.success) {
          // Redirect to home page after successful login
          console.log('Redirecting to home page', result.data.status);
          if(result.data.status === 200) {
            window.location.href = '/';
          } if(result.data.status === 401){
            showError('Mật khẩu hoặc email không đúng. Vui lòng kiểm tra lại.');
          } else {
            showError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
          }
          // window.location.href = '/';
        }
        // Error notifications are already handled in handleLogin
      });
  };

  return { handleSubmit };
};
