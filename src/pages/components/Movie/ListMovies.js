import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import React from "react";

import MoviesComponents from "./MoviesComponents";
// import Swiper styles
import "./Movie.scss";
import "swiper/swiper.min.css";
function ListMovies(props) {
  return (
    <div className="list-movies container-fluid px-3 d-flex flex-row flex-wrap justify-content-around">
      <MoviesComponents {...props}></MoviesComponents>
    </div>
  );
}

export default ListMovies;
