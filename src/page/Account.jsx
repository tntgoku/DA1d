import React, { useState,useEffect } from 'react';
import '../css/client/Account.css';
import Sidebar from '../components/Sidebar';
import Profile from '../components/client/Account/Profile';
import OrderHistory from '../components/client/Account/OrderHistory';
import ServiceHistory from '../components/client/Account/ServicesHistory';
import Wishlist from '../components/client/WishList';
import Header from '../components/client/Header';
import Footer from '../components/client/Footer';
import { testOrders } from '../entity/Entity';
const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    avatar: 'https://via.placeholder.com/150'
  });

  const [orders,setOrders] = useState([]);
useEffect(() => {
  setOrders(testOrders); // nạp dữ liệu testOrders khi component mount
}, []);
  const [services] = useState([
    {
      id: 'DV001',
      date: '05/10/2023',
      device: 'iPhone 11',
      issue: 'Thay màn hình',
      status: 'Hoàn thành',
      cost: '1.200.000đ'
    },
    {
      id: 'DV002',
      date: '20/10/2023',
      device: 'Samsung Galaxy Note 10',
      issue: 'Thay pin',
      status: 'Đang xử lý',
      cost: '750.000đ'
    }
  ]);

  return (
    <>
    
    <Header/>
    <div className="account-container">
      <div className="account-header">
        <h1>Tài khoản của tôi</h1>
        <p>Quản lý thông tin cá nhân và theo dõi đơn hàng của bạn</p>
      </div>

      <div className="account-content">
        <Sidebar 
          userData={userData} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        <div className="main-content">
          {activeTab === 'profile' && (
            <Profile 
              userData={userData} 
              setUserData={setUserData} 
              isEditing={isEditing} 
              setIsEditing={setIsEditing} 
            />
          )}
          {activeTab === 'orders' && <OrderHistory orders={orders} />}
          {activeTab === 'services' && <ServiceHistory services={services} />}
          {activeTab === 'wishlist' && <Wishlist />}
        </div>
      </div>
    </div>
          <Footer/>
    </>
  );
};

export default Account;
