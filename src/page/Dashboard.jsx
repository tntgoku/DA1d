import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/admin/dashboard.css';
import { users, testOrders, repairs, reviews, testDiscountPeriods, testDiscounts } from '../entity/Entity';
import DashboardSection from '../components/admin/DashboardSection';
import UsersSection from '../components/admin/User/UserSection';
import ProductsSection from '../components/admin/ProductsSection';
import OrdersSection from '../components/admin/Order/OrdersSection';
import RepairsSection from '../components/admin/RepairsSection';
import ReportsSection from '../components/admin/ReportsSection';
import SettingsSection from '../components/admin/SettingsSection';
import { useLocation } from 'react-router-dom';
import { DiscountsSection } from '../components/admin/DiscountSection';
import { productService } from '../services/productService'; 
import { ProductVariantGroup } from '../entity/Object/ProductVariantGroup';
import { Variant } from '../entity/Object/Variant';
import { Product } from '../entity/Object/Product';
import { VariantColor } from '../entity/Object/VariantColor';
import { OrderService } from '../services/OrderService';
import { logout } from '../services/Authentication';
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]); // ✅ lưu sản phẩm thật vào state
  const [loading, setLoading] = useState(true);
  const[orders,setOrders]=useState([]);
 const [products1, setProducts1] = useState([]);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProduct();
        const productsWithGroupedVariants = data.map(p => {
          const groupedVariants = p.getVariantsGroupedByColor();
          return new ProductVariantGroup({
            ...p,            // giữ nguyên tất cả thông tin
            variants: groupedVariants, // gán variants đã group
          });
        });
        console.log("productsWithGroupedVariants",productsWithGroupedVariants);
        setProducts(productsWithGroupedVariants);
        try {
          const dataorder = await OrderService.getall();
      
        setOrders(dataorder);
        console.log("dataorder", dataorder);
        } catch (orderError) {
          console.warn("Không thể lấy dữ liệu orders:", orderError);
          // Set empty orders array if access denied
          setOrders([]);
        }
      } catch (error) {
        console.error('❌ Lỗi khi lấy sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔄 Đồng bộ activeSection theo URL
  useEffect(() => {
    const path = location.pathname.split("/").pop();
      console.log("/path",path);
    if (path) setActiveSection(path);
  }, [location]);
  const renderSection = () => {
    if (loading) return <h4 className="text-center mt-5">Đang tải dữ liệu sản phẩm...</h4>;

    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection users={users} products={products1} orders={orders} repairs={repairs} sidebarOpen={sidebarOpen} />;
      case 'users':
        return <UsersSection users={users} />;
      case 'product':
        return <ProductsSection Listproducts={products} />;
      case 'orders':
        return <OrdersSection orders={orders} products={products} />;
      case 'repairs':
        return <RepairsSection repairs={repairs} />;
      case 'discounts':
        return <DiscountsSection discounts={testDiscounts} discountPeriods={testDiscountPeriods} products={products} />;
      case 'reports':
        return <ReportsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <DashboardSection users={users} products={products} orders={orders} repairs={repairs} sidebarOpen={sidebarOpen} />;
    }
  };

  return (
    <div className="App123">
      <button
        className={`btn btn-primary mobile-menu-btn ${sidebarOpen ? 'show' : ''}`}
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
        <div className="user-info d-flex align-items-center">
          <img
            src="https://ui-avatars.com/api/?name=Admin+User&background=3498db&color=fff"
            alt="User"
            className="user-img"
          />
          <div>
            <h6 className="mb-0">Admin User</h6>
            <small>Quản trị viên</small>
          </div>
        </div>

        <ul className="nav navbar-main">
          {[
            ['dashboard', 'fa-tachometer-alt', 'Dashboard'],
            ['users', 'fa-users', 'Người dùng'],
            ['product', 'fa-mobile-alt', 'Sản phẩm'],
            ['orders', 'fa-shopping-cart', 'Đơn hàng'],
            ['repairs', 'fa-tools', 'Sửa chữa'],
            ['discounts', 'fa-tag', 'Khuyến mãi'],
            ['reports', 'fa-chart-bar', 'Báo cáo'],
            ['settings', 'fa-cog', 'Cài đặt'],
          ].map(([key, icon, label]) => (
            <li key={key} className="nav-item">
              <a
                className={`nav-link ${activeSection === key ? 'active' : ''}`}
                href="#"
                onClick={() => setActiveSection(key)}
              >
                <i className={`fas ${icon}`}></i> {label}
              </a>
            </li>
          ))}

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
};

export default Dashboard;
