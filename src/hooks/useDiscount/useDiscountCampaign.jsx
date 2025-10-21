import { useState, useEffect } from 'react';
import { DiscountService } from '../../services/DiscountService';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/CateService';
/**
 * Custom hook for managing discount campaign modal and data
 */
export const useDiscountCampaign = () => {
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Data states
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [editingVoucher, setEditingVoucher] = useState(null);
  // Form states
  const [formData, setFormData] = useState({
    campaignName: '',
    campaignDescription: '',
    campaignType: 'PERCENTAGE',
    value: '',
    maxDiscount: '',
    minOrderValue: '',
    targetType: 'ALL_PRODUCTS',
    startDate: '',
    endDate: '',
    isActive: true,
    priority: 1
  });

  // Load products, categories and variants on mount
  useEffect(() => {
    const loadData = async () => {
      try {
         const [productsData, categoriesData, variantsData] = await Promise.all([
           productService.getAllProduct(),
           categoryService.getAllCate(),
         ]);
        
        setProducts(Array.isArray(productsData) ? productsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        const varaints=productsData.map(product => product.variants);
        setVariants(Array.isArray(varaints) ? varaints : []);
        console.log("varaints",varaints);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Không thể tải dữ liệu sản phẩm, danh mục và biến thể');
      }
    };

    loadData();
  }, []);

  // Modal handlers
  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    
    if (campaign) {
      // Edit existing campaign
      setFormData({
        campaignName: campaign.campaignName || '',
        campaignDescription: campaign.campaignDescription || '',
        campaignType: campaign.campaignType || 'PERCENTAGE',
        value: campaign.value || '',
        maxDiscount: campaign.maxDiscount || '',
        minOrderValue: campaign.minOrderValue || '',
        targetType: campaign.targetType || 'ALL_PRODUCTS',
        startDate: campaign.startDate ? new Date(campaign.startDate).toISOString().split('T')[0] : '',
        endDate: campaign.endDate ? new Date(campaign.endDate).toISOString().split('T')[0] : '',
        isActive: campaign.isActive !== undefined ? campaign.isActive : true,
        priority: campaign.priority || 1
      });
    } else {
      // Create new campaign - reset form
      setFormData({
        campaignName: '',
        campaignDescription: '',
        campaignType: 'PERCENTAGE',
        value: '',
        maxDiscount: '',
        minOrderValue: '',
        targetType: 'ALL_PRODUCTS',
        startDate: '',
        endDate: '',
        isActive: true,
        priority: 1
      });
    }
    
    setSelectedProducts([]);
    setSelectedCategories([]);
    setSelectedVariants([]);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingCampaign(null);
    setSelectedProducts([]);
    setSelectedCategories([]);
    setSelectedVariants([]);
    setFormData({
      campaignName: '',
      campaignDescription: '',
      campaignType: 'PERCENTAGE',
      value: '',
      maxDiscount: '',
      minOrderValue: '',
      targetType: 'ALL_PRODUCTS',
      startDate: '',
      endDate: '',
      isActive: true,
      priority: 1
    });
    setError(null);
  };

  const handleCloseFormDetail = () => {
    setEditingCampaign(null);
    setSelectedProducts([]);
    setSelectedCategories([]);
    setSelectedVariants([]);
    setFormData({
      campaignName: '',
      campaignDescription: '',
      campaignType: 'PERCENTAGE',
      value: '',
      maxDiscount: '',
      minOrderValue: '',
      targetType: 'ALL_PRODUCTS',
      startDate: '',
      endDate: '',
      isActive: true,
      priority: 1
    });
    setError(null);
  };

  const handleSaveCampaign = async () => {
    try {
      setLoading(true);
      setError(null);

      const campaignData = {
        ...formData,
        value: parseFloat(formData.value),
        maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : null,
        minOrderValue: formData.minOrderValue ? parseFloat(formData.minOrderValue) : null,
        priority: parseInt(formData.priority),
        selectedProducts: selectedProducts.map(p => p.id),
        selectedCategories: selectedCategories.map(c => c.id)
      };

      if (editingCampaign) {
        // Update existing campaign
        await DiscountService.updateCampaign(editingCampaign.campaignId, campaignData);
      } else {
        // Create new campaign
        await DiscountService.createCampaign(campaignData);
      }

      handleCloseModal();
      return true; // Success
    } catch (err) {
      console.error('Error saving campaign:', err);
      setError(err.message || 'Có lỗi xảy ra khi lưu chiến dịch');
      return false; // Failed
    } finally {
      setLoading(false);
    }
  };

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProductToggle = (product) => {
    setSelectedProducts(prev => 
      prev.find(p => p.id === product.id) 
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.find(c => c.id === category.id) 
        ? prev.filter(c => c.id !== category.id)
        : [...prev, category]
    );
  };

  const handleSelectAllProducts = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts([...products]);
    }
  };

  const handleSelectAllCategories = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([...categories]);
    }
  };

  const handleVariantToggle = (variant) => {
    setSelectedVariants(prev => 
      prev.find(v => v.id === variant.id) 
        ? prev.filter(v => v.id !== variant.id)
        : [...prev, variant]
    );
  };

  const handleSelectAllVariants = () => {
    if (selectedVariants.length === variants.length) {
      setSelectedVariants([]);
    } else {
      setSelectedVariants([...variants]);
    }
  };

  return {
    // Modal states
    showEditModal,
    editingCampaign,
    loading,
    error,
    
    // Data
    products,
    categories,
    variants,
    selectedProducts,
    selectedCategories,
    selectedVariants,
    formData,
    
    // Handlers
    handleEditCampaign,
    handleCloseModal,
    handleCloseFormDetail,
    handleSaveCampaign,
    handleInputChange,
    handleProductToggle,
    handleCategoryToggle,
    handleVariantToggle,
    handleSelectAllProducts,
    handleSelectAllCategories,
    handleSelectAllVariants,
    // Setters
    setError
  };
};
