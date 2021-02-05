import React from "react";
import "./Table.css";
import { SearchBar, CardJob } from "../";
import { useSelector } from "react-redux";

const Table = ({ setSkip, setOpenModal, setDataOL }) => {
  const ofertasLaborales = useSelector(
    (state) => state.ofertasLaborales.ofertasLaborales
  );

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    const alto = scrollHeight - 150;
    if (offsetHeight + scrollTop > alto) {
      console.log("scroll");
      setSkip(ofertasLaborales.length);
    }
  };
  return (
    <div className="cont-table">
      <div className="cont-top-table-home">
        <div className="titulo-table-home">
          <p>Ofertas de empleo que te podrían interesar</p>
        </div>
        <div className="cont-search-table-home">
          <SearchBar />
        </div>
      </div>
      <div className="cont-center-table-home" onScroll={handleScroll}>
        {ofertasLaborales.map((item) => (
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
