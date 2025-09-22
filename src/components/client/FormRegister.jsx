// Component Form Đăng Ký

import { useState } from "react";
import { SocialLogin } from "../FormSocialLogin";
const RegisterForm = ({ switchToLogin, onSocialLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    console.log('Đăng ký với:', formData);
    alert('Đăng ký thành công!');
  };

  return (
    <div className="form-section">
      <h2 className="form-title">Đăng Ký Tài Khoản</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="register-name">Họ và tên</label>
          <input
            type="text"
            id="register-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-phone">Số điện thoại</label>
          <input
            type="tel"
            id="register-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-email">Email</label>
          <input
            type="email"
            id="register-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-password">Mật khẩu</label>
          <input
            type="password"
            id="register-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-confirm-password">Xác nhận mật khẩu</label>
          <input
            type="password"
            id="register-confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-form">Đăng Ký</button>
        
        {/* <div className="social-login">
          <div className="social-title">
            <span>Hoặc đăng ký bằng</span>
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
        <SocialLogin onSocialLogin={onSocialLogin}/>
        <div className="form-footer">
          Bằng việc đăng ký, bạn đã đồng ý với <a href="#">Điều khoản sử dụng</a> và <a href="#">Chính sách bảo mật</a> của chúng tôi
        </div>
        
        <div className="switch-form">
          Đã có tài khoản? <span onClick={switchToLogin}>Đăng nhập ngay</span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;