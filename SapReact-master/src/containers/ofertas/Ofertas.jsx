import React, { useEffect, useState } from "react";
import "./Ofertas.css";
import { Card, Header, Filtros } from "./components";

const Ofertas = () => {
  const [_array, setArray] = useState(["1", "2", "3", "4"]);
  const [open, setOpen] = useState(true);

  return (
    <div className="ofertas-laborales">
      <div className="cont-header-of-laborales">
        <Header setOpen={setOpen} />
      </div>
      <div className="cont-card-of-laborales">
        {_array.map((item, index) => (
          <Card data={item} key={index} />
        ))}
      </div>
      <Filtros open={open} setOpen={setOpen} />
    </div>
  );
};

export default Ofertas;
