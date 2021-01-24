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

const Card = ({ data }) => {
  const {
    fechaInicio,
    fechaTermino,
    adns,
    fechaContratacion,
    idusuario,
    titulo,
    _id,
    profesion,
    area,
    tipoConsultor,
    jornadaLaboral,
    tipoContrato,
    anosExpSap,
    cantidadVacantes,
    pais,
    region,
    ciudad,
    dispResidencia,
    dispViajar,
    renta,
    beneficios,
    descripcion,
    estado,
    anosExp,
    nameuser,
  } = data;
  // console.log(data);
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
          <h1 className={titulo.length > 22 ? "name-submod-large" : null}>
            {titulo}
          </h1>
          <p>{profesion}</p>
          <p>{nameuser}</p>
          <div>
            {anosExp ? (
              <p>{anosExp} años de experiencia</p>
            ) : (
              <p>Sin experiencia laboral</p>
            )}
          </div>
        </div>
        <div className="item-3">
          <Tooltip title="Tipo de consultor">
            <div>
              <BusinessCenter className="icon-card-ofertas-laborales" />
              <p style={{ color: "#2B7DE6", fontWeight: "600" }}>
                {tipoConsultor}
              </p>
            </div>
          </Tooltip>

          <Tooltip title="Tipo de Jornada">
            <div>
              <BusinessCenter className="icon-card-ofertas-laborales" />
              <p>{jornadaLaboral}</p>
            </div>
          </Tooltip>
          <Tooltip title="Fecha de contratación">
            <div>
              <BusinessCenter className="icon-card-ofertas-laborales" />
              <p>{fechaContratacion.substring(0, 10)}</p>
            </div>
          </Tooltip>
          <Tooltip title="Disponibilidad de viajar">
            <div>
              <Flight className="icon-card-ofertas-laborales" />
              {dispViajar ? <p>Si</p> : <p>No</p>}
            </div>
          </Tooltip>
        </div>

        <div className="item-4">
          <Tooltip title="Experiencia SAP">
            <div>
              <BusinessCenter className="icon-card-ofertas-laborales" />
              {anosExpSap ? (
                <p style={{ color: "#2B7DE6", fontWeight: "600" }}>
                  {anosExpSap} Años
                </p>
              ) : (
                <p style={{ color: "#2B7DE6", fontWeight: "600" }}>
                  Sin Experiencia
                </p>
              )}
            </div>
          </Tooltip>
          <Tooltip title="Tipo de contrato">
            <div>
              <BusinessCenter className="icon-card-ofertas-laborales" />
              <p>{tipoContrato.value}</p>
            </div>
          </Tooltip>
          <Tooltip title="Cantidad de Vacantes">
            <div>
              <BusinessCenter className="icon-card-ofertas-laborales" />
              <p>{cantidadVacantes}</p>
            </div>
          </Tooltip>
          <Tooltip title="Disponibilidad de cambio de residencia">
            <div>
              <Home className="icon-card-ofertas-laborales" />
              {dispResidencia ? <p>Si</p> : <p>No</p>}
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
            <p>{descripcion}</p>
          </div>
        </div>
      </div>
      <div className="bottom-card-ofertas-laborales">
        <div className="item-1">
          <EventAvailable className="icon-card-ofertas-laborales" />
          <p>{fechaInicio.substring(0, 10)}</p>
          <EventBusy className="icon-card-ofertas-laborales" />
          <p>{fechaTermino.substring(0, 10)}</p>
        </div>
        <div className="item-2">
          <Room className="icon-card-ofertas-laborales" />
          <p>
            {ciudad}, {region}
          </p>
        </div>
        <div className="item-3">
          <p>Salario: ${renta}</p>
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
