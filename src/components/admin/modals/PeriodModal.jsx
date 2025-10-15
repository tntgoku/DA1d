import React from "react";

export const PeriodModalFrom = ({ periodFormData, editingPeriod, onChange, onClose, onSubmit }) => {
  return (
    <div className="modal fade show" style={{display: 'block'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingPeriod ? 'Sửa đợt giảm giá' : 'Thêm đợt giảm giá'}
            </h5>
            <button type="button" className="btn-close" onClick={()=>onClose(false)}></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Mã đợt giảm giá  123123123123*</label>
                    <input type="text" className="form-control" name="discount_period_code" value={periodFormData.discount_period_code} onChange={onChange} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Tên đợt giảm giá *</label>
                    <input type="text" className="form-control" name="discount_period_name" value={periodFormData.discount_period_name} onChange={onChange} required />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Giá trị % tối thiểu</label>
                    <input type="number" className="form-control" name="min_percentage_value" value={periodFormData.min_percentage_value || ''} onChange={onChange} min="0" max="100" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Giá trị % tối đa</label>
                    <input type="number" className="form-control" name="max_percentage_value" value={periodFormData.max_percentage_value || ''} onChange={onChange} min="0" max="100" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Thời gian bắt đầu *</label>
                    <input type="datetime-local" className="form-control" name="start_time" value={periodFormData.start_time} onChange={onChange} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Thời gian kết thúc *</label>
                    <input type="datetime-local" className="form-control" name="end_time" value={periodFormData.end_time} onChange={onChange} required />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Trạng thái</label>
                    <select className="form-select" name="status" value={periodFormData.status} onChange={onChange}>
                      <option value={1}>Kích hoạt</option>
                      <option value={0}>Vô hiệu</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy</button>
              <button type="submit" className="btn btn-primary">{editingPeriod ? 'Cập nhật' : 'Thêm'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


