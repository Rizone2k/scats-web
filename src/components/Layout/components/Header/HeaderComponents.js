import { debounce } from "lodash";
import React, { useState } from "react";
import { useCallback } from "react";
import scatsApi from "~/API/scatsApi";
import "./Header.scss";
import { Link } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const SearchMovie = useCallback(
    debounce(async (query) => {
      setSearch(query);
      if (query.length > 0) {
        let response = null;
        const params = {};
        response = await scatsApi.search(query, { params });
        setData(response.data.movies);
        window.scrollTo(0, 0);
      }
    }, 1000),
    []
  );

  return (
    <div className="naBar py-2">
      <input
        type="text"
        className="search"
        placeholder="Phim..."
        spellCheck={false}
        onChange={(e) => SearchMovie(e.target.value)}
      />
      <div
        style={{ zIndex: "3" }}
        className={`result ${
          data && search.length > 1
            ? "d-block position-absolute zIndex-9"
            : "d-none"
        }`}
      >
        <ul className="list bgResult" id="bgResult">
          {data &&
            data.slice(0, 20).map((item, key) => (
              <Link to={"/detail/" + item.id} key={key}>
                <li className="listItems d-flex align-self-center row">
                  <img
                    className="preSent col-2"
                    src={item.thumb}
                    alt="avatar"
                  />{" "}
                  <br />
                  <span className="col-10">{item.name}</span> <br />
                </li>
              </Link>
            ))}
          {/* <Items /> */}
        </ul>
      </div>
    </div>
  );
};

export default Search;
