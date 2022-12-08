import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import { motion } from "framer-motion";

import Button, {
  OutlineButton,
} from "~/components/Layout/components/Button/Button";

import scatsApi from "~/API/scatsApi";
import "./Movie.scss";
import { FaHeart, FaRegEye, FaRegStar, FaThumbsUp } from "react-icons/fa";

function Movie() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  // Call Api render movie
  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};
      response = await scatsApi.getMoviesList(page, { params });
      setItems(response.data.movies);
      window.scrollTo(0, 0);
    };
    getList();
  }, []);

  const loadMore = async () => {
    let response = null;
    setPage(page + 1);
    const params = {};
    response = await scatsApi.getMoviesList(page, { params });
    setItems([...items, ...response.data.movies]);
  };

  return (
    <>
      <div className="page-header">
        <h2>Danh mục phim</h2>
      </div>
      <div className="container px-3 pb-4">
        <Filter setItems={setItems} />
      </div>
      <div className="list-movie container-fluid px-3 py-2">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                Layout
                className="popular-movies"
              >
                <>
                  <div className="items-movie">
                    <Link to={"/detail/" + item.id}>
                      <Card>
                        <Card.Img
                          variant="top"
                          title={item.name}
                          src={
                            item.thumb ||
                            "http://img.ophim1.cc/uploads/movies/phi-vu-trieu-do-phan-3-thumb.jpg"
                          }
                        />
                        <Card.Body className="py-3 px-0">
                          <Card.Title title={item.name}>{item.name}</Card.Title>

                          <Card.ImgOverlay
                            className="overlay "
                            title={item.name}
                          >
                            <Card.Img
                              variant="top"
                              title={item.name || item.aka}
                              src={item.thumb}
                            />
                            <p> {item.name}</p>
                            <div className="btns">
                              <span className="review-action">
                                <FaThumbsUp className="text-danger mb-1"></FaThumbsUp>
                                {item.liked +
                                  Math.floor(Math.random() * 140) +
                                  40}
                              </span>
                              <span className="ps-4 review-action">
                                <FaRegEye className="text-primary mb-1"></FaRegEye>
                                {item.viewed +
                                  Math.floor(Math.random() * 280) +
                                  40}
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
                          </Card.ImgOverlay>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                </>
              </motion.div>
            }
          </React.Fragment>
        ))}
      </div>
      <div className="list-movie__loadmore">
        <OutlineButton className="small" onClick={loadMore}>
          Load more
        </OutlineButton>
      </div>
    </>
  );
}

export default Movie;
