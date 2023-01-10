//import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Search from "./HeaderComponents";
import React, { useState, useEffect } from "react";
import { FaBell, FaClock, FaLanguage } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Header.scss";

function Header() {
  let time = new Date().toLocaleString();
  const [currentTime, setCurrentTime] = useState(time);
  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };
  setInterval(updateTime, 1000);
  return (
    <>
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="mb-3 bg-navbar text-white"
        >
          <Container fluid className="ps-5">
            <NavLink to="/" className="logo ps-5 ms-5">
              <img
                width={100}
                src={require("../../../../assets/img/logo.png")}
                alt="logo"
              />
            </NavLink>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className="bg-warning"
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  className="logo"
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                >
                  <img
                    width={100}
                    src={require("../../../../assets/img/logo.png")}
                    alt="logo"
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3 flex">
                  <Form className="d-flex">
                    <Search></Search>
                  </Form>
                </Nav>
                <NavDropdown
                  className="px-3 flex"
                  title={<FaLanguage></FaLanguage>}
                  id={`offcanvasNavbarDropdown-expand-${expand} drd`}
                >
                  <NavDropdown.Item href="#action3">
                    <b className="fs-5 text">English</b>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    <b className="fs-5 text">Việt Nam</b>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    <b className="fs-5 text">Cài đặt nâng cao</b>
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link className="px-1 flex" href="#action1">
                  <FaBell></FaBell>
                  <div className="cycle"></div>
                </Nav.Link>
                <Nav.Link className="px-4 flex" href="#action2">
                  <FaClock></FaClock>
                  <div className="pt-1 ps-1 clock-w">
                    &#160;
                    <strong>{currentTime}</strong>
                  </div>
                </Nav.Link>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
