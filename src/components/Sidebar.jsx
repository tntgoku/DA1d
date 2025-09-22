import React from 'react';

const Sidebar = ({ userData, activeTab, setActiveTab }) => {
  return (
    <div className="sidebar sidebar-user">
      <div className="user-info">
        <div className="avatar-small">
          <img src={userData.avatar} alt="Avatar" />
        </div>
        <div className="user-name">{userData.name}</div>
      </div>

      <div className="sidebar-menu">
        <div 
          className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <i className="fas fa-user"></i>
          <span>Thông tin tài khoản</span>
        </div>
        <div 
          className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <i className="fas fa-shopping-bag"></i>
          <span>Đơn hàng của tôi</span>
        </div>
        <div 
          className={`menu-item ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          <i className="fas fa-tools"></i>
          <span>Dịch vụ sửa chữa</span>
        </div>
        <div 
          className={`menu-item ${activeTab === 'wishlist' ? 'active' : ''}`}
          onClick={() => setActiveTab('wishlist')}
        >
          <i className="fas fa-heart"></i>
          <span>Sản phẩm yêu thích</span>
        </div>
        <div className="menu-item">
          <i className="fas fa-sign-out-alt"></i>
          <span>Đăng xuất</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
