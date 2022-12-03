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
          <h4 className="mkt-3dSlider-title mt-4">
            Phim thịnh hành
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
      <ListMovies numberStart={[6, 0, 18]} numberEnd={[12, 6, 24]} />
      <div className="container-fluid pe-0 ps-4 d-flex align-items-center justify-content-between">
        <h4 className="mkt-3dSlider-title mt-4">
          Phim mới cập nhật
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
      <ListMovies numberStart={[12, 18, 24]} numberEnd={[18, 24, 30]} />
      <div className="container-fluid pe-0 ps-4 d-flex align-items-center justify-content-between">
        <h4 className="mkt-3dSlider-title mt-4">
          Phim chiếu rạp
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
      <ListMovies numberStart={[24, 30, 2]} numberEnd={[30, 36, 8]} />
      <ListMovies numberStart={[16, 6, 12]} numberEnd={[22, 12, 18]} />
    </>
  );
}

export default Home;
