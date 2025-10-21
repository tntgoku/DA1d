import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

export const SliderSection = ({ listimg }) => {

    return (
    <section className="section_slider">
      <Swiper
        className="home-slider swiper-container"
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={20}
        slidesPerView={1}
      >
        {listimg.map((img, index) => (
          <SwiperSlide key={index}>
            <Link
              >
                <img src={img.imgSrc} alt={`slide-${index}`} 
      style={{ maxHeight:431,width:'100%' }}
        // style={{maxHeight:431, width: '100%'}}
      />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
