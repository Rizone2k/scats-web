import { FaVideo, FaRegNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";
import Input from "~/components/Layout/components/Input/Input";

function TogetherComponent({ roomLive }) {
  const listRoom = roomLive;
  return (
    <div className="container-fluid px-4">
      <div className="room-live d-flex justify-content-between flex-wrap">
        <div className="title flex-start align-items-center">
          <h3>
            <FaRegNewspaper className="text-primary "></FaRegNewspaper> Phòng
            trực tuyến:
          </h3>
        </div>
        <div className="py-4">
          <Input
            className="bg-dark"
            type="text"
            placeholder="Tìm kiếm phòng...."
          />
        </div>
      </div>
      <div className="list-room container rounded py-3">
        <div className="pt-5 d-flex flex-wrap wrap-room">
          {listRoom.map((item) => (
            <Link key={item.id} to={`/room/${item.slug}/${item.id}`}>
              <span className="px-3 py-3 rounded border border-warning mx-1 my-1">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TogetherComponent;
