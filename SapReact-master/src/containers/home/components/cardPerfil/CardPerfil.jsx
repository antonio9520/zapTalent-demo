import React from "react";
import "./CardPerfil.css";
import userlogo from "../../../../resources/images/SAPTalent/icon-new-user.svg";
import { ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";
const CardPerfil = (props) => {
  const { nombre } = props;
  return (
    <>
      <div className="container-perfilhome">
        <div className="overlay-perfil-home"></div>
        <div
        className="cont-img-card-perfil-home"
     
        >
          <img src={userlogo} alt="user-logo" />
        </div>
        <div className="cont-center-card-home">
          <p>Bienvenido {nombre}!</p>
          <p>Ya tienes tu perfil en ZAPTalent</p>
          <p>
            Sabías qué si completas tu perfil, tienes muchas más posibilidades
            de obtener ese empleo que tanto te mereces. Sólo te falta un poco...
          </p>
        </div>
        <div className="cont-btn-complete-perfil-home">
          <Link to="/perfil" className="link">
            <ListItem button className="btn-comenzar-perfil-home">
              <p>Completar</p>
            </ListItem>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CardPerfil;
