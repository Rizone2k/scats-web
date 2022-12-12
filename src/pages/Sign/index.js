import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInfo, FaRegStar } from "react-icons/fa";

import scatsApi, { categoryParam } from "~/API/scatsApi";
import Alert from "react-bootstrap/Alert";
import { info } from "~/redux/reducers/auth";
import { OutlineButton } from "~/components/Layout/components/Button/Button";
import { useSelector } from "react-redux";
import { isLoggedInSelector, currentUserSelector } from "~/redux/selectors";
import SignIn from "./signInComponent";
import SignUp from "./signUpComponent";
import "./sign.scss";

export default function index() {
  const [itemsGenre, setItemsGenre] = useState([]);
  const [title, setTitle] = useState("Sign In");
  const isLogin = useSelector(isLoggedInSelector);
  const currentUser = useSelector(currentUserSelector);
  // const [Info, setInfo] = useState({});
  const [show, setShow] = useState(true);
  window.scrollTo(0, 0);

  useEffect(() => {
    const fil = async () => {
      let response = null;
      const params = {};
      window.scrollTo(0, 0);
      response = await scatsApi.category(categoryParam.genre, { params });
      setItemsGenre(response.data);
    };
    fil();
  }, []);

  const handleSubmit = () => {
    // e.preventDefault();
    console.log("roi");
    // alert("Sended!");
  };

  return (
    <>
      {isLogin == true && (
        <Alert
          className="position-absolute"
          style={{ top: "80px", right: "10px" }}
          variant="success"
          show={show}
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading className="px-2 my-1">
            <small>Đăng nhập thành công!</small>
          </Alert.Heading>
        </Alert>
      )}

      {isLogin ? (
        <>
          <section className="h-100 gradient-custom-2 bg-profile">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-10 col-xl-8">
                  <div className="bg-light rounded">
                    <div
                      className="rounded text-white d-flex flex-row"
                      style={{ backgroundColor: "#000", height: "200px" }}
                    >
                      <div
                        className="ms-4 mt-5 d-flex flex-column"
                        style={{ width: "150px" }}
                      >
                        <img
                          src={currentUser.avatar}
                          alt="Generic placeholder image"
                          className="img-fluid img-thumbnail mt-4 mb-2"
                          style={{ width: "150px", zIndex: "1" }}
                        />
                        <OutlineButton
                          type="button"
                          className="btn btn-outline-dark bg-dark cursor-none"
                          data-mdb-ripple-color="dark"
                          style={{ zIndex: "1" }}
                          onClick={() => handleSubmit()}
                        >
                          Chỉnh sửa
                        </OutlineButton>
                      </div>
                      <div className="ms-3" style={{ marginTop: "130px" }}>
                        <h3>{currentUser.username}</h3>
                      </div>
                    </div>
                    <div
                      className="p-4 text-black"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="d-flex justify-content-end text-center py-1">
                        <div>
                          <p className="mb-1 h5">23</p>
                          <p className="small text-muted mb-0">Đã xem</p>
                        </div>
                        <div className="px-3">
                          <p className="mb-1 h5">16</p>
                          <p className="small text-muted mb-0">Yêu thích</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-4 text-black">
                      <div className="mb-5">
                        <h4>
                          <b className="mb-1 d-flex align-content-center">
                            <FaInfo className="text-info"></FaInfo>Thông tin
                          </b>
                        </h4>
                        <div
                          className="p-4"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <p className="font-italic mb-1">
                            <b>User:</b> {currentUser.username}
                          </p>
                          <p className="font-italic mb-1">
                            <b>Email:</b> {currentUser.email}
                          </p>
                          <p className="font-italic mb-0">
                            <b>Phone:</b> {currentUser.phone || "None"}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4>
                          <b className="mb-0 d-flex align-content-center">
                            <FaRegStar className="text-danger"></FaRegStar>
                            &nbsp;Gợi ý phim yêu thích
                          </b>
                        </h4>
                        <div className="mb-0 pe-4">
                          <Link to={"/movies"}>
                            <OutlineButton className="out-line bg-warning">
                              Xem Thêm
                            </OutlineButton>
                          </Link>
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col mb-2 d-flex flex-wrap justify-content-center">
                          {itemsGenre.slice(0, 12).map((item, index) => (
                            <Link to={"/movies"} key={index} className="py-1">
                              <span className="out-line genres-item text-light fs-5 py-2 text">
                                #{item.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="d-flex justify-content-center flex-column align-items-center bg-sign py-5">
          <div className="tab py-2">
            <OutlineButton
              type="button"
              className={`tabSign ${title == "Sign In" ? "active" : ""}`}
              onClick={function signInn() {
                setTitle("Sign In");
              }}
            >
              Đăng nhập
            </OutlineButton>
            <span className="px-4">|</span>
            <OutlineButton
              type="button"
              onClick={function signInn() {
                setTitle("Sign Up");
              }}
              className={`tabSign ${title == "Sign Up" ? "active" : ""}`}
            >
              Đăng ký
            </OutlineButton>
          </div>
          <div className="wrap-sign px-5">
            {title == "Sign In" ? (
              <SignIn title={title}></SignIn>
            ) : (
              <SignUp title={title}></SignUp>
            )}
          </div>
        </div>
      )}
    </>
  );
}
