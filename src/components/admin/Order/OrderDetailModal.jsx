import React from "react";

export const OrderDetailModal = ({ getStatusColor,showModal, setShowModal, order, formatCurrency,getPaymentMethod }) => {
  if (!showModal || !order) return null;

  const calculateTotal = () => {
    return order.listiem.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
  };
const [currentPage, setCurrentPage] = React.useState(1);
const itemsPerPage = 10;

// tính tổng trang
const totalPages = Math.ceil(order.listiem.length / itemsPerPage);

// lấy items của trang hiện tại
const currentItems = order.listiem.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Chi tiết đơn hàng #{order.id}</h5>
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6 content-infor-user">
                <h6 className="title-infor">Thông tin khách hàng</h6>
                <p className="name-user"><strong>Tên:</strong> {order.customerName}</p>
                <p className="phone-user"><strong>Điện thoại:</strong> {order.customerPhone}</p>
                <p className="email-user hide-print"><strong>Email:</strong> {order.customerEmail || 'N/A'}</p>
                <p className="address-user"><strong>Địa chỉ:</strong> {order.customerAddress}</p>
              </div>
              <div className="col-md-6 ">
                <h6>Thông tin đơn hàng</h6>
                <p><strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                <p className="order-payment hide-print"><strong>Phương thức:</strong> {getPaymentMethod(order.paymentMethod).label}</p>
                <p className="order-state hide-print"><strong>Trạng thái:</strong> <span className={`badge bg-${getStatusColor(order.orderStatus).color}`}>{getStatusColor(order.orderStatus).label}</span></p>
                <p><strong>Ghi chú:</strong> {order.notes || 'Không có'}</p>
              </div>
            </div>
            <hr />
            <h6 className="hide-print">Chi tiết sản phẩm</h6>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="header-item">
                  <tr className=" hide-print">
                    <th>Sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productName}</td>
                      <td className="hide-print">{formatCurrency(item.totalPrice)}</td>
                      <td>{item.quantity}</td>
                      <td className="hide-print">{formatCurrency(item.totalPrice * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
                  <div className="pagination">
                      <button 
                        disabled={currentPage === 1} 
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Prev
                      </button>
                                    
                      <span>{currentPage} / {totalPages}</span>
                                    
                      <button 
                        disabled={currentPage === totalPages} 
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </button>
                    </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6"></div>
              <div className="col-md-6">
                <div className="d-flex justify-content-between mb-2 hide-print">
                  <strong>Tổng tiền hàng:</strong>
                  <span>{formatCurrency(calculateTotal())}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 hide-print">
                  <strong>Phí vận chuyển:</strong>
                  <span>{formatCurrency(order.shippingFee || 0)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 hide-print">
                  <strong>Giảm giá:</strong>
                  <span>-{formatCurrency(order.discountAmount || 0)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-2 fs-5">
                  <strong className=" hide-print">Tổng cộng:</strong>
                  <strong className="price-print">{formatCurrency(calculateTotal() + (order.shippingFee || 0) - (order.discountAmount || 0))}</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Đóng
            </button>
            <button type="button" className="btn btn-primary" onClick={() => window.print()}>
              <i className="fas fa-print"></i> In đơn hàng
            </button>
          </div>
        </div>
        <div className="invoice-print">
          <div className="row">
            {/* Người gửi */}
            <div className="col-6">
              <h6>Từ:</h6>
              <p><strong className="hide-print">Tên shop:</strong> Apple Store</p>
              <p><strong  className="hide-print">Điện thoại:</strong> 0909 999 999</p>
              <p><strong  className="hide-print">Địa chỉ:</strong> 123 Nguyễn Trãi, Q.1, TP.HCM</p>
            </div>

            {/* Người nhận */}
            <div className="col-6">
              <h6> Nhận: {order.notes && order.notes.trim() !== "" ? `(${order.notes})` : ""}</h6>
              <p><strong className="hide-print">Tên:</strong> {order.customer}</p>
              <p><strong className="hide-print">Điện thoại:</strong> {order.phone}</p>
              <p><strong className="hide-print">Địa chỉ:</strong> {order.address}</p>
            </div>
          </div>

          <hr />
          <h6 className="hide-print">Chi tiết sản phẩm</h6>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="hide-print">Sản phẩm</th>
                <th className="hide-print">Số lượng</th>
                <th className="hide-print">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.listiem.map((item, index) => (
                <tr key={index}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td className="hide-print">{formatCurrency(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between mt-3 fs-5" >
            <strong  className="hide-print">Tổng cộng:</strong>
            <p>Tiền thu người nhận: </p>
                  <strong className="price-print" >
                    {order.payment === "COD" && !order.paid
                      ? formatCurrency(calculateTotal() + (order.shippingFee || 0) - (order.discount || 0))
                      : order.payment === "Chuyển khoản"
                      ? formatCurrency(0)
                      : formatCurrency(calculateTotal() + (order.shippingFee || 0) - (order.discount || 0))}
                  </strong>
                  <br/>
          </div>
            <p>Kiểm tra tên sản phẩm và đối chiếu:Mã đơn hàng trên website,ứng dụng của chúng tôi trước khi nhận hàng
              .(Lưu ý số sản phẩm có thể bị ẩn đi do  danh sách có thể quá dài.)</p>
        </div>

      </div>
    </div>
  );
};