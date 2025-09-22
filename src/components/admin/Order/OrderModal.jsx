export const OrderModal = ({ showModal, setShowModal, editingOrder, handleSubmit, formData, handleInputChange, handleItemChange, addItem, removeItem, products }) => {
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
  return formData.items.reduce((total, item) => {
    return total + calculateItemTotal(item.price, item.quantity);
  }, 0);
};


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
                      value={formData.customer}
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
                      value={formData.phone}
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
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Địa chỉ giao hàng *</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={formData.address}
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
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phương thức thanh toán *</label>
                    <select
                      className="form-select"
                      name="payment"
                      value={formData.payment}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Chọn phương thức</option>
                      <option value="COD">COD</option>
                      <option value="Chuyển khoản">Chuyển khoản</option>
                      <option value="Thẻ tín dụng">Thẻ tín dụng</option>
                      <option value="Ví điện tử">Ví điện tử</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Trạng thái *</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Chờ xác nhận">Chờ xác nhận</option>
                      <option value="Đã xác nhận">Đã xác nhận</option>
                      <option value="Đang giao">Đang giao</option>
                      <option value="Đã giao">Đã giao</option>
                      <option value="Đã hủy">Đã hủy</option>
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
                    {formData.items.map((item, index) => (
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
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateItemTotal(item.price, item.quantity))}
                        </td>
                        <td className="align-middle">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeItem(index)}
                            disabled={formData.items.length === 1}
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