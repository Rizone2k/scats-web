// import { useEffect } from "react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";

import { currentUserSelector } from "~/redux/selectors";
import { OutlineButton } from "~/components/Layout/components/Button/Button";
import scatsApi from "~/API/scatsApi";
import { FaHeartBroken, FaRegEye, FaRegStar, FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

function History() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const currentUser = { id: 1 };
  // const currentUser = useSelector(currentUserSelector);

  useEffect(() => {
    // similar cheat-code
    const getLibrary = async () => {
      try {
        let response = null;

        response = await scatsApi.getLibrary(currentUser.id);
        window.scrollTo(0, 0);
        setItems(response.data.Libraries);
        console.log(response.data.Libraries);
      } catch (error) {
        console.log(error);
      }
    };
    getLibrary();
  }, []);
  return (
    <div className="container px-2 py-3">
      <div className="section mb-3">
        <div className="section__header mb-2">
          <h3>
            <b>#Lịch sử duyệt phim fake</b>
          </h3>
          <div
            className={`${
              items.length !== 0 ? "list-movie " : ""
            }container-fluid px-3 py-2`}
          >
            {items.length !== 0 ? (
              items.map((item, i) => (
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
                          <Link to={"/detail/" + item.Movie.id}>
                            <Card>
                              <Card.Img
                                variant="top"
                                title={item.Movie.name}
                                src={
                                  item.Movie.thumb ||
                                  "http://img.ophim1.cc/uploads/movies/phi-vu-trieu-do-phan-3-thumb.jpg"
                                }
                              />
                              <Card.Body className="py-3 px-0">
                                <Card.Title
                                  className="rounded"
                                  title={item.Movie.name}
                                >
                                  {item.Movie.name}
                                </Card.Title>
                                <Card.ImgOverlay
                                  className="overlay "
                                  title={item.Movie.name}
                                >
                                  <Card.Img
                                    variant="top"
                                    title={item.Movie.name || item.Movie.aka}
                                    src={item.Movie.thumb}
                                  />
                                  <p> {item.Movie.name}</p>
                                  <div className="btns">
                                    <span className="review-action">
                                      <FaThumbsUp className="text-danger mb-1"></FaThumbsUp>
                                      {item.Movie.liked +
                                        Math.floor(Math.random() * 140) +
                                        40}
                                    </span>
                                    <span className="ps-4 review-action">
                                      <FaRegEye className="text-primary mb-1"></FaRegEye>
                                      {item.Movie.viewed +
                                        Math.floor(Math.random() * 280) +
                                        40}
                                    </span>
                                    <span className="ps-4 review-action">
                                      <FaRegStar className="text-warning mb-2"></FaRegStar>
                                      {Math.floor(
                                        Math.random() * (10 - 4) + 4
                                      ) - 0.7}
                                    </span>
                                    <br /> <br />
                                    <div className="d-flex justify-content-between gap-4">
                                      <OutlineButton
                                        title={"Xem luôn"}
                                        className="border-warning"
                                      >
                                        Xem ngay
                                      </OutlineButton>
                                      <OutlineButton
                                        title={"Bỏ thích"}
                                        onClick={() => alert("oke")}
                                        className={
                                          "px-3 py-1 bg-danger text-dark"
                                        }
                                      >
                                        <FaHeartBroken></FaHeartBroken>
                                      </OutlineButton>
                                    </div>
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
              ))
            ) : (
              <div>
                <div className="container px-5 py-5">
                  <div className="add-more">
                    <h4>
                      <b>Bạn chưa xem phim nào</b>
                    </h4>
                    <OutlineButton
                      title={"Thêm luôn"}
                      className="border-warning"
                      onClick={() => navigate("/movies")}
                    >
                      Xem ngay
                    </OutlineButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
