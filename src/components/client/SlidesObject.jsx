import React, { useRef, useState } from 'react';
    // Import Swiper React components
    import { Swiper, SwiperSlide } from 'swiper/react';
    import anh1 from '../../assets/iphone-17-pro-max_1.webp';
    // Import Swiper styles
    import 'swiper/css';
    import 'swiper/css/free-mode';
    import 'swiper/css/navigation';
    import 'swiper/css/thumbs';
    // import required modules
    import '../../css/client/main.css';
    import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

function SlidesObject({ slidesData }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <Swiper
            style={{
                "--swiper-navigation-color": "#100f0fff",
                "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="p-5 producte-relate"
        >
            {slidesData.map((slide) => (
                <SwiperSlide key={slide.id}>
                    <div
                        className="variants product-action"
                        data-cart-form=""
                        data-id={`product-actions-${slide.id}`}
                    >
                        <div className="product-thumbnail">
                            <a
                                className="image_thumb scale_hover"
                                href={slide.href}
                                title={slide.title}
                            >
                                <img
                                    width={234}
                                    height={234}
                                    className="lazyload image1 loaded"
                                    src={slide.imgSrc}
                                    alt={slide.imgAlt}
                                />
                            </a>
                            <div className="tag-km"></div>
                            <input type="hidden" name="variantId" />
                            <div className="action">
                                <button
                                    className="btn-cart btn-views"
                                    title="Xem chi tiết"
                                    type="button"
                                    onClick={() =>
                                        (window.location.href = slide.href)
                                    }
                                >
                                   <i className="fa-solid fa-sliders"></i>
                                </button>
                            </div>
                        </div>
                        <span className="smart">{slide.discount}</span>
                        <div className="product-info">
                            <h3 className="product-name">
                                <a
                                    className="line-clamp line-clamp-2"
                                    href={slide.href}
                                    title={slide.title}
                                >
                                    {slide.title}
                                </a>
                            </h3>
                            <div className="price-box">{slide.price}</div>
                            <div className="pro-promo">
                                <p className="line-clamp line-clamp-2">
                                    {slide.promo}
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SlidesObject;

