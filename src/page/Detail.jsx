import Footer from "../components/client/Footer";
import Header from "../components/client/Header";
import '../css/client/detail.css';
import{Route, Routes,Link, Links} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import anh from '../assets/anh1.webp';
import anh1 from '../assets/iphone-17-pro-max_1.webp';
import 'swiper/css';
import ImageSlider from "../components/client/ImagesSlides";
import SlidesObject from "../components/client/SlidesObject";
const Detail = (products) => {
    
const slidesData = [
    {
        id: 1,
        href: "/iphone-17-pro-max-256gb-ll-a-1",
        title: "iPhone 17 Pro Max 256GB",
        imgSrc: anh1,
        imgAlt: "iPhone 17 Pro Max 256GB",
        price: "Liên hệ",
        promo: "Bảo hành 12 tháng chính hãng Apple",
        discount: "Giảm 14%",
    },
    {
        id: 2,
        href: "/iphone-17-pro-max-512gb-ll-a-1",
        title: "iPhone 17 Pro Max 512GB",
        imgSrc: anh1,
        imgAlt: "iPhone 17 Pro Max 512GB",
        price: "Liên hệ",
        promo: "Bảo hành 12 tháng chính hãng Apple",
        discount: "Giảm 14%",
    },
];
    const listimg=[anh1,anh1,anh1,anh1];
  return <>
    <Header></Header>
    <div className="body-wrap" >
        <section className="bread-crumb">
            <div className="container">
                <ul className="breadcrumb">
                    <li className="home"> <Link to="/" className="changeurl">Home</Link><i className="fa-solid fa-chevron-right"></i> </li>
                    <li className="home"> <Link to="/" className="changeurl">Home</Link><i className="fa-solid fa-chevron-right"></i> </li>
                    <li className="home"> <Link to="/products" className="changeurl">Products</Link><i className="fa-solid fa-chevron-right"></i> </li>
                    <li><strong><span>iPhone 14 Pro Max 1TB 99%</span></strong> </li>
                </ul>
            </div>
        </section>
        <div className="product layout-product">
            <div className="container">
                <div className="block-background" style={{backgroundColor:"#fff"}}>
                    <div className="row">
                        <div className="col-12"><h1 className="title-product">{products.name?products.name:"deo co j dau"}</h1></div>
                        <div className="product-detail-left product-images col-12 col-md-12 col-lg-6 col-xl-4">
                            <div className="product-image-block">
                                 <div className="image-container">
                                                <ImageSlider listimg={listimg}></ImageSlider>
                                </div>
                            </div>
                        </div>
                        <div className="product-detail-right col-12 col-md-12 col-lg-6 col-xl-5">
                            <div className="details-pro">
                                <div className="inventory_quantity">
                                <div className="thump-break row">
                                    <div className="mb-break type col-lg-6">
                                        <span className="stock-brand-title">Loại:</span>
                                        <span className="a-vendor">Tai Nghe</span>
                                    </div>
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
                                        <span className="variant-sku" itemprop="sku" content="AG1059"><span className="a-sku">AG1059</span></span>
                                        <br/>
                                    </div>      
                                </div>
                                <form action="/cart/add" className="add-to-cart-form" >
                                    <div className="price-box">
                                        <div className="special-price">
                                            <span className="price product-price">20.000.000đ</span>
                                        </div>
                                        <div className="special-price" style={{textDecoration:"line-through", color:"#6c757d",fontSize:"16px", marginLeft:"10px"}}>
                                            <span className="price product-price">20.000.000đ</span>
                                        </div>
                                    </div>
                                    <div className="form-product" >
                                        <div className="custom-btn-number" >
                                            <div className="input_number_product form-control cart__qty">									
                                                        <button className="btn_num num_1 button button_qty" type="button">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"></path>
                                                            </svg>
                                                        </button>
                                                        <input type="text" name="quantity" id="qtym" className="form-control prd_quantity" />
                                                    <button className="btn_num num_2 button button_qty" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                                                        </svg>							</button>
                                                </div>
                                        </div>
                                        <div className="btn-mua button_actions clearfix">
                                                <button type="submit" title="Thêm vào giỏ" className="btn  btn-dark btn_base normal_button btn_add_cart add_to_cart btn-cart">
                                                    <span className="txt-main text_1">Thêm vào giỏ</span>
                                                    <span className="text_2">Giao hàng tận nơi miễn phí</span>
                                                </button>
                                        </div>
                                        <div className="group-button">
                                            <a href="" title="Mua ngay" className="btn-buyNow btn btn-dark">
                                                Mua ngay
                                            </a>
                                        </div>
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
                                <div class="col-12 col-md-6 col-lg-4 col-xl-12">
							<div class="khuyen-mai">
								<h3 class="title">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightning-fill" viewBox="0 0 16 16">
										<path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"></path>
									</svg>Miễn Phí Trọn Đời
								</h3>
								<div class="content">
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
                    <div className="col-lg-5">
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
                        </div>
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
    </div>
    <Footer></Footer>
  </>;
}
export default Detail;