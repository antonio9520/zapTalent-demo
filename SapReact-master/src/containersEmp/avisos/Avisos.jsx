import React, { useState } from "react";
import "./Avisos.css";
import { Header, Pagination, Card } from "./components";

const Avisos = () => {
  const [array, setArray] = useState([
    { name: 1 },
    { name: 2 },
    { name: 1 },
    { name: 2 },
  ]);
  return (
    <div className="cont-avisos-emp">
      <div className="cont-header-avisos-emp">
        <Header />
      </div>
      {/* <div className="cont-pagination-avisos-emp">
        <Pagination />
      </div> */}
      <div className="cont-cards-avisos-emp">
        {array.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Avisos;
