import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { UnmountClosed } from "react-collapse";
import JWPlayer from "@jwplayer/jwplayer-react";

import {
  FaInfo,
  FaHeart,
  FaThumbsUp,
  FaRegEye,
  FaRegStar,
} from "react-icons/fa";

import Button, {
  OutlineButton,
} from "~/components/Layout/components/Button/Button";
import scatsApi from "~/API/scatsApi";
import "./Detail.scss";

function Detail() {
  const [open, setOpen] = useState(false);
  let { id } = useParams();
  const [item, setItem] = useState(null);
  const [video, setVideo] = useState("");

  useEffect(() => {
    const getDetail = async () => {
      const params = {};
      const response = await scatsApi.detail(id, params);
      setItem(response.data);
      setVideo(response.data.Episodes);
      window.scrollTo(0, 0);
      console.log(response.data);
    };
    getDetail();
  }, [id]);

  let URL = video[video.length - 1];

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${item.background})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${item.thumb})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.name || item.aka}</h1>
              <h3 className="title">{item.aka}</h3>
              <div className="genres d-flex flex-wrap">
                {item.Genres &&
                  item.Genres.slice(0, 9).map((genre, i) => (
                    <span key={i} className="genres__item">
                      # {genre.name}
                    </span>
                  ))}
              </div>
              <div
                className="overview"
                id="overview"
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div>

              <div className="cast">
                <div className="section__header">
                  <h3>
                    <FaInfo className="text-warning"></FaInfo> Thông tin phim
                  </h3>
                </div>
                <ul>
                  <li className="lni-angle-double-right">
                    <small>Năm phát hành: {item.Year.name}</small>
                  </li>
                  <li className="lni-angle-double-right">
                    <small>Quốc gia: {item.Country.name}</small>
                  </li>
                  <li className="lni-angle-double-right">
                    <small>Loại phim: {item.Type.name}</small>
                  </li>
                </ul>
                <span>
                  <FaThumbsUp className="text-danger"></FaThumbsUp> {item.liked}
                </span>
                <span className="ps-4">
                  <FaRegEye className="text-primary"></FaRegEye> {item.viewed}
                </span>
                <span className="ps-4">
                  <FaRegStar className="text-warning"></FaRegStar>{" "}
                  {Math.floor(Math.random() * (10 - 4) + 4) - 0.7}
                </span>
              </div>
              <hr />
              <div className="ps-5 action-user">
                <Button className={"bg-danger me-5 btn-watch"}>
                  <a className="btn-watch" href="#watch">
                    Xem
                  </a>
                </Button>
                <OutlineButton className={"px-5 me-5"}>
                  <FaHeart></FaHeart>
                </OutlineButton>

                {item.Type.id == 1 && (
                  <>
                    <OutlineButton
                      onClick={() => setOpen(!open)}
                      className={"px-5 my-2"}
                    >
                      Tập phim <small>︾</small>
                    </OutlineButton>
                    <UnmountClosed isOpened={open}>
                      <div className="pt-5 d-flex flex-wrap ">
                        {item.Episodes &&
                          item.Episodes.slice(0, 19).map((e, i) => (
                            <span
                              key={i}
                              onClick={function handleURL() {
                                {
                                  setVideo(e.hls);
                                  console.log(video);
                                  console.log(URL.hls);
                                }
                              }}
                              className="px-3 py-3 rounded border border-warning mx-1 my-1"
                            >
                              Tập: {e.episode}
                            </span>
                          ))}
                      </div>
                    </UnmountClosed>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="container px-2 py-3">
            <h3 className="fw-bolder">
              #Xem phim: {item.name} ~
              <span className="text-warning"> Tập {URL.episode}</span>
            </h3>

            <div className="section mb-3" id="watch">
              <JWPlayer
                file={URL.hls}
                type="hls"
                library="http://api.scats.tk/public/js/JWPlayer.js"
              />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Detail;
