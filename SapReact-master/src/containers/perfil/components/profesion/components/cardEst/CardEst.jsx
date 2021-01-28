import React from "react";
import "./CardEst.css";
import { calcDate } from "../../../../../../assets/calcDate";
import { Tooltip } from "../../../../../../components";

const CardEst = (props) => {
  const { data, active, setActive } = props;

  if (data === undefined) return null;
  let today = new Date();
  const dateResult = calcDate(today, data.diafin);
  console.log(data);
  const handleClick = () => {
    setActive({
      _id: data._id,
      name: data.carrera,
      tipoestudio: data.tipoestudio,
      carrera: data.carrera,
    });
  };

  return (
    <div
      className={
        active._id === data._id
          ? "card-est-perfil-pro-active"
          : "card-est-perfil-pro"
      }
      onClick={handleClick}
    >
      <p
        className={
          active._id === data._id
            ? "p1-card-est-perfil-pro-active"
            : "p1-card-est-perfil-pro"
        }
      >
        {data.tipoestudio}
      </p>
      <Tooltip title={data.carrera}>
        <p
          className={
            active._id === data._id
              ? "p2-card-est-perfil-pro-active"
              : "p2-card-est-perfil-pro"
          }
        >
          {data.carrera.length > 35
            ? data.carrera.substring(0, 35) + "..."
            : data.carrera}
        </p>
      </Tooltip>
      <div className="cont-exp-card-est-pro">
        <p style={{ color: "white" }}>
          Experiencia{" "}
          {dateResult.years === 1
            ? dateResult.years + " año"
            : dateResult.years > 1
            ? dateResult.years + " años"
            : dateResult.months === 1
            ? dateResult.months + " mes"
            : dateResult.months + " años"}
        </p>
      </div>
    </div>
  );
};

export default CardEst;
