import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState, useEffect } from "react";

import Button from "~/components/Layout/components/Button/Button";
import scatsApi, { categoryParam } from "~/API/scatsApi";

import "./Movie.scss";

const Filter = ({ setItems }) => {
  const [check, SetCheck] = useState(false);
  // const [genre, setGenre] = useState([]);
  const [country, setCountry] = useState([]);
  const [year, setYear] = useState([]);
  const [type, setType] = useState([]);

  const [itemsGenre, setItemsGenre] = useState([]);
  const [itemsCountry, setItemsCountry] = useState([]);
  const [itemsYear, setItemsYear] = useState([]);

  const itemsType = [
    { name: "Phim bộ", id: 1 },
    { name: "Phim lẻ", id: 2 },
  ];

  const [titleCountry, setTitleCountry] = useState("Quốc gia");
  const [titleGenre, setTitleGenre] = useState("Thể loại");
  const [titleYear, setTitleYear] = useState("Phát hành");
  const [titleType, setTitleType] = useState("Loại phim");

  // Call Api render movie by filter
  function handleFilter() {
    const getList = async () => {
      let response = null;
      const params = {};
      response = await scatsApi.filter(year, country, type, { params });
      console.log(response.data.movies);
      setItems(response.data.movies);
      window.scrollTo(0, 0);
    };
    getList();
  }

  // Call Api render filter
  useEffect(() => {
    const fil = async () => {
      let response = null;
      const params = {};

      response = await scatsApi.category(categoryParam.genre, { params });
      setItemsGenre(response.data);

      response = await scatsApi.category(categoryParam.country, {
        params,
      });
      setItemsCountry(response.data);

      response = await scatsApi.category(categoryParam.year, { params });
      setItemsYear(response.data);
    };
    fil();
  }, []);

  const FilterTitle = (props) => (
    <NavDropdown
      className="px-5 py-1 flex fs-3 text bg-dark btn-outline rounded-pill"
      title={props.title}
      id={`offcanvasNavbarDropdown-expand`}
    >
      {props.children}
    </NavDropdown>
  );
  return (
    <div className="wrap-filter d-flex flex-row justify-content-around py-2 rounded bg-black flex-wrap">
      <div className="filter-items py-3">
        <FilterTitle title={titleCountry}>
          {itemsCountry.map((i, e) => (
            <React.Fragment key={e}>
              <NavDropdown.Item className="fs-4 text">
                <strong
                  onClick={() => {
                    setCountry(i.id);
                    setTitleCountry(i.name);
                  }}
                >
                  <small onClick={() => SetCheck(true)}>{i.name}</small>
                </strong>
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </React.Fragment>
          ))}
        </FilterTitle>
      </div>
      <div className="filter-items py-3">
        <FilterTitle title={titleYear}>
          {itemsYear.map((i, e) => (
            <React.Fragment key={e}>
              <NavDropdown.Item className="fs-4 text">
                <strong
                  onClick={() => {
                    setYear(i.id);
                    setTitleYear(i.name);
                  }}
                >
                  <small onClick={() => SetCheck(true)}>{i.name}</small>
                </strong>
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </React.Fragment>
          ))}
        </FilterTitle>
      </div>
      <div className="filter-items py-3">
        <FilterTitle title={titleGenre}>
          {itemsGenre.map((i, e) => (
            <React.Fragment key={e}>
              <NavDropdown.Item className="fs-4 text">
                <strong
                  onClick={() => {
                    alert("Try late!");
                    setTitleGenre(i.name);
                  }}
                >
                  <small onClick={() => SetCheck(true)}>{i.name}</small>
                </strong>
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </React.Fragment>
          ))}
        </FilterTitle>
      </div>
      <div className="filter-items py-3">
        <FilterTitle title={titleType}>
          {itemsType.map((i, e) => (
            <React.Fragment key={e}>
              <NavDropdown.Item className="fs-4 text">
                <strong
                  onClick={() => {
                    setType(i.id);
                    setTitleType(i.name);
                  }}
                >
                  <small onClick={() => SetCheck(true)}>{i.name}</small>
                </strong>
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </React.Fragment>
          ))}
        </FilterTitle>
      </div>
      <div className={`filter-items py-3 ${check == false ? "pe-none" : ""}`}>
        <Button onClick={handleFilter}>Lọc</Button>
      </div>
    </div>
  );
};

export default Filter;
