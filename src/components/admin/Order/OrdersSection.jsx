import React, { useState, useEffect } from 'react';
import { OrderDetailModal } from './OrderDetailModal';
import { OrderModal } from './OrderModal';
import { useOrderForm } from '../../../hooks/useOrder/useOrderForm';
import { useOrderActions } from '../../../hooks/useOrder/useOrderActions';
import { useCustomerSelection } from '../../../hooks/useCustomerSelection';
import { useOrderFilters } from '../../../hooks/useOrder/useOrderFilters';
import { useOrder } from '../../../hooks/useOrder/useOrder';
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const OrdersSection = ({ orders: initialOrders, products }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // Custom hooks
  const { formData, setFormData, handleInputChange, resetForm, editingOrder, 
    setEditingOrder, handleEdit } = useOrderForm(showModal,setShowModal);
  const { handleSubmit, handleStatusChange, handleDelete, loading } = useOrderActions(initialOrders, setOrders);
  const { listCustomer, filteredCustomers, fillCustomerInfo, clearCustomerInfo } = useCustomerSelection();
  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, filteredOrders, getFilterSummary } = useOrderFilters(orders);
  const { getPaymentMethod, getPaymentStatus, getStatus,PAYMENT_METHODS,PAYMENT_STATUS,ORDER_STATUS } = useOrder();
  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);
  const handleView = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };
  // Wrapper functions for hooks
  const handleSubmitWrapper = (e) => {
    e.preventDefault();
    handleSubmit(formData, editingOrder, resetForm, setShowModal);
  };
const handleCustomerChange = (e) => {
  const selectedCustomerId = e.target.value; // Sử dụng value, không phải id
  if (selectedCustomerId) {
    const selectedCustomer = listCustomer.find(c => c.idUser == selectedCustomerId);
    // console.log('🔍 Found customer:', selectedCustomer); // Commented out to reduce renders
    if (selectedCustomer) {
     fillCustomerInfo(selectedCustomer, handleInputChange);
    } 
  }
}


  return (
    <div>
      {/* Modal Thêm/Sửa đơn hàng */}
      <OrderModal
        showModal={showModal}
        getStatus={getStatus}
        setShowModal={setShowModal}
        editingOrder={editingOrder}
        handleSubmit={handleSubmit}
        // handleSubmit={handleSubmitWrapper}
        formData={formData}
        handleInputChange={handleInputChange}
        listCustomer={listCustomer}
        products={products}
        filteredCustomers={filteredCustomers}
        fillCustomerInfo={fillCustomerInfo}
        clearCustomerInfo={clearCustomerInfo}
        handleCustomerChange={handleCustomerChange}
        resetForm={resetForm}
      />

      {/* Modal Xem chi tiết đơn hàng */}
      <OrderDetailModal
        getStatusColor={getStatus}
        getPaymentMethod={getPaymentMethod}
        getPaymentStatus={getPaymentStatus}
        showModal={showDetailModal}
        setShowModal={setShowDetailModal}
        order={selectedOrder}
        formatCurrency={formatCurrency}
      />
    {!showModal && (
        <>
              <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h4>Quản lý Đơn hàng</h4>
          {(() => {
            const summary = getFilterSummary();
            return summary.isFiltered && (
              <small className="text-muted">
                Hiển thị {summary.filtered} / {summary.total} đơn hàng
              </small>
            );
          })()}
        </div>
        <div>
          <button 
            className="btn btn-primary-2 btn-success" 
            onClick={() => setShowModal(true)}
            disabled={loading}
          >
            <i className="fas fa-plus"></i> Tạo đơn mới
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card-header" style={{display: 'flex',gap: 25, alignItems: 'center'}}>
          <span>Danh sách Đơn hàng</span>
          <div className="search-match">
            <form className="input-groups1">
              <input 
                className="input-group-field auto-search search-auto form-control" 
                placeholder="Tìm kiếm đơn hàng..." 
                autoComplete="off" 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn icon-fallback-text" title="Search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
                    <select 
            className="form-select me-2 d-inline-block w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="processing">Đang xử lý</option>
            <option value="shipped">Đang giao</option>
            <option value="delivered">Đã giao</option>
            <option value="cancelled">Đã hủy</option>
            <option value="returned">Hoàn hàng</option>
          </select>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Ngày đặt</th>
                  <th>Tổng tiền</th>
                  <th>Phương thức</th>
                  <th>Thanh toán</th>
                  <th>Trạng thái</th>
                  <th style={{textAlign:'center'}}>Thao tác</th>
                </tr>
              </thead>
              <tbody className=' table table-responsive'>
                {filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td className='text-center align-middle'>#{order.orderCode}</td>
                    <td className='text-center align-middle'>{order.customerName}</td>
                    <td className='text-center align-middle'>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className='text-center align-middle'>{formatCurrency(order.totalAmount || order.totalAmount || 0)}</td>
                    <td className='text-center align-middle'>{getPaymentMethod(order.paymentMethod).label}</td>
                    <td className='text-center align-middle'>
                    <select
                     className={`form-select`}
                      name="paymentStatus"
                      value={order.paymentStatus}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      required
                    >
                      <option value="">{'Chọn trạng thái thanh toán'}</option>
                          <option value={`unpaid`}>{'Chưa thanh toán'}</option>
                          <option value={`paid`}>{'Đã thanh toán'}</option>
                          <option value={`partial`}>{'Thanh toán một phần'}</option>
                          <option value={`refunded`}>{'Hoàn tiền'}</option>
                      </select>
                    </td>
                    <td className='text-center align-middle'>
                        <select
                     className={`form-select`}
                      name="orderStatus"
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      required
                    >
                      <option value="pending">Chờ xác nhận</option>
                      <option value="confirmed">Đã xác nhận</option>
                      <option value="processing">Đang xử lý</option>
                      <option value="shipped">Đang giao</option>
                      <option value="delivered">Đã giao</option>
                      <option value="cancelled">Đã hủy</option>
                      <option value="returned">Hoàn hàng</option>
                    </select>
                    </td >
                    <td className='handle-btn text-center align-middle' style={{
                      display: 'flex',
                    }}>
                      <button 
                        className="
                        btn btn-sm btn-outline-success me-1
                        " 
                        onClick={() => handleView(order)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-primary me-1" 
                        onClick={() => handleEdit(order)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger" 
                        onClick={() => handleDelete(order.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredOrders.length === 0 && (
              <div className="text-center py-4">
                <div className="alert alert-info">
                  <i className="fas fa-info-circle me-2"></i>
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Không tìm thấy đơn hàng nào phù hợp với bộ lọc' 
                    : 'Chưa có đơn hàng nào'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div></>
    )}
    </div>
  );
};

export default OrdersSection;