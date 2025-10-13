export const OrderModal = ({ showModal,getStatus, setShowModal,
   editingOrder, 
   handleSubmit, 
  formData, handleInputChange,
   handleItemChange, addItem, 
   removeItem, 
   products }) => {
  if (!showModal) return null;
// Hàm làm sạch chuỗi số tiền
const parsePrice = (value) => {
  if (typeof value === "number") return value; // Nếu đã là số thì trả về luôn
  if (!value) return 0;

  // Xóa dấu chấm, dấu phẩy, khoảng trắng
  const cleaned = value.toString().replace(/[.,\s]/g, "");
  return parseInt(cleaned) || 0;
};

const calculateItemTotal = (price, quantity) => {
  return parsePrice(price) * (parseInt(quantity) || 0);
};

const calculateOrderTotal = () => {
  return formData.listiem.reduce((total, item) => {
    return total + calculateItemTotal(item.totalPrice, item.quantity);
  }, 0);
};
console.log("Here",formData);

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingOrder ? `Chỉnh sửa đơn hàng #${editingOrder.id}` : 'Tạo đơn hàng mới'}
            </h5>
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <h6>Thông tin khách hàng</h6>
                  <div className="mb-3">
                    <label className="form-label">Khách hàng *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="customer"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Số điện thoại *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Địa chỉ giao hàng *</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phương thức thanh toán *</label>
                    <select
                    className="form-select"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
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
                    <label className="form-label">Trạng thái *</label>
                    <select
                      className="form-select"
                      name="orderStatus"
                      value={formData.orderStatus}
                      onChange={handleInputChange}
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
                    <label className="form-label">Ghi chú</label>
                    <textarea
                      className="form-control"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
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
                  <tbody>
                    {formData.listiem.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <select
                            className="form-select"
                            value={item.productId}
                            onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                            required
                          >
                            <option value="">Chọn sản phẩm</option>
                            {products.map(product => (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                            required
                            min="0"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            required
                            min="1"
                          />
                        </td>
                        <td className="align-middle">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateItemTotal(item.totalPrice, item.quantity))}
                        </td>
                        <td className="align-middle">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeItem(index)}
                            disabled={formData.listiem.length <= 1}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={addItem}>
                  <i className="fas fa-plus"></i> Thêm sản phẩm
                </button>
                
              </div>

              <div className="row mt-3">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-between mb-2">
                    <strong>Tạm tính:</strong>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateOrderTotal())}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <strong>Phí vận chuyển:</strong>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseFloat(formData.shippingFee) || 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <strong>Giảm giá:</strong>
                    <span>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseFloat(formData.discount) || 0)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-2 fs-5">
                    <strong>Tổng cộng:</strong>
                    <strong>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        calculateOrderTotal() + (parseFloat(formData.shippingFee) || 0) - (parseFloat(formData.discount) || 0)
                      )}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
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