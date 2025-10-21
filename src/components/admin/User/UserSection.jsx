import React, { useState } from 'react';
import { UserModal } from './UserModal';
import { ItemUser } from './ItemUser';
import { UserPagination } from '../UserPagination';
import { UserFilter } from '../../Filter/UserFilter';
import { useUserManagement } from '../../../hooks/useUserManagement';

const UsersSection = () => {
  // Use custom hook for user management
  const {
    users,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    searchTerm,
    filters,
    filteredUsers,
    showModal,
    editingUser,
    formData,
    loadUsers,
    searchUsers,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    resetUserPassword,
    makeAdmin,
    makeUser,
    handleInputChange,
    openCreateModal,
    openEditModal,
    closeModal,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    setSearchTerm,
    setFilters,
    setError
  } = useUserManagement();

  const [currentPageUsers, setCurrentPageUsers] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let result;
      if (editingUser) {
        result = await updateUser(editingUser.id, formData);
      } else {
        result = await createUser(formData);
      }
      
      if (result.success) {
        alert(result.message);
        closeModal();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Có lỗi xảy ra khi lưu thông tin người dùng');
    }
  };

  // Handle delete user
  const handleDelete = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        const result = await deleteUser(userId);
        if (result.success) {
          alert(result.message);
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Có lỗi xảy ra khi xóa người dùng');
      }
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const result = await toggleUserStatus(userId, currentStatus);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Có lỗi xảy ra khi thay đổi trạng thái');
    }
  };

  // Handle reset password
  const handleResetPassword = async (userId, newPassword) => {
    try {
      const result = await resetUserPassword(userId, newPassword);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Có lỗi xảy ra khi đặt lại mật khẩu');
    }
  };

  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <h4>Quản lý Người dùng</h4>
        <button
          className="btn btn-success"
          onClick={openCreateModal}
        >
          <i className="fas fa-plus"></i> Thêm người dùng
        </button>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <UserFilter users={users} filters={filters} onFilterChange={setFilters}/>
          
          {/* Loading Overlay */}
          {loading && (
            <div className="text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Đang tải dữ liệu...</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-triangle"></i> {error}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setError(null)}
              ></button>
            </div>
          )}

          <table className="table table-hover text-center align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Thông tin</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Vai trò</th>
                {/* <th>Trạng thái</th> */}
                <th>Đơn hàng</th>
                <th>Tổng chi tiêu</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {!loading && currentPageUsers.length > 0 ? (
                currentPageUsers.map((user) => (
                  <ItemUser
                    key={user.id}
                    user={user}
                    handleDelete={handleDelete}
                    handleEdit={openEditModal}
                    handleToggleStatus={handleToggleStatus}
                    handleMakeAdmin={makeAdmin}
                    handleMakeUser={makeUser}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="10">
                    <h5 className="text-muted">Không có người dùng nào</h5>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          <UserPagination filteredUsers={filteredUsers} onPageChange={setCurrentPageUsers} />
        </div>
      </div>

      {/* User Modal */}
      <UserModal
        showModal={showModal}
        setShowModal={closeModal}
        editingUser={editingUser}
        handleSubmit={handleSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        handleResetPassword={handleResetPassword}
      />
    </div>
  );
};

export default UsersSection;