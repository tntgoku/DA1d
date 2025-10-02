// FormDetailProduct.jsx
import { useState, useEffect } from 'react';
import { defaultFormData } from '../../../entity/Entity';
import { FormAttributeBasic } from './FormAttributeBasic';
import { FormImages } from './FormImages';
import { FormTechnine } from './FormTechnice';

const FormDetailProduct = ({ 
  product = null, 
  onSubmit, 
  onCancel,
  categories = [] 
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({ ...defaultFormData });

  // Khởi tạo form data khi product thay đổi
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        product_id: product.product_id,
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        status: product.status,
        specifications: product.specifications || {
          color: product.color || '',
          storage: product.storage || '',
          ram: '',
          screen: '',
          battery: '',
          chip: '',
          camera: '',
          weight: '',
          connectivity: '',
          features: ''
        },
        images: product.images || [],
        featuredImageIndex: product.featuredImageIndex || 0,
        isNew: product.isNew || false
      });
    } else {
      setFormData({ ...defaultFormData });
    }
  }, [product]);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('spec_')) {
      const specField = name.replace('spec_', '');
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [specField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

const handleImageUpload = (e) => {
  const files = Array.from(e.target.files);

  // Lấy số lượng ảnh hiện tại để tính displayOrder
  const currentCount = formData.images.length;

  const newImages = files.map((file, index) => ({
    imgSrc: URL.createObjectURL(file),   // URL tạm thời để preview
    imgAlt: file.name,                    // tên file làm alt tạm
    displayOrder: currentCount + index + 1,
    primary: currentCount === 0 && index === 0 ? true : false  // nếu là ảnh đầu tiên thì làm primary
  }));

  setFormData({
    ...formData,
    images: [...formData.images, ...newImages]
  });
};


  // Xử lý xóa ảnh
  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    let newFeaturedIndex = formData.featuredImageIndex;
    
    if (index === formData.featuredImageIndex) {
      newFeaturedIndex = 0;
    } else if (index < formData.featuredImageIndex) {
      newFeaturedIndex = Math.max(0, formData.featuredImageIndex - 1);
    }
    
    setFormData({
      ...formData,
      images: newImages,
      featuredImageIndex: newFeaturedIndex
    });
  };

  // Xử lý đặt ảnh chính
  const handleSetFeaturedImage = (index) => {
    setFormData({
      ...formData,
      featuredImageIndex: index
    });
  };

  // Xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock),
      imgSrc: formData.images[formData.featuredImageIndex] || ''
    };
    onSubmit(submitData);
  };

  return (
    <div className="modal fade show" >
      <div className="main-content">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {product ? 'Chỉnh sửa Sản phẩm' : 'Thêm Sản phẩm Mới'}
            </h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          
          <div className="modal-body">
            {/* Tab navigation */}
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'basic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('basic')}
                >
                  Thông tin cơ bản
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specs')}
                >
                  Thông số kỹ thuật
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'images' ? 'active' : ''}`}
                  onClick={() => setActiveTab('images')}
                >
                  Hình ảnh
                </button>
              </li>
            </ul>

            <form onSubmit={handleSubmit}>
              {/* Basic Information Tab */}
              {activeTab === 'basic' && (
                <FormAttributeBasic
                    formData={formData}
                    handleImageUpload={handleImageUpload}
                    handleInputChange={handleInputChange}
                />
              )}

              {/* Specifications Tab */}
              {activeTab === 'specs' && (
                    <FormTechnine  handleInputChange={handleInputChange}
                    formData={formData}
                    />
              )}

              {/* Images Tab */}
              {activeTab === 'images' && (
                <FormImages
                    images={formData.images}
                    featuredImageIndex={formData.featuredImageIndex}
                    handleRemoveImage={handleRemoveImage}
                    handleImageUpload={handleImageUpload}
                    setFeaturedImage={handleSetFeaturedImage}
                />
              )}

              {/* Form Actions */}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  {product ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDetailProduct;