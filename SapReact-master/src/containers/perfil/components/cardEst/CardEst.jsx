import React from "react";
import "./CardEst.css";
import { calcDate } from "../../../../assets/calcDate";
import { Tooltip } from "../../../../components";

const CardEst = (props) => {
  const { data } = props;

  if (data === undefined) return null;
  let today = new Date();
  const dateResult = calcDate(today, data.diafin);

  return (
    <div className="card-est-perfil">
      <p className="p1-card-est-perfil">{data.tipoestudio}</p>
      <Tooltip title={data.carrera}>
        <p className="p2-card-est-perfil">
          {data.carrera.length > 35
            ? data.carrera.substring(0, 35) + "..."
            : data.carrera}
        </p>
      </Tooltip>
      <div className="cont-exp-card-est">
        <p>
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
