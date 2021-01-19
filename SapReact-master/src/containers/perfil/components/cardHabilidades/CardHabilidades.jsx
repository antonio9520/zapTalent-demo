import React, { useCallback } from "react";
import "./CardHabilidades.css";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { Tooltip } from "../../../../components";

const CardHabilidades = ({ habilidades, setOpenModalHab }) => {
  const random = () => {
    return Math.floor(Math.random() * (6 - 1 + 1) + 1);
  };
  const colors = [
    "#4BC1F4",
    "#1A79E2",
    "#2A52CC",
    "#9A0036",
    "#1A79E2",
    "#2A52CC",
    "#F57C00",
  ];
  return (
    <div className="cont-card-habilidades">
      <div className="sub-cont-card-habilidades">
        <h1>Habilidades y Conocimientos</h1>
      </div>
      <div className="cont-names-habilidades">
        {habilidades.map((item, index) => {
          let num = random();
          return (
            <div key={index} style={{ backgroundColor: colors[num - 1] }}>
              <p style={{ color: "white" }}>{item.name}</p>
            </div>
          );
        })}
      </div>
      <Tooltip title="Editar">
        <IconButton
          className="icon-btn-edit-hab"
          onClick={() => setOpenModalHab(true)}
        >
          <Edit />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default CardHabilidades;
