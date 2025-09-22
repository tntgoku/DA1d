import React, { useState } from 'react';
import '../css/client/Account.css';
import Sidebar from '../components/Sidebar';
import Profile from '../components/client/Account/Profile';
import OrderHistory from '../components/client/Account/OrderHistory';
import ServiceHistory from '../components/client/Account/ServicesHistory';
import Wishlist from '../components/client/WishList';
import Header from '../components/client/Header';
import Footer from '../components/client/Footer';
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

  const [orders] = useState([
    {
      id: 'DH001',
      date: '15/08/2023',
      products: [
        { name: 'iPhone 12 Pro Max 128GB', price: '18.500.000đ', quantity: 1 },
        { name: 'Ốp lưng chống sốc', price: '250.000đ', quantity: 1 }
      ],
      total: '18.750.000đ',
      status: 'Đã giao'
    },
    {
      id: 'DH002',
      date: '10/09/2023',
      products: [
        { name: 'Samsung Galaxy S21 Ultra', price: '21.900.000đ', quantity: 1 },
        { name: 'Tai nghe Bluetooth', price: '850.000đ', quantity: 1 },
        { name: 'Miếng dán cường lực', price: '150.000đ', quantity: 2 }
      ],
      total: '23.050.000đ',
      status: 'Đang giao'
    }
  ]);

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
