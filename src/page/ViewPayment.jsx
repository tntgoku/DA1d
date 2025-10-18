import { Link } from "react-router-dom";
import React from "react";
import anh from '../assets/logo_store.jpg';
import { formatPrice } from "../entity/Entity";
import { ItemOrder } from "../components/ItemOrder";
import { usePayment } from "../hooks/usePayment";
import { useLogin } from "../hooks/useLogin";
const ViewPayment = () => {
  const {
    provinces,
    districts,
    selectedProvince,
    selectedDistrict,
    setSelectedProvince,
    setSelectedDistrict,
    listCart,
    totalPrice,
    totalProduct,
    pricediscount,
    voucherApplied,
    voucher,
    voucherCode,
    isInvalidVoucher,
    setVoucherCode,
    formData,
    handleFormChange,
    handleApplyVoucher,
    getFinalTotalPrice,
    submitOrder
  } = usePayment();

  const { isLoggedIn, userInfo } = useLogin();
  return (
    <div>
      <header className="banner"></header>
      <div className="checkout container-md p-2" id="checkout" >
        <form action="/payment" method="post" style={{display :'flex'
        }}>
            <div className="main">
                <div className="main__header">
                <div className="logo header__logo">
                    <img src={anh}  width={60} height={60} alt="" />
                </div>
                </div>
                <div className="main__content">
                    <div className="col col--two">
                        <div className="section">
                        <div className="section__header">
                            <div className="title-header" style={{display :'flex',alignItems :'center'
                            }}>
                                <h3 className="layout-flex__item--stretch">Phương thức thanh toán</h3>
                                <Link to="/login" className="btn--link btn--edit">
                                <i className="fa fa-user-circle"></i>Đăng nhập
                                </Link>
                            </div>
                            <div className="section__content">
                            <div className="fieldset">
                                <div className="field">
                                <div className="field__input-wrapper form-group">
                                    <label htmlFor="email" className="field__label" style={ {display :'none'}}>Email</label>
                                    <input  type="email"  className=" form-control"  name="email" id="email"  placeholder="Enter email" onChange={handleFormChange}/>
                                </div>
                                </div>

                                <div className="field">
                                <div className="field__input-wrapper form-group">
                                    <label htmlFor="full_name" className="field__label"style={ {display :'none'}}>Họ và tên</label>
                                    <input type="text" className=" form-control" name="fullname" id="full_name" placeholder="Enter full name" onChange={handleFormChange} />
                                </div>
                                </div>

                                <div className="field">
                                <div className="field__input-wrapper form-group">
                                    <label htmlFor="phone" className="field__label" style={ {display :'none'}}>Số điện thoại </label> 
                                    <input type="tel" className=" form-control" id="phone" name="phone" placeholder="Enter phone number" onChange={handleFormChange}/>
                                </div>
                                </div>

                                {/* Provinces */}
                                <div className="field">
                                <div className="field__input-wrapper form-group">
                                    <label htmlFor="province" className=" field__label" style={ {display :'none'}}>  Tỉnh/Thành phố</label>
                                    <select  id="select-provinces"  className="form-control form-control-sm"  value={selectedProvince}  
                                    onChange={(e) =>    setSelectedProvince(e.target.value)  }>  
                                        <option value="" className="field__input " >-- Chọn tỉnh/thành --</option>  
                                        {provinces.map((province) => (    <option key={province.id} value={province.id} className="field__input">      {province.full_name}    </option>  ))}
                                    </select>
                                </div>
                                </div>

                                {/* Districts với API mới thì đây sẽ là Communes  */}
                                <div className="field">
                                <div className="field__input-wrapper form-group">
                                    <label htmlFor="district" className="field__label" style={ {display :'none'}}>  Quận/Huyện</label>
                                    <select  id="select-districts"  className="form-control form-control-sm"  value={selectedDistrict}  
                                    onChange={(e) =>    setSelectedDistrict(e.target.value)  }> 
                                        {/* <option value="">-- Chọn quận/huyện --</option>   */}
                                        <option value="">-- Chọn xã/phường --</option>
                                        {districts.map((district) => (    
                                            <option key={district.id} value={district.id}>      
                                            {district.full_name}    
                                            </option>  ))}
                                    </select>
                                </div>
                                </div>
                                <div className="field">
                                    <div className="field__input-wrapper form-group">
                                        <label htmlFor="address" className="field__label" style={ {display :'none'}}>Địa chỉ</label>
                                        <input type="text" className="form-control" name="address" id="address" placeholder="Địa chỉ" onChange={handleFormChange}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="field__input-wrapper form-group">
                                        <label htmlFor="note" className="field__label" style={ {display :'none'}}>Ghi chú</label>
                                        <textarea className="form-control" id="note" name="note" rows="5" placeholder="Ghi chú" onChange={handleFormChange}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col col--two">
                        <div className="section order-summary">
                            <div className="section__header">
                                <h3 className="layout-flex__item--stretch">Đơn hàng</h3>
                            </div>
                              <div className="content-box">
                                         <div className="form-check content-box__row ">
                                            <div className="content-box__row">
                                                <div className="group-check">
                                                <input className="form-check-input" type="radio" name="paymentMethod" id="freeship" defaultChecked  value="freeship" />
                                                <label className="form-check-label radio__label__primary" htmlFor="flexRadioDefault1">thanh toán khi nhận hàng (COD)</label>
                                                </div>
                                                <label htmlFor="" className=" radio__label__accessory"> <i className="fa-solid fa-money-bill"></i></label>
                                            </div>
                                        </div>
                                        </div>
                            <div className="layout-flex">
                                <div className="section__content">
                                    <div className="section__header">
										<div className="layout-flex">
											<h2 className="section__title layout-flex__item layout-flex__item--stretch">
												Thanh toán
											</h2>
										</div>
                    
									</div>
                                    <div className="content-box">
                                        <div className="form-check ">
                                            <div className="content-box__row">
                                            <div className="group-check">
                                                <input className="form-check-input" type="radio" name="paymentMethod" id="cod" value="cod" defaultChecked   onChange={handleFormChange} />
                                                <label className="form-check-label radio__label__primary" htmlFor="flexRadioDefault1">thanh toán khi nhận hàng (COD)</label>
                                                </div>
                                                <label htmlFor="" className=" radio__label__accessory"> <i className="fa-solid fa-money-bill"></i></label>
                                            </div>
                                        </div>
                                        <div className="form-check ">
                                            <div className="content-box__row">
                                            <div className="group-check">
                                                <input className="form-check-input" type="radio" name="paymentMethod" id="vnpay" value="vnpay" onChange={handleFormChange} />
                                                <label className="form-check-label radio__label__primary" htmlFor="flexRadioDefault1">thanh toán ONLINE với VNPAY</label>
                                                </div>
                                                <label htmlFor="" className=" radio__label__accessory"> <i className="fa-solid fa-money-bill"></i></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar-payment">
                <div className="sidebar__header">
                    <h2 className="sidebar__title">
							Đơn hàng (10 sản phẩm)
						</h2>
                </div>
                <div className="sidebar__content">
                    <div className="order-summary__sections">
                        <div className="order-summary__section order-summary__section--product-list">
                            <table className="product-table">
                               <thead className="product-table__header">
											<tr>
												<th>
													<span className="visually-hidden">Ảnh sản phẩm</span>
												</th>
												<th>
													<span className="visually-hidden">Mô tả</span>
												</th>
												<th>
													<span className="visually-hidden">Sổ lượng</span>
												</th>
												<th>
													<span className="visually-hidden">Đơn giá</span>
												</th>
											</tr>
							   </thead>
                                <tbody>
                                    {
                                       listCart &&(
                                            listCart.map((product, index) => 
                                                        <ItemOrder 
                                                            key={product.id || index}
                                                            item={product}
                                                            idproduct={product.id}
                                                            Listimg={product?.images}
                                                            nameproduct={product.object.nameVariants}
                                                         />
                                                    )
                                                )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="order-summary__section order-summary__section--discount-code">
                            <div className="fieldset">
                                <div
                                    className={`field floating-labels ${
                                        voucherCode ? "field--show-floating-label" : ""
                                    }`}
                                    >
                                    <div className="field__input-btn-wrapper">
                                        <div className= {`field__input-wrapper ${isInvalidVoucher ? "error" : ""}`}>
                                        <label htmlFor="reductionCode" className="field__label" >
                                            Nhập mã giảm giá
                                        </label>
                                        <input
                                            name="reductionCode"
                                            id="reductionCode"
                                            type="text"
                                            className="field__input"
                                            value={voucherCode}
                                            onChange={(e) => setVoucherCode(e.target.value)}
                                        />
                                                                                {
                                            isInvalidVoucher &&(
                                                <p class="field__message field__message--error" style={{    paddingLeft: "12px"}}>Mã khuyến mãi không hợp lệ</p>
                                            )
                                        }
                                        </div>
                                        <button
                                        className="field__input-btn btn spinner btn-success"
                                        type="button" 
                                        onClick={ (e)=>handleApplyVoucher()}
                                        >
                                        <span className="spinner-label">Áp dụng</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>                    
                        <div className="order-summary__section order-summary__section--total-lines">
                            <div className="total-line total-line--subtotal">
												<span className="total-line-name">Tạm tính</span>
												<span className="total-line-price">
                                                     <span className="order-summary-emphasis" 
                                                     value={totalPrice} id="shipFee" codfee="0" data-curentvalue={totalPrice}>
                                                        <span>{formatPrice(totalPrice)}</span></span>
                                                </span>
											</div>
                            <div className="total-line total-line-shipping shipFeeCheckHost">
                                <span className="total-line-name">Phí vận chuyển</span>
                                <span className="total-line-price ">
                                    <span className="order-summary-emphasis" value={totalPrice} id="shipFee" codfee="0" data-curentvalue={totalPrice}><span>{formatPrice(30000)}</span></span>
                                </span>
                            </div>
                            <div className="total-line line-discount">
                                <div className="discount">
                                    <span className="total-line-name">Giảm giá </span>
                                        <span className="total-line-price total-line-discount">
                                            {/* <span className="order-summary-emphasis" value={totalPrice} id="discount" codfee="0" data-curentvalue={totalPrice}>- {formatPrice(totalPrice)}</span> */}
                                </span>
                                </div>
                                {voucherApplied && (
                                    <div className="discount-have-voucher">
                                        <span className="total-line-name">
                                        Áp dụng mã giảm giá ({voucher.value}%) cho hóa đơn
                                        </span>
                                        <span className="total-line-price total-line-discount">
                                        <span
                                            className="order-summary-emphasis"
                                            value={pricediscount}
                                            id="discount"
                                            codfee="0"
                                            data-curentvalue={pricediscount}
                                        >
                                            - {formatPrice(pricediscount)}
                                        </span>
                                        </span>
                                    </div>
                                )}

                            </div>
                            <div className="total-line table__footer">
											<div className="total-line payment-due">
												<span className="total-line__name">
													<span className="payment-due__label-total">
														Tổng cộng
													</span>
												</span>
												<span className="total-line__price">
													  <span className="payment-due__price" data-bind="getTextTotalPrice()"> <span>
                                                        {formatPrice(getFinalTotalPrice())}</span></span>
												</span>
											</div>
										</div>
                        </div>
                        <div className="order-summary__nav field__input-btn-wrapper hide-on-mobile layout-flex--row-reverse">
									<a href="/cart" className="previous-link">
										<i className="previous-link__arrow" style={{marginRight: '8px'}}>❮</i>
										<span className="previous-link__content">Quay về giỏ hàng</span>
									</a>
                                    <button type="button" className=" btn btn-checkout btn-success spinner" onClick={submitOrder}>
										<span className="spinner-label">ĐẶT HÀNG</span>
									</button>
								</div>
                    </div>
                </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ViewPayment;
