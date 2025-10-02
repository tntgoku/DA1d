import { Link } from "react-router-dom"
import { formatPrice } from "../../entity/Entity"
export const ItemCart=({key,idproduct,item,nameproduct,Listimg,handleChange,handleDecrease,handleIncrease})=>{
        return(
            <div className="cart-item">
                <div className="cart-product" data-line="1" key={key}>
                    <a href="http://">
                        <img src={Listimg.at(0).imgSrc} alt="" width={80} height={80} />
                    </a>
                    <div className="cart__info">
                        <div className="cart__product_name">
                            <a href="http://" className="cart__product_item-name h4">{nameproduct}</a>
                            <span className="cart__product-meta variant-title">{item.color} / BH chính hãng Miễn Phí</span>
                            <button href="" data-line="1" className="cart__btn-remove remove-item-cart  " onClick={(e)=>{
                                console.log("Remove item:" +item.variantId);
                            }}>Xóa</button>
                        </div>
                        <div className="grid">
                            <div className="grid__item cart_select cart_item_name">
                                <label>Số lượng</label>
                               <div className="cart__qty">
                                    <button
                                        type="button"
                                        className="qty-btn minus item-count"
                                        onClick={() => handleDecrease(idproduct, item.variantId)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        name="updates-quantity"
                                        className="cart__qty-input qty"
                                        value={item.quantity_cart}
                                        min="1"
                                        max={50}
                                        onChange={(e) => handleChange(e, idproduct, item.variantId)}
                                    />
                                    <button
                                        type="button"
                                        className="qty-btn plus item-count"
                                        onClick={() => handleIncrease(idproduct, item.variantId)}
                                    >
                                        +
                                    </button>
                                </div>

                            </div>
                            <div className="grid__item cart_select cart_item_price">
                                <p className="money">{formatPrice(item.price)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
}