import anh1 from '../../../assets/iphone-17-pro-max_1.webp'
import { Link, useNavigate } from 'react-router-dom';
const ItemProduct =({idkey,nameproduct,product,description,Listimg})=>{
      const navigate = useNavigate();
    let price=product.price;
    const firstImage = Array.isArray(Listimg) && Listimg.length > 0 ? Listimg[0] : null;
const imgSrc = firstImage?.imgSrc || '/default-image.webp'; // ảnh mặc định nếu không có
const imgAlt = firstImage?.imgAlt || nameproduct;

    return (
        <div className="col-xl-20 col-lg-3 col-sm-4 col-6 col-fix">			
            <div className="variants product-action" data-cart-form={product?.variantId} data-id={product.idkey}>
                <div className="product-thumbnail">
                    <Link className="image_thumb scale_hover" to={`/detail/${product?.variantId}`}
                    title={`${nameproduct}`} key-id={idkey}>
                        <img
                            width={234}
                            height={234}
                            className="lazyload image1 loaded"
                            src={imgSrc}
                            data-src={imgSrc}
                            alt={imgAlt}
                        />
                    </Link>
                    <div className="tag-km"></div>
                        <input type="hidden" name="variantId" />

                        <div className="action">
                            <button className="btn-cart btn-views" title="Xem chi tiết" type="button" onClick={() => navigate("/detail/" + product.slug)} >
                              <i className="fa-solid fa-sliders" style={{color: '#fff'}}></i>
                            </button>
                        </div>
                </div>{
                    product.discount && (
                        <span className="smart">Giảm {product.discount} </span>
                    )}
                <div className="product-info">
                    <h3 className="product-name">
                        <Link  className="line-clamp line-clamp-2" to={`/detail/${product.variantId}`}  title={`${nameproduct} ${product.storage}`} >
                        {nameproduct}+ {product.storage}
                        </Link>
                    </h3>
                    <div className="price-box">{price} </div>
                    <div className="pro-promo"> 
                        {
                            product.warranty && <p className="line-clamp line-clamp-2">Trả góp 0% lãi suất qua thẻ tín dụng</p>
                        }{
                            product.warranty && <p className="line-clamp line-clamp-2">Bảo hành {product.warrantyPeriod}chính hãng Apple</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemProduct;