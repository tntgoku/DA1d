  export const PeroidModalEdit=({periodFormData,setShowPeriodModal,handlePeriodInputChange,editingPeriod,handlePeriodSubmit})=>{
      return (<>
              <div className="modal fade show" style={{display: 'block'}}>
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">
                        {editingPeriod ? 'Sửa đợt giảm giá' : 'Thêm đợt giảm giá'}
                      </h5>
                      <button type="button" className="btn-close" onClick={() => setShowPeriodModal(false)}></button>
                    </div>
                    <form onSubmit={handlePeriodSubmit}>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Mã đợt giảm giá *</label>
                              <input
                                type="text"
                                className="form-control"
                                name="discount_period_code"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Tên đợt giảm giá *</label>
                              <input
                                type="text"
                                className="form-control"
                                name="discount_period_name"
                                value={periodFormData.discount_period_name}
                                onChange={handlePeriodInputChange}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Giá trị % tối thiểu</label>
                              <input
                                type="number"
                                className="form-control"
                                name="min_percentage_value"
                                value={periodFormData.min_percentage_value || ''}
                                onChange={handlePeriodInputChange}
                                min="0"
                                max="100"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Giá trị % tối đa</label>
                              <input
                                type="number"
                                className="form-control"
                                name="max_percentage_value"
                                value={periodFormData.max_percentage_value || ''}
                                onChange={handlePeriodInputChange}
                                min="0"
                                max="100"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <h6 className="mt-2">Quy tắc giảm theo Hóa đơn (tùy chọn) 1</h6>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3 form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="enable_order_rule"
                                checked={periodFormData.enable_order_rule}
                                onChange={handlePeriodInputChange}
                              />
                              <label className="form-check-label">Bật áp dụng cho hóa đơn</label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label">ĐH tối thiểu (đ)</label>
                              <input
                                type="number"
                                className="form-control"
                                name="order_min_total"
                                value={periodFormData.order_min_total ?? ''}
                                onChange={handlePeriodInputChange}
                                min="0"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label">Số lượng SP tối thiểu</label>
                              <input
                                type="number"
                                className="form-control"
                                name="order_min_items"
                                value={periodFormData.order_min_items ?? ''}
                                onChange={handlePeriodInputChange}
                                min="0"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label">Kiểu giảm HĐ</label>
                              <select
                                className="form-select"
                                name="order_discount_type"
                                value={periodFormData.order_discount_type}
                                onChange={handlePeriodInputChange}
                              >
                                <option value="percent">Phần trăm</option>
                                <option value="fixed">Tiền mặt</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label">Giá trị giảm HĐ</label>
                              <input
                                type="number"
                                className="form-control"
                                name="order_discount_value"
                                value={periodFormData.order_discount_value}
                                onChange={handlePeriodInputChange}
                                min="0"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label">Quà tặng (mô tả)</label>
                              <input
                                type="text"
                                className="form-control"
                                name="order_gift_description"
                                value={periodFormData.order_gift_description}
                                onChange={handlePeriodInputChange}
                                placeholder="Ví dụ: Tặng ốp lưng, voucher ship..."
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Thời gian bắt đầu *</label>
                              <input
                                type="datetime-local"
                                className="form-control"
                                name="start_time"
                                value={periodFormData.start_time}
                                onChange={handlePeriodInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Thời gian kết thúc *</label>
                              <input
                                type="datetime-local"
                                className="form-control"
                                name="end_time"
                                value={periodFormData.end_time}
                                onChange={handlePeriodInputChange}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Trạng thái</label>
                              <select
                                className="form-select"
                                name="status"
                                value={periodFormData.status}
                                onChange={handlePeriodInputChange}
                              >
                                <option value={1}>Kích hoạt</option>
                                <option value={0}>Vô hiệu</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowPeriodModal(false)}>
                          Hủy
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {editingPeriod ? 'Cập nhật' : 'Thêm'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
          </div></>)
  }