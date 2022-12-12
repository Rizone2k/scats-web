import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { isLoggedInSelector } from "~/redux/selectors";
import { logout } from "~/redux/reducers/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import Modal from "react-bootstrap/Modal";

import {
  FaHome,
  FaBars,
  FaUserAlt,
  FaPeopleArrows,
  FaRegListAlt,
  FaHistory,
  FaDoorOpen,
  FaThumbsUp,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.mudule.scss";
import routesConfig from "~/config/routes";
import { OutlineButton } from "../Button/Button";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const isLogin = useSelector(isLoggedInSelector);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const menuItem = [
    {
      path: routesConfig.home,
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: routesConfig.together,
      name: "Together",
      icon: <FaPeopleArrows />,
    },
    {
      path: routesConfig.history,
      name: "History",
      icon: <FaHistory />,
    },
    {
      path: routesConfig.favorite,
      name: "Favorites",
      icon: <FaThumbsUp />,
    },
    {
      path: routesConfig.profile,
      name: "Profile",
      icon: <FaUserAlt />,
    },
  ];
  const handleLogOutClick = () => {
    handleClose();
    dispatch(logout())
      .then(unwrapResult)
      .then(navigate("/profile"))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div style={{ width: isOpen ? "180px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1
            style={{ display: isOpen ? "block" : "none" }}
            className="logo ps-2"
          >
            Scats
          </h1>
          <div style={{ marginLeft: isOpen ? "45px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link naVa">
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              <b>
                <small> {item.name}</small>
              </b>
            </div>
          </NavLink>
        ))}
        {isLogin && (
          <button
            className="link naVa"
            onClick={handleShow}
            style={{ backgroundColor: "transparent" }}
          >
            <div className="icon">
              <FaDoorOpen />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              <b>
                <small> Log out</small>
              </b>
            </div>
          </button>
        )}
      </div>
      <Modal className="px-0" show={show} onHide={handleClose}>
        <Modal.Header className="text-center" closeButton>
          <Modal.Title>
            <b>Đăng xuất</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <span className="text-dark fs-4">Are you sure about that?</span>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <OutlineButton className="bg-dark" onClick={handleClose}>
            Không
          </OutlineButton>
          <OutlineButton className="bg-danger" onClick={handleLogOutClick}>
            Đăng xuất
          </OutlineButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Sidebar;
