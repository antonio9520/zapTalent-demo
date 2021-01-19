import React, { useState } from "react";
import "./Card.css";
import icontrabajo from "../../../../resources/images/SapMitrabajos/icon-enterprise.svg";
import {
  BusinessCenter,
  Flight,
  Home,
  EventAvailable,
  EventBusy,
  Room,
} from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { Tooltip } from "../../../../components";

const Card = () => {
  const [modulos, setModulos] = useState(["MM", "FI"]);
  return (
    <div className="card-ofertas-laborales">
      <div className="top-card-ofertas-laborales">
        <div className="item-1">
          <div>
            <img src={icontrabajo} alt="icon-trabajo" />
          </div>
        </div>
        <div className="item-2">
          <h1>Programador PHP</h1>
          <p>Ingeniero en informatica</p>
          <p>Apiux Texnologia SPA</p>
          <div>
            <p>2 años de experiencia</p>
          </div>
        </div>
        <div className="item-3">
          <Tooltip title="Tipo de consultor">
            <div>
              <BusinessCenter className="icon-card-ofertas-laborales" />
              <p style={{ color: "#2B7DE6", fontWeight: "600" }}>Senior</p>
            </div>
          </Tooltip>

          <Tooltip title="Tipo de Jornada">
            <div>
              <BusinessCenter className="icon-card-ofertas-laborales" />
              <p>Jornada Completa</p>
            </div>
          </Tooltip>
          <Tooltip title="Fecha de contratación">
            <div>
              <BusinessCenter className="icon-card-ofertas-laborales" />
              <p>30/5/2020</p>
            </div>
          </Tooltip>
          <Tooltip title="Disponibilidad de viajar">
            <div>
              <Flight className="icon-card-ofertas-laborales" />
              <p>Si</p>
            </div>
          </Tooltip>
        </div>

        <div className="item-4">
          <Tooltip title="Experiencia SAP">
            <div>
              <BusinessCenter className="icon-card-ofertas-laborales" />
              <p style={{ color: "#2B7DE6", fontWeight: "600" }}>3 Años</p>
            </div>
          </Tooltip>
          <Tooltip title="Tipo de contrato">
            <div>
              <BusinessCenter className="icon-card-ofertas-laborales" />
              <p>Contrato fijo</p>
            </div>
          </Tooltip>
          <Tooltip title="Cantidad de Vacantes">
            <div>
              <BusinessCenter className="icon-card-ofertas-laborales" />
              <p>2</p>
            </div>
          </Tooltip>
          <Tooltip title="Disponibilidad de cambio de residencia">
            <div>
              <Home className="icon-card-ofertas-laborales" />
              <p>Si</p>
            </div>
          </Tooltip>
        </div>
        <div className="item-5">
          <h5>Módulos y submodulos</h5>
          <div className="modulos-card-ofertas-laborales">
            {modulos.map((item, index) => (
              <Modulos key={index} data={item} />
            ))}
          </div>
          <div className="submodulos-card-ofertas-laborales">
            <SubModulos />
          </div>
        </div>
        <div className="item-6">
          <div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
      <div className="bottom-card-ofertas-laborales">
        <div className="item-1">
          <EventAvailable className="icon-card-ofertas-laborales" />
          <p>Mayo 21 - 2020</p>
          <EventBusy className="icon-card-ofertas-laborales" />
          <p>Agosto 21 - 2020</p>
        </div>
        <div className="item-2">
          <Room className="icon-card-ofertas-laborales" />
          <p>San Miguel, Santiago, R. Metropolitana</p>
        </div>
        <div className="item-3">
          <p>Salario: $1.000.000</p>
          <Button className="btn-postular-ofertas-laborales">
            <p>Postular</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;

const Modulos = ({ data }) => {
  const [active, setActive] = useState(true);

  return (
    <>
      <div
        className={active ? "modulo-activo-ol" : "modulo-inactivo-ol"}
        onClick={() => setActive(!active)}
      >
        <p>{data}</p>
      </div>
    </>
  );
};

const SubModulos = () => {
  const [submodulos, setSubModulos] = useState(["SM", "PR", "SR", "MN"]);

  return (
    <>
      {submodulos.map((item, index) => (
        <div className={"modulo-activo-ol"}>
          <p>{item}</p>
        </div>
      ))}
    </>
  );
};
