import React, { useState } from 'react';
import { GENDER_OPTIONS, ROLE_OPTIONS } from '../../../constants/userConstants';

export const UserModal = ({ showModal, setShowModal, editingUser, handleSubmit, formData, handleInputChange, handleResetPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  if (!showModal) return null;

  console.log("formData", formData);
  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
            </h5>
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>
          <div className="modal-body">

            <form onSubmit={handleSubmit}>
              {/* Form Content */}
              <div className="mt-3">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Họ tên *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Số điện thoại *</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Giới tính</label>
                        <select
                          className="form-select"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="">Chọn giới tính</option>
                          {GENDER_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Ngày sinh</label>
                        <input
                          type="date"
                          className="form-control"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Địa chỉ</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Nhập địa chỉ"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Ghi chú</label>
                    <textarea
                      className="form-control"
                      name="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Ghi chú về người dùng"
                    />
                  </div>

                  {/* Role Section - Only show when user has account */}
                  {formData.account && (
                    <div className="mb-3">
                      <label className="form-label">Vai trò</label>
                      <select
                        className="form-select"
                        name="role"
                        value={formData.role || ''}
                        onChange={handleInputChange}
                      >
                        <option value="">Chọn vai trò</option>
                        {ROLE_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="form-text">
                        {!formData.account ? 'Người dùng không có tài khoản - không thể cập nhật vai trò' : 'Chọn vai trò cho người dùng'}
                      </div>
                    </div>
                  )}

                  {/* Password Section - Only show when editing */}
                  {editingUser && (
                    <div className="mb-3">
                      <label className="form-label">Đặt lại mật khẩu</label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Nhập mật khẩu mới (để trống nếu không muốn thay đổi)"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                      </div>
                      <small className="form-text text-muted">
                        Chỉ nhập mật khẩu mới nếu muốn thay đổi. Để trống để giữ nguyên mật khẩu hiện tại.
                      </small>
                      {newPassword && (
                        <div className="mt-2">
                          <button
                            type="button"
                            className="btn btn-warning btn-sm"
                            onClick={() => handleResetPassword(editingUser.id, newPassword)}
                          >
                            <i className="fas fa-key"></i> Đặt lại mật khẩu
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {editingUser && (
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Ngày tạo</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.createdAt || 'N/A'}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Tổng đơn hàng</label>
                          <input
                            type="number"
                            className="form-control"
                            name="totalOrders"
                            value={formData.totalOrders}
                            onChange={handleInputChange}
                            min="0"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Tổng chi tiêu</label>
                          <div className="input-group">
                            <span className="input-group-text">₫</span>
                            <input
                              type="number"
                              className="form-control"
                              name="totalSpent"
                              value={formData.totalSpent}
                              onChange={handleInputChange}
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingUser ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};