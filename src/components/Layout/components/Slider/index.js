import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
import { FaThumbsUp, FaRegEye, FaRegStar } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import scatsApi from "~/API/scatsApi";

import "./Slider.mudule.scss";
import { OutlineButton } from "../Button/Button";
import { Link } from "react-router-dom";

export default function Slider() {
  const [slideItems, setSlideItems] = useState([]);

  useEffect(() => {
    const getBanner = async () => {
      try {
        const response = await scatsApi.getBanner();
        setSlideItems(response.data);
      } catch {
        console.log("error");
      }
    };
    getBanner();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        autoplay={{
          delay: 9000,
          disableOnInteraction: false,
        }}
        pagination={{
          type: "progressbar",
        }}
        grabCursor={true}
        spaceBetween={0}
        navigation={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        className="mySwiper text-center h-100"
      >
        {slideItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const HeroSlideItem = (props) => {
  const item = props.item;

  return (
    <Link to={"/detail/" + item.id}>
      <div
        className={`hero-slide__item ${props.className}`}
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original//90ZZIoWQLLEXSVm0ik3eEQBinul.jpg")`,
        }}
      >
        <div className="hero-slide__item__content container-fluid">
          <div className="hero-slide__item__content__info">
            <h3 className="title text-light overview fs-1">{item.name}</h3>
            <a
              className="overview"
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></a>
            <div className="btns">
              <div className="d-flex flex-wrap justify-content-center">
                <span className="review-action">
                  <FaThumbsUp className="text-danger mb-1"></FaThumbsUp>{" "}
                  {item.liked + Math.floor(Math.random() * 140) + 40}
                </span>
                &nbsp; &nbsp;
                <span className="review-action">
                  <FaRegEye className="text-primary mb-1"></FaRegEye>{" "}
                  {item.viewed + Math.floor(Math.random() * 280) + 40}
                </span>
                &nbsp; &nbsp;
                <span className="review-action">
                  <FaRegStar className="text-warning mb-2"></FaRegStar>{" "}
                  {Math.floor(Math.random() * (10 - 4) + 4) - 0.7}
                </span>
              </div>
              <br /> <br />
              <OutlineButton className="border-warning">Xem ngay</OutlineButton>
            </div>
          </div>
          <div className="hero-slide__item__content__poster">
            <img src={item.thumb} alt="" />
          </div>
        </div>
      </div>
    </Link>
  );
};
