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
import { getProfile } from '../services/Authentication';
import { useAuth } from '../hooks/AuthContext';
const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: 'https://via.placeholder.com/150'
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      window.location.href = "/auth";
      return;
    }

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await getProfile();
        
        if (response && response.data) {
          const profileData = response.data;
          setUserData({
            name: profileData.fullName || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            address: profileData.address || '',
            avatar: profileData.avatar || 'https://via.placeholder.com/150'
          });
          
          // Lấy danh sách đơn hàng từ profile
          if (profileData.listorder) {
            setOrders(profileData.listorder);
          } else {
            setOrders(testOrders); // fallback to test data
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Không thể tải thông tin người dùng');
        
        // Nếu lỗi 401, chuyển hướng đến trang đăng nhập
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/auth";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
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

  if (loading) {
    return (
      <>
        <Header/>
        <div className="account-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Đang tải thông tin...</p>
          </div>
        </div>
        <Footer/>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header/>
        <div className="account-container">
          <div className="error-container">
            <h2>Lỗi</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Thử lại</button>
          </div>
        </div>
        <Footer/>
      </>
    );
  }

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

        <div className="main-content-account">
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
