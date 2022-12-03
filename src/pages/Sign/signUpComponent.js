// import { useFormik } from "formik";
import { OutlineButton } from "~/components/Layout/components/Button/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "~/redux/reducers/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import Alert from "react-bootstrap/Alert";

import "./sign.scss";
const SignUpForm = (title) => {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.length > 0 && password.length > 0) {
      const user = {
        username: userName,
        password: password,
      };
      dispatch(login(user))
        .then(() => setShow(true))
        .then(unwrapResult)
        .catch((err) => console.log(err));
    }
  };

  return title.title == "Sign Up" ? (
    <>
      <h3 className=" title-weight pb-3">{title.title}</h3>
      {show == true && (
        <Alert
          className="position-absolute"
          style={{ top: "10px", right: "10px" }}
          variant="success"
          // onClose={}
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading className="px-2 my-1">
            Dang nhap thanh cong!
          </Alert.Heading>
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User name</label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            autoComplete="off"
            className="form-control"
            placeholder="Enter user name"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
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
              Remember me
            </label>
          </div>
        </div>

        <div className="text-center">
          <OutlineButton type="submit" className="bg-dark w-50 text-light">
            Sign in
          </OutlineButton>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    </>
  ) : (
    <>
      <h2> Ohhh....Something error!</h2>
    </>
  );
};

export default SignUpForm;