import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "react-bootstrap/Card";
import React from "react";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination, Navigation } from "swiper";

import "swiper/swiper.min.css";

function MoviesComponents(props) {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get("http://api.scats.tk/api/v1/movie").then((response) => {
      setPost(response.data.data);
    });
  }, []);

  if (!post) return null;

  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      loopFillGroupWithBlank={true}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide className="slide-items">
        {post &&
          post.length > 0 &&
          post
            .slice(props.numberStart[0], props.numberEnd[0])
            .map((item, key) => {
              return (
                <div key={key} className="px-0 py-2 card-wrap">
                  <Link to={"/detail/" + item.id}>
                    <Card>
                      <Card.Img
                        variant="top"
                        title={item.name}
                        src={
                          item.thumb ||
                          "http://img.ophim1.cc/uploads/movies/phi-vu-trieu-do-phan-3-thumb.jpg"
                        }
                      />
                      <Card.Body className="px-2 py-3 ">
                        <Card.Title title={item.name}>{item.name}</Card.Title>

                        <Card.Text className="overlay" title={item.name}>
                          {item.name}
                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
              );
            })}
      </SwiperSlide>
      <SwiperSlide>
        {post &&
          post.length > 0 &&
          post
            .slice(props.numberStart[1], props.numberEnd[1])
            .map((item, key) => {
              return (
                <div key={key} className="px-0 py-2 card-wrap">
                  <Link to={item.slug}>
                    <Card>
                      <Card.Img
                        variant="top"
                        title={item.name}
                        src={
                          item.thumb ||
                          "http://img.ophim1.cc/uploads/movies/phi-vu-trieu-do-phan-3-thumb.jpg"
                        }
                      />
                      <Card.Body className="px-1 py-3 ">
                        <Card.Title title={item.name}>{item.name}</Card.Title>
                        {/* // <Card.Text title={item.name}>{item.name}</Card.Text> */}
                        {/* <Button variant="primary">Go somewhere</Button> */}
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
              );
            })}
      </SwiperSlide>
      <SwiperSlide>
        {post &&
          post.length > 0 &&
          post
            .slice(props.numberStart[2], props.numberEnd[2])
            .map((item, key) => {
              return (
                <div key={key} className="px-0 py-2 card-wrap">
                  <Link to={item.slug}>
                    <Card>
                      <Card.Img
                        variant="top"
                        title={item.name}
                        src={
                          item.thumb ||
                          "http://img.ophim1.cc/uploads/movies/phi-vu-trieu-do-phan-3-thumb.jpg"
                        }
                      />
                      <Card.Body className="px-1 py-2">
                        <Card.Title title={item.name}>{item.name}</Card.Title>
                        {/* // <Card.Text title={item.name}>{item.name}</Card.Text> */}
                        {/* <Button variant="primary">Go somewhere</Button> */}
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
              );
            })}
      </SwiperSlide>
    </Swiper>
  );
}

export default MoviesComponents;
