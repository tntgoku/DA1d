import { useState, useEffect } from 'react';
import { DiscountService, VoucherService } from '../../services/DiscountService';

export const useDiscountManagement = () => {
  const [discounts, setDiscounts] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formDataVoucher, setFormDataVoucher] = useState({
    voucherCode: '',
    voucherValue: '',
    voucherType: '',
    voucherStartDate: '',
    voucherEndDate: '',
  });
  const defaultFormDataVoucher = {
    voucherCode: '',
    voucherValue: '',
    voucherType: '',
    voucherStartDate: '',
    voucherEndDate: '',
  };
      // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch discounts and vouchers separately
        const [campaignsData, vouchersData] = await Promise.all([
          DiscountService.getAllDiscountCampaigns(),
          VoucherService.getAllVouchers()
        ]);
        
        // Debug logging
        console.log('Campaigns data:', campaignsData);
        console.log('Vouchers data:', vouchersData);
        
        // Ensure we always have arrays
        setDiscounts(Array.isArray(campaignsData) ? campaignsData : []);
        setVouchers(Array.isArray(vouchersData) ? vouchersData : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setDiscounts([]);
        setVouchers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleEditVoucher = (id) => {
    const voucher = vouchers.find(voucher => voucher.id === id);
    if (voucher) {
        setFormDataVoucher(voucher);
      setEditingVoucher(voucher);
    }
  };
  const handleInputChangeVoucher = (field, value) => {
    setFormDataVoucher(prev => ({
      ...prev,
      [field]: value
    }));
    console.log(formDataVoucher);
  };
  const handleSaveVoucherWithRefresh = async () => {
    if (editingVoucher) {
        console.log(formDataVoucher);
      const success = await VoucherService.updateVoucher(editingVoucher.id, formDataVoucher);
      if (success.status === 200) {
        alert('Cập nhật voucher thành công');
        // setShowEditModal(false);
        // setEditingVoucher(null);
        setFormDataVoucher(defaultFormDataVoucher);
        // refreshData();
      }
    } else {
        console.log(formDataVoucher);
      const success = await VoucherService.createVoucher(formDataVoucher);
      if (success.status === 200) {
        alert('Tạo voucher thành công');
        // setShowEditModal(false);
        // setEditingVoucher(null);
        setFormDataVoucher(defaultFormDataVoucher);
        // refreshData();
      }
    }
  };
  const refreshData = async () => {
    const [campaignsData, vouchersData] = await Promise.all([
      DiscountService.getAllDiscountCampaigns(),
      DiscountService.getAllVouchers()
    ]);
    setDiscounts(Array.isArray(campaignsData) ? campaignsData : []);
    setVouchers(Array.isArray(vouchersData) ? vouchersData : []);
  };
  return {
    discounts,
    vouchers,
    loading,
    error,
    setDiscounts,
    setVouchers,
    setError,
    setLoading,
    handleEditVoucher,
    editingVoucher,
    showEditModal,
    setShowEditModal,
    formDataVoucher,
    defaultFormDataVoucher,
    setFormDataVoucher,
    handleInputChangeVoucher,
    handleSaveVoucherWithRefresh,
  };
  };

