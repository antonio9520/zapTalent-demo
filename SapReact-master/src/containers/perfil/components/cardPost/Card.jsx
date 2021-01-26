import React, { useState, useEffect } from "react";
import "./Card.css";
import {
  ArrowForward,
  ArrowBack,
  BusinessCenter,
  Visibility,
  EventBusy,
  EventAvailable,
  Flight,
  Home,
  AccountCircle,
  QueryBuilder,
  EventSeat,
  Description,
  AccountTree,
} from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import { IconButton } from "@material-ui/core";
import { Tooltip } from "../../../../components";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

const Card = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const datasort = data.sort(function (a, b) {
    a = new Date(a.findate);
    b = new Date(b.findate);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="card-adn-new-perfil">
        <div className="cont-swipeables-new-perfil">
          <div className="header-card-job-new-perfil">
            <BusinessCenter className="header-icon-adn-new-perfil" />
            <p className="p-mi-adn-perfil">Tus Postulaciones</p>

            <Link to="/ofertas-laborales">
              <Tooltip title="Ver" placement="top">
                <IconButton className="btn-view-new-perfil-post">
                  <Visibility fontSize="small" />
                </IconButton>
              </Tooltip>
            </Link>
          </div>
          {/* <div className="sub-swipeables-new-perfil"> */}
          <SwipeableViews index={activeStep}>
            {datasort.map((item, index) => (
              <Postulacion key={index} data={item} />
            ))}
          </SwipeableViews>
          {/* </div> */}
          {/* <div className="overlay-view-more-adn"></div> */}
        </div>
        <div className="cont-arrow-btns-new-perfil">
          <div></div>
          <div>
            <IconButton
              disabled={activeStep === 0}
              style={{ marginRight: "10px" }}
              className={
                activeStep === 0
                  ? "btn-arrow-perfil-inact-adn"
                  : "btn-arrow-perfil-adn"
              }
              onClick={() => handleBack()}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              disabled={activeStep === data.length - 1}
              className={
                activeStep === data.length - 1
                  ? "btn-arrow-perfil-inact-adn"
                  : "btn-arrow-perfil-adn"
              }
              onClick={() => handleNext()}
            >
              <ArrowForward />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

const Postulacion = ({ data }) => {
  const [_switch, setSwitch] = useState(false);

  const [modulos, setModulos] = useState(["MM", "FI"]);
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
  return (
    <div className="sub-swipeables-new-perfil">
      <p className="p2-post-b-perfil">{titulo}</p>
      <p className="p3-post-b-perfil">{profesion}</p>
      <div className="dates-card-post">
        <EventAvailable className="icon-card-post-new-perfil" />
        <p>{fechaInicio.substring(0, 10)}</p>
        <EventBusy className="icon-card-post-new-perfil" />
        <p>{fechaTermino.substring(0, 10)}</p>
      </div>
      <p className="p1-post-new-perfil">{ciudad + ", " + region}</p>
      <p className="p2-post-new-perfil">{descripcion}</p>
      <div className="cont-datos-card-post">
        <div className="item-3">
          <Tooltip title="Tipo de consultor">
            <div>
              <AccountCircle className="icon-card-post-new-perfil" />
              <p style={{ fontWeight: "600" }}>{tipoConsultor}</p>
            </div>
          </Tooltip>

          <Tooltip title="Tipo de Jornada">
            <div>
              <QueryBuilder className="icon-card-post-new-perfil" />
              <p>{jornadaLaboral}</p>
            </div>
          </Tooltip>
          <Tooltip title="Fecha de contratación">
            <div>
              <BusinessCenter className="icon-card-post-new-perfil" />
              <p>{fechaContratacion.substring(0, 10)}</p>
            </div>
          </Tooltip>
          <Tooltip title="Disponibilidad de viajar">
            <div>
              <Flight className="icon-card-post-new-perfil" />
              {dispViajar ? <p>Si</p> : <p>No</p>}
            </div>
          </Tooltip>
        </div>

        <div className="item-4">
          <Tooltip title="Experiencia SAP">
            <div>
              <AccountTree className="icon-card-post-new-perfil" />
              {anosExpSap ? (
                <p style={{ fontWeight: "600" }}>{anosExpSap} Años</p>
              ) : (
                <p style={{ fontWeight: "600" }}>Sin Experiencia</p>
              )}
            </div>
          </Tooltip>
          <Tooltip title="Tipo de contrato">
            <div>
              <Description className="icon-card-post-new-perfil" />
              <p>{tipoContrato.value}</p>
            </div>
          </Tooltip>
          <Tooltip title="Cantidad de Vacantes">
            <div>
              <EventSeat className="icon-card-post-new-perfil" />
              <p>{cantidadVacantes}</p>
            </div>
          </Tooltip>
          <Tooltip title="Disponibilidad de cambio de residencia">
            <div>
              <Home className="icon-card-post-new-perfil" />
              {dispResidencia ? <p>Si</p> : <p>No</p>}
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="item-5">
        <p className="p4-post-b-perfil">Módulos y submodulos</p>
        <div className="modulos-card-ofertas-laborales">
          {modulos.map((item, index) => (
            <Modulos key={index} data={item} />
          ))}
        </div>
        <div className="submodulos-card-ofertas-laborales">
          <SubModulos />
        </div>
      </div>
      <p className="p4-post-b-perfil">Salario</p>
      <p className="p5-post-b-perfil">
        ${" "}
        <NumberFormat
          value={renta}
          displayType={"text"}
          thousandSeparator={true}
          // prefix={"$"}
        />
      </p>
    </div>
  );
};

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
        <div key={index} className={"modulo-activo-ol"}>
          <p>{item}</p>
        </div>
      ))}
    </>
  );
};
