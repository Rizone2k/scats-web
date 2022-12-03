import React from "react";
// import { useState } from "react";
// import { Req } from "~/data/DATA";
import { useEffect, useState } from "react";

import { Wrapper as PopperWrapper } from "~/components/Popper";
// import Items from "~/components/Items";
import "./Header.mudule.scss";

const Search = () => {
  const [Search, setSearch] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://api.scats.tk/api/v1/movie")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      });
  }, []);
  // console.log(result);

  const Query = (data) => {
    return data
      .slice(0, 30)
      .filter(
        (item) =>
          item.name.toLowerCase().includes(Search) ||
          item.slug.toLowerCase().includes(Search)
      );
  };

  return (
    <div className="naBar">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        spellCheck={false}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* <Req></Req> */}
      <PopperWrapper>
        <div
          style={{ zIndex: "3" }}
          className={`result ${
            Search !== "" ? "d-block position-absolute zindex-9" : "d-none"
          }`}
        >
          <ul className="list bgResult" id="bgResult">
            {Query(data).map((item, key) => (
              <li className="listItems d-flex align-self-center row" key={key}>
                <img className="preSent col-2" src={item.thumb} alt="avatar" />{" "}
                <br />
                <span className="col-10">{item.name}</span> <br />
              </li>
            ))}
            {/* <Items /> */}
          </ul>
        </div>
      </PopperWrapper>
    </div>
  );
};

export default Search;
