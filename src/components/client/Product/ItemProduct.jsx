import anh1 from '../../../assets/iphone-17-pro-max_1.webp'
const ItemProduct =()=>{
    return (
        <div className="col-xl-20 col-lg-3 col-sm-4 col-6 col-fix">			
            <div className="variants product-action" data-cart-form="" data-id="product-actions-57984689">
                <div className="product-thumbnail">
                    <a className="image_thumb scale_hover" href="/iphone-17-pro-max-256gb-ll-a-1" title="iPhone 17 Pro Max 256GB">
                        <img
                        width={234}
                        height={234}
                        className="lazyload image1 loaded"
                        src={anh1}
                        data-src="//bizweb.dktcdn.net/thumb/large/100/176/601/products/17-promax-46367f4b-99ef-460f-8aa5-724169265f00.png?v=1757580877460"
                        alt="iPhone 17 Pro Max 256GB"
                        />
                    </a>
                    <div className="tag-km"></div>
                        <input type="hidden" name="variantId" />

                        <div className="action">
                            <button className="btn-cart btn-views" title="Xem chi tiết" type="button" onClick={() => (window.location.href = "/iphone-17-pro-max-256gb-ll-a-1")} >
                                <svg
                                    className="icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                </svg>
                            </button>
                        </div>
                </div>
                <span class="smart">Giảm 14% </span>
                <div className="product-info">
                    <h3 className="product-name">
                        <a
                        className="line-clamp line-clamp-2"
                        href="/iphone-17-pro-max-256gb-ll-a-1"
                        title="iPhone 17 Pro Max 256GB"
                        >
                        iPhone 17 Pro Max 256GB
                        </a></h3>
                    <div className="price-box">Liên hệ</div>
                    <div className="pro-promo">
                        <p className="line-clamp line-clamp-2">Bảo hành 12 tháng chính hãng Apple</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemProduct;