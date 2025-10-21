import '../../css/client/footer.css'
import { AddressStore, EmailStore, NumberWeb, PolycisSupport } from '../../entity/Marco';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className='footer'>
        <div className="top-footer">
            <div className="container">
                <div className="block-background">
                    <div className="row  align-items-center">
                        <div className="col-lg-5 col-xl-6 col-12">
                            <div className="chinhsach-ft-slider container p-5 container-initialized container-horizontal container-pointer-events">
                                <div className="wrapper" >							
                                    <div className="slide " >
                                        <img width={54} height={54} className="lazyload loaded" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/chinhsach_footer_1.png?1757670314036" data-src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/chinhsach_footer_1.png?1757670314036" alt="Thanh toán&lt;br&gt;khi nhận hàng" data-was-processed="true"/>
                                        <span>Thanh toán<br />khi nhận hàng</span>
                                    </div>
                                    <div className="slide">
                                        <img width={54} height={54} className="lazyload loaded" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/chinhsach_footer_2.png?1757670314036" data-src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/chinhsach_footer_2.png?1757670314036" alt="Cam kết uy tính&lt;br&gt;hàng chính hãng" data-was-processed="true"/>
                                        <span>Cam kết uy tính<br />hàng chính hãng</span>
                                    </div>
                                    

                                    
                                    <div className="slide">
                                        <img width="54" height="54" className="lazyload loaded" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/chinhsach_footer_3.png?1757670314036" data-src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/chinhsach_footer_3.png?1757670314036" alt="Giao hàng&lt;br&gt;tận nơi" data-was-processed="true"/>
                                        <span>Giao hàng<br />tận nơi</span>
                                    </div>
                                    <div className="slide">
                                        <img width={54} height={54} className="lazyload loaded" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/chinhsach_footer_4.png?1757670314036" data-src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/chinhsach_footer_4.png?1757670314036" alt="Đổi trả&lt;br&gt;dễ dàng" data-was-processed="true"/>
                                        <span>Đổi trả<br />dễ dàng</span>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 col-xl-6 col-12">
                            <ul     className="hotline">
                                <li>
                                    <div className="title">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14"></path>
                                        </svg>
                                        KHIẾU NẠI, GÓP Ý
                                    </div>
                                    <a href="tel:0973805900" title="0973805900">0973805900</a>
                                </li>
                                <li>
                                    <div className="title">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
                                        </svg>
                                        TƯ VẤN
                                    </div>
                                    <a href="tel:0932004455" title="0932004455">0932004455</a>
                                </li>
                                <li>
                                    <div className="title">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"></path>
                                        </svg>
                                        TRUONGLCD
                                    </div>
                                    <a href="https://TRUONGLCD.vn/lien-he" title="118 NKKN, P.Vũng Tàu, TP.Hồ Chí Minh">{AddressStore}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mid-footer">
            <div className="container">
                <div className="row row-fix">
                    <div className="col-6 col-md-6 col-lg-3 col-xl-3 link-list col-footer footer-click col-fix">
                        <h4 className="title-menu">GIỚI THIỆU</h4>
                        <ul className="list-menu hidden-moblie">
                            <li><Link to="/" title=''>Home</Link></li>
                            <li><Link to="/" title=''>Sản phẩm</Link></li>
                            <li><Link to="/contact" title=''>Liên hệ</Link></li>
                            <li><Link to="/" title=''>Bán hàng Online</Link></li>
                            <li><Link to="/thucu-doi-moi" title=''>Thủ cự đổi mới</Link></li>
                            <li><Link to="/contact" title=''>Hỗ trợ kỹ thuật</Link></li>
                            <li><Link to="/warranty-policy" title=''>Hỗ trợ bảo hành& sửa chữa</Link></li>
                        </ul>
                    </div>
                      <div className="col-6 col-md-6 col-lg-3 col-xl-3 link-list col-footer footer-click col-fix">
                        <h4 className="title-menu">HỖ TRỢ</h4>
                        <ul className="list-menu hidden-moblie">
                            {PolycisSupport.map((item, index)=>(
                                <li key={index}><a href="#" title=''>{item}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="bottom-footer">
            <div className="container">
                <div className="row row-fix">
                    <div className='col-12 col-md-12 col-lg-12 col-xl-5 ft-info col-fix'>
                        <div className="group-address">
                            <ul>
                                <li><b>Địa chỉ:</b><span style={{}}>{AddressStore}</span></li>
                                <li><b>Số điện thoại:</b><a href={`tel:${NumberWeb}`} >{NumberWeb}</a></li>
                                <li><b>Email:</b><a  href={`mailto:${EmailStore}`}  >{EmailStore}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-6 col-xl-4 col-fix'>
                        <h4 className="title-menu">
						TVCare Service
					</h4>
                    <ul className="call-footer">
						<li style={{marginBottom: 10}}>
							<span className="title" style={{fontWeight: 'bold'}}>MUA ONLINE (08:00 - 21:00 mỗi ngày)</span>
							<br />
                            <a href={`tel:${NumberWeb}`} title={NumberWeb} style={{fontWeight: 'bold'}}>{NumberWeb}</a>
							<br />
                            <span className="content">Tất cả các ngày trong tuần (Trừ tết Âm Lịch)</span>
						</li>
						
						
						<li>
							<span className="title" style={{fontWeight: 'bold'}}>GÓP Ý &amp; KHIẾU NẠI (08:00 - 21:00)</span>
							<br />
                            <a href={`tel:${NumberWeb}`} title={NumberWeb} style={{fontWeight: 'bold'}}>{NumberWeb}</a>
							<br />
                            <span className="content">Tất cả các ngày trong tuần (Trừ tết Âm Lịch)</span>
						</li>
						
					</ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="container inforstore">
            <div className="row">
                <div className="col-12 col-md-12 col-lg-12 col-xl-12" style={{textAlign: 'center', marginTop :4, marginBottom: 5}}>
                   <a href="http://localhost:5173/">Website: https://nalidoushi</a>
                    <br/>
                    Địa chỉ: 118 Nam Kỳ Khởi Nghĩa, Phường Vũng Tàu, TP Hồ Chí Minh, Việt Nam
                </div>
            </div>
        </div>
      <p style={{textAlign: 'center'}}>© 2023 My Website</p>
    </footer>
  );
};
export default Footer;