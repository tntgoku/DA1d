import React from 'react';
import UsersSection from '../../components/admin/User/UserSection';
/**
 * User Management Page Component
 * Clean Architecture - Page Layer
 * 
 * This page component serves as the main entry point for user management functionality.
 * It follows Clean Architecture principles by:
 * - Being a pure presentation component
 * - Delegating business logic to hooks and services
 * - Having no direct API calls or state management
 * - Focusing only on layout and composition
 */
const UserManagementPage = () => {
  return (
    <div className="user-management-page">
      {/* Page Header */}
      <div className="page-header mb-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h1 className="page-title">
                <i className="fas fa-users me-2"></i>
                Quản lý người dùng
              </h1>
              <p className="page-description text-muted">
                Quản lý thông tin, vai trò và trạng thái của người dùng trong hệ thống
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-content">
        <div className="container-fluid">
          <UsersSection />
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
