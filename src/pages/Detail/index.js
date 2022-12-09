import { useNavigate, useParams } from "react-router";
import ReactTimeAgo from "react-time-ago";
import React, { useState, useCallback, useEffect } from "react";
import { UnmountClosed } from "react-collapse";
import JWPlayer from "@jwplayer/jwplayer-react";
import { currentUserSelector, isLoggedInSelector } from "~/redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { sendComment, sendReply } from "~/redux/reducers/comment";
import commentsSlice from "~/redux/reducers/comment";
import { commentsSelector } from "~/redux/selectors";

import {
  FaRegPaperPlane,
  FaRegGrinTongueSquint,
  FaInfo,
  FaHeart,
  FaThumbsUp,
  FaRegEye,
  FaRegStar,
  FaReply,
} from "react-icons/fa";

import Button, {
  OutlineButton,
} from "~/components/Layout/components/Button/Button";
import scatsApi from "~/API/scatsApi";
import "./Detail.scss";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";

function Detail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const isLogIn = useSelector(isLoggedInSelector);
  const navigate = useNavigate();

  const [active, setActive] = useState("");
  const [count, setCount] = useState(0);
  console.log(count);
  // const comment = useSelector(commentsSelector);
  // console.log(comment);
  // const [openReplyInput, setOpenReplyInput] = useState(null);

  const [commentText, setCommentText] = useState(""); /* text input to send*/
  const [replyText, setReplyText] = useState(""); /* text input to send reply*/
  const [idComment, setIdComment] = useState(id); /* id to send cmt*/

  const [items, setItems] = useState([]);
  const [comments, setComments] = useState([]); /* Get cmt*/
  const [open, setOpen] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [item, setItem] = useState(null);
  const [video, setVideo] = useState("");
  const [countComment, setCountComments] = useState([]);

  let URL = video[video.length - 1];

  // send comments 1.Content 2.Id_User 3.Id_Movie
  // send comments reply 1.Content 2.Id_User 3.Id_Cmt_Reply

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      handleSendComment();
      // handleSendComment();
    }
  };

  // Send comments
  const handleSendComment = async () => {
    // handleCanComment()
    console.log(commentText + "/" + currentUser.id + "/" + idComment);
    if (isLogIn) {
      if (idComment == id) {
        try {
          if (commentText.length > 0) {
            const data = {
              content: commentText.trim(),
              idUser: currentUser.id,
              idMovie: idComment,
            };
            const res = await scatsApi.sendComment(data);
            if (res.status == 200) {
              const result = res.data;
              if (result.status == "success") {
                setCommentText("");
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else if (idComment != id) {
        SendReply();
      }
    } else {
      navigate("/profile");
    }
  };
  // Send comments reply
  const SendReply = async () => {
    console.log(commentText + "/" + currentUser.id + "/" + idComment);
    try {
      if (commentText.length > 0) {
        const data = {
          content: commentText.trim(),
          idUser: currentUser.id,
          idCmt: idComment,
        };
        const res = await scatsApi.sendCommentReply(data);
        if (res.status == 200) {
          const result = res.data;
          if (result.status == "success") {
            setCommentText("");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (count >= 2) {
      setIdComment(id);
      setActive("");
      setCount(0);
    }
  }, [count]);

  useEffect(() => {
    // similar cheat-code
    const getList = async () => {
      try {
        let response = null;
        const params = {};
        response = await scatsApi.getMoviesList(3, { params });
        window.scrollTo(0, 0);
        setItems(response.data.movies);
      } catch (error) {
        console.log(error);
      }
    };
    // Get detail movie
    const getDetail = async () => {
      try {
        const params = {};
        const response = await scatsApi.detail(id, params);
        setItem(response.data);
        setVideo(response.data.Episodes);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    getDetail();

    getList();
  }, [id]);

  useEffect(() => {
    // Get comments
    const getComment = async () => {
      try {
        const page = 1;
        const response = await scatsApi.getComment(id, page);
        setCountComments(response.data.data.count);
        setComments(response.data.data.comments);
        console.log("waiting");
      } catch (error) {
        console.log(error);
      }
    };
    getComment();
  }, [commentText, id]);

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
                className="py-2 col-12 col-lg-9 col-md-9 section mb-3 wrap-player-video_watch wrap-player d-flex justify-content-center"
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
                          <div
                            className={`chat-other-user rounded content-user align-items-start mx-1 px-2 text-break d-flex flex-column ${
                              active == e.id ? "active bg-secondary " : ""
                            }`}
                          >
                            <p className="ms-5 mt-2">{e.content}</p>
                            <div className="d-flex align-self-end flex-column">
                              <div className="time text-end">
                                {/* <div>
                                  Last seen:{" "}
                                  <ReactTimeAgo
                                    date={e.created_at}
                                    locale="en-US"
                                  />
                                </div> */}
                                <small>
                                  <ReactTimeAgo
                                    date={e.created_at}
                                    locale="en-US"
                                  />
                                </small>
                                {/* <small>{e.created_at}</small> */}
                                <br />
                                {e.Replies.length > 0 && (
                                  <>
                                    <a
                                      className="ps-5"
                                      onClick={() => setOpenReply(!openReply)}
                                    >
                                      {openReply == true
                                        ? "Ẩn phản hồi"
                                        : " Xem phản hồi"}
                                    </a>
                                    &nbsp; &nbsp;
                                  </>
                                )}
                                <a
                                  title="Phản hồi"
                                  className={`pe-5 ${
                                    active == e.id ? "active text-warning " : ""
                                  }`}
                                  onClick={() => {
                                    count == 0 && setActive(e.id);
                                    setIdComment(e.id);
                                    setCount(count + 1);
                                  }}
                                >
                                  <FaReply></FaReply>
                                </a>
                              </div>
                              <div>
                                <UnmountClosed isOpened={openReply}>
                                  {e.Replies.map((e, i) => (
                                    <React.Fragment key={i}>
                                      <p className="bg-black">{e.content}</p>
                                      <div className="d-flex justify-content-end">
                                        <small>
                                          <ReactTimeAgo
                                            date={e.created_at}
                                            locale="en-US"
                                          />
                                        </small>
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
                      onChange={(e) => setCommentText(e.target.value)}
                      // onChange={(e) => setTextIdRepliesComment(e.target.value)}
                      onKeyPress={(e) => handleKeypress(e)}
                      className="input-chat w-100"
                      type="text"
                      value={commentText}
                      autoFocus={count == 1 && true}
                    />
                    <button
                      title="Send"
                      className="border-0 btn-send"
                      type="button"
                      onClick={() => handleSendComment()}
                    >
                      <FaRegPaperPlane></FaRegPaperPlane>
                    </button>
                    <button
                      title="Icon"
                      className="border-0 input-wrap_icon"
                      type="button"
                    >
                      <FaRegGrinTongueSquint
                        style={{ color: "#cd4200" }}
                        className="fs-2"
                      ></FaRegGrinTongueSquint>
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
                            <div
                              className="items-movie"
                              onClick={() => setIdComment(item.id)}
                            >
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
                                    <Card.Title
                                      className="rounded"
                                      title={item.name}
                                    >
                                      {item.name}
                                    </Card.Title>
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
                                          {Math.floor(
                                            Math.random() * (10 - 4) + 4
                                          ) - 0.7}
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
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Detail;
