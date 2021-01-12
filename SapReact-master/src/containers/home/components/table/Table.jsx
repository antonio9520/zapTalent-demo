import React from "react";
import "./Table.css";
import { SearchBar, CardJob } from "../";
const Table = () => {
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
      <div className="cont-center-table-home">
        <div className="cont-card-job-table">
          <CardJob />
        </div>
        <div className="cont-card-job-table">
          <CardJob />
        </div>
        <div className="cont-card-job-table">
          <CardJob />
        </div>
        <div className="cont-card-job-table">
          <CardJob />
        </div>
        <div className="cont-card-job-table">
          <CardJob />
        </div>
        <div className="cont-card-job-table">
          <CardJob />
        </div>
      </div>
    </div>
  );
};

export default Table;
