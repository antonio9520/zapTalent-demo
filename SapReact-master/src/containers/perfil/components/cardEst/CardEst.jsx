import React from "react";
import "./CardEst.css";
import { calcDate } from "../../../../assets/calcDate";
import { Tooltip } from "../../../../components";
import { School, Edit, Visibility } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

const CardEst = (props) => {
  const { data, setOpenModalEditar, setDataEditar, empresas } = props;

  if (data === undefined) return null;
  let today = new Date();
  const dateResult = calcDate(today, data.diafin);
  const initEdit = () => {
    setDataEditar(data);
    setOpenModalEditar(true);
  };
  return (
    <div className="card-est-perfil">
      <div style={{ display: "flex", alignItems: "center" }}>
        <School className="icon-card-est" />
        <p className="p1-card-est-perfil">{data.tipoestudio}</p>
      </div>
      <Tooltip title={data.carrera}>
        <p className="p2-card-est-perfil">
          {data.carrera.length > 35
            ? data.carrera.substring(0, 35) + "..."
            : data.carrera}
        </p>
      </Tooltip>
      <div className="cont-exp-card-est">
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
      {!empresas ? (
        <div className="left-card-est">
          <Link to="/estudios">
            <Tooltip title="Ver" placement="top">
              <IconButton className="btn-card-est">
                <Visibility />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title="Editar" placement="top">
            <IconButton className="btn-card-est" onClick={initEdit}>
              <Edit />
            </IconButton>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
};

export default CardEst;
