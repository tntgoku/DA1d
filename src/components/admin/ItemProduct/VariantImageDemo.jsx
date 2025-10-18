import React, { useState } from 'react';
import { useVariantImageUpload } from '../../hooks/useVariantUpload';
import { ImageProduct } from '../../entity/Object/ImageProduct';

const VariantImageDemo = () => {
  const [formData, setFormData] = useState({
    images: [],
    variants: [
      { id: 'color1', color: 'Đỏ', colorCode: '#FF0000' },
      { id: 'color2', color: 'Xanh', colorCode: '#0000FF' },
      { id: 'color3', color: 'Vàng', colorCode: '#FFFF00' }
    ]
  });

  const {
    handleUploadColorImages,
    handleRemoveColorImages,
    handleSetColorFeaturedImage,
    getColorImages,
    uploadingColors
  } = useVariantImageUpload(formData, setFormData);

  const handleFileUpload = (colorId, event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      handleUploadColorImages(colorId, files);
    }
  };

  const handleRemoveImages = (colorId) => {
    handleRemoveColorImages(colorId);
  };

  const handleSetPrimary = (colorId, imageIndex) => {
    handleSetColorFeaturedImage(colorId, imageIndex);
  };

  return (
    <div className="container mt-4">
      <h2>Demo Upload Ảnh Variants</h2>
      
      {formData.variants.map(variant => (
        <div key={variant.id} className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 style={{ color: variant.colorCode }}>
              {variant.color} ({variant.id})
            </h5>
            <div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload(variant.id, e)}
                className="btn btn-sm btn-outline-primary me-2"
                disabled={uploadingColors.has(variant.id)}
              />
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleRemoveImages(variant.id)}
              >
                Xóa tất cả ảnh
              </button>
            </div>
          </div>
          
          <div className="card-body">
            {uploadingColors.has(variant.id) && (
              <div className="alert alert-info">
                Đang upload ảnh cho {variant.color}...
              </div>
            )}
            
            <div className="row">
              {getColorImages(variant.id).map((image, index) => (
                <div key={index} className="col-md-3 mb-3">
                  <div className="card">
                    <img
                      src={image.imgSrc}
                      alt={image.imgAlt}
                      className="card-img-top"
                      style={{ height: '150px', objectFit: 'cover' }}
                    />
                    <div className="card-body p-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          {image.isPrimary ? 'Ảnh chính' : 'Ảnh phụ'}
                        </small>
                        <div>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleSetPrimary(variant.id, index)}
                            disabled={image.isPrimary}
                          >
                            {image.isPrimary ? '✓' : 'Set chính'}
                          </button>
                        </div>
                      </div>
                      <small className="text-muted d-block">
                        Variant ID: {image.variantId}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
              
              {getColorImages(variant.id).length === 0 && (
                <div className="col-12 text-center text-muted">
                  Chưa có ảnh nào cho {variant.color}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {/* Debug Info */}
      <div className="card mt-4">
        <div className="card-header">
          <h5>Debug Info - Tất cả ảnh trong formData</h5>
        </div>
        <div className="card-body">
          <pre style={{ fontSize: '12px', maxHeight: '300px', overflow: 'auto' }}>
            {JSON.stringify(formData.images, null, 2)}
          </pre>
        </div>
      </div>
      
      {/* Test Buttons */}
      <div className="card mt-4">
        <div className="card-header">
          <h5>Test Functions</h5>
        </div>
        <div className="card-body">
          <button
            className="btn btn-primary me-2"
            onClick={() => {
              console.log('All images:', formData.images);
              console.log('Images by variant:');
              formData.variants.forEach(variant => {
                console.log(`${variant.color}:`, getColorImages(variant.id));
              });
            }}
          >
            Log Images to Console
          </button>
          
          <button
            className="btn btn-success me-2"
            onClick={() => {
              // Test lọc ảnh theo variantId
              const color1Images = formData.images.filter(img => img.variantId === 'color1');
              const color2Images = formData.images.filter(img => img.variantId === 'color2');
              const productImages = formData.images.filter(img => img.variantId === null);
              
              alert(`Color1: ${color1Images.length} ảnh\nColor2: ${color2Images.length} ảnh\nProduct: ${productImages.length} ảnh`);
            }}
          >
            Count Images by Variant
          </button>
          
          <button
            className="btn btn-warning"
            onClick={() => {
              // Reset form data
              setFormData({
                images: [],
                variants: formData.variants
              });
            }}
          >
            Reset All Images
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariantImageDemo;
