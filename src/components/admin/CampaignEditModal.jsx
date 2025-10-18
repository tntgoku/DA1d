import React from 'react';
import { 
  getCampaignTypeOptions, 
  getTargetTypeOptions, 
  validateCampaign 
} from '../../utils/discountUtils';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

/**
 * Modal component for editing discount campaigns
 */
export const CampaignEditModal = ({
  show,
  onClose,
  onSave,
  campaign,
  products,
  categories,
  variants,
  selectedProducts,
  selectedCategories,
  selectedVariants,
  formData,
  onInputChange,
  onProductToggle,
  onCategoryToggle,
  onVariantToggle,
  onSelectAllProducts,
  onSelectAllCategories,
  onSelectAllVariants,
  loading,
  error
}) => {
  if (!show) return null;

  const campaignTypeOptions = getCampaignTypeOptions();
  const targetTypeOptions = getTargetTypeOptions();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateCampaign(formData);
    if (validation.isValid) {
      onSave();
    } else {
      console.error('Validation errors:', validation.errors);
    }
  };

  console.log("formData",formData);
  return (
    <div>

    <div className="d-flex justify-content-center align-items-center m-3">
      <div className="container">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {campaign ? `Chỉnh sửa Chiến dịch: ${campaign.campaignName}` : 'Tạo Chiến dịch Mới'}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="row">
                {/* Basic Information */}
                <div className="col-md-6">
                  <h6>Thông tin cơ bản</h6>
                  
                  <div className="mb-3">
                    <label className="form-label">Tên chiến dịch *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.campaignName}
                      onChange={(e) => onInputChange('campaignName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Loại chiến dịch *</label>
                    <select
                      className="form-select"
                      value={formData.campaignType}
                      onChange={(e) => onInputChange('campaignType', e.target.value)}
                      required
                    >
                      {campaignTypeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Giá trị giảm giá *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.value}
                      onChange={(e) => onInputChange('value', e.target.value)}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Giảm giá tối đa</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.maxDiscount}
                      onChange={(e) => onInputChange('maxDiscount', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Đơn hàng tối thiểu</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.minOrderValue}
                      onChange={(e) => onInputChange('minOrderValue', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Target Selection */}
                <div className="col-md-6">
                  <h6>Đối tượng áp dụng</h6>
                  {/* Time Settings */}
                  <div className="mb-3">
                    <label className="form-label">Ngày bắt đầu *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.startDate}
                      onChange={(e) => onInputChange('startDate', e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Ngày kết thúc *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.endDate}
                      onChange={(e) => onInputChange('endDate', e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Độ ưu tiên</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.priority}
                      onChange={(e) => onInputChange('priority', e.target.value)}
                      min="1"
                      max="10"
                    />
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => onInputChange('isActive', e.target.checked)}
                    />
                    <label className="form-check-label">
                      Kích hoạt chiến dịch
                    </label>
                  </div>
                                    
                  <div className="mb-3">
                    <label className="form-label">Loại đối tượng *</label>
                    <select
                      className="form-select"
                      value={formData.targetType}
                      onChange={(e) => onInputChange('targetType', e.target.value)}
                      required
                    >
                      {targetTypeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Product Selection */}
                  {formData.targetType === 'PRODUCT' && (
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label">Chọn sản phẩm</label>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={onSelectAllProducts}
                        >
                          {selectedProducts.length === products.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                        </button>
                      </div>
                      <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {products.map(product => (
                          <div key={product.id} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedProducts.some(p => p.id === product.id)}
                              onChange={() => onProductToggle(product)}
                            />
                            <label className="form-check-label">
                              {product.name} - {product.price?.toLocaleString()}đ
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Category Selection */}
                  {formData.targetType === 'CATEGORY' && (
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label">Chọn danh mục</label>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={onSelectAllCategories}
                        >
                          {selectedCategories.length === categories.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                        </button>
                      </div>
                      <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {categories.map(category => (
                          <div key={category.id} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedCategories.some(c => c.id === category.id)}
                              onChange={() => onCategoryToggle(category)}
                            />
                            <label className="form-check-label">
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Variant Selection */}
                  {formData.targetType === 'VARIANT' && (
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label">Chọn biến thể</label>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={onSelectAllVariants}
                        >
                          {selectedVariants.length === variants.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                        </button>
                      </div>
                      <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {variants.map(variant => (
                          <div key={variant.id} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedVariants.some(v => v.id === variant.id)}
                              onChange={() => onVariantToggle(variant)}
                            />
                            <label className="form-check-label">
                              {variant.name} - {variant.price?.toLocaleString()}đ
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-mb-12">
                <label className="form-label">Mô tả chiến dịch</label>
                           <CKEditor
                            key={formData.id || "new"}   
                            editor={ClassicEditor}
                            data={formData.campaignDescription || ""} 
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              onInputChange('campaignDescription', data);
                            }}
                          />
                </div>
              </div>
            </div>

            <div className="modal-footer m-3">
              <button 
                type="button" 
                className="btn btn-secondary m-1" 
                onClick={onClose}
                disabled={loading}
              >
                Hủy
              </button>
              <button 
                type="submit" 
                className="btn btn-primary m-1"
                disabled={loading}
              >
                {loading ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
        </div>
  );
};
