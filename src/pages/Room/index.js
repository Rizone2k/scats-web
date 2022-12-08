import JWPlayer from "@jwplayer/jwplayer-react";
import {
  FaTrashAlt,
  FaRegPaperPlane,
  FaRegListAlt,
  FaRocketchat,
  FaUsers,
  FaPlusCircle,
  FaSearchPlus,
  FaUserShield,
  FaUserTimes,
} from "react-icons/fa";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { currentUserSelector } from "~/redux/selectors";
import scatsApi from "~/API/scatsApi";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Button, {
  OutlineButton,
} from "~/components/Layout/components/Button/Button";
import { debounce } from "lodash";

import "./room.scss";
// import { current } from "@reduxjs/toolkit";

function Room() {
  const { slug, id } = useParams();
  const currentUser = useSelector(currentUserSelector);
  const socket = useRef();
  const navigate = useNavigate();

  const [key, setKey] = useState("playlist");
  const [showAddMovie, setAddMovie] = useState(false);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = useState("");

  const [arrMovie, setArrMovie] = useState([]);
  const [player, setPlayer] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [viewers, setViewers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [position, setPosition] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleClose = () => setAddMovie(false);
  const handleShow = () => setAddMovie(true);

  const changeSearchDebouncer = useCallback(
    debounce((query) => {
      if (query.trim().length >= 1) {
        callApiSearchMovieLive(query);
      }
    }, 1000),
    []
  );

  const joinRoom = () => {
    socket.current.emit("join-room", parseInt(id), parseInt(currentUser.id));
  };

  const handleSendMessage = () => {
    if (messageText.length > 0) {
      socket.current.emit("send-message", messageText);
      setMessageText("");
    }
  };
  const handleAddPlaylist = (item) => {
    const video = {
      id: item.id,
      episode: item.episode,
      hls: item.hls,
      movie: item.Movie.name,
    };

    socket.current.emit("add-playlist", video);
  };

  // const setCurrentPosition = (e) => {
  //   console.log(parseInt(e.position * 1000));
  //   socket.current.emit('position', parseInt(e.position * 1000));
  // };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    changeSearchDebouncer(query);
  };

  const handleChangeVideo = (video) => {
    socket.current.emit("change-video", video);
    setActive(video.id);
    console.log(video);
  };

  const handleDeleteVideoInPlaylist = (video) => {
    socket.current.emit("delete-playlist", video);
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      handleSendMessage();
    }
  };
  // Call Api movie to add movies

  const callApiSearchMovieLive = async (key) => {
    try {
      const res = await scatsApi.getMovieLive(key);

      if (res.status == "success") {
        if (res.data != null) {
          setArrMovie(res.data);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (player) {
      player.setup({
        file: currentVideo.hls,
        type: "hls",
      });
      player.play();
      socket.current.on("position", (position) => {
        const currentPosition = parseInt(player.getPosition());
        const p = parseInt(position / 1000);
        if (Math.abs(p - currentPosition) > 2) {
          if (player.getState() === "playing") {
            player.seek(p);
          }
        }
      });

      player.on("time", (e) => {
        socket.current.emit("position", parseInt(e.position * 1000));
      });
    }
  }, [currentVideo, player]);

  useEffect(() => {
    socket.current = io("http://api.scats.tk/");
    socket.current.on("user-join-room", (user) => {
      // ToastAndroid.show(`${user.username} đã vào phòng`, ToastAndroid.SHORT);
      setViewers((viewers) => [...viewers, user]);
    });

    socket.current.on("update-viewers", (list) => {
      setViewers(list);
    });

    socket.current.on("update-playlist", (playlist) => {
      setPlaylist(playlist);
    });

    socket.current.on("change-video", (video) => {
      setCurrentVideo(video);
      // console.log({ ...currentVideo, ...video });
      // console.log({ video, currentVideo, player });
      // player.current.playAsync();
    });

    socket.current.on("add-playlist", (video) => {
      setPlaylist((playlist) => [...playlist, video]);
      // ToastAndroid.show(
      //   `${video.movie} tập ${video.episode} đã được thêm vào`,
      //   ToastAndroid.SHORT
      // );
    });

    socket.current.on("send-message", (data) => {
      setMessages((messages) => [...messages, data]);
      // ToastAndroid.show(`${video.movie} tập ${video.episode} đã được thêm vào`, ToastAndroid.SHORT);
    });

    socket.current.on("delete-playlist", (video) => {
      setPlaylist((playlist) => playlist.filter((v) => v.id != video.id));
      // ToastAndroid.show(
      //   `${video.movie} tập ${video.episode} đã xóa`,
      //   ToastAndroid.SHORT
      // );
    });

    socket.current.on("pause", () => {
      // player.current.pauseAsync();
    });
    socket.current.on("play", () => {
      // player.current.playAsync();
    });

    socket.current.on("master-change-video", (video) => {
      setCurrentVideo(video);
      // player.current.playAsync();
    });

    socket.current.on("master-disconnect", () => {
      // ToastAndroid.show("Close room", ToastAndroid.SHORT);
      navigate("/together");
    });

    socket.current.on("fuck-off", () => {
      // ToastAndroid.show("Fuck off", ToastAndroid.SHORT);
      navigate("/together");
    });

    socket.current.on("viewer-disconnect", (user) => {
      // ToastAndroid.show(`${user.username} leave room`, ToastAndroid.SHORT);
      setViewers((viewers) => viewers.filter((v) => v.id != user.id));
    });

    joinRoom();

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <div className="pb-5 mb-5">
      <div className="container-fluid px-5 row ps-5">
        <Modal
          dialogClassName=" modal-add-movie"
          className="px-0 middle-create-room"
          show={showAddMovie}
          onHide={() => handleClose()}
        >
          <Modal.Header className="text-center" closeButton>
            <Modal.Title>
              <div className="">
                <b>Thêm phim</b>
                <input
                  className="border border-warning ms-5 "
                  type="text"
                  placeholder="Tìm phim bộ..."
                  onChange={(e) => onChangeSearch(e.target.value)}
                />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="text-center tab-content"
            style={{ height: "50rem" }}
          >
            {arrMovie.slice(0, 20).map((e) => (
              <div
                key={e.id}
                className="wrap-add-movie d-flex justify-content-between flex-row py-2"
              >
                <div className="wrap-add-playlist pr-2 rounded">
                  <img
                    src={
                      e.Movie.thumb ||
                      "http://img.ophim1.cc/uploads/movies/phi-vu-trieu-do-phan-3-thumb.jpg"
                    }
                    alert=""
                  ></img>
                </div>
                <span className="text-dark fs-4">
                  <b>{e.Movie.name}</b> ~{" "}
                  <b className="text-secondary">Tập: {e.episode}</b>
                </span>
                <OutlineButton
                  className="bg-dark border-0 px-4 py-1"
                  disabled={true}
                  onClick={() => handleAddPlaylist(e)}
                >
                  <FaPlusCircle></FaPlusCircle>
                </OutlineButton>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer className="justify-content-center"></Modal.Footer>
        </Modal>
        <div className="wrap-view col-12 col-lg-8 wrap-player d-flex flex-column justify-content-center">
          <div className="section px-2 py-2" id="watch">
            {currentVideo ? (
              <JWPlayer
                didMountCallback={(e) => {
                  setPlayer(e.player);
                }}
                file={currentVideo.hls}
                type="hls"
                library="http://api.scats.tk/public/js/JWPlayer.js"
              />
            ) : (
              <div className="d-flex flex-column text-center">
                <div className="logo">!</div>
                <p>Chưa có phim được phát</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-lg-4 wrap-tab px-2">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 d-flex justify-content-center align-content-center"
          >
            <Tab
              className="px-2 py-2"
              eventKey="playlist"
              title=<FaRegListAlt></FaRegListAlt>
            >
              <div className="wrap-playlist">
                <Button
                  title="Thêm phim"
                  className="shadow-none bg-warning-create-room px-4 py-2"
                  type="button"
                  onClick={() => handleShow()}
                >
                  <b>
                    <FaSearchPlus className="text-light fs-2"></FaSearchPlus>
                  </b>
                </Button>
                <hr className="my-3" />
                {playlist.map((e, i) => (
                  <div
                    key={i}
                    className={`d-flex justify-content-end ${
                      active == e.id ? "active" : ""
                    }`}
                  >
                    <div className={`${active == e.id ? "d-flex" : "d-none"}`}>
                      &#9889; &nbsp;
                    </div>
                    <a
                      className="playlist-title"
                      onClick={() => handleChangeVideo(e)}
                    >
                      <b>{e.movie}</b> ~{" "}
                      <b className="text-secondary">Tập: {e.episode}</b>
                    </a>
                    <a onClick={() => handleDeleteVideoInPlaylist(e)}>
                      <FaTrashAlt></FaTrashAlt>
                    </a>
                    <hr />
                  </div>
                ))}
              </div>
            </Tab>
            <Tab
              className="px-2 py-2"
              eventKey="chat"
              title=<FaRocketchat></FaRocketchat>
            >
              <div className="content-chat tab-content d-flex flex-column">
                {messages.map((e, i) => (
                  <div
                    key={i}
                    className={`${
                      currentUser.id == e.user.id
                        ? "chat-current-user "
                        : "chat-other-user "
                    }px-2 py-1 my-1 rounded content-user text-break bg-gray`}
                  >
                    <div>
                      <img src={e.user.avatar} alt={e.user.username} />
                      &nbsp;
                      {currentUser.username == e.user.username
                        ? "Bạn"
                        : e.user.username}{" "}
                      &nbsp;
                    </div>
                    <p
                      className={`my-0 px-2 ${
                        currentUser.id == e.user.id
                          ? "me-5 ms-0 "
                          : "ms-5 me-0 "
                      }`}
                    >
                      {e.message}
                    </p>
                  </div>
                ))}
              </div>
              <div className="input-wrap position-relative flex-row justify-content-center align-items-end pt-2">
                <input
                  className="input-chat w-100"
                  type="text"
                  value={messageText}
                  onChange={(e) => {
                    setMessageText(e.target.value);
                  }}
                  onKeyPress={(e) => handleKeypress(e)}
                />
                <button
                  className="border-0 btn-send"
                  type="submit"
                  onClick={() => {
                    handleSendMessage();
                  }}
                >
                  <FaRegPaperPlane></FaRegPaperPlane>
                </button>
              </div>
            </Tab>
            <Tab
              className="px-2 py-2"
              eventKey="viewers"
              title=<FaUsers></FaUsers>
            >
              <div className="wrap-playlist d-flex align-items-center flex-column">
                {viewers.map((e, i) => (
                  <div className="w-75">
                    <div
                      key={i}
                      className="wrap-user-view w-100 d-flex flex-row align-items-center"
                    >
                      <img src={e.avatar} alt="user" />
                      <div className="d-flex justify-content-between w-100 px-2">
                        <span className="playlist-title">
                          {e.username}
                          {currentUser.id == e.id && " (Bạn)"}
                        </span>
                        {currentUser.id == e.id ? (
                          <FaUserShield className="fs-1 text-info"></FaUserShield>
                        ) : (
                          <FaUserTimes className="fs-1 text-light"></FaUserTimes>
                        )}
                      </div>
                    </div>
                    <hr className="my-3 mx-0" />
                  </div>
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Room;
