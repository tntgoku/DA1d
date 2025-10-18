import Footer from "../components/client/Footer";
import Header from "../components/client/Header";
import '../css/client/detail.css';
import{Route, Routes,Link,useParams} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState,useEffect, use } from "react";
import anh from '../assets/anh1.webp';
import 'swiper/css';
import ImageSlider from "../components/client/ImagesSlides";
import SlidesObject from "../components/client/SlidesObject";
// import { categories} from "../entity/Entity";
import { productService} from "../services/productService";
import { ItemStorage } from "../components/ItemStorage";
import { Variant } from "../entity/Object/Variant";
import Breadcrumb from "../components/Breadcrumb";
import { useCategories } from "../hooks/useCategori";
import { useProductDetail } from "../hooks/useProductDetail";
import CartPopup from "../components/CartPop";
const Detail = () => {
    const { id } = useParams();
    const{categories}=useCategories();

    const {
        isPopupOpen,
        lastAddedProduct,
        product,
        productvariant,
        finalPrice,
        activeIndex,
        listimg,
        selectedStorage,
        selectedRegion,
        namecate,
        isLoading,
        error,
        slidesData,
        listStoraget,
        listColor,
        currentVariantInStorageList,
        handleSelectColor,
        setSelectedStorage,
        setSelectedRegion,
        logdata,
        closePopup,
        handleAddToCart,
        calculatePrice,totalItems
    } = useProductDetail(id, categories);



    if (isLoading) {
        return (
            <>
                <Header />
                <div className="body-wrap">
                    <div className="container">
                        <div className="text-center py-5">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <p className="mt-3">Đang tải sản phẩm...</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="body-wrap">
                    <div className="container">
                        <div className="text-center py-5">
                            <div className="alert alert-danger" role="alert">
                                <h4 className="alert-heading">Lỗi!</h4>
                                <p>{error}</p>
                                <hr />
                                <p className="mb-0">Vui lòng thử lại sau.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!product || !productvariant) {
        return (
            <>
                <Header />
                <div className="body-wrap">
                    <div className="container">
                        <div className="text-center py-5">
                            <div className="alert alert-warning" role="alert">
                                <h4 className="alert-heading">Không tìm thấy sản phẩm!</h4>
                                <p>Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

  return <>
    <Header></Header>
    <div className="body-wrap" >
        <section className="bread-crumb">
            <div className="container">
                <Breadcrumb product={product} variant={productvariant} category={null} />
            </div>
        </section>
        <div className="product layout-product">
            <div className="container">
                <div className="block-background" style={{backgroundColor:"#fff"}}>
                    <div className="row">
                        <div className="col-12"><h1 className="title-product">{product?.name}</h1></div>
                        <div className="product-detail-left product-images col-12 col-md-12 col-lg-6 col-xl-4">
                            <div className="product-image-block">
                                 <div className="image-container">
                                                <ImageSlider listimg={listimg} activeIndex={activeIndex}></ImageSlider>
                                </div>
                            </div>
                        </div>
                        <div className="product-detail-right col-12 col-md-12 col-lg-6 col-xl-5">
                            <div className="details-pro">
                                <div className="inventory_quantity">
                                <div className="thump-break row">
                                    {
                                        namecate &&(
                                                <div className="mb-break type col-lg-6">
                                                    <span className="stock-brand-title">Loại:</span>
                                                    <span className="a-vendor" data-cate={namecate}>{namecate}</span>
                                                </div>
                                        )
                                    }
                                    <div className="mb-break type col-lg-6">
                                        <span className="stock-brand-title">Thương hiệu:</span>
                                        <span className="a-vendor">Apple</span>
                                    </div>
                                    <div className="mb-break inventory col-lg-6">
                                        <span className="stock-brand-title">Tình trạng:</span>
                                        <span className="a-stock">Còn hàng</span>
                                    </div>
                                    <div className="mb-break sku-product clearfix col-lg-6">
                                        <span className="stock-brand-title">Mã sản phẩm:</span>
                                        <span className="variant-sku" itemProp={productvariant?.sku} content={productvariant?.variantId}><span className="a-sku">{productvariant?.variantId}</span></span>
                                        <br/>
                                    </div>      
                                </div>
                                <form action="/cart/add" className="add-to-cart-form" >
                                    <div className="price-box">
                                        {
                                            (finalPrice !=="Liên hệ") ? (
                                                <>
                                                    <div className="special-price">
                                                        <span className="price product-price">
                                                        {finalPrice}</span></div>
                                                    <div className="special-price" style={{ textDecoration: "line-through", color: "#6c757d", fontSize: "16px", marginLeft: "10px",}}>
                                                        <span className="price product-price">{productvariant?.list_price.toLocaleString("vi-VN") + "đ"}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="special-price">
                                                <span className="price product-price">{finalPrice}</span>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="form-product" >
                                            {selectedStorage!=null &&(<div className="version-product header">
                                                <div className="header-version">
                                                <span style={{ marginBottom: "10px", fontWeight: 600 }}>
                                                    Chọn phiên bản
                                                </span>
                                                </div>
                                                    {
                                                    <div className="option-version row">
                                                            {
                                                                Object.entries(listStoraget).map(([storage, variantsByRegion]) => (
                                                                    <ItemStorage
                                                                        key={storage}
                                                                        storage={storage}
                                                                        variantsByRegion={variantsByRegion}
                                                                        selectedStorage={selectedStorage}
                                                                        selectedRegion={selectedRegion}
                                                                    />
                                                                ))}
                                                    </div>
                                                    }
                                            </div>)}
                                        {listColor && Object.keys(listColor).length > 0 && (
                                            <div className="color-product header">
                                                <div className="color-header-version">
                                                <span style={{ marginBottom: "10px", fontWeight: 600 }}>
                                                    Màu sắc
                                                </span>
                                                </div>
                                                <div className="option-version row">
                                                    {Object.entries(listColor).map(([colorKey, colorData], index) => {
                                                        const variant = colorData[selectedStorage];
                                                        if (!variant) return null;
                                                        return (
                                                            <div className="col-lg-4 col-md-3 col-4" key={colorKey}>
                                                                <label
                                                                className={`color-item ${activeIndex === index ? "active" : ""}`}
                                                                onClick={() => handleSelectColor(colorKey)}
                                                                >
                                                                <div className="thumb-images">
                                                                    <img src={listimg[index]?.imgSrc || listimg[0]?.imgSrc} alt={`Màu ${colorKey}`} />
                                                                </div>
                                                                <div className="switch-0-color">
                                                                    <span className="title">{colorKey}</span>
                                                                    <span className="price">{calculatePrice(variant.list_price, variant.discount)}</span>
                                                                </div>
                                                                </label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                        {finalPrice !== "Liên hệ" && (
                                            <>
                                                <div className="custom-btn-number">
                                                <div className="input_number_product form-control cart__qty">									
                                                    <button className="btn_num num_1 button button_qty" type="button">-</button>
                                                    <input type="text" name="quantity" id="qtym" className="form-control prd_quantity" />
                                                    <button className="btn_num num_2 button button_qty" type="button">+</button>
                                                </div>
                                                </div>
                                                <div className="btn-mua button_actions clearfix">
                                                <button type="button" title="Thêm vào giỏ" className="btn btn-dark btn_base normal_button btn_add_cart add_to_cart btn-cart"
                                                 onClick={()=>handleAddToCart(productvariant)}>
                                                    <span className="txt-main text_1">Thêm vào giỏ</span>
                                                    <span className="text_2">Giao hàng tận nơi miễn phí</span>
                                                </button>
                                                
                                                </div>
                                                <div className="group-button">
                                                <a href="" title="Mua ngay" className="btn-buyNow btn btn-dark">
                                                    Mua ngay
                                                </a>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="khuyen-mai">
                                        <h3 className="title">
                                            Ưu đãi khi mua hàng
                                        </h3>
                                        <div className="content">
                                            <div className="rte">
                                                <p>🚦 Bảo hành 12 tháng, 1 đổi 1 40 ngày đầu tại táo vàng</p>
                                                <p>🎁 Hỗ trợ phần mềm miễn phí vĩnh viễn.</p>
                                                <p>🎁 30 ngày lỗi hoàn tiền 100% hoặc đổi nhanh máy tương đương.</p>
                                                <p>🎁 Chính sách hỗ trợ thay pin vĩnh viễn không giới hạn số lần sử dụng</p>
                                                <p>🎁 Tặng kính cường lực miễn phí vĩnh viễn.</p>
                                                <p>🎁 Tặng ốp lưng bảo vệ.</p>
                                                <p>🎁 Tặng kính cường lực Full 9D cho lần đầu mua hàng</p>
                                                <p>🎁 Tặng củ sạc nhanh 20W&nbsp;</p>
                                                <p>.....................................................</p>
                                                <p>Lưu ý&nbsp; : Khuyến mãi trên áp dụng khi thanh toán tiền mặt/ATM nội địa/Chuyển khoản/Momo</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-12 col-md-12 col-12 content-pro">
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-4 col-xl-12">
                                    <div className="khuyen-mai">
                                        <h3 className="title">Cam kết bán hàng</h3>
                                        <div className="content">
                                            <ul>
                                                <li><img width="20" height="20" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/camket_1.png?1758020458072" alt="Hàng đúng mô tả."/>
                                                    Hàng đúng mô tả.</li>
										        <li><img width="20" height="20" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/camket_2.png?1758020458072" alt="Tặng ốp lưng, kính cường lực khi mua iPhone bất kỳ."/>
										        	Tặng ốp lưng, kính cường lực khi mua iPhone bất kỳ.</li>
										        <li><img width="20" height="20" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/camket_3.png?1758020458072" alt="Giao hàng ngay (nội thành Vũng Tàu). Vận chuyển toàn quốc."/>
										        	Giao hàng ngay toàn khu vực Hà Nội. Vận chuyển toàn quốc.</li>
										        <li><img width="20" height="20" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/camket_4.png?1758020458072" alt="Hỗ Trợ Trả Góp 0%"/>
										        	Hỗ Trợ Trả Góp 0%</li>
									        </ul>
								        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 col-xl-12">
							<div className="khuyen-mai">
								<h3 className="title">
									Miễn Phí Trọn Đời
								</h3>
								<div className="content">
									<ul>
										<li><img width="20" height="20" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/km_product1.png?1758020458072" alt="Miễn phí thay kính cường lực full viền cho iPhone."/>Miễn phí thay kính cường lực full viền cho iPhone.</li>
										<li><img width="20" height="20" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/km_product2.png?1758020458072" alt="Miễn phí thay ốp lưng silicon cho iPhone."/>Miễn phí thay ốp lưng silicon cho iPhone.</li>
										<li><img width="20" height="20" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/km_product3.png?1758020458072" alt="Hỗ trợ 50 - 100% khi thay pin iPhone."/>Hỗ trợ 50 - 100% khi thay pin iPhone.</li>
									</ul>
								</div>
							</div>

						</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="product-mid ">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="product-tab block-background" id="product-tab">
                            <ul className="tabs tabs-title">
                                <li className="tab-link current" data-tab="tab-1">
                                    <h3>Mô tả sản phẩm</h3>
                                </li>
                                <li className="tab-link" data-tab="tab-2">
                                    <h3>Hỗ trợ trả góp</h3>
                                </li>
                            </ul>
                            <div className="tab-float">
                                <div className="tab-content" id="tab-1-content">
                                    <div className="product_getcontent">
                                        <div className="content_here"></div>
                                        <div className="show_more">
                                            <div className="btn btn-default btn--view-more">
                                                <Link to="#" title="Xem thêm" className="more-text see-more">Xem thêm</Link>
                                                <Link to="#" title="Thu gọn" className="less-text see-more">Thu gọn</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-content" id="tab-2-content"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">{
                        product.categoryId <=2 &&(                        
                        <div className="product-infor-technical block-background">
                            <h3 className="title">Thông số kỹ thuật</h3>
                            <div className="content">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>CPU</td>
                                            <td>Apple M1</td>
                                        </tr>
                                        <tr>
                                            <td>RAM</td>
                                            <td>8GB</td>
                                        </tr>
                                        <tr>
                                            <td>Ổ cứng</td>
                                            <td>256GB SSD</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>)}

                    </div>
                </div>
            </div>
        </div>
        <div className="productRelate product-lq">
            <div className="container">
                <div className="block-background block-product">
                    <h3 className="title-index"><Link to="/related-products">Sản phẩm liên quan</Link></h3>
                        <SlidesObject slidesData={slidesData} />
                    <div className="text-center no-padding">
				        <Link className="see-more" title="Xem toàn bộ sản phẩm" to="/macbook-air-m4-1">Xem toàn bộ sản phẩm <i className="fa-solid fa-chevron-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <CartPopup
                isOpen={isPopupOpen}
                onClose={closePopup}
                product={lastAddedProduct}
                cartItemCount={totalItems()} // Lấy tổng số lượng từ useCart
            />
    </div>
    
    <Footer></Footer>
    
  </>
}
export default Detail;