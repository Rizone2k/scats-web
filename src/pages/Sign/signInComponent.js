// import { useFormik } from "formik";
import { OutlineButton } from "~/components/Layout/components/Button/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "~/redux/reducers/auth";
import Alert from "react-bootstrap/Alert";
import { unwrapResult } from "@reduxjs/toolkit";

import "./sign.scss";
const SignInForm = (title) => {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.length > 0 && password.length > 0) {
      const user = {
        username: userName,
        password: password,
      };
      dispatch(login(user))
        .then(unwrapResult)
        .catch((err) => {
          console.log(err);
          setError(err);
          setShow(true);
        });
    } else {
      alert("Tài khoản hoặc mật khẩu không được để trống!");
    }
  };

  return title.title == "Sign In" ? (
    <>
      <h3 className=" title-weight pb-3">{title.title}</h3>
      {error == "Not found" && (
        <Alert
          className="position-absolute"
          style={{ top: "80px", right: "10px" }}
          variant="danger"
          show={show}
          // onClose={}
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading className="px-2 my-1">
            <small>Tài khoản không đúng!</small>
          </Alert.Heading>
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <small>User name</small>
          </label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            autoComplete="off"
            className="form-control"
            placeholder="Enter user name"
          />
        </div>

        <div className="form-group">
          <label>
            <small>Password</small>
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="off"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            &nbsp;
            <label className="custom-control-label" htmlFor="customCheck1">
              <small> Remember me</small>
            </label>
          </div>
        </div>

        <div className="text-center">
          <OutlineButton type="submit" className="bg-dark w-50 text-light">
            Sign In
          </OutlineButton>
        </div>
        <div className="forgot-password text-right">
          <small>
            Quên <a href="#">mật khẩu?</a>
          </small>
        </div>
      </form>
    </>
  ) : (
    <>
      <h2>Ohhh....Something error!</h2>
    </>
  );
};

export default SignInForm;
