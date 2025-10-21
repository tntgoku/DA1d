// export const DiscoutProductPeroid = ({
//   showModal,
//   setShowModal,
//   selectedProduct,
//   discountPeriods,
//   productDiscounts,
//   onRefreshDiscounts
// }) => {
//   // State cục bộ - chỉ liên quan đến form
//   const [formData, setFormData] = useState({
//     percentage_value: 0,
//     product_id: '',
//     discount_period_id: ''
//   });

//   // Handlers cục bộ
//   const handleInputChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'number' ? parseFloat(value) : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/product-discount-periods', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...formData,
//           product_id: selectedProduct.id
//         }),
//       });

//       if (response.ok) {
//         setFormData({ percentage_value: 0, product_id: '', discount_period_id: '' });
//         onRefreshDiscounts();
//       }
//     } catch (error) {
//       console.error('Error adding product discount:', error);
//     }
//   };

//   const handleRemoveDiscount = async (discountId) => {
//     if (window.confirm('Bạn có chắc muốn xóa giảm giá này?')) {
//       try {
//         const response = await fetch(`/api/product-discount-periods/${discountId}`, {
//           method: 'DELETE',
//         });
//         if (response.ok) {
//           onRefreshDiscounts();
//         }
//       } catch (error) {
//         console.error('Error removing product discount:', error);
//       }
//     }
//   };

//   if (!showModal || !selectedProduct) return null;


      // {/* Modal Quản lý giảm giá sản phẩm */}
      // {showProductDiscountModal && selectedPeriod && (
      //   <div className="modal fade show" style={{display: 'block'}}>
      //     <div className="modal-dialog modal-xl">
      //       <div className="modal-content">
      //         <div className="modal-header">
      //           <h5 className="modal-title">
      //             Quản lý giảm giá sản phẩm - {selectedPeriod.discount_period_name}
      //           </h5>
      //           <button type="button" className="btn-close" onClick={() => setShowProductDiscountModal(false)}></button>
      //         </div>
      //         <div className="modal-body">
      //           <div className="row">
      //             <div className="col-md-4">
      //               <div className="card">
      //                 <div className="card-header">
      //                   <h6>Thêm sản phẩm giảm giá</h6>
      //                 </div>
      //                 <div className="card-body">
      //                   <form onSubmit={handleProductDiscountSubmit}>
      //                     <div className="mb-3">
      //                       <label className="form-label">Sản phẩm *</label>
      //                       <select
      //                         className="form-select"
      //                         name="product_id"
      //                         value={productDiscountFormData.product_id}
      //                         onChange={handleProductDiscountInputChange}
      //                         required
      //                       >
      //                         <option value="">Chọn sản phẩm</option>
      //                         {products.map(product => (
      //                           <option key={product.id} value={product.id}>
      //                             {product.name} - {product.price.toLocaleString()}đ
      //                           </option>
      //                         ))}
      //                       </select>
      //                     </div>
      //                     <div className="mb-3">
      //                       <label className="form-label">Giá trị giảm % *</label>
      //                       <input
      //                         type="number"
      //                         className="form-control"
      //                         name="percentage_value"
      //                         value={productDiscountFormData.percentage_value}
      //                         onChange={handleProductDiscountInputChange}
      //                         min="0"
      //                         max="100"
      //                         required
      //                       />
      //                     </div>
      //                     <input type="hidden" name="discount_period_id" value={selectedPeriod.id} />
      //                     <button type="submit" className="btn btn-primary w-100">
      //                       Thêm sản phẩm giảm giá
      //                     </button>
      //                   </form>
      //                 </div>
      //               </div>
      //             </div>
      //             <div className="col-md-8">
      //               <div className="card">
      //                 <div className="card-header">
      //                   <h6>Danh sách sản phẩm đang giảm giá</h6>
      //                 </div>
      //                 <div className="card-body">
      //                   <div className="table-responsive">
      //                     <table className="table table-sm">
      //                       <thead>
      //                         <tr>
      //                           <th>Sản phẩm</th>
      //                           <th>Giá gốc</th>
      //                           <th>Giá trị giảm</th>
      //                           <th>Giá sau giảm</th>
      //                           <th>Thao tác</th>
      //                         </tr>
      //                       </thead>
      //                       <tbody>
      //                         {getProductDiscounts(selectedPeriod.id).map(item => (
      //                           <tr key={item.id}>
      //                             <td>
      //                               <div className="d-flex align-items-center">
      //                                 <img 
      //                                   src={item.product?.imgSrc} 
      //                                   alt={item.product?.name}
      //                                   style={{width: '40px', height: '40px', objectFit: 'cover'}}
      //                                   className="me-2"
      //                                 />
      //                                 <span>{item.product?.name}</span>
      //                               </div>
      //                             </td>
      //                             <td>{item.product?.price.toLocaleString()}đ</td>
      //                             <td>{item.percentage_value}%</td>
      //                             <td>
      //                               <strong>
      //                                 {(
      //                                   item.product?.price * (1 - item.percentage_value / 100)
      //                                 ).toLocaleString()}đ
      //                               </strong>
      //                             </td>
      //                             <td>
      //                               <button className="btn btn-sm btn-outline-danger">
      //                                 <i className="fas fa-trash"></i>
      //                               </button>
      //                             </td>
      //                           </tr>
      //                         ))}
      //                       </tbody>
      //                     </table>
      //                   </div>
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //         <div className="modal-footer">
      //           <button type="button" className="btn btn-secondary" onClick={() => setShowProductDiscountModal(false)}>
      //             Đóng
      //           </button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // )}