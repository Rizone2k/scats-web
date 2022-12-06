import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { UnmountClosed } from "react-collapse";
import JWPlayer from "@jwplayer/jwplayer-react";

import {
  FaRegPaperPlane,
  FaRegGrinTongueSquint,
  FaInfo,
  FaHeart,
  FaThumbsUp,
  FaRegEye,
  FaRegStar,
} from "react-icons/fa";

import Button, {
  OutlineButton,
} from "~/components/Layout/components/Button/Button";
import scatsApi from "~/API/scatsApi";
import "./Detail.scss";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";
// import ListMovies from "../components/Movie/ListMovies";

function Detail() {
  let { id } = useParams();

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [item, setItem] = useState(null);
  const [video, setVideo] = useState("");
  const [countComment, setCountComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [idRepliesComment, setIdRepliesComment] = useState(id);
  const [textRepliesComment, setTextIdRepliesComment] = useState("");
  console.log(idRepliesComment);

  // similar
  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};
      response = await scatsApi.getMoviesList(3, { params });
      // console.log(response.data.movies);
      setItems(response.data.movies);
      // window.scrollTo(0, 0);
    };
    getList();
  }, []);

  // Detail movie
  useEffect(() => {
    const getDetail = async () => {
      const params = {};
      const response = await scatsApi.detail(id, params);
      setItem(response.data);
      setVideo(response.data.Episodes);
      // window.scrollTo(0, 0);
      // console.log(response.data);
    };
    getDetail();
  }, [id]);

  // Comments
  useEffect(() => {
    const getComment = async () => {
      try {
        const response = await scatsApi.getComment(id);
        setCountComments(response.data.data.count);
        setComments(response.data.data.comments);
        window.scrollTo(0, 0);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComment();
  }, []);

  const handleSendCommand = () => {
    console.log(idRepliesComment, textRepliesComment);
  };

  let URL = video[video.length - 1];

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${item.background})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster me-5">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${item.thumb})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.name || item.aka}</h1>
              <h3 className="title">{item.aka}</h3>
              <div className="genres d-flex flex-wrap">
                {item.Genres &&
                  item.Genres.slice(0, 9).map((genre, i) => (
                    <span key={i} className="genres__item">
                      # {genre.name}
                    </span>
                  ))}
              </div>
              <div
                className="overview"
                id="overview"
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div>

              <div className="cast">
                <div className="section__header">
                  <h3>
                    <FaInfo className="text-warning"></FaInfo> Thông tin phim
                  </h3>
                </div>
                <ul>
                  <li className="lni-angle-double-right">
                    <small>Năm phát hành: {item.Year.name}</small>
                  </li>
                  <li className="lni-angle-double-right">
                    <small>Quốc gia: {item.Country.name}</small>
                  </li>
                  <li className="lni-angle-double-right">
                    <small>Loại phim: {item.Type.name}</small>
                  </li>
                </ul>
                <div>
                  <span>
                    <FaThumbsUp className="text-danger mb-1"></FaThumbsUp>{" "}
                    {item.liked + Math.floor(Math.random() * 140) + 40}
                  </span>
                  <span className="ps-4">
                    <FaRegEye className="text-primary mb-1"></FaRegEye>{" "}
                    {item.viewed + Math.floor(Math.random() * 280) + 40}
                  </span>
                  <span className="ps-4">
                    <FaRegStar className="text-warning mb-2"></FaRegStar>{" "}
                    {Math.floor(Math.random() * (10 - 4) + 4) - 0.7}
                  </span>
                </div>
              </div>
              <hr />
              <div className="ps-5 action-user">
                <Button className={"bg-danger me-5 btn-watch"}>
                  <a className="btn-watch" href="#watch">
                    Xem
                  </a>
                </Button>
                <OutlineButton className={"px-5 me-5"}>
                  <FaHeart></FaHeart>
                </OutlineButton>

                {item.Type.id == 1 && (
                  <>
                    <OutlineButton
                      onClick={() => setOpen(!open)}
                      className={"px-5 my-2"}
                    >
                      Tập phim <small>︾</small>
                    </OutlineButton>
                    <UnmountClosed isOpened={open}>
                      <div className="pt-5 d-flex flex-wrap ">
                        {item.Episodes &&
                          item.Episodes.slice(0, 19).map((e, i) => (
                            <span
                              key={i}
                              onClick={function handleURL() {
                                {
                                  setVideo(e.hls);
                                  // console.log(video);
                                  // console.log(URL.hls);
                                }
                              }}
                              className="px-3 py-3 rounded border border-warning mx-1 my-1"
                            >
                              Tập: {e.episode}
                            </span>
                          ))}
                      </div>
                    </UnmountClosed>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="container px-2 py-3">
            <h3 className="fw-bolder">
              #Xem phim: {item.name} ~
              <span className="text-warning"> Tập {URL.episode}</span>
            </h3>

            <div className="wrap-player-video row">
              <div
                className="col-12 col-lg-9 col-md-9 section mb-3 wrap-player-video_watch"
                id="watch"
              >
                <JWPlayer
                  file={URL.hls}
                  type="hls"
                  library="http://api.scats.tk/public/js/JWPlayer.js"
                />
              </div>
              <div className="col-12 col-lg-3 col-md-3 wrap-player-video_cmt px-1 py-1 rounded">
                {/*  */}
                <h4 className="pe-3">Bình luận: {"(" + countComment + ")"}</h4>
                <div className="bg-black px-1 py-1 rounded">
                  <div className="wrap-player-video_content-cmt d-flex flex-column ">
                    {comments &&
                      comments.map((e, i) => (
                        <div className="cmt" key={i}>
                          <div className="chat-other-user px-2 text-break d-flex flex-row">
                            <img src={e.User.avatar} alt="user" />
                            &nbsp;
                            <small>{e.User.username}</small>
                          </div>
                          <div className="chat-other-user rounded content-user align-items-end mx-1 px-2 text-break d-flex flex-column">
                            <p>{e.content}</p>
                            <div className="d-flex align-self-end flex-column">
                              <div className="time text-end">
                                <small>{e.created_at}</small>
                                <br />
                                {e.Replies.length ? (
                                  <>
                                    <a
                                      className="ps-5"
                                      onClick={() => setOpenReply(!openReply)}
                                    >
                                      Xem phản hồi
                                    </a>
                                    &nbsp; &nbsp;
                                    <a
                                      className="pe-5"
                                      onClick={() => setIdRepliesComment(e.id)}
                                    >
                                      Bình luận
                                    </a>
                                  </>
                                ) : (
                                  <a
                                    className="pe-5"
                                    onClick={() => setIdRepliesComment(e.id)}
                                  >
                                    Bình luận
                                  </a>
                                )}
                              </div>
                              <div>
                                <UnmountClosed isOpened={openReply}>
                                  {e.Replies.map((e, i) => (
                                    <React.Fragment key={i}>
                                      <p className="bg-black">{e.content}</p>
                                      <div className="d-flex justify-content-end">
                                        <span>{e.created_at}</span>
                                      </div>
                                    </React.Fragment>
                                  ))}
                                </UnmountClosed>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="input-wrap position-relative flex-row justify-content-center align-items-end pt-2">
                    <input
                      onChange={(e) => setTextIdRepliesComment(e.target.value)}
                      className="input-chat w-100"
                      type="text"
                    />
                    <button
                      title="Send"
                      className="border-0 btn-send"
                      type="button"
                      onClick={() => handleSendCommand()}
                    >
                      <FaRegPaperPlane></FaRegPaperPlane>
                    </button>
                    <button
                      title="Icon"
                      className="border-0 input-wrap_icon"
                      type="button"
                    >
                      <FaRegGrinTongueSquint className="text-info"></FaRegGrinTongueSquint>
                    </button>
                  </div>
                </div>
                {/*  */}
              </div>
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h3>
                  <b>#Có thể bạn thích</b>
                </h3>
                <div className="list-movie container-fluid px-3 py-2">
                  {items.slice(0, 5).map((item, i) => (
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
                                  <Card.Body className="px-2 py-3 ">
                                    <Card.Title title={item.name}>
                                      {item.name}
                                    </Card.Title>

                                    <Card.Text
                                      className="overlay"
                                      title={item.name}
                                    >
                                      {item.name}
                                    </Card.Text>
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
                {/* <ListMovies></ListMovies> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Detail;
