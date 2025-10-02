import { formatPrice } from "../../../entity/Entity";

export const ItemProducts=({product,handleDelete,handleEdit,getCategoryName, isFeatured,onToggleFeatured , onManageDiscount})=>{
    let price = parseInt((product.price || "0").toString().replace(/\./g, ""), 10);

    return (
                              <tr key={product.id}>
                        <td className="id">{product.id}</td>
                        <td className="product-img "><img src={product?.images.at(product.featuredImageIndex-1).imgSrc}  width="64" height="64" className="img-thumbnail" alt={product.imgAlt} /></td>
                        <td className="product-name ">{product.name}</td>
                        <td className="product-cate ">{getCategoryName(product.category)}</td>
                        <td className="text-left product-price ">{formatPrice(product.price)}</td>
                        <td >{product.stock}</td>
                        <td className=" "><span className="badge bg-success text-center btn btn-success align-middle" style={{width: '80%',height:"100%",fontSize:13}}>{product.status}</span></td>
                        <td > <button 
                                className={`btn btn-sm ${isFeatured ? 'btn-warning' : 'btn-outline-warning'}`}
                                onClick={() => onToggleFeatured(product.id)}
                                title={isFeatured ? 'Bỏ đánh dấu nổi bật' : 'Đánh dấu nổi bật'}
                              >
                                <i className={`fas ${isFeatured ? 'fa-star' : 'fa-star'}`}></i>
                              </button>
                      </td>
                        <td className='handle-btn ' >
                          <div className="d-flex justify-content-center align-items-center gap-2" style={{color:'black'}}>
                            <button 
                              className="btn btn-sm btn-outline-info me-1"
                              onClick={onManageDiscount}
                              title="Quản lý giảm giá"
                              >
                              <i className="fas fa-tag"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleEdit(product)}><i className="fas fa-edit"></i></button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product.id)}><i className="fas fa-trash"></i></button>
                            </div>
                        </td>
                      </tr>
    )
}



//   // Định dạng tiền Việt Nam
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
//   };

//   // Tính tổng tiền trong giỏ hàng
//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };