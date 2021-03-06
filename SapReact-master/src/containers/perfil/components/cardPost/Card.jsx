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
import { Link, useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";

const Card = ({ data }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  console.log(data);
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

  const irAPostulaciones = () => {
    history.push(`/postulaciones/1`);
  };

  return (
    <>
      <div className="card-adn-new-perfil">
        <div className="cont-swipeables-new-perfil">
          <div className="header-card-job-new-perfil">
            <BusinessCenter className="header-icon-adn-new-perfil" />
            <p className="p-mi-adn-perfil">Tus Postulaciones</p>

            <Tooltip title="Ver" placement="top">
              <IconButton
                className="btn-view-new-perfil-post"
                onClick={irAPostulaciones}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
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
  const [active, setActive] = useState(0);
  const [modulos, setModulos] = useState(["MM", "FI"]);
  const [submodulos, setSubModulos] = useState(["SM", "PR", "SR", "MN"]);
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
    eliminado,
    idaviso,
  } = data;
  return (
    <>
      {eliminado ? (
        <div className="aviso-eliminado-card-perfil">
          <p>Aviso eliminado</p>
          <p>{titulo}</p>
          <p>
            <span style={{ textTransform: "uppercase" }}>
              #{idaviso.slice(18)}
            </span>
          </p>
        </div>
      ) : (
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
            <div
              className="modulos-card-ofertas-laborales"
              style={{ marginBottom: "10px" }}
            >
              {adns.map((item, index) => (
                <Modulos
                  key={index}
                  data={item}
                  setActive={setActive}
                  num={index}
                  active={active}
                />
              ))}
            </div>
            <div
              className="submodulos-card-ofertas-laborales"
              style={{ maxHeight: "50px" }}
            >
              {adns
                ? adns[active].submodulos.map((item, index) => (
                    <SubModulos key={index} data={item} />
                  ))
                : null}
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
      )}
    </>
  );
};

const Modulos = ({ data, num, setActive, active }) => {
  const [activeM, setActiveM] = useState(false);

  const handleClick = () => {
    setActiveM(!activeM);
    setActive(num);
  };
  useEffect(() => {
    if (num === active) {
      setActiveM(true);
    } else {
      setActiveM(false);
    }
  }, [active]);
  return (
    <>
      <div
        className={activeM ? "modulo-activo-ol" : "modulo-inactivo-ol"}
        onClick={handleClick}
      >
        <p className={data.modulo.length > 6 ? "name-submod-large" : null}>
          {data.modulo}
        </p>
      </div>
    </>
  );
};

const SubModulos = ({ data }) => {
  return (
    <>
      <div className={"modulo-activo-ol"} style={{ marginTop: "5px" }}>
        <p className={data.submodulo.length > 6 ? "name-submod-large" : null}>
          {data.submodulo}
        </p>
      </div>
    </>
  );
};
