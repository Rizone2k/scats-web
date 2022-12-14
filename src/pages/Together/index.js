import React, { useEffect, useState } from "react";
// import Modal from "bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { isLoggedInSelector, currentUserSelector } from "~/redux/selectors";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import scatsApi from "../../API/scatsApi";
import { FaVideo, FaRegNewspaper } from "react-icons/fa";
import Input from "~/components/Layout/components/Input/Input";

import "./together.scss";
import TogetherComponent from "./togetherComponent";

function Together() {
  const isLogIn = useSelector(isLoggedInSelector);
  const currentUser = useSelector(currentUserSelector);
  const [title, setTitle] = useState("playList");
  const [hasRoom, setHasRoom] = useState(null);
  const [roomIsPrivate, setRoomIsPrivate] = useState(false);
  const [roomName, setRoomName] = useState(`Phòng của ${currentUser.username}`);
  const [roomLive, setRoomLive] = useState([]);
  const [roomPass, setRoomPass] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogIn) {
      getMyRoom();
      window.scrollTo(0, 0);
      // getRoomLive();
      // console.log(roomIsPrivate);
    } else {
      navigate("/profile");
    }
  }, [isLogIn]);

  const openModalCreateRoom = () => {
    setShow(true);
  };

  const getMyRoom = async () => {
    try {
      const idUser = currentUser.id;
      const res = await scatsApi.getMyRoom(idUser);

      if (res.status == 200) {
        const result = res.data;
        if (result.status == "success") {
          setHasRoom(result.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateRoom = async () => {
    try {
      if (roomName.length > 0) {
        const idUser = currentUser.id;
        let data = { idUser, name: roomName };
        if (roomIsPrivate) {
          if (roomPass.length > 0) {
            data = { ...data, pass: roomPass };
          }
        }
        const res = await scatsApi.createRoom(data);
        if (res.status == 200) {
          const result = res.data;
          if (result.status == "success") {
            setHasRoom(result.data);
            setShow(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinRoom = () => {
    hasRoom.private = true
      ? navigate(`/room/${hasRoom.slug}/${hasRoom.id}`)
      : alert("Please try again");
  };

  return (
    <>
      {show == true && (
        <>
          <Modal
            className="middle-create-room"
            show={show}
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <b>Tạo phòng</b>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center flex-wrap flex-column">
              <Input
                className="text-light bg-warning-create-room"
                type="text"
                placeholder="Tên phòng...."
                value={roomName}
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
              ></Input>
              <br />
              <div className="wrap-status text-center">
                <label htmlFor="">
                  <b>Công khai:</b>&nbsp;
                </label>
                <input
                  type="radio"
                  checked={!roomIsPrivate}
                  onChange={() => {
                    setRoomIsPrivate(false);
                  }}
                ></input>
                &nbsp;&nbsp; &nbsp; &nbsp;
                <label htmlFor="">
                  <b>Riêng tư:</b>&nbsp;
                </label>
                <input
                  type="radio"
                  checked={roomIsPrivate}
                  onChange={() => {
                    setRoomIsPrivate(true);
                  }}
                ></input>
              </div>
              {roomIsPrivate && (
                <>
                  <label htmlFor="">
                    <b>Mật khẩu:</b>
                  </label>
                  <input
                    className="bg-warning-create-room text-light"
                    type="password"
                    onChange={(e) => {
                      setRoomPass(e.target.value);
                    }}
                    value={roomPass}
                  />
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="shadow-none bg-dark border-0"
                variant="primary"
                onClick={handleCreateRoom}
              >
                Tạo phòng
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      <div className=" container-fluid px-4 d-flex flex-column align-items-center bg-sign py-5">
        <div className="title flex-start align-items-center">
          <br />
          <h3>
            <FaVideo className="text-warning "></FaVideo> Phòng của tôi:
          </h3>
          <br />
        </div>
        {hasRoom == null ? (
          <div className="join-room py-4">
            <Button
              className="bg-black border-0 text-light py-3"
              type="button"
              onClick={openModalCreateRoom}
            >
              Tạo phòng
            </Button>
          </div>
        ) : (
          <div className="join-room py-4 text-center ">
            <div className="d-flex flex-wrap">
              <Button
                onClick={() => handleJoinRoom()}
                className="bg-black border-0 text-light py-3"
                type="button"
              >
                Tham gia phòng
              </Button>
            </div>
            <br />

            <span>
              <b>ID: </b>
              {hasRoom.name}
            </span>
          </div>
        )}
      </div>
      <TogetherComponent isLogIn={isLogIn}></TogetherComponent>
    </>
  );
}

export default Together;
