import React, { useState } from 'react';
import '../../css/client/AuthForms.css';
import { SocialLogin } from '../FormSocialLogin';
import { login as loginService } from '../../service/Authentication';
// Component Form Đăng Nhập
const LoginForm = ({ switchToRegister, onSocialLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Đăng nhập với:', formData.email, formData.password);
    // alert('Đăng nhập thành công!');
    // Gọi API đăng nhập
    loginService(formData.email, formData.password)
      .then(data => {
        console.log('Login successful:', data);
        alert('Đăng nhập thành công!');
      })
      .catch(error => {
        console.error('Login failed:', error);
        alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      });
  };

  return (
    <div className="form-section">
      <h2 className="form-title">Đăng Nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-email">Email hoặc Số điện thoại</label>
          <input
            type="text"
            id="login-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Mật khẩu</label>
          <input
            type="password"
            id="login-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-form">Đăng Nhập</button>
        
        <div className="forgot-password">
          <a href="#">Quên mật khẩu?</a>
        </div>
        
        {/* <div className="social-login">
          <div className="social-title">
            <span>Hoặc đăng nhập bằng</span>
          </div>
          <div className="social-buttons">
            <button 
              type="button" 
              className="social-btn facebook"
              onClick={() => onSocialLogin('Facebook')}
            >
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
            <button 
              type="button" 
              className="social-btn google"
              onClick={() => onSocialLogin('Google')}
            >
              <i className="fab fa-google"></i> Google
            </button>
          </div>
        </div> */}
        <SocialLogin  onSocialLogin={onSocialLogin}/>
        <div className="switch-form">
          Chưa có tài khoản? <span onClick={switchToRegister}>Đăng ký ngay</span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;