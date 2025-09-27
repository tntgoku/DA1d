

export const ItemOrder=({item})=>{
    const getTextTotalPrice=()=>{
  let finalPrice = totalPrice;
  if (!isInvalid && value === "SALE2025") {
    finalPrice = totalPrice * 0.8; // giảm 20%
  }
  return finalPrice.toLocaleString("vi-VN") + " ₫";
    }
    return  <tr className="product">
                <td className="product__image">
                    <div className=" product-thumbnail__wrapper product-thumbnail">
                        <div className="image_thumb">
                            <img src={item.product.img} width={50} height={50} className="product-thumbnail__image" alt="" />
                        </div>
                    </div>
                    <span className="product-thumbnail__quantity">{item.quantity}</span>
                </td>
                <th className="product__description">
                    <span className="product__description__name">{item.name}</span>
                    <br />
                    <span className="product__description__property">{item.color} / BH chính hãng Miễn Phí</span>
                </th>
                <td className="product__quantity visually-hidden"><span>Số lượng:</span> {item.quantity}</td>
                <td className="product__price" >319.800.000 <span>₫</span></td>
            </tr>

}