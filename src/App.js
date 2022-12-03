import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { publicRoutes } from "~/routes";
import { DefaultLayout } from "~/components/Layout";
import { Fragment } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { refreshToken } from "./redux/reducers/auth";

function App() {
  const dispatch = useDispatch();
  const checkLogIn = () => {
    const token = Cookies.get("access_token");
    if (token) {
      dispatch(refreshToken())
        .then(unwrapResult)
        .catch(() => {
          window.location = "/profile";
        });
    }
  };

  useEffect(() => {
    checkLogIn();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.components;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
