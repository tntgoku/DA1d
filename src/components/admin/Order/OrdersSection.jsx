import React, { useState, useEffect } from 'react';

import { OrderDetailModal } from './OrderDetailModal';
import { OrderModal } from './OrderModal';


const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const OrdersSection = ({ orders: initialOrders, products }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState({
    customer: '',
    phone: '',
    email: '',
    address: '',
    date: new Date().toISOString().slice(0, 16),
    payment: 'COD',
    status: 'Chờ xác nhận',
    notes: '',
    items: [{ productId: '', productName: '', price: 0, quantity: 1 }],
    shippingFee: 0,
    discount: 0
  });
const ORDER_STATUS = {
  pending: { label: 'Chờ xác nhận', color: 'warning' },
  confirmed: { label: 'Đã xác nhận', color: 'primary' },
  processing: { label: 'Đang xử lý', color: 'info' },
  shipped: { label: 'Đang giao', color: 'secondary' },
  delivered: { label: 'Đã giao', color: 'success' },
  cancelled: { label: 'Đã hủy', color: 'danger' },
  returned: { label: 'Hoàn hàng', color: 'gray' }
};
const PAYMENT_METHODS = {
  cod: { label: 'Thanh toán khi nhận hàng', color: 'secondary' },
  vnpay: { label: 'VNPAY', color: 'primary' },
  momo: { label: 'MoMo', color: 'danger' },
  bank_transfer: { label: 'Chuyển khoản ngân hàng', color: 'info' },
  credit_card: { label: 'Thẻ tín dụng / Ghi nợ', color: 'warning' }
};

const getPaymentMethod = (method) => PAYMENT_METHODS[method] || { label: method, color: 'secondary' };

const getStatus = (status) => ORDER_STATUS[status] || { label: status, color: 'secondary' };


  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  useEffect(() => {
    if (!showModal) {
      setFormData({
        customer: '',
        phone: '',
        email: '',
        address: '',
        date: new Date().toISOString().slice(0, 16),
        payment: 'COD',
        status: 'Chờ xác nhận',
        notes: '',
        items: [{ variantId: '', productName: '', price: 0, quantity: 1 }],
        shippingFee: 0,
        discount: 0
      });
      setEditingOrder(null);
    }
  }, [showModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.listiem];
    
    if (field === 'variantId') {
      const product = products.find(p => p.variantId == value);
      updatedItems[index] = {
        ...updatedItems[index],
        variantId: value,
        productName: product ? product.name : '',
        price: product ? product.price : 0
      };
    } else {
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: field === 'quantity' ? parseInt(value) || 0 : value
      };
    }
    
    setFormData({
      ...formData,
      listiem: updatedItems
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      listiem: [...formData.listiem, { variantId: '', productName: '', totalPrice: 0, quantity: 1 }]
    });
  };

  const removeItem = (index) => {
    if (formData.listiem.length > 1) {
      const updatedItems = formData.listiem.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        listiem: updatedItems
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const total = formData.listiem.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0) +
                  (parseFloat(formData.shippingFee) || 0) - (parseFloat(formData.discount) || 0);

    if (editingOrder) {
      const updatedOrders = orders.map(order => 
        order.id === editingOrder.id 
          ? { ...formData, id: editingOrder.id, total }
          : order
      );
      setOrders(updatedOrders);
    } else {
      const newOrder = {
        ...formData,
        id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
        total
      };
      setOrders([...orders, newOrder]);
    }
    
    setShowModal(false);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      ...order,
    });
    setShowModal(true);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleDelete = (orderCode) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      setOrders(orders.filter(order => order.orderCode !== orderCode));
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderCode.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <h4>Quản lý Đơn hàng</h4>
        <div>
          <button className="btn btn-primary-2 btn-success" onClick={() => setShowModal(true)}>
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
            <option value="Chờ xác nhận">Chờ xác nhận</option>
            <option value="Đã xác nhận">Đã xác nhận</option>
            <option value="Đang giao">Đang giao</option>
            <option value="Đã giao">Đã giao</option>
            <option value="Đã hủy">Đã hủy</option>
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
                    <td className='text-center align-middle'>{formatCurrency(order.subtotalAmount)}</td>
                    <td className='text-center align-middle'>{getPaymentMethod(order.paymentMethod).label}</td>
                    <td className='text-center align-middle'>
                      <span
                          className={`badge bg-${getStatus(order.orderStatus).color}`}
                          style={{ width: '80%', height: '100%', fontSize: 13 }}
                        >
                          {getStatus(order.orderStatus).label}
                        </span>

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
                <p>Không tìm thấy đơn hàng nào</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Thêm/Sửa đơn hàng */}
      <OrderModal
        showModal={showModal}
        getStatus={getStatus}
        setShowModal={setShowModal}
        editingOrder={editingOrder}
        handleSubmit={handleSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        handleItemChange={handleItemChange}
        addItem={addItem}
        removeItem={removeItem}
        products={products}
      />

      {/* Modal Xem chi tiết đơn hàng */}
      <OrderDetailModal
      getStatusColor={getStatus}
      getPaymentMethod={getPaymentMethod}
        showModal={showDetailModal}
        setShowModal={setShowDetailModal}
        order={selectedOrder}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default OrdersSection;