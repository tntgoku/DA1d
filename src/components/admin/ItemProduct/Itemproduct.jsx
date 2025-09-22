
export const ItemProducts=({product,handleDelete,handleEdit,getCategoryName})=>{
    let price = parseInt((product.price || "0").toString().replace(/\./g, ""), 10);

    return (
                              <tr key={product.id}>
                        <td>{product.id}</td>
                        <td className="product-img"><img src={product.imgSrc}  width="64" height="64" className="img-thumbnail" alt={product.imgAlt} /></td>
                        <td className="product-name">{product.name}</td>
                        <td className="product-cate">{getCategoryName(product.category)}</td>
                        <td className="text-left product-price">{price}</td>
                        <td>{product.stock}</td>
                        <td><span className="badge bg-success">{product.status}</span></td>
                        <td className='handle-btn'>
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