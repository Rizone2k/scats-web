import JWPlayer from "@jwplayer/jwplayer-react";
import { FaTrashAlt, FaRegPaperPlane } from "react-icons/fa";
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
import { current } from "@reduxjs/toolkit";

function Room() {
  const { slug, id } = useParams();
  const currentUser = useSelector(currentUserSelector);
  const socket = useRef();
  const navigate = useNavigate();

  const [key, setKey] = useState("playlist");
  const [showAddMovie, setAddMovie] = useState(false);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [arrMovie, setArrMovie] = useState([]);
  const [player, setPlayer] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const [viewers, setViewers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [position, setPosition] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleClose = () => setAddMovie(false);
  const handleShow = () => setAddMovie(true);

  let currentPosition;

  const changeSearchDebouncer = useCallback(
    debounce((query) => {
      if (query.trim().length >= 3) {
        callApiSearchMovieLive(query);
      }
      // console.log(query);
    }, 1000),
    []
  );

  const joinRoom = () => {
    socket.current.emit("join-room", parseInt(id), parseInt(currentUser.id));
    // console.log(id, currentUser.id);
    // console.log(socket);
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

  const addMovies = () => {};

  const setCurrentPosition = (e) => {
    // currentPosition = parseInt(e.position * 1000);
    socket.current.emit(position, currentPosition);
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    changeSearchDebouncer(query);
  };

  const handleChangeVideo = (video) => {
    socket.current.emit("change-video", video);
    // console.log(video);
  };

  const handleDeleteVideoInPlaylist = (video) => {
    socket.current.emit("delete-playlist", video);
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
      // console.log(res);
      // if (res.status == 200) {
      //   const result = res.data;
      // }
      // const rs = await scatsApi.getMovieLive(key);
      // if (rs.status == "success") {
      //     if (rs.data != null) {
      //         setArrMovie(rs.data);
      //     }
      // } else {
      //     // Alert.alert(null, rs.message);
      // }
    } catch (error) {
      // Alert.alert(null, "Error !!!");
    }
  };

  // useEffect(() => {
  //   const getList = async () => {
  //     let response = null;
  //     const params = {};
  //     const page = 2;
  //     response = await scatsApi.getMovieLive(key);
  //     setItems(response.data.movies);
  //   };
  //   getList();
  // }, []);

  useEffect(() => {
    socket.current = io("http://api.scats.tk/");
    socket.current.on("user-join-room", (user) => {
      // ToastAndroid.show(`${user.username} đã vào phòng`, ToastAndroid.SHORT);
      console.log(user);
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
      console.log({ video, currentVideo, player: player.player });
      player.player.setup({
        file: video.hls,
        type: "hls",
      });
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

    socket.current.on("position", (position) => {
      const currentPosition = parseInt(player.player.getPosition());

      const p = parseInt(position / 1000);
      // console.log(player.player);
      if (Math.abs(p - currentPosition) > 2) {
        if (player.player.getState() === "playing") {
          player.player.seek(p);
        }
        // setPosition(parseInt(position) + 1000);
        // console.log(p);

        // player.player.play();
        // player.current.playAsync();
      }
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
    <>
      <div className="container-fluid px-5 row">
        <Modal
          dialogClassName=" modal-add-movie"
          className="px-0"
          show={showAddMovie}
          onHide={() => handleClose()}
        >
          <Modal.Header className="text-center" closeButton>
            <Modal.Title>
              <div className="">
                <b>Thêm phim</b>
                <input
                  className="border border-danger ms-5"
                  type="text"
                  placeholder="Tìm phim..."
                  onChange={(e) => onChangeSearch(e.target.value)}
                />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="text-center tab-content"
            style={{ height: "50rem" }}
          >
            {arrMovie.map((e) => (
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
                  {e.Movie.name} Tập: {e.episode}
                </span>
                <OutlineButton
                  className="bg-dark"
                  onClick={() => handleAddPlaylist(e)}
                >
                  Thêm
                </OutlineButton>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            {/* <OutlineButton className="bg-dark" onClick={() => handleClose()}>
              Không
            </OutlineButton> */}
            {/* <OutlineButton className="bg-danger">Đăng xuất</OutlineButton> */}
          </Modal.Footer>
        </Modal>
        <div className="wrap-view bg-danger col-12 col-lg-8 wrap-player">
          <div className="section px-2 py-2" id="watch">
            {currentVideo && (
              <JWPlayer
                onTime={(e) => {
                  setCurrentPosition(e);
                }}
                didMountCallback={(e) => {
                  setPlayer(e);
                }}
                file={currentVideo.hls}
                type="hls"
                library="http://api.scats.tk/public/js/JWPlayer.js"
              />
            )}
          </div>
        </div>
        <div className="bg-info col-12 col-lg-4 wrap-tab">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 d-flex justify-content-center align-content-center"
          >
            <Tab eventKey="playlist" title="Playlist">
              <div className="wrap-playlist">
                <Button
                  className="shadow-none bg-warning px-1 py-1"
                  type="button"
                  onClick={() => handleShow()}
                >
                  Thêm Phim
                </Button>
                {playlist.map((e, i) => (
                  <div key={i} className="d-flex justify-content-between">
                    <a
                      className="playlist-title"
                      onClick={() => handleChangeVideo(e)}
                    >
                      {e.movie} Tập: {e.episode}
                    </a>
                    <a onClick={() => handleDeleteVideoInPlaylist(e)}>
                      <FaTrashAlt></FaTrashAlt>
                    </a>
                  </div>
                ))}
              </div>
            </Tab>
            <Tab eventKey="chat" title="Chat">
              <div className="content-chat tab-content d-flex flex-column">
                {messages.map((e, i) => (
                  <div
                    key={i}
                    className={`${
                      currentUser.id == e.user.id
                        ? "chat-current-user"
                        : "chat-other-user "
                    }px-2 py-1 my-1 rounded `}
                  >
                    <img src={e.user.avatar} alt={e.user.username} />
                    <p className="bg-dark my-0 px-2">{e.message}</p>
                    &nbsp; {e.user.username}
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
                />
                <button
                  className="border-0 btn-send"
                  type="button"
                  onClick={() => {
                    handleSendMessage();
                  }}
                >
                  <FaRegPaperPlane></FaRegPaperPlane>
                </button>
              </div>
            </Tab>
            <Tab eventKey="viewers" title="Viewers">
              <div className="wrap-playlist d-flex align-items-center flex-column">
                {viewers.map((e, i) => (
                  <div
                    key={i}
                    className="wrap-user-view w-100 d-flex flex-row align-items-center"
                  >
                    <img src={e.avatar} alt="user" />
                    <div className="d-flex justify-content-between w-100 px-2">
                      <span className="playlist-title">
                        {e.username} {currentUser.id == e.id && "You"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Room;
