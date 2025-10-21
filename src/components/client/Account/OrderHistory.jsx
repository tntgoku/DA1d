import { OrderDetailModal } from '../../admin/Order/OrderDetailModal';
import  {React, useState } from 'react';
import { testOrders } from '../../../entity/Entity';
import { useOrder } from '../../../hooks/useOrder/useOrder';
const OrderHistory = ({ orders }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  console.log("ListOrders",orders)
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
const { getPaymentMethod, getPaymentStatus, getStatus,PAYMENT_METHODS,PAYMENT_STATUS,ORDER_STATUS } = useOrder();
  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    console.log("OrderSelected",order);
    setShowDetailModal(true);
  };

  return (
    <div className="order-history">
      <h3>Lịch sử đơn hàng</h3>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <div>
              <strong>Mã đơn: {order.id}</strong>
              <span className="order-date">Ngày: {new Date(order?.createdAt).toLocaleString('vi-VN')}</span>
            </div>
            <div className={`status ${getStatusColor(order?.orderStatus)}`}>
              {order?.orderStatus}
            </div>
          </div>
          <div className="order-details">
            <div className="products-list">
              {order?.items.map((product, index) => (
                <div key={index} className="product-item">
                  <span>{product.object.nameVariants}</span>
                  <span>{product?.object?.discount !== 0 ? `${formatCurrency(product?.object?.list_price*(1-product?.object?.discount/100))}` : `${formatCurrency(product?.object?.list_price)}`}</span>
                </div>
              ))}
            </div>
            <div className="order-total">
              Tổng cộng: <strong>{formatCurrency(order?.totalAmount)}</strong>
            </div>
          </div>
          <div className="order-actions">
            <button className="btn-outline" onClick={(e) => {e.preventDefault(); handleViewDetail(order)}} >Xem chi tiết</button>
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
          getPaymentMethod={getPaymentMethod}
          getPaymentStatus={getPaymentStatus}
        />
      )}
    </div>
  );
};

export default OrderHistory;
