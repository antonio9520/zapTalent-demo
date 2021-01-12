import React from "react";
import "./CardProfesion.css";
import { calcDate } from "../../../../assets/calcDate";
import { Tooltip } from "../../../../components";
import { IconButton } from "@material-ui/core";
import { Edit, Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";

const CardProfesion = (props) => {
  const { data, texto, setOpenModalProfesion } = props;

  if (data === undefined) return null;
  let today = new Date();
  const dateResult = calcDate(today, data.diafin);

  return (
    <div className="card-est-perfil-card-pro">
      <p className="p1-card-est-perfil-card-pro">Profesión</p>
      <Tooltip title={texto}>
        <p className="p2-card-est-perfil-card-pro">
          {texto.length > 35 ? texto.substring(0, 35) + "..." : texto}
        </p>
      </Tooltip>
      <div className="cont-exp-card-est-card-pro">
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
      <div className="cont-btn-card-profesion">
        <IconButton
          className="icon-btn-card-profesion"
          onClick={() => setOpenModalProfesion(true)}
        >
          <Edit />
        </IconButton>
        <Link to="/estudios">
          <IconButton className="icon-btn-card-profesion">
            <Visibility />
          </IconButton>
        </Link>
      </div>
    </div>
  );
};

export default CardProfesion;
