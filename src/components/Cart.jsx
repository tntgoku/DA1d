import { ItemCart } from "./client/ItemCart"
import { useState,useEffect } from "react";
import { formatPrice, itemtest, productsvariant1 } from "../entity/Entity";
import SvgIcon from "./client/Svg";
import { Link,useNavigate } from "react-router-dom";
import { Button } from "bootstrap";
import { useCart } from "../hooks/useCart";

export const Cart=() =>{
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const {getlistCart, updateCartInStorage}=useCart();
    const [finaltotla,setFinalTotal]=useState();
    const[totalProduct,setTotalProduct]=useState();
    const [listCart,setListCart]=useState(getlistCart() || []);
// Tăng quantity cho 1 variant cụ thể
const handleIncrease = (productId, variantId) => {
    const updatedList = listCart.map(product => product.object.variantId === variantId
        ? { ...product, quantity: Math.min(product.quantity + 1, 51) }
        : product
    );

    setListCart(updatedList);
};

// Giảm quantity cho 1 variant cụ thể
const handleDecrease = (productId, variantId) => {
    const updatedList = listCart.map(product => ({
        ...product,
        quantity: Math.max(product.quantity - 1,1)
    }));
    setListCart(updatedList);
};
// 1. Thiết lập listCart
useEffect(() => {
  setListCart(getlistCart());
  console.log("listcart",listCart);
}, []);

// Cập nhật localStorage khi listCart thay đổi

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
      totalPrice += product.object.price * product.quantity; // tính tiền cho variant
      totalQuantity += product.quantity;             // cộng số lượng variant
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
const handleChange = (e, productId) => {
    let value = parseInt(e.target.value);

    if (!isNaN(value) && value > 0) {
        if (value >= 51) {
            value = 51; // giới hạn tối đa
            alert("Số lượng tối đa là 51"); // thông báo ra màn hình
        }
        const updatedList = listCart.map(product => ({
            ...product,
            quantity: value
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
                                <div className="cart cart-form">
                                    {
                                       listCart && listCart.length > 0 ? (
                                            listCart.map((product) => 
                                                // product.variants && product.variants.length > 0 ? 
                                                    // product.variants.map((variant) => 
                                                        <ItemCart 
                                                            key={`${product.id}-${product.object.variantId}`}
                                                            idproduct={product.id}
                                                            item={product}
                                                            nameproduct={product.object?.nameVariants}
                                                            Listimg={product?.object?.images}
                                                            handleChange={handleChange}
                                                            handleDecrease={handleDecrease}
                                                            handleIncrease={handleIncrease}
                                                        />
                                                    // )
                                                // : null
                                            )
                                        ) : (
                                            <div className="cart--empty">
                                                <SvgIcon width={24} height={24} className="text-blue-400 svgicon" />
                                                <p>Không có sản phẩm nào trong giỏ hàng của bạn{listCart.length}</p>
                                            </div>
                                        )
                                    }
                                                
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
                                                             navigate("/checkout");
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