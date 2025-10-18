import { OrderDetailModal } from '../../admin/Order/OrderDetailModal';
import  {React, useState } from 'react';
import { testOrders } from '../../../entity/Entity';
const OrderHistory = ({ orders=testOrders }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
  };

const getStatusColor = (status) => {
  switch (status) {
    case 'Đã giao': return 'success';
    case 'Đang giao': return 'info';
    case 'Đã xác nhận': return 'primary';
    case 'Chờ xác nhận': return 'warning';
    case 'Đã hủy': return 'danger';
    default: return 'secondary';
  }
};

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  return (
    <div className="order-history">
      <h3>Lịch sử đơn hàng</h3>
      {testOrders.map(order => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <div>
              <strong>Mã đơn: {order.id}</strong>
              <span className="order-date">Ngày: {order.date}</span>
            </div>
            <div className={`status ${getStatusColor(order.status)}`}>
              {order.status}
            </div>
          </div>
          <div className="order-details">
            <div className="products-list">
              {order.items.map((product, index) => (
                <div key={index} className="product-item">
                  <span>{product.productName}</span>
                  <span>{product.quantity} x {formatCurrency(product.price)}</span>
                </div>
              ))}
            </div>
            <div className="order-total">
              Tổng cộng: <strong>{formatCurrency(order.total)}</strong>
            </div>
          </div>
          <div className="order-actions">
            <button className="btn-outline" onClick={() => handleViewDetail(order)} >Xem chi tiết</button>
            <button className="btn-primary btn-outline">Mua lại</button>
          </div>
        </div>
      ))}

      {showDetailModal && selectedOrder && (
        <OrderDetailModal
          getStatusColor={getStatusColor}
          showModal={showDetailModal}
          setShowModal={setShowDetailModal}
          order={selectedOrder}
          formatCurrency={formatCurrency}
        />
      )}
    </div>
  );
};

export default OrderHistory;
