import React from "react";
import "./CardJob.css";
import NumberFormat from "react-number-format";

const CardJob = ({ data, setOpenModal, setDataOL }) => {
  const verAviso = () => {
    setDataOL(data);
    setOpenModal(true);
  };
  return (
    <div className="cont-card-job" onClick={verAviso}>
      <div className="sub-div-cardjob-1">
        <div className="img-card-job"></div>
      </div>
      <div className="sub-div-cardjob-2">
        <p>{data.titulo}</p>
      </div>
      <div className="sub-div-cardjob-3">
        <p>Analistas de Negocios Digitales</p>
      </div>
      <div className="sub-div-cardjob-4">
        <p>Jornada de 45 horas semanales</p>
      </div>
      <div className="sub-div-cardjob-5">
        <p>Hace 1 dia</p>
      </div>
      <div className="sub-div-cardjob-6">
        <p>{data.region}</p>
      </div>
      <div className="sub-div-cardjob-7">
        <p>
          ${" "}
          <NumberFormat
            value={data.renta}
            displayType={"text"}
            thousandSeparator={true}
            // prefix={"$"}
          />{" "}
        </p>
      </div>
    </div>
  );
};

export default CardJob;
