import "../../css/client/header.css";
import SvgIcon from "./Svg";
import anh1 from '../../assets/anh1.webp';
import {Routes,Route,Link} from 'react-router-dom';
// import Dashboard from '../admin/Dashboard';
import { useState,useEffect } from "react";
import '../../css/client/payment.css';
import logo_store from '../../assets/logo_store.jpg';
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [isOpennav,setIsOpennav]= useState(false);
    const handleToggleLogin = () => {
         if (!isOpen) {
      setIsOpen(true);      
      setTimeout(() => setAnimate(true), 10); 
    } else {
      setAnimate(false);     
      setIsOpen(false);      
    }
    }
    const handleTogglenav=()=>{
        if(!isOpennav){
            setIsOpennav(true);
        }
        else{
            setIsOpennav(false);

        }
    }
    useEffect(() => {
    // if (isOpen) {
    //   document.body.style.overflow = "hidden";
    // } else {
    //   document.body.style.overflow = "auto";
    // }
    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [isOpen]);
    return (
        <header  className="header-top">
            <div className="container-lg">
                <nav className="header-navbar navbar navbar-expand-lg  d-lg-flex justify-content-between     ">
                    <div className="Name-logo d-flex align-items-center" >
                        <Link to="/" className="navbar-brand" href="#"><img src={logo_store} alt="" width={40} height={40}/>Trường LCD</Link>
                        {/* <a className="navbar-brand" href="#">MyApp</a> */}
                    </div>
                    <div className="header-control d-none d-xl-flex " id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page" href="#">Home</Link>
                                {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                            </li>
                            <li className="nav-item">
                                {/* <Link to="/admin" className="nav-link" href="#">Admin</Link> */}
                                {/* <a className="nav-link" href="#">Features</a> */}
                            </li>
                            <li className="nav-item">
                                <Link to="/detail" className="nav-link" href="#">Pricing</Link>
                                {/* <a className="nav-link" href="#">Pricing</a> */}
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                        </ul>
                    </div>
                    <div className="header-searcher">
                        <div className="search-match">
                            <form action="/search" method="get" className="input-groups1">
                                <input type="text" name="query" required=""
                                className="input-group-field auto-search search-auto form-control" 
                                placeholder="Bạn cần tìm gì..." autoComplete="off" />
                                <input type="hidden" name="type" value="product" />
                                <button type="submit" className="btn icon-fallback-text" title="Search">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                                <div className="search-suggest" style={{display: 'none'}}>
                                <ul className="smart-search-title">
                                    <li data-tab="#tab-search-1" className="active"><a href="" title="Sản phẩm">Sản phẩm</a></li>
                                    <li data-tab="#tab-search-2"><a href="" title="Tin tức">Tin tức</a></li>
                                </ul>
                                <div className="list-search-suggest">
                                    <div className="list-search list-search-style active" id="tab-search-1">
                                    </div>
                                    <div className="list-search2 list-search-style" id="tab-search-2">
                                    </div>
                                </div>
                            </div>
                            </form>                    
                        </div>
                    </div>
                    <div className="header-cart header-control d-none block-cart d-lg-flex">
                        <div title="Giỏ hàng" className="icon">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                        <div className="content-cart">
                            <a href="http://"><span className="label-cart">Giỏ hàng </span> <br /><span className="label-cart">Sản phẩm:</span> <span className="count-item">0</span></a>
                        </div>
                        <div className="top-content-cart">
                            <div className="content-cartHeader">
                                {/* <div className="cart--empty">
                                    <SvgIcon width={24} height={24} className="text-blue-400 svgicon" />
                                    <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                                </div> */}
                                <div className="cart cart-form">
                                    <div className="cart_body items">
                                        <div className="cart-item">
                                            <div className="cart-product" data-line="1">
                                                <a href="http://">
                                                    <img src={anh1} alt="" width={80} height={80} />
                                                </a>
                                                <div className="cart__info">
                                                    <div className="cart__product_name">
                                                        <a href="http://" className="cart__product_item-name h4">MacBook Air M4 15" 10CPU 10GPU 16GB 256GB 2025</a>
                                                        <span className="cart__product-meta variant-title">Xanh Dương / BH chính hãng Miễn Phí</span>
                                                        <a href="" data-line="1" className="cart__btn-remove remove-item-cart ">Xóa</a>
                                                    </div>
                                                    <div className="grid">
                                                        <div className="grid__item cart_select cart_item_name">
                                                            <label>Số lượng</label>
                                                            <div className="cart__qty">
                                                                <button type="button" className="qty-btn minus item-count" data-line="1">-</button>
                                                                <input type="text" name="updates[]" className="cart__qty-input qty" value="1" min="1" data-line="1" />
                                                                <button type="button" className="qty-btn plus item-count" data-line="1">+</button>
                                                            </div>
                                                        </div>
                                                        <div className="grid__item cart_select cart_item_price">
                                                            <p className="money">31.980.000₫</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cart_footer">
                                        <div className="cart_subtotal">
                                            <div className="cart__col">Tổng tiền:</div>
                                            <div className="cart__total text-right"><p className="money">31.980.000₫</p></div>
                                        </div>
                                        <div className="cart__process-checkout">
                                            <button type="button" className="button btn btn-default cart__btn-proceed-checkout" id="btn-proceed-checkout">Tiến hành thanh toán</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-account">
                        <div className="button__login">
                            <button type="button" className="btn-login" onClick={handleToggleLogin}><span className="user-text">Đăng nhập</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_4926_290388)"><path d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z" stroke="white" stroke-width="1.5" stroke-linecap="round"></path> <path d="M9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10Z" stroke="white" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6.16797 18.849C6.41548 18.0252 6.92194 17.3032 7.61222 16.79C8.30249 16.2768 9.13982 15.9997 9.99997 16H14C14.8612 15.9997 15.6996 16.2774 16.3904 16.7918C17.0811 17.3062 17.5874 18.0298 17.834 18.855" stroke="white" stroke-width="1.5" stroke-linecap="round"></path></g> <defs><clipPath id="clip0_4926_290388"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg></button>
                        </div>
                    </div>
                                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" onClick={handleTogglenav}></span>
                        </button>
                </nav>
                <div className="header-des">
                        <div className={`header-nav ${isOpennav ? "current":""}`}>
                            <ul className="menu-desktop">
                                <li className="d-block d-lg-none title-menu">
                                    Menu chính
                                </li>
                                <li className="nav-item">
                                    <a href="" className="a-img" title="Apple">Apple</a><i className="fa fa-caret-down item-rote"></i>
                                    <ul className="item_small">
                                        <li><a href="" className="caret-down">Apple Iphone</a><i className="fa fa-caret-right"></i></li>
                                        <li><a href="" className="caret-down">Apple Ipad</a><i className="fa fa-caret-right"></i></li>
                                        <li><a href="" className="caret-down">Macbook</a><i className="fa fa-caret-right"></i></li>
                                        <li><a href="" className="caret-down">iMac & Mac Desktop</a><i className="fa fa-caret-right"></i></li>
                                        <li><a href="" className="caret-down">Apple Watch</a><i className="fa fa-caret-right"></i></li>
                                        <li><a href="" className="caret-down">Tai nghe Airpods</a><i className="fa fa-caret-right"></i></li>
                                        <li><a href="" className="caret-down">Phụ kiện Apple</a><i className="fa fa-caret-right"></i></li>
                                    </ul>
                                </li>
                                <li className="nav-item"><a  href="" className="a-img" title="Máy cũ">Máy cũ</a><i className="fa fa-caret-down item-rote"></i></li>
                                <li className="nav-item"><a  href="" className="a-img" title="Phụ kiện">Phụ kiện</a><i className="fa fa-caret-down item-rote"></i></li>
                                <li className="nav-item"><a  href="" className="a-img" title="Dịch vụ">Dịch vụ</a><i className="fa fa-caret-down item-rote"></i></li>
                                <li className="nav-item"><a  href="" className="a-img" title="Chính sách">Chính sách</a><i className="fa fa-caret-down item-rote"></i></li>
                                <li className="nav-item"><a  href="" className="a-img" title="Liên hệ">Liên hệ</a><i className="fa fa-caret-down item-rote"></i></li>
                            </ul>
                        </div>
                </div>
                <div id="modalLogin" className={`popup ${animate ? "show" : ""}`}>
                  <h2>Form đăng nhập</h2>
                  <p>Đây là nội dung sẽ hiện khi isOpen = true</p>
                  <button aria-label="close" className="modal-close is-medium modal__button" onClick={handleToggleLogin}>X</button>
                </div>
            </div>
        </header>
    );
}
export default Header;