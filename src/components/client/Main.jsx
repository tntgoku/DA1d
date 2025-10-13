import '../../css/client/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import{ useState,useEffect } from 'react';
import ItemProduct from './Product/ItemProduct';
import { productsvariant1 } from '../../entity/Entity';
import { productService } from '../../service/productService';
import { groupProductsByVariant } from '../../entity/Object/Product';
const Main = () => {
    const products1 =productsvariant1;
    const [activeTab, setActiveTab] = useState("1");
    const [productAPI,setProductAPI]=useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productService.getProductFeatured();
        console.log(response);
        const dataorder=groupProductsByVariant(response);
        setProductAPI(dataorder);
        console.log("convertVariant",dataorder);
        console.log("Fetched productsFeatured oday ne:", response);
        // products1=data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);


    const handleClick = (e) => {
        const tab = e.currentTarget.getAttribute("data-tab");
        setActiveTab(tab);
    };
    return (
        <main className='Main-Container'>
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
                                        <li className={`tab-link has-content ${activeTab === "1" ? "current" : ""}`} data-tab= "1" onClick={handleClick}><span title='Sản phẩm nổi bật'>Sản phẩm nổi bật</span></li>
                                        <li className={`tab-link has-content ${activeTab === "2" ? "current" : ""}`} data-tab="2" onClick={handleClick}><span title='Sản phẩm bán chạy'>Sản phẩm bán chạy</span></li>
                                    </ul>
                                    <div className={`tab-1 tab-content ${activeTab ==="1" ? "current" : ""}`}>
                                            <div className="row row-fix">
                                                {productAPI && productAPI.map((product,index) => (
                                                        <ItemProduct idkey={index}
                                                                     nameproduct={`${product.name} 
                                                                     ${product?.variants?.at(0).storage==null? "":product?.variants?.at(0).storage } 
                                                                     ${product?.variants?.at(0).regionCode!=null ?product?.variants?.at(0).regionCode:'' }`}
                                                                     product={product?.variants.at(0).length<=0? product:product?.variants.at(0)}
                                                                     description={product?.description}
                                                                     Listimg={product?.images} />
                                                ))}
                                                <div className="text-center no-padding">
                                                    <a className="see-more" title="Xem toàn bộ sản phẩm" href="/danh-muc-tu-dong">Xem toàn bộ sản phẩm <i className="fa-solid fa-arrow-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                    </div>
                                    <div className={`tab-2 tab-content ${activeTab === "2" ? "current" : ""}`}>
                                        <div className="row row-fix">
                                            {
                                                products1 && products1.map((product)=>(
                                                    <ItemProduct key={product.id} product={product}/>
                                                ))
                                            }
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