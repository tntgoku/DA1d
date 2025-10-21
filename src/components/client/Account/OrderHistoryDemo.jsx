import React, { useState } from 'react';
import OrderHistory from './OrderHistory';
import { 
  orderHistoryTestData, 
  orderStatusTestData, 
  multiItemOrderTestData,
  largeQuantityOrderTestData,
  getAllOrderHistoryTestData,
  getOrderHistoryByStatus 
} from '../../data/orderHistoryTestData';

const OrderHistoryDemo = () => {
  const [selectedDataset, setSelectedDataset] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const getCurrentData = () => {
    if (selectedDataset === 'all') {
      return getAllOrderHistoryTestData();
    } else if (selectedDataset === 'status') {
      return selectedStatus === 'all' ? orderStatusTestData : getOrderHistoryByStatus(selectedStatus);
    } else if (selectedDataset === 'multi') {
      return multiItemOrderTestData;
    } else if (selectedDataset === 'large') {
      return largeQuantityOrderTestData;
    } else {
      return orderHistoryTestData;
    }
  };

  const currentData = getCurrentData();

  return (
    <div className="order-history-demo">
      <div className="demo-controls mb-4">
        <h2>OrderHistory Component Demo</h2>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Chọn dataset:</label>
            <select 
              className="form-select"
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
            >
              <option value="all">Tất cả dữ liệu ({getAllOrderHistoryTestData().length} đơn)</option>
              <option value="basic">Dữ liệu cơ bản ({orderHistoryTestData.length} đơn)</option>
              <option value="status">Test trạng thái ({orderStatusTestData.length} đơn)</option>
              <option value="multi">Đơn hàng nhiều sản phẩm ({multiItemOrderTestData.length} đơn)</option>
              <option value="large">Đơn hàng số lượng lớn ({largeQuantityOrderTestData.length} đơn)</option>
            </select>
          </div>
          
          {selectedDataset === 'status' && (
            <div className="col-md-6">
              <label className="form-label">Chọn trạng thái:</label>
              <select 
                className="form-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đã xác nhận">Đã xác nhận</option>
                <option value="Đang giao">Đang giao</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </div>
          )}
        </div>

        <div className="alert alert-info">
          <strong>Hiển thị:</strong> {currentData.length} đơn hàng
          {selectedDataset === 'status' && selectedStatus !== 'all' && (
            <span> với trạng thái "{selectedStatus}"</span>
          )}
        </div>
      </div>

      <div className="demo-content">
        {currentData.length > 0 ? (
          <OrderHistory orders={currentData} />
        ) : (
          <div className="alert alert-warning">
            Không có dữ liệu để hiển thị
          </div>
        )}
      </div>

      <div className="demo-info mt-4">
        <h4>Thông tin về dữ liệu test:</h4>
        <div className="row">
          <div className="col-md-6">
            <h5>Dữ liệu cơ bản:</h5>
            <ul>
              <li>10 đơn hàng với các trạng thái khác nhau</li>
              <li>Đơn hàng đơn sản phẩm và đa sản phẩm</li>
              <li>Giá từ 650,000đ đến 8,900,000đ</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Dữ liệu test trạng thái:</h5>
            <ul>
              <li>5 đơn hàng, mỗi trạng thái 1 đơn</li>
              <li>Test đầy đủ các trạng thái: Chờ xác nhận, Đã xác nhận, Đang giao, Đã giao, Đã hủy</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h5>Đơn hàng nhiều sản phẩm:</h5>
            <ul>
              <li>2 đơn hàng với 4 sản phẩm mỗi đơn</li>
              <li>Test hiển thị danh sách sản phẩm dài</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Đơn hàng số lượng lớn:</h5>
            <ul>
              <li>2 đơn hàng với số lượng sản phẩm lớn</li>
              <li>Test hiển thị quantity x price</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryDemo;
