import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Slider.mudule.scss";

// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";

export default function Slider() {
  return (
    <>
      <Swiper
        // pagination={{
        //   clickable: false,
        // }}
        autoplay={{
          delay: 9000,
          disableOnInteraction: false,
        }}
        pagination={{
          type: "progressbar",
        }}
        navigation={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        className="mySwiper text-center h-100"
      >
        <SwiperSlide>
          <div className="iiimg ps-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            laboriosam earum odio cupiditate est facilis, odit nostrum sunt
            suscipit qui numquam eveniet alias ea nobis! Optio magni quisquam
            est illum!
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="iimg ps-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            laboriosam earum odio cupiditate est facilis, odit nostrum sunt
            suscipit qui numquam eveniet alias ea nobis! Optio magni quisquam
            est illum!
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="iiimg ps-3 ">
            ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            laboriosam earum odio cupiditate est facilis, odit nostrum sunt
            suscipit qui numquam eveniet alias ea nobis! Optio magni quisquam
            est illum!
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="iiimg ps-3 ">
            Lsit amet consectetur adipisicing elit. Quaerat laboriosam earum
            odio cupiditate est facilis, orem ipsum dolor odit nostrum sunt
            suscipit qui numquam eveniet alias ea nobis! Optio magni quisquam
            est illum!
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="iimg ps-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            laboriosam earum odio cupiditate est facilis, odit nostrum sunt
            suscipit qui numquam eveniet alias ea nobis! Optio magni quisquam
            est illum!
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="iiimg ps-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            laboriosam earum odio cupiditate est facilis, odit nostrum sunt
            suscipit qui numquam eveniet alias ea nobis! Optio magni quisquam
            est illum!
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="iimg ps-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            laboriosam earum odio cupiditate est facilis, odit nostrum sunt
            suscipit qui numquam eveniet alias ea nobis! Optio magni quisquam
            est illum!
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="iiimg ps-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            laboriosam earum odio cupiditate est facilis, odit nostrum sunt
            suscipit qui numquam eveniet alias ea nobis! Optio magni quisquam
            est illum!
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="iiimg ps-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            laboriosam earum odio cupiditate est facilis, odit nostrum sunt
            suscipit qui numquam eveniet alias ea nobis! Optio magni quisquam
            est illum!
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
