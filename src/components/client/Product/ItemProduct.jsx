import anh1 from '../../../assets/iphone-17-pro-max_1.webp'
import { Link, useNavigate } from 'react-router-dom';
const ItemProduct =({key,product})=>{
      const navigate = useNavigate();
    let price=product.price;
    if (price == null || Number(price.replace(/\D/g, "")) <= 0) {
        price = "Liên hệ";
    } else {
        price = Number(price.replace(/\D/g, "")).toLocaleString() + " đ";
    }
    return (
        <div className="col-xl-20 col-lg-3 col-sm-4 col-6 col-fix">			
            <div className="variants product-action" data-cart-form="" data-id={product.id}>
                <div className="product-thumbnail">
                    <Link className="image_thumb scale_hover" to={`/detail/${product.href}`} title={product.name} key-id={key}>
                        <img
                            width={234}
                            height={234}
                            className="lazyload image1 loaded"
                            src={product.imgSrc}
                            data-src={product.imgSrc}
                            alt={product.imgAlt}
                        />
                    </Link>
                    <div className="tag-km"></div>
                        <input type="hidden" name="variantId" />

                        <div className="action">
                            <button className="btn-cart btn-views" title="Xem chi tiết" type="button" onClick={() => navigate("/detail/" + product.href)} >
                              <i className="fa-solid fa-sliders" style={{color: '#fff'}}></i>
                            </button>
                        </div>
                </div>{
                    product.discount && (
                        <span className="smart">Giảm {product.discount} </span>
                    )}
                <div className="product-info">
                    <h3 className="product-name">
                        <Link  className="line-clamp line-clamp-2" to={`/detail/${product.href}`}  title={product.name} >
                        {product.name}
                        </Link>
                    </h3>
                    <div className="price-box">{price} </div>
                    <div className="pro-promo"> 
                        <p className="line-clamp line-clamp-2">Bảo hành {product.warranty}chính hãng Apple</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemProduct;