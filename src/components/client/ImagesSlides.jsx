import React, { useRef, useState } from 'react';
    // Import Swiper React components
    import { Swiper, SwiperSlide } from 'swiper/react';

    // Import Swiper styles
    import 'swiper/css';
    import 'swiper/css/free-mode';
    import 'swiper/css/navigation';
    import 'swiper/css/thumbs';


    // import required modules
    import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

    export default ImageSlider;

    function ImageSlider({ listimg }) {
        const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
        <Swiper
            style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
            }}
            spaceBetween={50}
            navigation={false}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="gallery-top p-2"
        >
            {listimg.map((img, index) => (
                <SwiperSlide key={index}>
                    <img src={img} width={379} height={379} />
                </SwiperSlide>
            ))}
        </Swiper>
        <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={0}
            slidesPerView={listimg.length}
            navigation={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="gallery-thumbs p-2 swipper-2"
        >
            {listimg.map((img, index) => (
                <SwiperSlide key={index}>
                    <img src={img} width={65} height={65} />
                </SwiperSlide>
            ))}
        </Swiper>
        </>
    );
    }
