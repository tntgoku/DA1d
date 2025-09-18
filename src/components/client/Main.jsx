import '../../css/client/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemProduct from './Product/ItemProduct';
const Main = () => {
    return (
        <main>
            <div className="container" style={{marginTop: '20px'}}>
                <div className="row row-fix">
                </div>
                <section className="section_chinhsach">
                    <div className="block-background">
                        <div className="row row-fix">
                            <div className="col-6 col-sm-6 col-lg-3 col-xl-3 col-fix margin-0">
                                <div className="item">
                                    <div className="icon">
                                        <img width="64" height="64" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/chinhsach_1.png?1757670314036" alt="Giao hàng nhanh" />
                                    </div>
                                    <div className="text">
                                        <span className="title">Giao hàng nhanh</span>
                                        <span className="des"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-sm-6 col-lg-3 col-xl-3 col-fix margin-0">
                                <div className="item">
                                    <div className="icon">
                                        <img width="64" height="64" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/chinhsach_2.png?1757670314036" alt="Tư vấn chuyên nghiệp" />
                                    </div>
                                    <div className="text">
                                        <span className="title">Tư vấn chuyên nghiệp</span>
                                        <span className="des"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-sm-6 col-lg-3 col-xl-3 col-fix margin-0">
                                <div className="item">
                                    <div className="icon">
                                        <img width="64" height="64" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/chinhsach_3.png?1757670314036" alt="100% chính hãng" />
                                    </div>
                                    <div className="text">
                                        <span className="title">100% chính hãng</span>
                                        <span className="des"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-sm-6 col-lg-3 col-xl-3 col-fix margin-0">
                                <div className="item">
                                    <div className="icon">
                                        <img width="64" height="64" src="//bizweb.dktcdn.net/100/176/601/themes/984546/assets/chinhsach_4.png?1757670314036" alt="Thanh toán linh hoạt" />
                                    </div>
                                    <div className="text">
                                        <span className="title">Thanh toán linh hoạt</span>
                                        <span className="des"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
			    </section>
                <section className="section_category">
                    <div className="container">
                        <div className="block-background">
                            <div className="row p-5">
                                <div className="col-12">
                                    <ul className="tab tab-title">
                                        <li className="tab-link has-content current" data-tab= "1"><span title='Sản phẩm nổi bật'>Sản phẩm nổi bật</span></li>
                                        <li className="tab-link has-content" data-tab="2"><span title='Sản phẩm bán chạy'>Sản phẩm bán chạy</span></li>
                                    </ul>
                                    <div className="tab-1 tab-content current">
                                            <div className="row row-fix">
                                                <ItemProduct/>
                                                <ItemProduct/>
                                                <ItemProduct/>
                                                <ItemProduct/>
                                                <ItemProduct/>
                                                <ItemProduct/>
                                                <div className="text-center no-padding">
                                                    <a className="see-more" title="Xem toàn bộ sản phẩm" href="/danh-muc-tu-dong">Xem toàn bộ sản phẩm <i className="fa-solid fa-arrow-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Main;