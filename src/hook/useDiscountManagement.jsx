import { useState, useEffect, useMemo } from "react";

/**
 * Custom hook để quản lý logic của Discount Section
 */
export const useDiscountManagement = (discounts = [], discountPeriods = [], products = []) => {
  // State management
  const [activeTab, setActiveTab] = useState('discounts');
  const [showModal, setShowModal] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [embedPeriodView, setEmbedPeriodView] = useState(false);
  const [showProductDiscountModal, setShowProductDiscountModal] = useState(false);
  const [embedAppliedView, setEmbedAppliedView] = useState(false);
  const [appliedProducts, setAppliedProducts] = useState([]);
  const [loadingApplied, setLoadingApplied] = useState(false);
  const [errorApplied, setErrorApplied] = useState(null);
  const [savedConfigs, setSavedConfigs] = useState({});
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [editingPeriod, setEditingPeriod] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedRulesModal, setShowAdvancedRulesModal] = useState(false);
  const [rulesEditingPeriod, setRulesEditingPeriod] = useState(null);

  // Form data states
  const [formData, setFormData] = useState({
    discount_code: '',
    discount_name: '',
    type: 0,
    category: 1,
    value: 0,
    max_value: null,
    discount_condition: null,
    quantity: 1,
    enable: true,
    start_time: '',
    end_time: '',
    status: 1
  });

  const [periodFormData, setPeriodFormData] = useState({
    discount_period_code: '',
    discount_period_name: '',
    min_percentage_value: null,
    max_percentage_value: null,
    order_min_total: null,
    order_min_items: null,
    order_discount_type: 'percent',
    order_discount_value: 0,
    order_gift_description: '',
    enable_order_rule: false,
    start_time: '',
    end_time: '',
    status: 1
  });

  const [productDiscountFormData, setProductDiscountFormData] = useState({
    percentage_value: 0,
    product_id: '',
    discount_period_id: ''
  });

  // Reset form khi đóng modal
  useEffect(() => {
    if (!showModal) {
      setFormData({
        discount_code: '',
        discount_name: '',
        type: 0,
        category: 1,
        value: 0,
        max_value: null,
        discount_condition: null,
        quantity: 1,
        enable: true,
        start_time: '',
        end_time: '',
        status: 1
      });
      setEditingDiscount(null);
    }
  }, [showModal]);

  useEffect(() => {
    if (!showPeriodModal && !embedPeriodView) {
      setPeriodFormData({
        discount_period_code: '',
        discount_period_name: '',
        min_percentage_value: null,
        max_percentage_value: null,
        order_min_total: null,
        order_min_items: null,
        order_discount_type: 'percent',
        order_discount_value: 0,
        order_gift_description: '',
        enable_order_rule: false,
        start_time: '',
        end_time: '',
        status: 1
      });
      setEditingPeriod(null);
    }
  }, [showPeriodModal, embedPeriodView]);

  useEffect(() => {
    if (!showProductDiscountModal) {
      setProductDiscountFormData({
        percentage_value: 0,
        product_id: '',
        discount_period_id: ''
      });
      setSelectedPeriod(null);
      setAppliedProducts([]);
      setErrorApplied(null);
      setLoadingApplied(false);
    }
  }, [showProductDiscountModal]);

  // Load applied products when modal opens
  useEffect(() => {
    if (!(showProductDiscountModal || embedAppliedView) || !selectedPeriod) return;
    
    setLoadingApplied(true);
    setErrorApplied(null);
    
    try {
      const saved = savedConfigs?.[String(selectedPeriod.id)];
      let rows;
      
      if (Array.isArray(saved) && saved.length > 0) {
        rows = saved;
      } else {
        rows = buildProductRows(products);
      }

      setAppliedProducts(rows);
    } catch (e) {
      setErrorApplied(e.message || 'Lỗi không xác định');
    } finally {
      setLoadingApplied(false);
    }
  }, [showProductDiscountModal, embedAppliedView, selectedPeriod, products, savedConfigs]);

  // Build product rows from products data
  const buildProductRows = (products) => {
    const list = Array.isArray(products) ? products : [];
    
    return list.flatMap(p => {
      const baseName = p?.name || p?.product_name || `#${p?.id ?? ''}`;
      const variants = Array.isArray(p?.variants) ? p.variants : [];
      
      if (variants.length === 0) {
        const pid = String(p.id ?? p.product_id ?? p.productId ?? '');
        const price = Number(p.price ?? p.list_price ?? 0);
        return [{
          product_id: pid,
          pid,
          product_name: baseName,
          sku: p.sku || '',
          price,
          quantity: 1,
          percentage_value: 0,
          included: true,
        }];
      }
      
      return variants.flatMap(v => {
        const colorLabel = v?.color || '';
        const storages = Array.isArray(v?.variantsStorage) ? v.variantsStorage : [];
        
        if (storages.length === 0) {
          const vid = String(v.variantId ?? v.id ?? '');
          const sku = v.sku ?? v.sku_code ?? '';
          const price = Number(v.sale_price ?? v.list_price ?? v.price ?? 0);
          const displayName = `${baseName}${colorLabel ? ` - ${colorLabel}` : ''}`;
          
          return [{
            product_id: vid,
            pid: vid,
            parent_product_id: String(p.id ?? p.product_id ?? p.productId ?? ''),
            product_name: displayName.trim(),
            sku,
            price,
            quantity: 1,
            percentage_value: 0,
            included: true,
          }];
        }
        
        return storages.map(sv => {
          const vid = String(sv.variantId ?? '');
          const sku = sv.sku ?? '';
          const price = Number(sv.sale_price ?? sv.list_price ?? sv.price ?? 0);
          const storageLabel = sv.storage || '';
          const displayName = `${baseName}${storageLabel ? ` - ${storageLabel}` : ''}${colorLabel ? ` - ${colorLabel}` : ''}`;
          
          return {
            product_id: vid,
            pid: vid,
            parent_product_id: String(p.id ?? p.product_id ?? p.productId ?? ''),
            product_name: displayName.trim(),
            sku,
            price,
            quantity: 1,
            percentage_value: 0,
            included: true,
          };
        });
      });
    });
  };

  // Filtered data
  const filteredDiscounts = useMemo(() => 
    discounts.filter(discount => 
      discount.discount_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.discount_name?.toLowerCase().includes(searchTerm.toLowerCase())
    ), [discounts, searchTerm]
  );

  const filteredPeriods = useMemo(() =>
    discountPeriods.filter(period =>
      period.discount_period_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      period.discount_period_name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [discountPeriods, searchTerm]
  );

  // Discount handlers
  const handleOpenAddModal = () => {
    setEditingDiscount(null);
    setFormData({
      discount_code: '',
      discount_name: '',
      type: 0,
      category: 1,
      value: 0,
      max_value: null,
      discount_condition: null,
      quantity: 1,
      enable: true,
      start_time: '',
      end_time: '',
      status: 1
    });
    setShowModal(true);
  };

  const handleEdit = (discount) => {
    setEditingDiscount(discount);
    setFormData({
      ...discount,
      start_time: discount.start_time ? discount.start_time.slice(0, 16) : '',
      end_time: discount.end_time ? discount.end_time.slice(0, 16) : ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa mã giảm giá này?')) {
      try {
        const response = await fetch(`/api/discounts/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error deleting discount:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingDiscount 
        ? `/api/discounts/${editingDiscount.id}`
        : '/api/discounts';
      
      const method = editingDiscount ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving discount:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) : 
              type === 'select-one' ? parseInt(value) : value
    }));
  };

  // Period handlers
  const handleOpenAddPeriodModal = () => {
    setEditingPeriod(null);
    setPeriodFormData({
      discount_period_code: '',
      discount_period_name: '',
      min_percentage_value: null,
      max_percentage_value: null,
      order_min_total: null,
      order_min_items: null,
      order_discount_type: 'percent',
      order_discount_value: 0,
      order_gift_description: '',
      enable_order_rule: false,
      start_time: '',
      end_time: '',
      status: 1
    });
    setShowPeriodModal(false);
    setEmbedPeriodView(true);
  };

  const handleEditPeriod = (period) => {
    setEditingPeriod(period);
    setPeriodFormData({
      ...period,
      start_time: period.start_time ? period.start_time.slice(0, 16) : '',
      end_time: period.end_time ? period.end_time.slice(0, 16) : ''
    });
    setShowPeriodModal(false);
    setEmbedPeriodView(true);
  };

  const handleDeletePeriod = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa đợt giảm giá này?')) {
      try {
        const response = await fetch(`/api/discount-periods/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error deleting discount period:', error);
      }
    }
  };

  const handleClosePeriodEmbedded = () => {
    setEmbedPeriodView(false);
    setEditingPeriod(null);
  };

  const handlePeriodSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingPeriod 
        ? `/api/discount-periods/${editingPeriod.id}`
        : '/api/discount-periods';
      
      const method = editingPeriod ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(periodFormData),
      });

      if (response.ok) {
        setShowPeriodModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving discount period:', error);
    }
  };

  const handlePeriodInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPeriodFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
              type === 'number' ? (value === '' ? null : parseFloat(value)) :
              type === 'select-one' ? value : value
    }));
  };

  // Applied products handlers
  const handleManageProductDiscount = (period) => {
    setSelectedPeriod(period);
    setProductDiscountFormData({
      percentage_value: 0,
      product_id: '',
      discount_period_id: period.id
    });
    setShowProductDiscountModal(false);
    setEmbedAppliedView(true);
  };

  const handleChangeAppliedRows = (updater) => {
    setAppliedProducts(prev => {
      const next = Array.isArray(prev) ? [...prev] : [];
      return updater ? updater(next) : next;
    });
  };

  const handleSaveAppliedRows = () => {
    if (!selectedPeriod) return;
    setSavedConfigs(prev => ({
      ...prev,
      [String(selectedPeriod.id)]: appliedProducts,
    }));
  };

  const handleCloseAppliedEmbedded = () => {
    setEmbedAppliedView(false);
    setSelectedPeriod(null);
  };

  // Advanced Rules handlers
  const handleOpenAdvancedRules = (period) => {
    setRulesEditingPeriod(period);
    setShowAdvancedRulesModal(true);
  };

  const handleSaveAdvancedRules = async (rules) => {
    if (!rulesEditingPeriod) return;
    
    try {
      const response = await fetch(`/api/discount-periods/${rulesEditingPeriod.id}/rules`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rules),
      });

      if (response.ok) {
        setShowAdvancedRulesModal(false);
        setRulesEditingPeriod(null);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error saving advanced rules:', error);
    }
  };

  const handleCloseAdvancedRules = () => {
    setShowAdvancedRulesModal(false);
    setRulesEditingPeriod(null);
  };

  // Helper functions
  const getDiscountTypeText = (type, category) => {
    const typeText = type === 0 ? 'Phần trăm' : 'Tiền mặt';
    const categoryText = category === 1 ? 'Sản phẩm' : 'Vận chuyển';
    return `${typeText} (${categoryText})`;
  };

  const getStatusBadge = (status, enable) => {
    if (!enable) return <span className="badge bg-secondary">Vô hiệu</span>;
    return status === 1 ? 
      <span className="badge bg-success">Kích hoạt</span> : 
      <span className="badge bg-warning">Chờ kích hoạt</span>;
  };

  const isDiscountActive = (discount) => {
    const now = new Date();
    const start = new Date(discount.start_time);
    const end = new Date(discount.end_time);
    return discount.enable && discount.status === 1 && now >= start && now <= end;
  };

  return {
    // State
    activeTab,
    showModal,
    showPeriodModal,
    embedPeriodView,
    showProductDiscountModal,
    showAdvancedRulesModal,
    embedAppliedView,
    appliedProducts,
    loadingApplied,
    errorApplied,
    editingDiscount,
    editingPeriod,
    selectedPeriod,
    rulesEditingPeriod,
    searchTerm,
    formData,
    periodFormData,
    productDiscountFormData,
    filteredDiscounts,
    filteredPeriods,
    
    // Setters
    setActiveTab,
    setShowModal,
    setShowPeriodModal,
    setShowProductDiscountModal,
    setSearchTerm,
    
    // Handlers
    handleOpenAddModal,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleInputChange,
    handleOpenAddPeriodModal,
    handleEditPeriod,
    handleDeletePeriod,
    handleClosePeriodEmbedded,
    handlePeriodSubmit,
    handlePeriodInputChange,
    handleManageProductDiscount,
    handleChangeAppliedRows,
    handleSaveAppliedRows,
    handleCloseAppliedEmbedded,
    handleOpenAdvancedRules,
    handleSaveAdvancedRules,
    handleCloseAdvancedRules,
    
    // Helpers
    getDiscountTypeText,
    getStatusBadge,
    isDiscountActive,
  };
};

