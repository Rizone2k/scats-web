import Slider from "~/components/Layout/components/Slider";
import ListMovies from "../components/Movie/ListMovies";
import { OutlineButton } from "~/components/Layout/components/Button/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Slider />
      <div className="container-fluid pe-0 ps-4 d-flex align-items-center justify-content-between">
        <div className="">
          <h4 className="mkt-3dSlider-title mt-4 ">
            <b>Phim thịnh hành</b>
            <img
              className="ps-2 pb-1"
              style={{ height: 25 }}
              src={require("../../assets/img/hot.png")}
              alt=""
            />
          </h4>
        </div>
        <div className="pe-4">
          <Link to={"/movies"}>
            <OutlineButton className="out-line">Xem Thêm</OutlineButton>
          </Link>
        </div>
      </div>
      <ListMovies page={1} />
      <div className="container-fluid pe-0 ps-4 d-flex align-items-center justify-content-between">
        <h4 className="mkt-3dSlider-title mt-4">
          <b> Phim mới cập nhật</b>
          <img
            className="ps-2 pb-1"
            style={{ height: 25 }}
            src={require("../../assets/img/new.png")}
            alt=""
          />
        </h4>
        <div className="pe-4">
          <Link to={"/movies"}>
            <OutlineButton className="out-line">Xem Thêm</OutlineButton>
          </Link>
        </div>
      </div>
      <ListMovies page={2} />
      <div className="container-fluid pe-0 ps-4 d-flex align-items-center justify-content-between">
        <h4 className="mkt-3dSlider-title mt-4">
          <b> Phim chiếu rạp</b>
          <img
            className="ps-2 pb-1"
            style={{ height: 25 }}
            src={require("../../assets/img/cinema.png")}
            alt=""
          />
        </h4>
        <div className="pe-4">
          <Link to={"/movies"}>
            <OutlineButton className="out-line">Xem Thêm</OutlineButton>
          </Link>
        </div>
      </div>
      <ListMovies page={3} />
      <ListMovies page={2} />
    </>
  );
}

export default Home;
