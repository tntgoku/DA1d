import React, { useState, useEffect } from 'react';

const EditProductModal = ({ 
  showModal, 
  setShowModal, 
  editingProduct, 
  handleSubmit, 
  formData, 
  handleInputChange 
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [haveCamera, setHaveCamera] = useState(false);
  
  // Đồng bộ trạng thái haveCamera với category
  useEffect(() => {
    setHaveCamera(formData.category === 'Iphone' || formData.category === 'Tablet');
  }, [formData.category]);

  // Hàm xử lý upload ảnh
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange({
          target: {
            name: 'image',
            value: e.target.result
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
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
            </ul>

            <form onSubmit={handleSubmit}>
              <div className="tab-content p-3" id="productTabsContent">
                {/* Tab thông tin cơ bản */}
                <div className={`tab-pane fade ${activeTab === 'basic' ? 'show active' : ''}`}>
                                    <div className="row">
                    <div className="col-md-6">
                      <div className="mb-5">
                        <label className="form-label">Hình ảnh sản phẩm</label>
                        <div>
                          {formData.img && (
                            <img 
                              src={formData.img} 
                              alt="Preview" 
                              style={{maxWidth: '200px', maxHeight: '200px', marginBottom: '10px'}}
                            />
                          )}
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Tên sản phẩm *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Danh mục *</label>
                        <select
                          className="form-select"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Chọn danh mục</option>
                          <option value="Iphone">Điện thoại</option>
                          <option value="Tablet">Tablet</option>
                          <option value="Đồng hồ">Đồng hồ thông minh</option>
                          <option value="Phụ kiện">Phụ kiện</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {haveCamera && (
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Loại sản phẩm:</label>
                          <select 
                            name="type" 
                            className="form-select"
                            value={formData.type || ''}
                            onChange={handleInputChange}
                          >
                            <option value="isNew">Mới</option>
                            <option value="isOld">Cũ</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Giá (VND) *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Tồn kho *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="stock"
                          value={formData.stock}
                          onChange={handleInputChange}
                          required
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tab thông số kỹ thuật */}
                <div className={`tab-pane fade ${activeTab === 'specs' ? 'show active' : ''}`}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Màu sắc</label>
                        <input
                          type="text"
                          className="form-control"
                          name="color"
                          value={formData.specifications?.color || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                color: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: Đen, Trắng, Tím..."
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Bộ nhớ trong</label>
                        <input
                          type="text"
                          className="form-control"
                          name="storage"
                          value={formData.specifications?.storage || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                storage: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: 128GB, 256GB..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">RAM</label>
                        <input
                          type="text"
                          className="form-control"
                          name="ram"
                          value={formData.specifications?.ram || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                ram: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: 8GB, 16GB..."
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Màn hình</label>
                        <input
                          type="text"
                          className="form-control"
                          name="screen"
                          value={formData.specifications?.screen || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                screen: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: 6.7 inch, 14.2 inch..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Dung lượng pin</label>
                        <input
                          type="text"
                          className="form-control"
                          name="battery"
                          value={formData.specifications?.battery || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                battery: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: 4323 mAh, 70Wh..."
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Chip xử lý</label>
                        <input
                          type="text"
                          className="form-control"
                          name="chip"
                          value={formData.specifications?.chip || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                chip: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: Apple A16 Bionic, Snapdragon 8 Gen 2..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {haveCamera && (
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Camera</label>
                          <input
                            type="text"
                            className="form-control"
                            name="camera"
                            value={formData.specifications?.camera || ''}
                            onChange={(e) => handleInputChange({
                              target: {
                                name: 'specifications',
                                value: {
                                  ...formData.specifications,
                                  camera: e.target.value
                                }
                              }
                            })}
                            placeholder="Ví dụ: 48MP, 12MP..."
                          />
                        </div>
                      </div>
                    )}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Trọng lượng</label>
                        <input
                          type="text"
                          className="form-control"
                          name="weight"
                          value={formData.specifications?.weight || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                weight: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: 240g, 1.6kg..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Kết nối</label>
                        <input
                          type="text"
                          className="form-control"
                          name="connectivity"
                          value={formData.specifications?.connectivity || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                connectivity: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: Bluetooth 5.3, Wi-Fi 6..."
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Tính năng đặc biệt</label>
                        <input
                          type="text"
                          className="form-control"
                          name="features"
                          value={formData.specifications?.features || ''}
                          onChange={(e) => handleInputChange({
                            target: {
                              name: 'specifications',
                              value: {
                                ...formData.specifications,
                                features: e.target.value
                              }
                            }
                          })}
                          placeholder="Ví dụ: Chống nước, Sạc nhanh..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
                ) : (
                  <>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setActiveTab('basic')}
                    >
                      <i className="fas fa-arrow-left"></i> Quay lại
                    </button>
                    <button type="submit" className="btn btn-primary">
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

export default EditProductModal;