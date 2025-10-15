import React from "react";

export const DiscountModal = ({ formData, editingDiscount, onChange, onClose, onSubmit }) => {
  return (
    <div className="modal fade show" style={{display: 'block'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingDiscount ? 'Sửa mã giảm giá' : 'Thêm mã giảm giá'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Mã giảm giá *</label>
                    <input type="text" className="form-control" name="discount_code" 
                    value={formData.discount_code} onChange={onChange} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Tên giảm giá</label>
                    <input type="text" className="form-control" name="discount_name" 
                    value={formData.discount_name} onChange={onChange} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Loại giảm giá *</label>
                    <select className="form-select" name="type" value={formData.type} onChange={onChange}>
                      <option value={0}>Phần trăm (%)</option>
                      <option value={1}>Tiền mặt (đ)</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Danh mục *</label>
                    <select className="form-select" name="category" value={formData.category} onChange={onChange}>
                      <option value={1}>Sản phẩm</option>
                      <option value={2}>Vận chuyển</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Giá trị *</label>
                    <input type="number" className="form-control" name="value" value={formData.value} onChange={onChange} step="0.01" min="0" required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Giá trị tối đa</label>
                    <input type="number" className="form-control" name="max_value" value={formData.max_value || ''} onChange={onChange} step="0.01" min="0" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Điều kiện áp dụng</label>
                    <input type="number" className="form-control" name="discount_condition" placeholder="Đơn hàng tối thiểu" value={formData.discount_condition || ''} onChange={onChange} step="0.01" min="0" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Số lượng *</label>
                    <input type="number" className="form-control" name="quantity" value={formData.quantity} onChange={onChange} min="1" required />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Thời gian bắt đầu *</label>
                    <input type="datetime-local" className="form-control" name="start_time" value={formData.start_time} onChange={onChange} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Thời gian kết thúc *</label>
                    <input type="datetime-local" className="form-control" name="end_time" value={formData.end_time} onChange={onChange} required />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Trạng thái</label>
                    <select className="form-select" name="status" value={formData.status} onChange={onChange}>
                      <option value={1}>Kích hoạt</option>
                      <option value={0}>Vô hiệu</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 form-check" style={{ marginTop: '2rem' }}>
                    <input type="checkbox" className="form-check-input" name="enable" checked={formData.enable} onChange={onChange} />
                    <label className="form-check-label">Có hiệu lực</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy</button>
              <button type="submit" className="btn btn-primary">{editingDiscount ? 'Cập nhật' : 'Thêm'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


