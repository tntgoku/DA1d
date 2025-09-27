import "../../css/client/header.css";
import anh1 from '../../assets/anh1.webp';
import {Routes,Route,Link,useNavigate} from 'react-router-dom';
// import Dashboard from '../admin/Dashboard';
import { useState,useEffect } from "react";
import '../../css/client/payment.css';
import logo_store from '../../assets/logo_store.jpg';
import { Cart } from "../Cart";
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [isOpennav,setIsOpennav]= useState(false);
    const [username,setUsername]=useState();
    const [quantity, setQuantity] = useState(1);
    const navigate=useNavigate();
    const handleToggleLogin = () => {
    //      if (!isOpen) {
    //   setIsOpen(true);      
    //   setTimeout(() => setAnimate(true), 10); 
    // } else {
    //   setAnimate(false);     
    //   setIsOpen(false);   
        navigate("/login");   
    // }
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
  useEffect(()=>{

  },[username])
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
                    <Cart  />
                    <div className="header-account">
                        <div className="button__login">
                            <button type="button" className="btn-login" onClick={handleToggleLogin}><span className="user-text"> {username ? username : "Đăng nhập"}</span>
                            <i className="fa-solid fa-user" style={{marginLeft :"5px"}}></i>
                            </button>
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

            </div>
        </header>
    );
}
export default Header;