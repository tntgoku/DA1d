
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
//   const handleAddColor= ()=>{
//     if (!newColorInput.trim()) return; // Không thêm nếu input rỗng

//       const currentVariants = formData.variants || [];

//       // Tạo VariantColor mới từ input
//       const newColor = new VariantColor({
//         idColor: Math.floor(Math.random() * 1000000), // ID duy nhất
//         color: newColorInput,          // lấy từ input
//         variants: []                   // chưa có storage
//       });

//       // Cập nhật formData
//       handleInputChange({
//         target: { name: "variants", value: [...currentVariants, newColor] }
//       });

//       // Reset input
//       setNewColorInput("");
//   }  
//   const handleAddStorage=(id)=>{
//     console.log("Here",id);
//      const newVariant = new Variant({
//     variantId:Math.floor(Math.random() * 1000000), // ID tạm thời
//     color: "", // có thể lấy từ VariantColor
//     storage: "",
//     price: 0,
//     stock: 0
//   });
//    // Tìm đúng VariantColor trong formData.variants
//   const updatedVariants = (formData.variants || []).map(vColor => {
//     if (vColor.idColor === id) {
//       // Thêm variant mới vào variantsStorage
//       const updatedStorage = [...(vColor.variantsStorage || []), newVariant];
//       return { ...vColor, variantsStorage: updatedStorage };
//     }
//     return vColor;
//   });
//     handleInputChange({
//     target: { name: "variants", value: updatedVariants }
//   });
//     console.log(formData.variants);
//   }
// const  handleRemoveVariantColor=(idcolor)=>{
//   console.log("Remove: color  ",idcolor);
//   const updatedVariants = (formData.variants || []).filter(
//     vColor => vColor.idColor !== idcolor
//   );
//   handleInputChange({
//     target: { name: "variants", value: updatedVariants }
//   });

//  }
// const handleRemoveVariantStorage = (idColor, variantId) => {
//   // Duyệt tất cả VariantColor
//   console.log("id color Remove: ",idColor,"dd",variantId)
//   const updatedVariants = (formData.variants || []).map(vColor => {
//     if (vColor.idColor === idColor) {
//       // Lọc ra những variant không phải variantId cần xóa
//       const updatedStorage = (vColor.variantsStorage || []).filter(
//         v => v.variantId !== variantId
//       );
//       return { ...vColor, variantsStorage: updatedStorage };
//     }
//     return vColor;
//   });

//   // Cập nhật formData thông qua handleInputChange
//   handleInputChange({
//     target: { name: "variants", value: updatedVariants }
//   });
// };

// const updateVariantField = (idColor, fieldName, newValue, variantId = null) => {
//   const updatedVariants = (formData.variants || []).map(vColor => {
//     if (vColor.idColor === idColor) {
//       if (variantId !== null) {
//         const updatedStorage = (vColor.variantsStorage || []).map(v => {
//           if (v.variantId === variantId) {
//                 const value = ['price', 'list_price', 'sale_price', 'discount', 'warrantly', 'stock'].includes(fieldName)
//         ? Number(newValue)
//         : newValue;
//             return { ...v, [fieldName]: value }; // clone object nested
//           }
//           return v;
//         });
//         return { ...vColor, variantsStorage: updatedStorage }; // clone object cha
//       } else {
//         return { ...vColor, [fieldName]: newValue }; // clone object cha
//       }
//     }
//     return vColor; // giữ nguyên các object khác
//   });

//   handleInputChange({ target: { name: "variants", value: updatedVariants } });
// };

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
                                // onAddStorage={() => handleAddStorage(v.idColor)}
                                onAddStorage={()=>addStorage(v.idColor,v.color)}
                                // onRemoveVariant={handleRemoveVariantColor}
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