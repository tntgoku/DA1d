import React, { useState, useEffect } from 'react';
import { FormImages } from './FormImages';
import { FormAttributeBasic } from './FormAttributeBasic';
import { FormTechnine } from './FormTechnice';
import { createProduct,updateProduct } from '../../../service/productService';
export const EditProductModal = ({ 
  showModal, 
  setShowModal, 
  editingProduct, 
  handleSubmit, 
  formData, 
  handleInputChange ,setFormData
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [haveCamera, setHaveCamera] = useState(false);
  
  // Đồng bộ trạng thái haveCamera với category
  useEffect(() => {
    setHaveCamera(formData.category === 1 || formData.category === 2);
  }, [formData.category]);


  console.log("list Formdata:", formData);
  // Hàm xử lý upload nhiều ảnh
const handleImageUpload = (e) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  const newImages = [];

  files.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      // Chuyển ảnh thành object giống cấu trúc
      const imgObj = {
        imgSrc: event.target.result,
        imgAlt: file.name || `Ảnh ${formData.images.length + index + 1}`,
        displayOrder: formData.images.length -1 + newImages.length + 1,
        primary: false
      };
      newImages.push(imgObj);
      // Khi tất cả ảnh đã được đọc
      if (newImages.length === files.length) {
        const updatedImages = [...formData.images, ...newImages];
        console.log("update:",updatedImages);
        setFormData({
          ...formData,
          images: updatedImages,
          featuredImageIndex: updatedImages.length-1
        });
      }
    };
    reader.readAsDataURL(file);
  });
};
  // Hàm xóa ảnh
  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    let newFeaturedIndex = formData.featuredImageIndex;
    
    // Điều chỉnh featuredImageIndex nếu xóa ảnh đang được chọn
    if (index === formData.featuredImageIndex) {
      newFeaturedIndex = 0;
    } else if (index < formData.featuredImageIndex) {
      newFeaturedIndex = Math.max(0, formData.featuredImageIndex - 1);
    }
    
    handleInputChange({
      target: {
        name: 'images',
        value: updatedImages
      }
    });
    
    handleInputChange({
      target: {
        name: 'featuredImageIndex',
        value: newFeaturedIndex
      }
    });
  };
  // Hàm đặt ảnh chính
  const setFeaturedImage = (index) => {
    setFormData({
      ...formData, 
      featuredImageIndex : index
  })
  };

  let price = parseInt((formData.price || "0").toString().replace(/\./g, ""), 10);



  return (
    <div className={`modal fade ${showModal ? "show":'' }`} style={{ backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <ul className="nav nav-tabs" id="productTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button className={`nav-link ${activeTab === 'basic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('basic')}>Thông tin cơ bản</button>
              </li>
              <li className="nav-item" role="presentation">
                <button 
                  className={`nav-link ${activeTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specs')}
                >
                  Thông số kỹ thuật
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button 
                  className={`nav-link ${activeTab === 'images' ? 'active' : ''}`}
                  onClick={() => setActiveTab('images')}
                >
                 Quản lý Ảnh ({formData.images ? formData.images.length : 0})

                </button>
              </li>
            </ul>

            <form onSubmit={handleSubmit}>
              <div className="tab-content p-3" id="productTabsContent">
                {/* Tab thông tin cơ bản */}
              <FormAttributeBasic formData={formData} activeTab={activeTab} handleImageUpload={handleImageUpload} handleInputChange={handleInputChange} price={price}/>

                {/* Tab thông số kỹ thuật - Giữ nguyên như cũ */}
                <FormTechnine activeTab={activeTab} handleInputChange={handleInputChange} formData={formData} haveCamera={haveCamera} />

                {/* Tab mới: Quản lý ảnh */}
                      <FormImages   activeTab={activeTab} images={formData.images}
                                    featuredImageIndex={formData.featuredImageIndex}
                                    setFeaturedImage={setFeaturedImage} handleRemoveImage={handleRemoveImage} handleImageUpload={handleImageUpload}/>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowModal(false)}
                >
                  Hủy
                </button>
                
                {activeTab === 'basic' ? (
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => setActiveTab('specs')}
                  >
                    Tiếp theo <i className="fas fa-arrow-right"></i>
                  </button>
                ) : activeTab === 'specs' ? (
                  <>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setActiveTab('basic')}
                    >
                      <i className="fas fa-arrow-left"></i> Quay lại
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => setActiveTab('images')}
                    >
                      Quản lý Ảnh <i className="fas fa-arrow-right"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setActiveTab('specs')}
                    >
                      <i className="fas fa-arrow-left"></i> Quay lại
                    </button>
                    <button type="submit" className="btn btn-primary"
                    >
                      {editingProduct ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
