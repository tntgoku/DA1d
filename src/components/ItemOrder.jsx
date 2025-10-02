import { useEffect,useState } from "react";
import { formatPrice } from "../entity/Entity";
export const ItemOrder=({item,idproduct,images,nameproduct})=>{
    const[finalTotal,setFinalTotal]=useState();
    useEffect(() => {
    let totalPrice = 0;
    let totalQuantity = 0;
    totalPrice += item.price * item.quantity_cart; // tính tiền cho variant
    totalQuantity += item.quantity_cart;             // cộng số lượng variant
    // Format tổng tiền theo kiểu VNĐ
    const formattedTotalPrice = formatPrice(totalPrice);
    // Log ra console để kiểm tra
    console.log("Tổng tiền:", formattedTotalPrice);
    console.log("Tổng số lượng variant:", totalQuantity);
    setFinalTotal(formattedTotalPrice);

    }, [item]);
    return  <tr className="product" >
                <td className="product__image">
                    <div className=" product-thumbnail__wrapper product-thumbnail">
                        <div className="image_thumb">
                            <img src={images?.at(0).imgSrc} width={50} height={50} className="product-thumbnail__image" alt="" />
                        </div>
                    </div>
                    <span className="product-thumbnail__quantity">{item.quantity_cart}</span>
                </td>
                <th className="product__description">
                    <span className="product__description__name">{`${nameproduct} ${item.storage}`}</span>
                    <br />
                    <span className="product__description__property">{item.color} / BH chính hãng Miễn Phí</span>
                </th>
                <td className="product__quantity visually-hidden"><span>Số lượng:</span> {item.quantity_cart}</td>
                <td className="product__price" >{finalTotal}</td>
            </tr>

            

}