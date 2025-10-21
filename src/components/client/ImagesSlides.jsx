import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

function ImageSlider({ listimg, activeIndex }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const mainSwiperRef = useRef(null);
  const [listimgMain,setListimgMain]=useState(listimg||[]);
  useEffect(() => {
    if(listimg.length > 0 && listimg[0].imgSrc.includes("uploads")){
      let imgSrc=listimg[0].imgSrc;
      listimg.map((img,index)=>{
        if(img.imgSrc.includes("uploads")){
          img.imgSrc="http://localhost:8080/api/upload/imgSrc/"+img.id;
          setListimgMain([...listimgMain,img]);
        } else {
          setListimgMain([...listimgMain,img]);
        }
      });
    }
  }, [listimg]);
  // Khi activeIndex thay đổi → đổi slide
  useEffect(() => {
    if (mainSwiperRef.current && typeof activeIndex === "number") {
      mainSwiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  return (
    <>
      {/* Swiper chính */}
      <Swiper
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        spaceBetween={50}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-top p-2"
      >
        {listimg.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img?.imgSrc} width={379} height={379} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
        {
          listimg.length > 1 && (
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
            <img src={img.imgSrc} width={65} height={65} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
          )
          }
    </>
  );
}

export default ImageSlider;
