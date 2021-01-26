import React, { useState, useEffect } from "react";
import "./Card.css";
import { IconButton } from "@material-ui/core";
import { Edit, Visibility, School, EventAvailable } from "@material-ui/icons";
import { Tooltip } from "../../../../components";
import { Link } from "react-router-dom";

const Card = ({ data, name, setOpenModalProfesion, link }) => {
  const { institucion, diainicio, diafin, estado } = data;
  const [experiencia, setExperiencia] = useState(null);

  useEffect(() => {
    if (diafin) {
      let fin = diafin.substring(0, 4);
      let now = new Date();
      let ano = now.getFullYear();
      setExperiencia(ano - fin);
    }
  }, []);
  return (
    <div className="card-adn-new-perfil">
      <div className="cont-swipeables-new-perfil">
        <div className="header-card-job-new-perfil">
          <School className="header-icon-adn-new-perfil" />
          <p className="p-mi-adn-perfil">Tu profesión</p>
          <Tooltip title="Editar" placement="top">
            <IconButton
              className="btn-edit-new-perfil-job"
              onClick={() => setOpenModalProfesion(true)}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
        {/* <div className="sub-swipeables-new-perfil"> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: "100%",
          }}
        >
          <p className="p2-post-b-perfil">{name}</p>
          <p className="p3-post-b-perfil" style={{ maxWidth: "230px" }}>
            {institucion}
          </p>
          <div className="dates-card-post">
            <EventAvailable className="icon-card-post-new-perfil" />
            <p>
              {diainicio.substring(0, 4)} - {diafin.substring(0, 4)}
            </p>
          </div>
          <div>
            <div className="estado-card-profesion">
              <p>{estado}</p>
            </div>
            <div className="exp-card-profesion">
              <p>Experiencia: {experiencia} años</p>
            </div>
          </div>
        </div>
      </div>
      <div className="cont-arrow-btns-new-perfil">
        <div></div>
        <div>
          <Link to={link}>
            <Tooltip title="Ver">
              <IconButton className={"btn-arrow-perfil-adn"}>
                <Visibility />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
