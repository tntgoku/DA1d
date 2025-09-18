import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import anh from '../assets/logo_store.jpg';
import anh1 from '../assets/iphone-17-pro-max_1.webp';
import { getProvinces, getDistricts, getCommunes } from "../components/getAPI";
const ViewPayment = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [value, setValue] = useState("");

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  // Lấy danh sách tỉnh/thành
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data.data); // ✅ data là mảng
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Khi chọn tỉnh -> load quận
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedProvince) return;
      try {
        const data = await getDistricts(selectedProvince);
        setDistricts(data.data);
        setCommunes([]); // reset xã
        setSelectedDistrict("");
      } catch (err) {
        console.error(err);
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  // Khi chọn quận -> load xã
  useEffect(() => {
    const fetchCommunes = async () => {
      if (!selectedDistrict) return;
      try {
        const data = await getCommunes(selectedDistrict);
        setCommunes(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCommunes();
  }, [selectedDistrict]);
  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
    console.log("Phương thức thanh toán:", e.target.value);
  };
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
                                <Link to="/login" className="btn btn--link btn--edit">
                                <i className="fa fa-user-circle"></i>Đăng nhập
                                </Link>
                            </div>
                            <div className="section__content">
                            <div className="fieldset">
                                <div className="field">
                                <div className="field__input-wrapper form-group">
                                    <label htmlFor="email" className="field__label" style={ {display :'none'}}>Email</label>
                                    <input  type="email"  className=" form-control"  id="email"  placeholder="Enter email"/>
                                </div>
                                </div>

                                <div className="field">
                                <div className="field__input-wrapper form-group">
                                    <label htmlFor="full_name" className="field__label"style={ {display :'none'}}>Họ và tên</label>
                                    <input type="text" className=" form-control" id="full_name" placeholder="Enter full name" />
                                </div>
                                </div>

                                <div className="field">
                                <div className="field__input-wrapper form-group">
                                    <label htmlFor="phone" className="field__label" style={ {display :'none'}}>Số điện thoại </label> 
                                    <input type="tel" className=" form-control" id="phone" placeholder="Enter phone number" />
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

                                {/* Districts */}
                                <div className="field">
                                <div className="field__input-wrapper form-group">
                                    <label htmlFor="district" className="field__label" style={ {display :'none'}}>  Quận/Huyện</label>
                                    <select  id="select-districts"  className="form-control form-control-sm"  value={selectedDistrict}  
                                    onChange={(e) =>    setSelectedDistrict(e.target.value)  }> 
                                        <option value="">-- Chọn quận/huyện --</option>  
                                        {districts.map((district) => (    
                                            <option key={district.id} value={district.id}>      
                                            {district.full_name}    
                                            </option>  ))}
                                    </select>
                                </div>
                                </div>
                                {/* Communes */}
                                <div className="field">
                                <div className="field__input-wrapper form-group">
                                    <label htmlFor="commune" className="field__label" style={ {display :'none'}}>Xã/Phường</label>
                                    <select id="select-communes" className="form-control form-control-sm">
                                    <option value="">-- Chọn xã/phường --</option>
                                    {communes.map((commune) => (
                                        <option key={commune.id} value={commune.id}>
                                        {commune.full_name}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                                </div>

                                <div className="field">
                                    <div className="field__input-wrapper form-group">
                                        <label htmlFor="address" className="field__label" style={ {display :'none'}}>Địa chỉ</label>
                                        <input type="text" className="form-control" id="address" placeholder="Địa chỉ" />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="field__input-wrapper form-group">
                                        <label htmlFor="note" className="field__label" style={ {display :'none'}}>Ghi chú</label>
                                        <textarea className="form-control" id="note" rows="5" placeholder="Ghi chú" ></textarea>
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
                                            <div className="group-check">
                                            <input className="form-check-input" type="radio" name="paymentMethod" id="mbbank" value="mbbank" onChange={handleChange} />
                                            <label className="form-check-label radio__label__primary" htmlFor="flexRadioDefault1">thanh toán khi nhận hàng (COD)</label>
                                            </div>
                                            <label htmlFor="" className=" radio__label__accessory"> <i className="fa-solid fa-money-bill"></i></label>
                                        </div>
                                        </div>
                            <div className="layout-flex">
                                {/* <h2 className="section__tile">
                                    <i className="fa-solid fa-money-bill"></i>
                                    Thanh toán khi nhận hàng (COD)
                                </h2> */}
                                <div className="section__content">
                                    <div className="section__header">
										<div className="layout-flex">
											<h2 className="section__title layout-flex__item layout-flex__item--stretch">
												Thanh toán
											</h2>
										</div>
                    
									</div>
                                    <div className="content-box">
                                        <div className="form-check content-box__row ">
                                            <div className="group-check">

                                            <input className="form-check-input" type="radio" name="paymentMethod" id="mbbank" value="mbbank" onChange={handleChange} />
                                            <label className="form-check-label radio__label__primary" htmlFor="flexRadioDefault1">thanh toán khi nhận hàng (COD)</label>
                                            </div>
                                            <label htmlFor="" className=" radio__label__accessory"> <i className="fa-solid fa-money-bill"></i></label>
                                        </div>
                                        <div className="form-check content-box__row">
                                            <div className="group-check">

                                            <input className="form-check-input" type="radio" name="paymentMethod" id="cod" value="cod" onChange={handleChange} />
                                            <label className="form-check-label radio__label__primary" htmlFor="flexRadioDefault1">thanh toán khi nhận hàng (COD)</label>
                                            </div>
                                            <label htmlFor="" className=" radio__label__accessory"> <i className="fa-solid fa-money-bill"></i></label>
                                        </div>
                                        <div className="form-check content-box__row">
                                            <div className="group-check">

                                            <input className="form-check-input" type="radio" name="paymentMethod" id="vnpay" value="vnpay" onChange={handleChange} />
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
            <div className="sidebar-payment">
                <div className="sidebar__header">
                    <h2 class="sidebar__title">
							Đơn hàng (10 sản phẩm)
						</h2>
                </div>
                <div className="sidebar__content">
                    <div className="order-summary__sections">
                        <div className="order-summary__section order-summary__section--product-list">
                            <div className="product-table">
                               <thead class="product-table__header">
											<tr>
												<th>
													<span class="visually-hidden">Ảnh sản phẩm</span>
												</th>
												<th>
													<span class="visually-hidden">Mô tả</span>
												</th>
												<th>
													<span class="visually-hidden">Sổ lượng</span>
												</th>
												<th>
													<span class="visually-hidden">Đơn giá</span>
												</th>
											</tr>
										</thead>
                                <tbody>
                                    <tr className="product">
                                        <td className="product__image">
                                            <div className=" product-thumbnail__wrapper product-thumbnail">
                                                <div className="image_thumb">
                                                    <img src={anh1} width={50} height={50} className="product-thumbnail__image" alt="" />
                                                </div>
                                            </div>
                                            <span className="product-thumbnail__quantity">10</span>
                                        </td>
                                        <th className="product__description">
                                            <span className="product__description__name">MacBook Air M4 15" 10CPU 10GPU 16GB 256GB 2025</span>
                                            <br />
                                            <span className="product__description__property">Xanh Dương / BH chính hãng Miễn Phí</span>
										</th>
                                        <td className="product__quantity visually-hidden"><span>Số lượng:</span> 10</td>
                                        <td className="product__price" >319.800.000₫</td>
                                    </tr>
                                </tbody>
                            </div>
                        </div>
                        <div className="order-summary__section order-summary__section--discount-code">
                            <div className="fieldset">
                                <div
                                    className={`field floating-labels ${
                                        value ? "field--show-floating-label" : ""
                                    }`}
                                    >
                                    <div className="field__input-btn-wrapper">
                                        <div className="field__input-wrapper">
                                        <label htmlFor="reductionCode" className="field__label" >
                                            Nhập mã giảm giá
                                        </label>
                                        <input
                                            name="reductionCode"
                                            id="reductionCode"
                                            type="text"
                                            className="field__input"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                        </div>
                                        <button
                                        className="field__input-btn btn spinner btn-success"
                                        type="button"
                                        >
                                        <span className="spinner-label">Áp dụng</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        
                        <div className="order-summary__section order-summary__section--total-lines">
                            <div class="total-line total-line--subtotal">
												<span class="total-line__name">
													Tạm tính
												</span>
												<span class="total-line__price">319.800.000₫</span>
											</div>
                            <div className="total-line total-line-shipping shipFeeCheckHost">
                                <span className="total-line-name">Phí vận chuyển</span>
                                <span className="total-line-price">
                                    <span className="order-summary-emphasis" value="40000" id="shipFee" codfee="0" data-curentvalue="40000">40,000  đ</span>
                                </span>
                            </div>
                            <div class="total-line-table__footer">
											<div class="total-line payment-due">
												<span class="total-line__name">
													<span class="payment-due__label-total">
														Tổng cộng
													</span>
												</span>
												<span class="total-line__price">
													<span class="payment-due__price" data-bind="getTextTotalPrice()">319.840.000₫</span>
												</span>
											</div>
										</div>
                        </div>
                        <div className="order-summary__nav field__input-btn-wrapper hide-on-mobile layout-flex--row-reverse">
									<a href="/cart" className="previous-link">
										<i className="previous-link__arrow" style={{marginRight: '8px'}}>❮</i>
										<span className="previous-link__content">Quay về giỏ hàng</span>
									</a>
                                    <button type="submit" className=" btn btn-checkout btn-success spinner">
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
