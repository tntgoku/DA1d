
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export const FormAttributeBasic= ({formData,handleImageUpload,handleInputChange, price})=>{
 
    const images = formData.images || [];
    const featuredIndex = formData.featuredImageIndex || 0;
const status = [
  { id: 1, value: "Hot" },
  { id: 2, value: "New" },   // nếu muốn thêm phần tử khác
  { id: 3, value: "Sale" }
];

    return(
                <div className={`row`}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" data-id={formData.id} data-idpro={formData.product_id}>Tên sản phẩm *</label>
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
                    <div className="col-md-2">
                      <div className="mb-3">
                        <label className="form-label">Danh mục *</label>
                        <select
                          className="form-select"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          data-test={formData.category}
                          required
                        >
                          <option value="">Chọn danh mục</option>
                          <option value="1">Điện thoại</option>
                          <option value="2">Tablet</option>
                          <option value="3">Đồng hồ thông minh</option>
                          <option value="4">Phụ kiện</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Mô tả sản phẩm</label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={formData.description || ""}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            handleInputChange({
                              target: {
                                name: "description",
                                value: data
                              }
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-8">
                      <div className="mb-3">
                        <label className="form-label" data-id={formData.id} data-idpro={formData.href}>URL sản phẩm(tự động tạo theo tên sản phẩm)*</label>
                        <input
                          type="text"
                          className="form-control"
                          name="href"
                          value={formData.href}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="alert alert-info">
                        <i className="fas fa-info-circle"></i> Ảnh chính hiển thị: 
                        {images &&images.length <= 0  &&(
                            <strong> Chưa có ảnh</strong>
                        ) }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                            <label className="form-label">Ảnh xem trước</label>
                            <div style={{ minHeight: '100px', border: '1px dashed #ccc', padding: '10px' }}>
                              {images && images.length > 0 ? (
                                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <img
                                    src={images[featuredIndex]?.imgSrc || images[0].imgSrc} // nếu featuredIndex undefined, lấy ảnh đầu tiên
                                    alt={images[featuredIndex]?.imgAlt || images[0].imgAlt || 'Ảnh xem trước'}
                                    style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }}
                                  />
                                  <div>
                                    {/* <strong>Ảnh số {featuredIndex + 1}</strong> */}
                                  </div>
                                </div>
                              ) : (
                                <strong>Chưa có ảnh</strong>
                              )}
                            </div>


                      </div>
                      <div className="mb-3">
                        <label className="form-label">Hình ảnh sản phẩm *</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          multiple // Cho phép chọn nhiều ảnh
                          onChange={handleImageUpload}
                        />
                        <small className="text-muted">Có thể chọn nhiều ảnh cùng lúc</small>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Trạng thái sản phẩm sản phẩm:</label>
                              <select 
                                  name="status" 
                                  className="form-select"
                                  value={formData.status || -1}
                                  onChange={handleInputChange}
                                  data-test123={formData.status}
                                >
                                  <option key="-1">
                                      Chưa chọn trạng thái
                                    </option>
                                  {status.map(element => (
                                    <option key={element.id} value={element.id}>
                                      {element.value}
                                    </option>
                                  ))}
                                </select>

                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="mb-3">
                          <label className="form-label">Loại sản phẩm:</label>
                          <select 
                            name="isNew" 
                            className="form-select"
                            value={formData.isNew || ''}
                            onChange={handleInputChange}
                            data-test123={formData.isNew}
                          >
                            <option  value="true">Mới</option>
                            <option  value="false">Cũ</option>
                          </select>
                        </div>
                      </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Giá (VND) *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          value={price}
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

    );
}