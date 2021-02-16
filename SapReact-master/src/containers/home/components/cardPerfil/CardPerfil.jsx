import React from "react";
import "./CardPerfil.css";
import userlogo from "../../../../resources/images/SAPTalent/icon-new-user.svg";
import { ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";

const CardPerfil = (props) => {
  const { nombre, titulo, subtitle, textBtn, to, imageURL } = props;

  return (
    <>
      <div className="container-perfilhome">
        <div className="overlay-perfil-home"></div>
        <div className="cont-img-card-perfil-home">
          {imageURL ? (
            <img
              style={{ borderRadius: "50%", height: "120px", width: "120px" }}
              src={imageURL ? imageURL : userlogo}
              alt="user-logo"
            />
          ) : (
            <img src={userlogo} alt="user-logo" />
          )}
        </div>
        <div className="cont-center-card-home">
          <p style={{ color: "white" }}>Bienvenido {nombre}!</p>
          <p style={{ color: "white" }}>{titulo}</p>
          <p style={{ color: "white" }}>{subtitle}</p>
        </div>
        <div className="cont-btn-complete-perfil-home">
          <Link to={to} className="link">
            <ListItem button className="btn-comenzar-perfil-home">
              <p>{textBtn}</p>
            </ListItem>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CardPerfil;
