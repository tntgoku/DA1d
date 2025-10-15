// FormDetailProduct.jsx
import { useState, useEffect } from 'react';
import { defaultFormData } from '../../../entity/Entity';
import { FormAttributeBasic } from './FormAttributeBasic';
import { FormImages } from './FormImages';
import { FormTechnine } from './FormTechnice';

const FormDetailProduct = ({
  editingProduct, 
  product = null, 
  onSubmit, 
  onCancel,
  categories = [] 
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({ ...defaultFormData });
  // console.log(product?.variants);
  // Khởi tạo form data khi product thay đổi
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        category: product.category,
        slug:product.slug,
        brand:product.brand,
        price: product.price,
        stock: product.stock,
        status: product.status,
        specifications:product.specifications,
        description:product.description,
        images: product.images || [],
        featuredImageIndex: product?.images?.[0]?.imgSrc || 0,
        variants:product.variants,
        isNew: product.isNew || false
      });
    } else {
      setFormData({ ...defaultFormData });
      if(formData.specifications ===null){

      }
    }
  }, [product]);

  // Component cha
const handleInputChange = ({ target }) => {
  const { name, value } = target;
  console.log("Name: ",name);
  console.log("Value:",value);
  setFormData(prev => {
    if (name === "variants") {
      return { ...prev, variants: value };
    }else if(name==="specifications"){
        return { ...prev, specifications: value };
    }
    return { ...prev, [name]: value };
  });
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
      imgSrc: formData.images[formData.featuredImageIndex] || ''
    };
    if(formData.category ===null || formData.name===null){
      alert("Không được để trống danh mục hoặc tên sản phẩm!");
      return;
    }
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
                    editingProduct={product}
                    formData={formData}
                    setFormData={setFormData}
                    handleImageUpload={handleImageUpload}
                    handleInputChange={handleInputChange}
                />
              )}

              {/* Specifications Tab */}
              {activeTab === 'specs' && (
                    <FormTechnine  handleInputChange={handleInputChange}
                    setFormData={setFormData}
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
            </form>
            
          </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                  {product ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
        </div>
      </div>
    </div>
  );
};

export default FormDetailProduct;