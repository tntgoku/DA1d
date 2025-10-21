import { useState, useEffect } from 'react';

export const useOrderForm = (showModal, setShowModal) => {
  const [formData, setFormData] = useState({
    id: null,
    orderCode: '',
    customer: null,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    shippingAddress: '',
    createdAt: new Date().toISOString().slice(0, 16),
    paymentMethod: 'cod',
    paymentStatus: 'unpaid',
    orderStatus: 'pending',
    notes: '',
    items: [],
    shippingFee: 0,
    discount: 0,
    subtotalAmount: 0,
    discountAmount: 0,
    taxAmount: 0,
    totalAmount: 0,
    amountPaid: 0,
    voucherId: null,
    voucherDiscount: 0,
    shippingMethod: '',
    trackingNumber: '',
    createdBy: null
  });
  const [editingOrder, setEditingOrder] = useState(null);
  // addVariantItem
  // Reset form khi đóng modal và clear editingOrder
  useEffect(() => {
    if (!showModal) {
      setFormData({
        id: null,
        orderCode: '',
        customer: null,
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        customerAddress: '',
        shippingAddress: '',
        createdAt: new Date().toISOString().slice(0, 16),
        paymentMethod: 'cod',
        paymentStatus: 'unpaid',
        orderStatus: 'pending',
        notes: '',
        items: [],
        shippingFee: 0,
        discount: 0,
        subtotalAmount: 0,
        discountAmount: 0,
        taxAmount: 0,
        totalAmount: 0,
        amountPaid: 0,
        voucherId: null,
        voucherDiscount: 0,
        shippingMethod: '',
        trackingNumber: '',
        createdBy: null
      });
      setEditingOrder(null); // Clear editing order khi đóng modal
    }
  }, [showModal]);

  // Load data khi edit - chỉ chạy khi editingOrder thay đổi và modal đang mở
  useEffect(() => {
    if (editingOrder && showModal) {
      // console.log("Editing order:", editingOrder); // Commented out to reduce renders
      console.log("Editing order:", editingOrder);
      setFormData(prev => ({
        ...prev,
        ...editingOrder,
        items: editingOrder.items || editingOrder.listiem || [],
        discount: editingOrder.discountAmount || 0,
        shippingFee: editingOrder.shippingFee || 0,
        customerAddress: editingOrder.customerAddress || editingOrder.shippingAddress || '',
        createdAt: editingOrder.createdAt ? new Date(editingOrder.createdAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
      }));
    }
  }, [editingOrder, showModal]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    console.log("Input change:", name, value); // Commented out to reduce renders
    console.log("formData:", formData); // Commented out to reduce renders
    setFormData(prev => {
      if (name === "items") {
        // console.log("items:", JSON.parse(value)); // Commented out to reduce renders
        return { ...prev, items: JSON.parse(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const resetForm = () => {
    setFormData(null);
    console.log("Reset form:", formData);
  };
  const handleEdit = (order) => {
    // console.log("Editing order:", order); // Commented out to reduce renders
    setEditingOrder(order);
    setShowModal(true);
    // Form data sẽ được set trong useEffect để tránh render 2 lần
  };
  return {
    formData,
    setFormData,
    handleInputChange,
    resetForm,
    handleEdit,
    editingOrder,
    setEditingOrder
  };
};
