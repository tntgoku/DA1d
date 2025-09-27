import { formatPrice } from "../../../entity/Entity";

export const ItemProducts=({product,handleDelete,handleEdit,getCategoryName, isFeatured,onToggleFeatured})=>{
    let price = parseInt((product.price || "0").toString().replace(/\./g, ""), 10);

    return (
                              <tr key={product.id}>
                        <td className="text-center align-middle">{product.id}</td>
                        <td className="product-img text-center align-middle"><img src={product?.images.at(product.featuredImageIndex-1).imgSrc}  width="64" height="64" className="img-thumbnail" alt={product.imgAlt} /></td>
                        <td className="product-name text-center align-middle">{product.name}</td>
                        <td className="product-cate text-center align-middle">{getCategoryName(product.category)}</td>
                        <td className="text-left product-price text-center align-middle">{formatPrice(product.price)}</td>
                        <td className="text-center align-middle">{product.stock}</td>
                        <td className=" text-center align-middle"><span className="badge bg-success text-center btn btn-success align-middle" style={{width: '80%',height:"100%",fontSize:13}}>{product.status}</span></td>
                        <td className="text-center align-middle"> <button 
                                className={`btn btn-sm ${isFeatured ? 'btn-warning' : 'btn-outline-warning'}`}
                                onClick={() => onToggleFeatured(product.id)}
                                title={isFeatured ? 'Bỏ đánh dấu nổi bật' : 'Đánh dấu nổi bật'}
                              >
                                <i className={`fas ${isFeatured ? 'fa-star' : 'fa-star'}`}></i>
                              </button>
                      </td>
                        <td className='handle-btn text-center align-middle' >
                          <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleEdit(product)}><i className="fas fa-edit"></i></button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product.id)}><i className="fas fa-trash"></i></button>
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