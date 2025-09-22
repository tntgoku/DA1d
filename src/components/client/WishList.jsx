import React from 'react';

const Wishlist = () => {
  return (
    <div className="wishlist-section">
      <h3>Danh sách yêu thích</h3>
      <div className="empty-state">
        <i className="fas fa-heart"></i>
        <p>Bạn chưa có sản phẩm nào trong danh sách yêu thích</p>
        <button className="btn-primary">Tiếp tục mua sắm</button>
      </div>
    </div>
  );
};

export default Wishlist;
