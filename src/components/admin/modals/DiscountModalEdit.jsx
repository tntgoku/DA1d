import React from 'react';

export const DiscountModalEdit=({formData,handleInputChange,editingDiscount,onClose,handleSubmit})=>{
    return (<>
            <div className="modal fade show" style={{display: 'block'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingDiscount ? 'Sửa mã giảm giá' : 'Thêm mã giảm giá'}
                </h5>
                <button type="button" className="btn-close" onClick={()=>onClose()}></button>
              </div>
              <form >
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Mã giảm giá *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="code"
                          value={formData.code}
                          onChange={(e)=>handleInputChange('code',e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Tên giảm giá</label>
                        <input
                          type="text"
                          className="form-control"
                          name="discount_name"
                          value={formData.discount_name}
                          onChange={(e)=>handleInputChange('discount_name',e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Loại giảm giá *</label>
                        <select
                          className="form-select"
                          name="discountType"
                          value={formData.discountType}
                          onChange={(e)=>handleInputChange('discountType',e.target.value)}
                        >
                          <option value="percentage">Phần trăm (%)</option>
                          <option value="fixed_amount">Tiền mặt (đ)</option>
                        </select>
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Danh mục *</label>
                        <select
                          className="form-select"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                        >
                          <option value={1}>Sản phẩm</option>
                          <option value={3}>Hóa đơn</option>
                          <option value={2}>Vận chuyển</option>
                        </select>
                      </div>
                    </div> */}
                  </div>

                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Giá trị *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="value"
                          value={formData.value}
                          onChange={(e)=>{
                            if(e.target.value > formData.maxDiscount && formData.maxDiscount !== 0){
                              alert('Giá trị không được lớn hơn giá trị tối đa');
                              return;
                            }
                            const number= Number(e.target.value);
                            handleInputChange('value',number);
                          }}
                          step={0.01}
                          min={0}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Giá trị tối đa</label>
                        <input
                          type="number"
                          className="form-control"
                          name="max_value"
                          value={formData.maxDiscount || ''}
                          onChange={(e)=>{
                            if(formData.discountType === 'percentage'){
                              if(e.target.value > 100){
                                alert('Giá trị tối đa không được lớn hơn 100%');
                                return;
                              }
                              const number= Number(e.target.value);
                              handleInputChange('maxDiscount',number);
                            } 
                            if(e.target.value <0){
                              alert('Giá trị tối đa không được nhỏ hơn 0');
                              return;
                            }
                            const number= Number(e.target.value);
                            handleInputChange('maxDiscount',number);
                            }
                          }
                          step={0.01}
                          min={0}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Điều kiện áp dụng</label>
                        <input
                          type="number"
                          className="form-control"
                          name="discount_condition"
                          placeholder="Đơn hàng tối thiểu"
                          value={formData.discount_condition || ''}
                          onChange={(e)=>{
                            const number= Number(e.target.value);
                            handleInputChange('discount_condition',number)}}
                          step={0.01}
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Số người đã dùngdùng *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="totalUses"
                          value={formData.totalUses}
                          onChange={(e)=>{
                            const number= Number(e.target.value);
                            handleInputChange('totalUses',number)}}
                          min={1}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Tối da số lần dùng *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="maxUsesPerUser"
                          value={formData.maxUsesPerUser}
                          onChange={(e)=>{
                            const number= Number(e.target.value);
                            handleInputChange('maxUsesPerUser',number)}}
                            min={1}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Số lượng *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="maxUses"
                          value={formData.maxUses}
                          onChange={(e)=>{
                            const number= Number(e.target.value);
                            handleInputChange('maxUses',number)}}
                          min="1"
                          required
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
                          name="startDate"
                          value={ formData.startDate
                            ? new Date(formData.startDate).toISOString().slice(0, 16)
                            : ''}
                          onChange={(e)=>handleInputChange('startDate',e.target.value)}
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
                          name="endDate"
                          value={ formData.endDate
                            ? new Date(formData.endDate).toISOString().slice(0, 16)
                            : ''}
                          onChange={(e)=>handleInputChange('endDate',e.target.value)}
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
                          value={formData.isActive}
                          onChange={(e)=>handleInputChange('isActive',e.target.value)}
                        >
                          <option value="true">Kích hoạt</option>
                          <option value="false">Vô hiệu</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={()=>onClose()}>
                    Hủy
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    {editingDiscount ? 'Cập nhật' : 'Thêm'}

                    
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>)
}