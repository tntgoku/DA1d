import { ItemCart } from "./client/ItemCart"
import { useState,useEffect,useNa } from "react";
import { formatPrice, itemtest, productsvariant1 } from "../entity/Entity";
import SvgIcon from "./client/Svg";
import { Link,useNavigate } from "react-router-dom";
import { Button } from "bootstrap";

export const Cart=() =>{
        const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [finaltotla,setFinalTotal]=useState();
    const[totalProduct,setTotalProduct]=useState();
    const [listCart,setListCart]=useState([]);
// Tăng quantity cho 1 variant cụ thể
const handleIncrease = (productId, variantId) => {
    const updatedList = listCart.map(product => ({
        ...product,
        variants: product.variants.map(item => 
            item.variantId === variantId
            ? { ...item, quantity_cart: Math.min(item.quantity_cart + 1, 51)}
            : item
        )
    }));
    setListCart(updatedList);
};

// Giảm quantity cho 1 variant cụ thể
const handleDecrease = (productId, variantId) => {
    const updatedList = listCart.map(product => ({
        ...product,
        variants: product.variants.map(item => 
            item.variantId === variantId
            ? { ...item, quantity_cart: Math.max(item.quantity_cart - 1,1) }
            : item
        )
    }));
    setListCart(updatedList);
};
// 1. Thiết lập listCart
useEffect(() => {
  setListCart(itemtest);
}, []);

// 2. Tính tổng khi listCart thay đổi
// useEffect này chạy mỗi khi listCart thay đổi
useEffect(() => {
  // Nếu listCart rỗng, không tính gì cả
  if (!listCart || listCart.length === 0) return;

  // Khởi tạo biến lưu tổng tiền và tổng số lượng
  let totalPrice = 0;
  let totalQuantity = 0;

  // Duyệt qua từng sản phẩm trong giỏ
  listCart.forEach(product => {
    // Duyệt qua từng variant của sản phẩm
    product.variants.forEach(variant => {
      totalPrice += variant.price * variant.quantity_cart; // tính tiền cho variant
      totalQuantity += variant.quantity_cart;             // cộng số lượng variant
    });
  });

  // Format tổng tiền theo kiểu VNĐ
  const formattedTotalPrice = formatPrice(totalPrice);
  // Log ra console để kiểm tra
  console.log("Tổng tiền:", formattedTotalPrice);
  console.log("Tổng số lượng variant:", totalQuantity);
  setTotalProduct(totalQuantity);
  setFinalTotal(formattedTotalPrice);

}, [listCart]);


// Thay đổi trực tiếp từ input
const handleChange = (e, productId, variantId) => {
    const value = parseInt(e.target.value);

    if (!isNaN(value) && value > 0) {
        if (value >= 51) {
        value = 51; // giới hạn tối đa
        alert("Số lượng tối đa là 51"); // thông báo ra màn hình
        }
        const updatedList = listCart.map(product => ({
            ...product,
            variants: product.variants.map(item => 
                
                item.variantId === variantId
                ? { ...item, quantity_cart: value }
                : item
            )
        }));
        setListCart(updatedList);
    }
};



    return(
                            <div className="header-cart header-control d-none block-cart d-lg-flex">
                        <div title="Giỏ hàng" className="icon">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                        <div className="content-cart">
                            <a href="http://"><span className="label-cart">Giỏ hàng </span> <br /><span className="label-cart">Sản phẩm:</span> 
                              <span className="count-item">{totalProduct !== 0 ? totalProduct : 0}</span></a>
                        </div>
                        <div className="top-content-cart">
                            <div className="content-cartHeader">
                                {
                                    listCart ===null &&(<div className="cart--empty">
                                        <SvgIcon width={24} height={24} className="text-blue-400 svgicon" />
                                        <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                                    </div>
                                    )
                                }
                                <div className="cart cart-form">
                                    {
                                       listCart &&(
                                            listCart.map((product) => 
                                                    product.variants?.map((variant) => (
                                                        <ItemCart 
                                                            key={`${product.productId}-${variant.variantId}`}
                                                            idproduct={product.productId}
                                                            item={variant}
                                                            nameproduct={product.productName}
                                                            Listimg={product?.images}
                                                            handleChange={handleChange}
                                                            handleDecrease={handleDecrease}
                                                            handleIncrease={handleIncrease}
                                                        />
                                                    ))
                                                )
                                        )}
                                                
                                    <div className="cart_footer">
                                        <div className="cart_subtotal">
                                            <div className="cart__col">Tổng tiền:</div>
                                            <div className="cart__total text-right"><p className="money">{finaltotla ?finaltotla:""}</p></div>
                                        </div>
                                        <div className="cart__process-checkout">
                                            <button type="button" 
                                            className="button btn btn-default cart__btn-proceed-checkout" 
                                            id="btn-proceed-checkout"
                                            onClick={(e)=>{
                                                             navigate("/payment");
                                            }}
                                            >Tiến hành thanh toán</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}