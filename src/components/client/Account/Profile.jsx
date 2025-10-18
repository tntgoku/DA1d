import React, { useState } from 'react';
import { updateProfile } from '../../../services/Authentication';
import { useNotificationContext } from '../../NotificationProvider';
const Profile = ({ userData, setUserData, isEditing, setIsEditing }) => {
  const [saving, setSaving] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const { showSuccess, showError, showWarning } = useNotificationContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Map userData to backend format
      const profileData = {
        fullName: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address
      };
      
      console.log('Updating profile with data:', profileData);
      
      const response = await updateProfile(profileData);
      console.log('Profile update response:', response);
      console.log('Response status:', response?.status);
      console.log('Response data:', response?.data);
      
          if (response && response.status === 200) {
            showSuccess('Thông tin đã được cập nhật thành công!');
            setIsEditing(false);
            
            // Update localStorage with new data
            const updatedUserData = {
              name: userData.name,
              email: userData.email,
              token: localStorage.getItem('token')
            };
            localStorage.setItem('user', JSON.stringify(updatedUserData));
          } else {
            showError('Có lỗi xảy ra khi cập nhật thông tin');
          }
        } catch (error) {
          console.error('Error updating profile:', error);
          const errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi cập nhật thông tin';
          showError(errorMessage);
        } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChangePassword = async () => {
    try {
        // Validate password
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          showWarning('Mật khẩu mới và xác nhận mật khẩu không khớp!');
          return;
        }

        if (passwordData.newPassword.length < 6) {
          showWarning('Mật khẩu mới phải có ít nhất 6 ký tự!');
          return;
        }

      setSaving(true);

      const passwordUpdateData = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      };

      console.log('Changing password...');
      
      const response = await updateProfile(passwordUpdateData);
      console.log('Password change response:', response);
      
          if (response && response.status === 200) {
            showSuccess('Đổi mật khẩu thành công!');
            setShowPasswordSection(false);
            setPasswordData({
              currentPassword: '',
              newPassword: '',
              confirmPassword: ''
            });
          } else {
            showError('Có lỗi xảy ra khi đổi mật khẩu');
          }
        } catch (error) {
          console.error('Error changing password:', error);
          const errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi đổi mật khẩu';
          showError(errorMessage);
        } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-section">
      <div className="avatar-section">
        <div className="avatar">
          <img src={userData.avatar} alt="Avatar" />
          {isEditing && (
            <div className="avatar-overlay">
              <label htmlFor="avatar-upload" className="avatar-upload-btn">
                <i className="fas fa-camera"></i>
              </label>
              <input type="file" id="avatar-upload" style={{ display: 'none' }} />
            </div>
          )}
        </div>
        <h2>{userData.name}</h2>
        <p>Thành viên từ: Tháng 8, 2023</p>
      </div>

      <div className="profile-form">
        <h3>Thông tin cá nhân</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Họ và tên</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
              />
            ) : (
              <div className="info-text">{userData.name}</div>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                disabled={true}
              />
            ) : (
              <div className="info-text">{userData.email}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Số điện thoại</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
              />
            ) : (
              <div className="info-text">{userData.phone}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Địa chỉ</label>
            {isEditing ? (
              <textarea
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                rows="3"
              />
            ) : (
              <div className="info-text">{userData.address}</div>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="form-actions">
            <button 
              className="btn-primary" 
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
            <button 
              className="btn-outline" 
              onClick={handleCancel}
              disabled={saving}
            >
              Hủy
            </button>
          </div>
        ) : (
          <div className="form-actions">
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              Chỉnh sửa thông tin
            </button>
            <button 
              className="btn-outline" 
              onClick={() => setShowPasswordSection(!showPasswordSection)}
            >
              {showPasswordSection ? 'Hủy đổi mật khẩu' : 'Đổi mật khẩu'}
            </button>
          </div>
        )}

        {/* Password Change Section */}
        {showPasswordSection && (
          <div className="password-section" style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>Đổi mật khẩu</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Mật khẩu hiện tại</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Mật khẩu mới</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập mật khẩu mới"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>
            </div>
            <div className="form-actions">
              <button 
                className="btn-primary" 
                onClick={handleChangePassword}
                disabled={saving}
              >
                {saving ? 'Đang đổi mật khẩu...' : 'Đổi mật khẩu'}
              </button>
              <button 
                className="btn-outline" 
                onClick={() => {
                  setShowPasswordSection(false);
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                }}
                disabled={saving}
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
