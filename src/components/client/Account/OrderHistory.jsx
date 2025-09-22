import React from 'react';

const OrderHistory = ({ orders }) => {
  return (
    <div className="order-history">
      <h3>Lịch sử đơn hàng</h3>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <div>
              <strong>Mã đơn: {order.id}</strong>
              <span className="order-date">Ngày: {order.date}</span>
            </div>
            <div className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
              {order.status}
            </div>
          </div>
          <div className="order-details">
            <div className="products-list">
              {order.products.map((product, index) => (
                <div key={index} className="product-item">
                  <span>{product.name}</span>
                  <span>{product.quantity} x {product.price}</span>
                </div>
              ))}
            </div>
            <div className="order-total">
              Tổng cộng: <strong>{order.total}</strong>
            </div>
          </div>
          <div className="order-actions">
            <button className="btn-outline">Xem chi tiết</button>
            <button className="btn-primary">Mua lại</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
