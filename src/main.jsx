import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Detail from './page/Detail.jsx';
import ViewPayment from './page/ViewPayment.jsx';
import Cart from './page/Cart.jsx';
import AuthForms from './page/AuthForms.jsx';
import Account from './page/Account.jsx';
import Dashboard from './page/Dashboard.jsx';
import { CategoryPage } from './page/CategoryPage.jsx';
import { AuthProvider } from './hooks/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import NotificationProvider from './components/NotificationProvider';
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
          {/* Trang chủ */}
          <Route path="/" element={<App />} />
          
          {/* Authentication */}
          <Route path="/auth" element={<AuthForms/>}/>
          <Route path="/login" element={<AuthForms/>}/>
          <Route path="/register" element={<AuthForms/>}/>
          
          {/* User Account */}
          <Route path="/account" element={
            <ProtectedRoute>
              <Account/>
            </ProtectedRoute>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute>
              <Account/>
            </ProtectedRoute>
          }/>
          
          {/* Shopping */}
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<ViewPayment />} />
          
          {/* Product & Category */}
          <Route path="/detail" element={<Detail />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/:parentSlug/:childSlug?/:productSlug/:variantId" element={<Detail />} />
          <Route path="/:parentSlug/:childSlug?" element={<CategoryPage />} />
          
          {/* Admin - Protected with ADMIN role */}
          <Route path="/admin" element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          } />
          <Route path="/admin/*" element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          } />
          
          {/* 404 */}
          <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
,
)

