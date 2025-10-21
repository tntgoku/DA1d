/**
 * Utility functions for discount management
 */

/**
 * Get discount type text based on type value
 * @param {number|string} type - Discount type
 * @returns {string} - Human readable type text
 */
export const getDiscountTypeText = (type) => {
  const typeMap = {
    0: 'Phần trăm',
    1: 'Số tiền cố định',
    2: 'Mua X tặng Y',
    3: 'Gói sản phẩm',
    4: 'Sản phẩm duy nhất',
    5: 'Quà tặng',
    6: 'Miễn phí vận chuyển'
  };
  
  return typeMap[type] || 'Không xác định';
};

/**
 * Get status badge based on active status
 * @param {boolean} isActive - Whether the discount is active
 * @returns {JSX.Element} - Status badge component
 */
export const getStatusBadge = (isActive) => {
  if (isActive) {
    return <span className="badge bg-success">Kích hoạt</span>;
  }
  return <span className="badge bg-secondary">Vô hiệu</span>;
};

/**
 * Format discount value based on type
 * @param {number|string} type - Discount type
 * @param {number} value - Discount value
 * @returns {string} - Formatted value string
 */
export const formatValue = (type, value) => {
  if (!value) return '---';
  if (type === 0 || type === 'percentage' || type === 'PERCENTAGE') {
    return `${value}%`;
  }
  return `${value.toLocaleString()}đ`;
};

/**
 * Format date string to Vietnamese locale
 * @param {string} dateString - Date string to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '---';
  return new Date(dateString).toLocaleString('vi-VN');
};

/**
 * Filter campaigns based on search term
 * @param {Array} campaigns - Array of campaigns
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered campaigns
 */
export const filterCampaigns = (campaigns, searchTerm) => {
  if (!Array.isArray(campaigns)) return [];
  
  return campaigns.filter(campaign => 
    (campaign.campaignId || '').toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    (campaign.campaignName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (campaign.campaignType || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Filter vouchers based on search term
 * @param {Array} vouchers - Array of vouchers
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered vouchers
 */
export const filterVouchers = (vouchers, searchTerm) => {
  if (!Array.isArray(vouchers)) return [];
  
  return vouchers.filter(voucher => 
    (voucher.code || voucher.discount_code || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (voucher.name || voucher.discount_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Validate campaign data
 * @param {Object} campaign - Campaign data to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateCampaign = (campaign) => {
  const errors = {};
  
  if (!campaign.campaignName || campaign.campaignName.trim() === '') {
    errors.campaignName = 'Tên chiến dịch không được để trống';
  }
  
  if (!campaign.value || campaign.value <= 0) {
    errors.value = 'Giá trị giảm giá phải lớn hơn 0';
  }
  
  if (!campaign.startDate) {
    errors.startDate = 'Ngày bắt đầu không được để trống';
  }
  
  if (!campaign.endDate) {
    errors.endDate = 'Ngày kết thúc không được để trống';
  }
  
  if (campaign.startDate && campaign.endDate && new Date(campaign.startDate) >= new Date(campaign.endDate)) {
    errors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Get campaign type options for select
 * @returns {Array} - Array of campaign type options
 */
export const getCampaignTypeOptions = () => [
  { value: 'PERCENTAGE', label: 'Giảm giá phần trăm' },
  { value: 'FIXED_AMOUNT', label: 'Giảm giá số tiền cố định' },
  { value: 'BUY_X_GET_Y', label: 'Mua X tặng Y' },
  { value: 'BUNDLE', label: 'Gói sản phẩm' },
  { value: 'UNIQUE_PRODUCT', label: 'Sản phẩm duy nhất' },
  { value: 'GIFT', label: 'Quà tặng' },
  { value: 'FREE_SHIPPING', label: 'Miễn phí vận chuyển' }
];

/**
 * Get target type options for select
 * @returns {Array} - Array of target type options
 */
export const getTargetTypeOptions = () => [
  { value: 'ALL_PRODUCTS', label: 'Tất cả sản phẩm' },
  { value: 'PRODUCT', label: 'Sản phẩm cụ thể' },
  { value: 'CATEGORY', label: 'Theo danh mục' },
  { value: 'VARIANT', label: 'Theo biến thể' },
  { value: 'ORDER_AMOUNT', label: 'Theo số tiền đơn hàng' },
  { value: 'ORDER_ITEMS', label: 'Theo số lượng sản phẩm' }

];
