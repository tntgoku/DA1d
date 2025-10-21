import React, { useState } from 'react';
import { OrderService } from '../../../services/OrderService';

export const OrderStatusUpdate = ({ order, onStatusUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order?.status || '');

  const statusOptions = [
    { value: 'pending', label: 'Chờ xử lý' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'processing', label: 'Đang xử lý' },
    { value: 'shipped', label: 'Đã giao hàng' },
    { value: 'delivered', label: 'Đã nhận hàng' },
    { value: 'cancelled', label: 'Đã hủy' }
  ];

  const handleStatusUpdate = async () => {
    if (!order?.id || !selectedStatus) return;

    setIsUpdating(true);
    try {
      await OrderService.updateOrderStatus(order.id, selectedStatus);
      onStatusUpdate?.(order.id, selectedStatus);
      console.log('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="order-status-update">
      <div className="d-flex align-items-center gap-2">
        <select
          className="form-select form-select-sm"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          disabled={isUpdating}
        >
          <option value="">Chọn trạng thái</option>
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <button
          className="btn btn-sm btn-primary"
          onClick={handleStatusUpdate}
          disabled={isUpdating || !selectedStatus || selectedStatus === order?.status}
        >
          {isUpdating ? (
            <>
              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              Đang cập nhật...
            </>
          ) : (
            'Cập nhật'
          )}
        </button>
      </div>
    </div>
  );
};
