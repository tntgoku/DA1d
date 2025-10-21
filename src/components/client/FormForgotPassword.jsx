import React, { useState } from 'react';
import '../../css/client/AuthForms.css';
import { useNotificationContext } from '../NotificationProvider';
import { forgotPassword } from '../../services/Authentication';
const ForgotPasswordForm = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showSuccess, showError } = useNotificationContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await forgotPassword(formData.email);
      console.log('Forgot password response:', response);
      showSuccess('Email reset mật khẩu đã được gửi thành công!');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Forgot password failed:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Không thể gửi email reset mật khẩu. Vui lòng thử lại.';
      showError(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="form-section">
        <h2 className="form-title">Email đã được gửi</h2>
        <div className="success-message">
          <p>Chúng tôi đã gửi link reset mật khẩu đến email <strong>{formData.email}</strong></p>
          <p>Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.</p>
        </div>
        <div className="form-footer">
          <span onClick={switchToLogin}>Quay lại đăng nhập</span>
        </div>
      </div>
    );
  }

  return (
    <div className="form-section">
      <h2 className="form-title">Quên mật khẩu</h2>
      <p className="form-description">
        Nhập email của bạn để nhận link reset mật khẩu
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="forgot-email">Email</label>
          <input
            type="email"
            id="forgot-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Nhập email của bạn"
          />
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          className="btn btn-form"
          disabled={loading}
        >
          {loading ? 'Đang gửi...' : 'Gửi link reset'}
        </button>
        
        <div className="form-footer">
          <span onClick={switchToLogin}>Quay lại đăng nhập</span>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
