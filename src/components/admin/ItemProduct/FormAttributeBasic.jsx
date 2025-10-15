
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CategorySelectGroup from '../CategoriSelect';
import { ItemVariant } from './variant/ItemVariant';
import { Variant } from '../../../entity/Object/Variant';
import { ItemVariantStorage } from './variant/ItemVariantStorage';
import { useEffect, useMemo, useState } from 'react';
import { isFormEmpty } from '../../../Util/ProductUtil';
import { ProductVariantGroup } from '../../../entity/Object/ProductVariantGroup';
import { VariantColor } from '../../../entity/Object/VariantColor';
import { useVariants } from '../../../hook/useVariant';
export const FormAttributeBasic= ({editingProduct,formData,handleImageUpload,setFormData,handleInputChange})=>{
  const [newColorInput, setNewColorInput] = useState("");
  const images = formData.images || [];
    const [variants, setVariants] = useState([]);
  console.log(formData.variants.length)
console.log("Formdata",formData);
  const {
    addColor,
    addStorage,
    removeVariantColor,
    removeStorage,
    updateVariantField
  } = useVariants(formData,setFormData, handleInputChange);
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
                    <div className="col-md-5">
                        <CategorySelectGroup isFormEmpty={isFormEmpty} formData={formData} handleInputChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="row">
                    <label className="form-label" data-id={formData.id} data-idpro={formData.id}>Số màu sắc: {formData.variants.length} </label>
                       
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Mô tả sản phẩm</label>
                          <CKEditor
                            key={formData.id || "new"}   
                            editor={ClassicEditor}
                            data={formData.description || ""} 
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              handleInputChange({ target: { name: "description", value: data } });
                            }}
                          />

                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="mb-3">
                        <label className="form-label" data-id={formData.id} data-idpro={formData.slug}>URL sản phẩm(tự động tạo theo tên sản phẩm)*</label>
                        <input
                          type="text"
                          className="form-control"
                          name="slug"
                          value={formData?.slug}
                          onChange={handleInputChange}
                          required
                        />
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
                    <div className="body-variant">
                        <div className="input-group mb-3 header-variant d-flex justify-content-between align-items-center">
                          <label className="form-label fw-bold">
                            Màu sắc cho sản phẩm:{" "}
                            <span className="text-primary">
                            </span>
                          </label>
                          <input
                              type="text"
                              className="form-control "
                              value={newColorInput}
                              onChange={e => setNewColorInput(e.target.value)}
                              placeholder="Nhập màu mới..."
                            />
                            <button
                              className="btn btn-success"
                              type="button"
                              onClick={(e)=>{
                                addColor(newColorInput)
                                setNewColorInput("");
                              }}
                            >
                              <i className="fas fa-plus"></i> Thêm
                            </button>
                        </div>
                        {(editingProduct && formData.variants?.length > 0) &&
                          [...formData.variants].reverse().map((v, idx) => (
                            <div key={v.idColor} className='body-variant border rounded p-3 mb-4 shadow-sm'>
                              <ItemVariant
                                variant={v}
                                index={idx}
                                updateVariantField={updateVariantField}
                                onAddStorage={()=>addStorage(v.idColor,v.color)}
                                onRemoveVariant={removeVariantColor}
                              />
                              {(v.variantsStorage || []).length > 0 && [...v.variantsStorage].map((storage,index) => (
                                <ItemVariantStorage
                                  index={index}
                                  idcolor={v.idColor}
                                  key={storage.variantId}
                                  variant={storage}
                                  updateVariantField={updateVariantField}
                                  handleRemoveVariantstorage={removeStorage}
                                />
                              ))}
                            </div>
                          ))
                        }
                    </div>
                  </div>
                </div>

    );
}