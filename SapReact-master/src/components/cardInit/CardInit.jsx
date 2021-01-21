import React from "react";
import "./CardInit.css";
import { ListItem } from "@material-ui/core";
import logo from "../../resources/img/ZAPTalent-Logotipo-Vertical-Original.svg";
import className from "classnames";

const CardInit = (props) => {
  const { setOpenModal, type, texto1, texto2 } = props;
  const cardStyle = className({
    "left-card-init-estudios": true,
    "left-card-init-estudios-A1": type === "typeA1",
    "left-card-init-estudios-A2": type === "typeA2",
    "left-card-init-estudios-B1": type === "typeB1",
    "left-card-init-estudios-B2": type === "typeB2",
    "left-card-init-estudios-C1": type === "typeC1",
    "left-card-init-estudios-C2": type === "typeC2",
    "left-card-init-estudios-D1": type === "typeD1",
    "left-card-init-estudios-D2": type === "typeD2",
  });
  return (
    <div className="cont-card-init">
      <div className="card-init-estudios">
        <div className={cardStyle}></div>
        <div className="right-card-init-estudios">
          <div className="right-card-init-estudios-1">
            <img src={logo} alt="logo" className="logo-card-init-estudios" />

            <p className="p1-card-init-estudios">{texto1}</p>
            <p className="p2-card-init-estudios">{texto2}</p>
          </div>
          <div className="right-card-init-estudios-2">
            <ListItem
              button
              className="btn-cardinit-estudios"
              onClick={() => setOpenModal(true)}
            >
              <p style={{ color: "white" }}>Comenzar</p>
            </ListItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInit;
