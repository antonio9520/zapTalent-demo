import React from "react";
import "./Habilidades.css";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import classNames from "classnames";

const Habilidades = (props) => {
  const { type, setOpenModalHab } = props;
  const leftCard = classNames({
    "left-hab-perfil": type === "typeA",
    "left-hab-perfil-f": type === "typeB",
  });
  return (
    <div className="cont-hab-perfil">
      <div className={leftCard}>
        <div className="overlay-hab-perfil"></div>
      </div>
      <div className="overlay-hab-perfil-xs"></div>
      <div className="center-hab-perfil">
        <p>Queremos saber más de ti.</p>
        <p>¿Qué otra habilidad tienes?</p>
      </div>
      <div className="right-hab-perfil">
        <IconButton
          className="btn-edit-hab-perfil"
          onClick={() => setOpenModalHab(true)}
        >
          <Edit />
        </IconButton>
      </div>
      
    </div>
  );
};

export default Habilidades;
