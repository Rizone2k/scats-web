// import { Fragment } from "react";
import "./Item.module.scss";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Items() {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={30}
      slidesPerView={5}
      pagination={{ clickable: true }}
      navigation={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <img
          src="https://drive.google.com/uc?id=1bY-RRhI-H7md_vyzzAFdG7m0xVJPcoC4"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://drive.google.com/uc?id=1bY-RRhI-H7md_vyzzAFdG7m0xVJPcoC4"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://drive.google.com/uc?id=1bY-RRhI-H7md_vyzzAFdG7m0xVJPcoC4"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://drive.google.com/uc?id=1bY-RRhI-H7md_vyzzAFdG7m0xVJPcoC4"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://drive.google.com/uc?id=1bY-RRhI-H7md_vyzzAFdG7m0xVJPcoC4"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://drive.google.com/uc?id=1bY-RRhI-H7md_vyzzAFdG7m0xVJPcoC4"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://drive.google.com/uc?id=1bY-RRhI-H7md_vyzzAFdG7m0xVJPcoC4"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://drive.google.com/uc?id=1bY-RRhI-H7md_vyzzAFdG7m0xVJPcoC4"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
}
export default Items;
