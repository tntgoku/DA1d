import React from 'react';

const Profile = ({ userData, setUserData, isEditing, setIsEditing }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Thông tin đã được cập nhật!');
  };

  const handleCancel = () => {
    setIsEditing(false);
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
            <button className="btn-primary" onClick={handleSave}>Lưu thay đổi</button>
            <button className="btn-outline" onClick={handleCancel}>Hủy</button>
          </div>
        ) : (
          <button className="btn-primary  btn-outline" onClick={() => setIsEditing(true)}>
            Chỉnh sửa thông tin
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
