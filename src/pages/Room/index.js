import JWPlayer from "@jwplayer/jwplayer-react";
import { FaTrashAlt, FaRegPaperPlane } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { currentUserSelector } from "~/redux/selectors";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

import "./room.scss";

function Room() {
  const { slug, id } = useParams();
  const currentUser = useSelector(currentUserSelector);
  const socket = useRef();
  const navigate = useNavigate();

  const [key, setKey] = useState("home");

  const [arrMovie, setArrMovie] = useState([]);
  const [player, setPlayer] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const [viewers, setViewers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [position, setPosition] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null);
  let currentPosition;

  const joinRoom = () => {
    socket.current.emit("join-room", parseInt(id), parseInt(currentUser.id));
    console.log(id, currentUser.id);
    // console.log(socket);
  };

  const handleSendMessage = () => {
    if (messageText.length > 0) {
      socket.current.emit("send-message", messageText);
      setMessageText("");
    }
  };

  const setCurrentPosition = (e) => {
    // currentPosition = parseInt(e.position * 1000);
    socket.current.emit(position, currentPosition);
  };

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
      // console.log(Math.abs(position - currentPosition));
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
    <div className="container-fluid px-5 row">
      <div className="wrap-view bg-danger col-12 col-lg-8 wrap-player">
        <div className="section px-2 py-2" id="watch">
          {currentVideo && (
            <JWPlayer
              onTime={(e) => {
                setCurrentPosition(e);
              }}
              didMountCallback={setPlayer}
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
          <Tab eventKey="home" title="Playlist">
            <div className="wrap-playlist">
              {playlist.map((e) => (
                <div key={e.id} className="d-flex justify-content-between">
                  <a className="playlist-title">
                    {e.movie} Tập: {e.episode}
                  </a>
                  <a>
                    <FaTrashAlt></FaTrashAlt>
                  </a>
                </div>
              ))}
            </div>
          </Tab>
          <Tab eventKey="profile" title="Chat">
            <div className="content-chat tab-content d-flex flex-column">
              {messages.map((e, i) => (
                <div
                  key={i}
                  className={`${
                    currentUser.id == e.user.id
                      ? "chat-current-user align-self-end flex-row-reverse "
                      : "chat-other-user align-self-start "
                  }align-items-center d-inline-flex px-2 py-1 my-1 rounded `}
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
          <Tab eventKey="contact" title="Viewers">
            <div className="wrap-playlist d-flex align-items-center flex-column">
              {viewers.map((e) => (
                <div
                  key={e.id}
                  className="wrap-user-view w-100 d-flex flex-row align-items-center"
                >
                  <img src={e.avatar} alt="user" />
                  <div className="d-flex justify-content-between w-100 px-2">
                    <span className="playlist-title" href="javascript:void(0)">
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
  );
}

export default Room;
