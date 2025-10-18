import { useVariantManagement } from '../../../hooks/useVariant/useVariantManagement';
import { useCustomerSelection } from '../../../hooks/useCustomerSelection';
import { OrderItemTableBody } from './OrderItemTableOrder';

export const OrderModal = ({ showModal, getStatus,
   setShowModal,
   editingOrder, 
   handleSubmit, 
  formData, handleInputChange,
   handleItemChange, 
   addItem, 
   removeItem,
   filteredCustomers,fillCustomerInfo,clearCustomerInfo,
   listCustomer,handleCustomerChange,
   products, resetForm }) => {
  if (!showModal) return null;

  // Custom hooks
  const { 
    allVariants, 
    getVariantById, 
    handleItemChange: handleVariantItemChange, 
    addItem:addVariantItem, 
    removeItem:removeVariantItem, 
    calculateItemTotal, 
    calculateOrderTotal 
  } = useVariantManagement(products);

  return (
    <div className="m-3">
      <div className="container" >
        <div className="modal-content ">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingOrder ? `Chỉnh sửa đơn hàng #${editingOrder.id}` : 'Tạo đơn hàng mới'}
            </h5>
            <button type="button" className="btn-close" onClick={() => {
              setShowModal(false);
              resetForm();
            }}></button>
          </div>
          <div className="modal-body">
            {/* <form onSubmit={handleSubmit}> */}
            <form>
              <div className="row">
                <div className="col-md-6">
                  <h6>Thông tin khách hàng</h6>
                  <div className="mb-3">
                    <label className="form-label">Khách hàng *</label>
                    <div className="row">
                      <div className="row mb-3">
                        <div className="input-group">
                          <select
                            className="form-select"
                            onChange={(e) => {
                              handleCustomerChange(e);
                            }}
                          >
                            <option value="">Chọn khách hàng từ danh sách</option>
                            {listCustomer && listCustomer.map(customer => (
                              <option key={customer.idUser} value={customer.idUser}>
                                {customer.fullName || customer.name} - {customer.phone}
                                {customer.email && ` (${customer.email})`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <input
                          type="text"
                          className="form-control"
                          name="customer"
                          value={formData.customerName || ''}
                          onChange={(e) => handleInputChange({ target: { name: "customerName", value: e.target.value } })}
                          placeholder="Nhập tên khách hàng hoặc chọn từ danh sách"
                          required
                        />
                      </div>
                      <div className="col-md-1">
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => clearCustomerInfo(handleInputChange)}
                          title="Xóa thông tin khách hàng"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                    <div className="form-text">
                      <small className="text-muted">
                        {listCustomer && listCustomer.length > 0 && (
                          <span className="ms-2">
                            ({listCustomer.length} khách hàng có sẵn)
                          </span>
                        )}
                      </small>
                    </div>
                  </div>
                  
                  {/* Hiển thị thông tin customer đã chọn */}
                  {formData.customerName && (
                    <div className="alert alert-success py-2">
                      <div className="d-flex  justify-content-start">
                        <div className="row">
                          <div className="">
                          <i className="fas fa-user-check me-2"></i><strong>Khách hàng:</strong> {formData.customerName}<br/>
                          </div>
                          <div className="">
                          {formData.shippingAddress && (
                        <div className="mt-1">
                          <small>
                            <i className="fas fa-map-marker-alt me-1"></i>
                            <strong style={{marginLeft:12}}>Địa chỉ:</strong> {formData.shippingAddress}
                          </small>
                        </div>
                      )}
                        </div>
                         
                        </div>
                        <div>
                          <div className="row">
                            {formData.customerPhone && (
                              <span className="">
                                <i className="fas fa-phone me-1"></i>
                                SĐT:{formData.customerPhone}<br/>
                              </span>
                            )}
                               {formData.customerEmail && (
                                <div className="mt-1">
                              <span className="">
                                <i className="fas fa-envelope me-1"></i>
                                Email:{formData.customerEmail}
                              </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Quick customer selection */}
                  {listCustomer && listCustomer.length > 0 ? (
                    <div className="mb-3">
                      <label className="form-label">Khách hàng thường xuyên</label>
                      <div className="d-flex flex-wrap gap-2">
                        {listCustomer.slice(0, 5).map(customer => (
                          <button
                            key={customer.idUser || customer.id || `customer-${Math.random()}`}
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => {
                              console.log('🔄 Quick select customer:', customer);
                              const result = fillCustomerInfo(customer, handleInputChange);
                              
                              if (result.success) {
                                console.log('✅ Quick selected customer successfully:', {
                                  name: customer.fullName || customer.name,
                                  phone: customer.phone,
                                  filledFields: result.filledFields
                                });
                                
                                // Có thể hiển thị toast notification
                                // toast.success(`Đã chọn khách hàng: ${customer.fullName || customer.name}`);
                              } else {
                                console.error('❌ Failed to quick select customer:', result.error);
                                // toast.error('Có lỗi khi chọn khách hàng');
                              }
                            }}
                          >
                            {customer.fullName || customer.name}
                          </button>
                        ))}
                      </div>
                      <div className="form-text">
                        <small className="text-muted">
                          💡 Click vào tên khách hàng để tự động điền thông tin
                        </small>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <div className="alert alert-warning py-2">
                        <small>
                          <i className="fas fa-exclamation-triangle me-1"></i>
                          Chưa có khách hàng nào trong hệ thống. Vui lòng nhập thông tin thủ công.
                        </small>
                      </div>
                    </div>
                  )}
                  
                  {/* Button thêm khách hàng mới */}
                  <div className="mb-3">
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => {
                        // Có thể mở modal thêm customer mới hoặc chuyển đến trang quản lý customer
                        alert('Tính năng thêm khách hàng mới sẽ được phát triển');
                      }}
                    >
                      <i className="fas fa-plus"></i> Thêm khách hàng mới
                    </button>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Số điện thoại *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.customerPhone || ''}
                      onChange={(e) => handleInputChange({ target: { name: "customerPhone", value: e.target.value } })}
                      // onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.customerEmail || ''}
                      onChange={(e) => handleInputChange({ target: { name: "customerEmail", value: e.target.value } })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Địa chỉ giao hàng *</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={formData.shippingAddress || ''}
                      onChange={(e) => handleInputChange({ target: { name: "shippingAddress", value: e.target.value } })}

                      rows="3"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <h6>Thông tin đơn hàng</h6>
                  <div className="mb-3">
                    <label className="form-label">Ngày đặt hàng *</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="date"
                       value={
                          formData.createdAt
                            ? new Date(formData.createdAt).toISOString().slice(0, 16)
                            : ""
                        }
                      onChange={(e) => handleInputChange({ target: { name: "createdAt", value: e.target.value } })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phương thức thanh toán *</label>
                    <select
                    className="form-select"
                    name="paymentMethod"
                    value={formData.paymentMethod || ''}
                    onChange={(e) => handleInputChange({ target: { name: "paymentMethod", value: e.target.value } })}
                    required>
                    <option value="">Chọn phương thức</option>
                    <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                    <option value="bank_transfer">Chuyển khoản ngân hàng</option>
                    <option value="credit_card">Thẻ tín dụng</option>
                    <option value="momo">MOMO</option>
                     <option value="vnpay">VNPAY</option>
                  </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Trạng thái thanh toán *</label>
                    <select
                      className="form-select"
                      name="paymentStatus"
                      value={formData.paymentStatus || ''}
                      onChange={(e) => {handleInputChange({ target: { name: "paymentStatus", value: e.target.value } })
                        console.log("e.target.value:", e.target.value);}
                    }
                      required
                    >
                      <option value="">Chọn trạng thái thanh toán</option>
                      <option value="unpaid">Chưa thanh toán</option>
                      <option value="paid">Đã thanh toán</option>
                      <option value="partial">Thanh toán một phần</option>
                      <option value="refunded">Hoàn tiền</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Trạng thái đơn hàng *</label>
                    <select
                      className="form-select"
                      name="orderStatus"
                      value={formData.orderStatus || ''}
                      onChange={(e) => handleInputChange({ target: { name: "orderStatus", value: e.target.value } })}
                      required
                    >
                      <option value="">Chọn trạng thái</option>
                      <option value="pending">Chờ xác nhận</option>
                      <option value="confirmed">Đã xác nhận</option>
                      <option value="processing">Đang xử lý</option>
                      <option value="shipped">Đang giao</option>
                      <option value="delivered">Đã giao</option>
                      <option value="cancelled">Đã hủy</option>
                      <option value="returned">Hoàn hàng</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phí vận chuyển (VND)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="shippingFee"
                      value={formData.shippingFee || 0}
                      onChange={(e) => handleInputChange({ target: { name: "shippingFee", value: e.target.value } })}
                      min="0"
                      step="1000"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Giảm giá (VND)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="discountAmount"
                      value={formData.discountAmount || 0}
                      onChange={(e) =>{ 
                        let number = parseInt(e.target.value);
                        handleInputChange({ target: { name: "discountAmount", value: number} })}}
                      min="0"
                      step="1000"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ghi chú</label>
                    <textarea
                      className="form-control"
                      name="notes"
                      value={formData.notes || ''}
                      onChange={(e) => handleInputChange({ target: { name: "notes", value: e.target.value } })}
                      rows="2"
                    />
                  </div>
                </div>
              </div>

              <hr />
              
              <h6>Chi tiết sản phẩm</h6>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Đơn giá</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <OrderItemTableBody
                  items={formData.items || []}
                  formData={formData}
                  allVariants={allVariants}
                  handleVariantItemChange={handleVariantItemChange}
                  handleInputChange={handleInputChange}
                  getVariantById={getVariantById}
                  calculateItemTotal={calculateItemTotal}
                  removeVariantItem={removeVariantItem}
                  removeItem={removeItem}
                  addItem={addItem}
                  addVariantItem={addVariantItem}
                  calculateOrderTotal={calculateOrderTotal}
                  />
                </table>
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => addVariantItem(formData, handleInputChange)}>
                  <i className="fas fa-plus"></i> Thêm sản phẩm
                </button>
                
              </div>

              <div className="row mt-3">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-between mb-2">
                    <strong>Tạm tính:</strong>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateOrderTotal(formData.items || []))}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <strong>Phí vận chuyển:</strong>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseFloat(formData.shippingFee) || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <strong>Giảm giá:</strong>
                    <span>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseFloat(formData.discountAmount) || 0)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-2 fs-5">
                    <strong>Tổng cộng:</strong>
                    <strong>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        calculateOrderTotal(formData.items || []) + (parseFloat(formData.shippingFee) || 0) - (parseFloat(formData.discountAmount) || 0)
                      )}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="modal-footer d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Hủy
                </button>                                                             
                                                                                                {/* formData, editingOrder, resetForm, setShowModal */}
                <button type="button" className="btn btn-primary" onClick={ (e)=>{handleSubmit(formData,editingOrder,resetForm,setShowModal)}}>
                  {editingOrder ? 'Cập nhật' : 'Tạo đơn hàng'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};