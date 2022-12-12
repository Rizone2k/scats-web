import { useNavigate, useParams } from "react-router";
import ReactTimeAgo from "react-time-ago";
import React, { useState, useEffect } from "react";
import { UnmountClosed } from "react-collapse";
import JWPlayer from "@jwplayer/jwplayer-react";
import { currentUserSelector, isLoggedInSelector } from "~/redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { sendComment, sendReply } from "~/redux/reducers/comment";

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

  const [commentText, setCommentText] = useState(""); /* text input to send*/
  const [replyText, setReplyText] = useState(""); /* text input to send reply*/
  const [idComment, setIdComment] = useState(id); /* id to send cmt*/
  const [idCommentReply, setIdCommentReply] = useState(id); /* id to send cmt*/

  const [items, setItems] = useState([]);
  const [comments, setComments] = useState([]); /* Get cmt*/
  const [open, setOpen] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [item, setItem] = useState(null);
  const [video, setVideo] = useState("");
  const [countComment, setCountComments] = useState([]);
  const [middle, setMiddle] = useState(false);
  const [episode, setEpisode] = useState(1);

  const [player, setPlayer] = useState(null);
  let URL = video[video.length - 1];
  // console.log(URL);
  // console.log(video);
  let middleURL;

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
    // console.log(commentText + "/" + currentUser.id + "/" + idComment);
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
                setActive("");
                setIdComment(id);
                console.log("handleSendComment");
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else if (idComment != id) {
        console.log("SendReply");
        SendReply();
        setCount(0);
      }
    } else {
      alert("Vui lòng đăng nhập để bình luận!");
      setTimeout(navigate("/profile"), 5000);
    }
  };
  // Send comments reply
  const SendReply = async () => {
    // console.log(commentText + "/" + currentUser.id + "/" + idComment);
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
            setActive("");
            setIdComment(id);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeVideo = () => {
    // console.log(middleURL);

    try {
      // console.log(URL.hls);
      player.setup({
        file: middleURL,
        type: "hls",
      });
      player.play();
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
        // window.scrollTo(0, 0);
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
            <div className="movie-content__poster">
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
                    <span key={i} className="genres__item my-2">
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
                    <small>
                      {" "}
                      {item.liked + Math.floor(Math.random() * 140) + 40}
                    </small>
                  </span>
                  <span className="ps-4">
                    <FaRegEye className="text-primary mb-1"></FaRegEye>{" "}
                    <small>
                      {" "}
                      {item.viewed + Math.floor(Math.random() * 280) + 40}
                    </small>
                  </span>
                  <span className="ps-4">
                    <FaRegStar className="text-warning mb-2"></FaRegStar>{" "}
                    <small>
                      {" "}
                      {Math.floor(Math.random() * (10 - 4) + 4) - 0.7}
                    </small>
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
                      <div className="pt-5 d-flex flex-wrap wrap-episode justify-content-center">
                        <div className="wrap-episode_item d-flex w-75 flex-column">
                          {item.Episodes &&
                            item.Episodes.slice(0, 19).map((e, i) => (
                              <a
                                key={i}
                                onClick={() => {
                                  middleURL = e.hls;
                                  setMiddle(true);
                                  setEpisode(e.episode);
                                  handleChangeVideo();
                                }}
                                className="px-3 py-3 rounded border border-warning mx-1 my-1"
                              >
                                <small> Tập: {e.episode}</small>
                              </a>
                            ))}
                        </div>
                      </div>
                    </UnmountClosed>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="container px-3 py-3">
            <h3 className="fw-bolder">
              #Xem phim: {item.name} ~
              <span className="text-warning">
                {" "}
                Tập {middle == false ? URL.episode : episode}
              </span>
            </h3>

            <div className="wrap-player-video row">
              <div
                className="py-2 col-12 col-lg-9 col-md-9 section mb-3 wrap-player-video_watch wrap-player d-flex justify-content-center"
                id="watch"
              >
                <JWPlayer
                  file={URL.hls}
                  didMountCallback={(e) => {
                    setPlayer(e.player);
                  }}
                  type="hls"
                  library="http://api.scats.tk/public/js/JWPlayer.js"
                />
              </div>
              <div className="col-12 col-lg-3 col-md-3 wrap-player-video_cmt px-1 py-1 rounded">
                <h4 className="ps-2">Bình luận: {"(" + countComment + ")"}</h4>
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
                            <small className="ms-5 mt-2 wrap-episode_item_content">
                              {e.content}
                            </small>
                            <div className="d-flex align-self-end flex-column w-100">
                              <div className="time text-end">
                                <small className="d-flex justify-content-start">
                                  <ReactTimeAgo
                                    date={Date.parse(e.created_at)}
                                    locale="en-US"
                                  />
                                </small>

                                {e.Replies.length > 0 && (
                                  <>
                                    <a
                                      onClick={() => {
                                        setOpenReply(!openReply);
                                        setIdComment(e.id);
                                        setIdCommentReply(e.comment_id);
                                      }}
                                    >
                                      {idComment == e.id &&
                                      openReply == true ? (
                                        <small>Ẩn phản hồi</small>
                                      ) : (
                                        <small> Xem phản hồi</small>
                                      )}
                                    </a>
                                    &nbsp; &nbsp;
                                  </>
                                )}
                                <a
                                  title="Phản hồi"
                                  className={`pe-3 ${
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
                                <div>
                                  {e.Replies.map((item, i) => (
                                    <UnmountClosed
                                      key={i}
                                      isOpened={idComment == e.id && openReply}
                                    >
                                      {
                                        <React.Fragment>
                                          <p className="bg-black wrap-episode_item_content">
                                            <small>{item.content}</small>
                                          </p>
                                          <div className="d-flex justify-content-end">
                                            <small>
                                              <ReactTimeAgo
                                                date={item.created_at}
                                                locale="en-US"
                                              />
                                            </small>
                                          </div>
                                        </React.Fragment>
                                      }
                                    </UnmountClosed>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="input-wrap position-relative flex-row justify-content-center align-items-end pt-2">
                    <input
                      onChange={(e) => setCommentText(e.target.value)}
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
              </div>
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h3>
                  <b>#Có thể bạn thích</b>
                </h3>
                <div className="list-movie container-fluid px-lg-3 px-0 py-2">
                  {items.slice(0, 6).map((item, i) => (
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
                              onClick={() => {
                                setIdComment(item.id);
                                id = item.id;
                                middleURL = URL.hls;
                                console.log(middleURL);
                                handleChangeVideo();
                                window.scrollTo(0, 0);
                              }}
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
                                        <div className="d-flex justify-content-between gap-4">
                                          <OutlineButton className=" border-warning">
                                            Xem ngay
                                          </OutlineButton>
                                          <OutlineButton
                                            onClick={() => alert("oke")}
                                            className={"px-3 py-1"}
                                          >
                                            <FaHeart></FaHeart>
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
