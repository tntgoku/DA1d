import React, { useState } from 'react';

export const UserModal = ({ showModal, setShowModal, editingUser, handleSubmit, formData, handleInputChange }) => {
  const [activeTab, setActiveTab] = useState('basic');

  if (!showModal) return null;

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
            {/* Tab Navigation */}
            <ul className="nav nav-tabs" id="userTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button 
                  className={`nav-link ${activeTab === 'basic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('basic')}
                  type="button"
                >
                  Thông tin cơ bản
                </button>
              </li>
              {(formData.role === "Khách hàng") && (
                <li className="nav-item" role="presentation">
                  <button 
                    className={`nav-link ${activeTab === 'purchase' ? 'active' : ''}`}
                    onClick={() => setActiveTab('purchase')}
                    type="button"
                  >
                    Thông tin mua hàng
                  </button>
                </li>
              )}
            </ul>

            <form onSubmit={handleSubmit}>
              {/* Tab Content */}
              <div className="tab-content mt-3">
                
                {/* Tab 1: Basic Information */}
                <div className={`tab-pane fade ${activeTab === 'basic' ? 'show active' : ''}`}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Họ tên *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
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
                        <label className="form-label">Vai trò *</label>
                        <select
                          className="form-select"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Chọn vai trò</option>
                          <option value="Admin">Admin</option>
                          <option value="Nhân viên">Nhân viên</option>
                          <option value="Khách hàng">Khách hàng</option>
                        </select>
                      </div>
                    </div>
                  </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Mật khẩu *</label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  {editingUser && (
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Trạng thái *</label>
                          <select
                            className="form-select"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
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
                    </div>
                  )}
                </div>

                {/* Tab 2: Purchase Information (Only for Khách hàng) */}
                {(formData.role === "Khách hàng") && (
                  <div className={`tab-pane fade ${activeTab === 'purchase' ? 'show active' : ''}`}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Tổng số đơn hàng</label>
                          <input
                            type="number"
                            className="form-control"
                            name="totalOrders"
                            value={formData.totalOrders || 0}
                            onChange={handleInputChange}
                            min="0"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Tổng chi tiêu</label>
                          <div className="input-group">
                            <span className="input-group-text">₫</span>
                            <input
                              type="number"
                              className="form-control"
                              name="totalSpent"
                              value={formData.totalSpent || 0}
                              onChange={handleInputChange}
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Đơn hàng gần nhất</label>
                          <input
                            type="date"
                            className="form-control"
                            name="lastOrderDate"
                            value={formData.lastOrderDate || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {/* <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Hạng thành viên</label>
                          <select
                            className="form-select"
                            name="membershipLevel"
                            value={formData.membershipLevel || 'Standard'}
                            onChange={handleInputChange}
                          >
                            <option value="Standard">Standard</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                            <option value="Platinum">Platinum</option>
                          </select>
                        </div>
                      </div> */}
                    </div>

                    {/* <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Điểm tích lũy</label>
                          <input
                            type="number"
                            className="form-control"
                            name="loyaltyPoints"
                            value={formData.loyaltyPoints || 0}
                            onChange={handleInputChange}
                            min="0"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Tỷ lệ giảm giá (%)</label>
                          <input
                            type="number"
                            className="form-control"
                            name="discountRate"
                            value={formData.discountRate || 0}
                            onChange={handleInputChange}
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
                    </div> */}

                    <div className="mb-3">
                      <label className="form-label">Ghi chú mua hàng</label>
                      <textarea
                        className="form-control"
                        name="purchaseNotes"
                        rows="3"
                        value={formData.purchaseNotes || ''}
                        onChange={handleInputChange}
                        placeholder="Ghi chú về thói quen mua hàng, sở thích..."
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Địa chỉ giao hàng mặc định</label>
                      <textarea
                        className="form-control"
                        name="defaultShippingAddress"
                        rows="2"
                        value={formData.defaultShippingAddress || ''}
                        onChange={handleInputChange}
                        placeholder="Địa chỉ nhận hàng"
                      />
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