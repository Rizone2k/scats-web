import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import scatsApi from "~/API/scatsApi";

// import MovieCard from "./movieCard";

import "./Movie.scss";
import "swiper/swiper.min.css";
import { FaRegEye, FaThumbsUp, FaRegStar, FaHeart } from "react-icons/fa";
import { OutlineButton } from "~/components/Layout/components/Button/Button";

function ListMovies(page) {
  const [items, setItems] = useState([]);

  // Get movies
  useEffect(() => {
    const getMovies = async () => {
      try {
        const params = {};
        const response = await scatsApi.getMoviesList(page.page, { params });
        setItems(response.data.movies);
        // console.log(response.data.movies);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="container-fluid ps-3 pe-3">
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 3,
          },
          576: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
        loopFillGroupWithBlank={true}
        navigation={false}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {items.map((item, e) => (
          <SwiperSlide key={e}>
            <Link to={"/detail/" + item.id}>
              <Card>
                <Card.Img
                  variant="top"
                  title={item.name || item.aka}
                  src={
                    item.thumb ||
                    "http://img.ophim1.cc/uploads/movies/phi-vu-trieu-do-phan-3-thumb.jpg"
                  }
                />
                <Card.Body className="py-3 px-0">
                  <Card.Title className="px-2" title={item.name}>
                    {item.name}
                  </Card.Title>
                  <Card.Text className="overlay " title={item.name}>
                    <Card.Img
                      variant="top"
                      title={item.name || item.aka}
                      src={item.thumb}
                    />
                    {item.name}
                    <div className="btns">
                      <span className="review-action">
                        <FaThumbsUp className="text-danger mb-1"></FaThumbsUp>
                        {item.liked + Math.floor(Math.random() * 140) + 40}
                      </span>
                      <span className="ps-4 review-action">
                        <FaRegEye className="text-primary mb-1"></FaRegEye>
                        {item.viewed + Math.floor(Math.random() * 280) + 40}
                      </span>
                      <span className="ps-4 review-action">
                        <FaRegStar className="text-warning mb-2"></FaRegStar>
                        {Math.floor(Math.random() * (10 - 4) + 4) - 0.7}
                      </span>
                      <br /> <br />
                      <OutlineButton className="border-warning">
                        Xem ngay
                      </OutlineButton>
                      <OutlineButton
                        onClick={() => alert("oke")}
                        className={"px-3 py-1 ms-5"}
                      >
                        <FaHeart></FaHeart>
                      </OutlineButton>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ListMovies;
