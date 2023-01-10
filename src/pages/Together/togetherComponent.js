import React, { useEffect, useState } from "react";
import { FaRedo, FaRegNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "~/components/Layout/components/Button/Button";
import Input from "~/components/Layout/components/Input/Input";
import scatsApi from "~/API/scatsApi";
import { debounce } from "lodash";
import { useCallback } from "react";

function TogetherComponent({ isLogin }) {
  const [roomLive, setRoomLive] = useState([]);
  const [resultRoomLive, setResultRoomLive] = useState([]);
  // console.log(roomLive);
  const listRoom = roomLive;

  useEffect(() => {
    getRoomLive();
  }, []);

  const getRoomLive = async () => {
    try {
      const res = await scatsApi.getRoomLive();
      if (res.status == 200) {
        const result = res.data;
        if (result.status == "success") {
          setRoomLive(result.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchRoom = useCallback(
    debounce((query) => {
      // console.log(query);
      return setRoomLive(roomLive.filter((i) => i.name.includes(query)));
    }, 1000),
    []
  );

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
          <Button
            type="button"
            title="refresh"
            className="border-0 bg-info me-3 shadow-none"
            onClick={() => getRoomLive()}
          >
            <FaRedo></FaRedo>
          </Button>
          <Input
            className="bg-dark"
            type="text"
            placeholder="Tìm kiếm phòng...."
            onChange={(e) => handleSearchRoom(e.target.value)}
          />
        </div>
      </div>
      <div className="list-room container rounded py-2">
        <div className="py-3 d-flex flex-wrap wrap-room">
          {listRoom.map((item) => (
            /* Handle private room at here */
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
