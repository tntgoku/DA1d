import { useState } from 'react';
import { OrderService } from '../../services/OrderService';

export const useOrderActions = (orders, setOrders) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData, editingOrder, resetForm, setShowModal) => {
    setLoading(true);
    try {
      console.log('editingOrder:', editingOrder);
      console.log('editingOrder.id:', editingOrder?.id);
      console.log('formData:', formData);
      let totalAmount = 0;
      formData.items.forEach(item => {
        let price = item.object.list_price || 0;
        if(item.object.discount !== null && item.object.discount !== undefined  && item.object.discount >0){
          price = price * (1 - item.object.discount / 100);
        }
        totalAmount += price * item.quantity;
      });
     let pricefinal=totalAmount+Number(formData.shippingFee || 0)-Number(formData.discountAmount || 0);
      // Tạo orderData từ formData
      const orderData = {
        ...formData,
        items: formData.items || [],
        subtotalAmount: formData.subtotalAmount || 0,
        discountAmount: formData.discountAmount || 0,
        shippingFee: formData.shippingFee || 0,
        taxAmount: formData.taxAmount || 0,
        totalAmount: pricefinal || 0,
        amountPaid: formData.amountPaid || 0,
        voucherDiscount: formData.voucherDiscount || 0
      };
      
      if (editingOrder && editingOrder.id) {
        // Update existing order
        console.log('Updating order with ID:', editingOrder.id);
        const response = await OrderService.updateOrder(editingOrder.id, orderData);
        if (response && response.status === 200) {
          console.log('Order updated successfully');
          // Update local state
          const updatedOrders = orders.map(order => 
            order.id === editingOrder.id 
              ? { ...orderData, id: editingOrder.id }
              : order
          );
          console.log('updatedOrders:', updatedOrders);
          // setOrders(updatedOrders);
          // resetForm();
          // setShowModal(false);
          alert('Cập nhật đơn hàng thành công');
        } else {
          console.error('Error updating order:', response?.message);
          alert('Có lỗi xảy ra khi cập nhật đơn hàng');
        }
      } else {
        // Create new order
        const response = await OrderService.CreateNewOrder(orderData);
        if (response && (response.status === 200 || response.status === 201)) {
          console.log('Order created successfully');
          setOrders([...orders, { ...orderData, id: response.data?.id }]);
          resetForm();
          setShowModal(false);
          console.log('Order created successfully:', response.data);
          alert('Tạo đơn hàng thành công');
        } else {
          console.error('Error creating order:', response?.message);
          alert('Có lỗi xảy ra khi tạo đơn hàng');
        }
      }
      
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      alert('Có lỗi xảy ra khi xử lý đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    setLoading(true);
    try {
      const response = await OrderService.updateOrderStatus(id, status);
      if (response && response.status === 200) {
        console.log('Order status updated successfully');
        setOrders(orders.map(order => order.id === id ? { ...order, orderStatus: status } : order));
        alert('Cập nhật trạng thái đơn hàng thành công');
      } else {
        console.error('Error updating order status:', response?.message);
        alert('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
      }
    } catch (error) {
      console.error('Error in handleStatusChange:', error);
      alert('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      setLoading(true);
      try {
        const response = await OrderService.deleteOrder(orderId);
        if (response && response.status === 200) {
          setOrders(orders.filter(order => order.id !== orderId));
          alert('Xóa đơn hàng thành công');
        } else {
          console.error('Error deleting order:', response?.message);
          alert('Có lỗi xảy ra khi xóa đơn hàng');
        }
      } catch (error) {
        console.error('Error in handleDelete:', error);
        alert('Có lỗi xảy ra khi xóa đơn hàng');
      } finally {
        setLoading(false);
      }
    }
  };
  const handlePaymentStatusChange = async (id, paymentStatus) => {
    setLoading(true);
    try {
      const response = await OrderService.updateOrderPaymentStatus(id, paymentStatus);
      if (response && response.status === 200) {
        console.log('Order payment status updated successfully');
        setOrders(orders.map(order => order.id === id ? { ...order, paymentStatus: paymentStatus } : order));
        alert('Cập nhật trạng thái thanh toán đơn hàng thành công');
      }
    } catch (error) {
      console.error('Error in handlePaymentStatusChange:', error);
      alert('Có lỗi xảy ra khi cập nhật trạng thái thanh toán đơn hàng');
    } finally {
      setLoading(false);
    }
  };
  return {
    handleSubmit,
    handleStatusChange,
    handlePaymentStatusChange,
    handleDelete,
    loading
  };
};
