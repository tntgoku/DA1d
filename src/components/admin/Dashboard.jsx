import React, { useState,useEffect } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/admin/dashboard.css';
import {users, productsvariant, testOrders, repairs, reviews,testDiscountPeriods,testDiscounts} from '../../entity/Entity'; 
import DashboardSection from './DashboardSection';
import UsersSection from './User/UserSection';
import ProductsSection from './ProductsSection';
import OrdersSection from './Order/OrdersSection';
import RepairsSection from './RepairsSection';
// import ReviewsSection from './ReviewsSection';
import ReportsSection from './ReportsSection';
import SettingsSection from'./SettingsSection';
import { useLocation } from 'react-router-dom';
import { DiscountsSection } from './DiscountSection';
// Dữ liệu mẫu

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const products=productsvariant;
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
// Đồng bộ activeSection theo path
  useEffect(() => {
    const path = location.pathname.split("/").pop(); // lấy phần cuối của URL
    if (path) {
      setActiveSection(path);  // ví dụ "products"
    }
  }, [location]);
  const renderSection = () => {
    switch(activeSection) {
      case 'dashboard':
        return <DashboardSection users={users} products={products} orders={testOrders} repairs={repairs} sidebarOpen={sidebarOpen}/>;
      case 'users':
        return <UsersSection users={users} />;
      case 'products':
        return <ProductsSection products={products} />;
      case 'orders':
        return <OrdersSection orders={testOrders}  products={products}/>;
      case 'repairs':
        return <RepairsSection repairs={repairs} />;
      case 'discounts':
        return <DiscountsSection discounts={testDiscounts} discountPeriods={testDiscountPeriods} products={products} />
      // case 'reviews':
      //   return <ReviewsSection reviews={reviews} />;
      case 'reports':
        return <ReportsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <DashboardSection users={users} products={products} orders={orders} repairs={repairs} sidebarOpen={sidebarOpen}  />;
    }
  };

  return (
    <div className="App123">
      <button className={`btn btn-primary mobile-menu-btn ${sidebarOpen ? 'show' : ''}`} onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>
      
      <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
        <div className="user-info d-flex align-items-center">
          <img src="https://ui-avatars.com/api/?name=Admin+User&background=3498db&color=fff" alt="User" className="user-img" />
          <div>
            <h6 className="mb-0">Admin User</h6>
            <small>Quản trị viên</small>
          </div>
        </div>
        
        <ul className="nav  navbar-main">
          <li className="nav-item">
            <a className={`nav-link ${activeSection === 'dashboard' ? 'active' : ''}`} href="#" onClick={() => setActiveSection('dashboard')}>
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeSection === 'users' ? 'active' : ''}`} href="#" onClick={() => setActiveSection('users')}>
              <i className="fas fa-users"></i> Người dùng
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeSection === 'products' ? 'active' : ''}`} href="#" onClick={() => setActiveSection('products')}>
              <i className="fas fa-mobile-alt"></i> Sản phẩm
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeSection === 'orders' ? 'active' : ''}`} href="#" onClick={() => setActiveSection('orders')}>
              <i className="fas fa-shopping-cart"></i> Đơn hàng
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeSection === 'repairs' ? 'active' : ''}`} href="#" onClick={() => setActiveSection('repairs')}>
              <i className="fas fa-tools"></i> Sửa chữa
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeSection === 'discounts' ? 'active' : ''}`} href="#" onClick={() => setActiveSection('discounts')}>
              <i className="fas fa-tag"></i> Khuyến mãi
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeSection === 'reports' ? 'active' : ''}`} href="#" onClick={() => setActiveSection('reports')}>
              <i className="fas fa-chart-bar"></i> Báo cáo
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeSection === 'settings' ? 'active' : ''}`} href="#" onClick={() => setActiveSection('settings')}>
              <i className="fas fa-cog"></i> Cài đặt
            </a>
          </li>
          <li className="nav-item mt-4">
            <a className="nav-link" href="#">
              <i className="fas fa-sign-out-alt"></i> Đăng xuất
            </a>
          </li>
        </ul>
      </div>

      <div className={`main-content ${sidebarOpen ? 'with-sidebar' : ''}`}>
        {renderSection()}
      </div>
    </div>
  );
}


export default Dashboard;