import React, { useState } from "react";
import "./Avisos.css";
import { Header, Card, Modal } from "./components";

const Avisos = () => {
  const [array, setArray] = useState([
    { name: 1 },
    { name: 2 },
    { name: 1 },
    { name: 2 },
  ]);
  const [openModal, setOpenModal] = useState(true);
  return (
    <div className="cont-avisos-emp">
      <div className="cont-header-avisos-emp">
        <Header setOpenModal={setOpenModal} />
      </div>

      <div className="cont-cards-avisos-emp">
        {array.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </div>
      <Modal setOpenModal={setOpenModal} openModal={openModal} />
    </div>
  );
};

export default Avisos;
