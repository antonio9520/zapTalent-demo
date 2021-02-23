import React from "react";
import "./Table.css";
import { SearchBar, CardJob } from "../";
import { useSelector } from "react-redux";

const Table = ({
  setSkip,
  setOpenModal,
  setDataOL,
  data,
  search,
  setSearch,
  query,
  setQuery,
  setSwitch2,
  _switch2,
}) => {
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    const alto = scrollHeight - 150;
    if (offsetHeight + scrollTop > alto) {
      console.log("scroll");
      setSkip(data.length);
    }
  };
  const handleClick = () => {
    query.search = search;
    setSkip(0);
    setQuery(query);
    // obtenerOfertas(query, 0);
    setSwitch2(!_switch2);
    console.log("switch")
  };
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };
  return (
    <div className="cont-table">
      <div className="cont-top-table-home">
        <div className="titulo-table-home">
          <p>Ofertas de empleo que te podrían interesar</p>
        </div>
        <div className="cont-search-table-home">
          <SearchBar
            onChange={setSearch}
            onClick={handleClick}
            onKeyDown={_handleKeyDown}
            value={search}
          />
        </div>
      </div>
      <div className="cont-center-table-home" onScroll={handleScroll}>
        {data.map((item) => (
          <div key={item._id} className="cont-card-job-table">
            <CardJob
              data={item}
              setOpenModal={setOpenModal}
              setDataOL={setDataOL}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
