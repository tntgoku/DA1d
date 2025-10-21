    // CartPopup.jsx
    import React from 'react';
    import "../css/client/CartPopup.css"
    const CartPopup = ({ product, cartItemCount, onClose, isOpen }) => {
        if (!isOpen) return null; 
        const productPrice = product?.price?.toLocaleString('vi-VN') || '0';
        
        const CheckmarkIcon = () => (
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="-21 -21 682.66669 682.66669" width="1em">
                <path d="m322.820312 387.933594 279.949219-307.273438 36.957031 33.671875-314.339843 345.023438-171.363281-162.902344 34.453124-36.238281zm297.492188-178.867188-38.988281 42.929688c5.660156 21.734375 8.675781 44.523437 8.675781 68.003906 0 148.875-121.125 270-270 270s-270-121.125-270-270 121.125-270 270-270c68.96875 0 131.96875 26.007812 179.746094 68.710938l33.707031-37.113282c-58.761719-52.738281-133.886719-81.597656-213.453125-81.597656-85.472656 0-165.835938 33.285156-226.273438 93.726562-60.441406 60.4375-93.726562 140.800782-93.726562 226.273438s33.285156 165.835938 93.726562 226.273438c60.4375 60.441406 140.800782 93.726562 226.273438 93.726562s165.835938-33.285156 226.273438-93.726562c60.441406-60.4375 93.726562-140.800782 93.726562-226.273438 0-38.46875-6.761719-75.890625-19.6875-110.933594zm0 0"></path>
            </svg>
        );

        // SVG cho icon Close
        const CloseIcon = () => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001">
                <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285L284.286,256.002z"/>
            </svg>
        );

        return (
            // Thêm class 'active' chỉ khi 'isOpen' là true
            <div id="popup-cart-mobile " className={`popup-cart-mobile ${isOpen ? 'active' : ''}`}>
                <div className="header-popcart modal-dialog modal-xl">
                    <div className="top-cart-header">
                        <span>
                            <CheckmarkIcon />
                            Mua hàng thành công
                        </span>
                    </div>

                    {/* Thông tin sản phẩm vừa thêm */}
                    <div className="media-content bodycart-mobile">
                        <div className="thumb-1x1">
                            <img 
                                src={product?.image || 'default-image.png'} 
                                alt={product?.name || 'Sản phẩm'}
                            />
                        </div>
                        <div className="body_content">
                            <h4 className="product-title">{product?.nameVariants || 'Tên Sản Phẩm'}</h4>
                            <span className="product-variant-info">
                                {`${product?.color}-${product?.storage}`}
                                {(product?.warantly && product.warantly > 0) 
                                    ? `BH ${product.warantly} tháng chính hãng Miễn Phí` 
                                    : ''}
                            </span>
                            <div className="product-new-price">
                                <b>{productPrice}₫</b>
                            </div>
                        </div>
                    </div>

                    {/* Tổng số lượng */}
                    {/* href="/cart" */}
                    <div className="noti-cart-count"  title="Giỏ hàng"> 
                        Giỏ hàng của bạn hiện có <span className="count_item_pr">{cartItemCount}</span> sản phẩm 
                    </div>

                    {/* Nút Đóng */}
                    <a title="Đóng" className="cart_btn-close iconclose" onClick={onClose}>
                        <CloseIcon />
                    </a>

                    {/* Action Buttons */}
                    <div className="bottom-action">
                        <button type='button' className="cart_btn-close tocontinued" title="Tiếp tục mua hàng" onClick={onClose}>
                            Tiếp tục mua hàng
                        </button>
                        <a href="/checkout" className="checkout" title="Thanh toán ngay">
                            Thanh toán ngay
                        </a>
                    </div>
                </div>
            </div>
        );
    };

    export default CartPopup;