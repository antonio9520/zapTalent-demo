import React, { useState, useRef, useEffect } from "react";
import "./Card.css";
import { useContainerDimensions } from "../../../../hooks/useResize";
import { IconButton } from "@material-ui/core";
import {
  ArrowForward,
  ArrowBack,
  EventAvailable,
  EventBusy,
  AccountCircle,
  QueryBuilder,
  BusinessCenter,
  Flight,
  AccountTree,
  EventSeat,
  Home,
  Description,
  LocationOn,
} from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import { Tooltip } from "../../../../components";
import NumberFormat from "react-number-format";

const Card = ({ data }) => {
  const [activeStep, setActiveStep] = useState(0);

  const componentRef = useRef();
  const { height } = useContainerDimensions(componentRef);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="card-avisos-home-emp">
      <div className="item-top">
        <p>Tus anuncios publicados</p>
      </div>
      <div className="item-center" ref={componentRef}>
        <SwipeableViews
          index={activeStep}
          style={{
            flex: 1,
          }}
        >
          {data.map((item, index) => (
            <Anuncio key={index} data={item} height={height} />
          ))}
        </SwipeableViews>
        {/* <Anuncio /> */}
      </div>
      <div className="item-bottom">
        <IconButton
          disabled={activeStep === 0}
          style={{ marginRight: "10px" }}
          className={
            activeStep === 0
              ? "btn-arrow-perfil-inact-job"
              : "btn-arrow-perfil-job"
          }
          onClick={() => handleBack()}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          disabled={activeStep === data.length - 1}
          className={
            activeStep === data.length - 1
              ? "btn-arrow-perfil-inact-job"
              : "btn-arrow-perfil-job"
          }
          onClick={() => handleNext()}
        >
          <ArrowForward />
        </IconButton>
      </div>
    </div>
  );
};

export default Card;

const Anuncio = ({ data, height }) => {
  const {
    fechaInicio,
    fechaTermino,
    adns,
    fechaContratacion,
    titulo,
    _id,
    profesion,
    area,
    tipoConsultor,
    jornadaLaboral,
    tipoContrato,
    anosExpSap,
    cantidadVacantes, 
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
  const [active, setActive] = useState("");
  const inicio = new Date(fechaInicio);
  const termino = new Date(fechaTermino);
  const submodulos = adns.filter((item) => item.modulo === active);
  const MESES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const [submoduls] = submodulos;

  return (
    <div className="aviso-home-emp" style={{ height: height }}>
      <div className="left-aviso-home-emp">
        <div className="div-1">
          <EventAvailable className="icon-aviso-home-emp" />
          <p>
            {MESES[inicio.getMonth()]}{" "}
            {inicio.toLocaleDateString().substring(0, 2)} -{" "}
            {inicio.getFullYear()}
          </p>
          <EventBusy
            className="icon-aviso-home-emp"
            style={{ marginLeft: "15px" }}
          />
          <p>
            {MESES[termino.getMonth()]}{" "}
            {termino.toLocaleDateString().substring(0, 2)} -{" "}
            {termino.getFullYear()}
          </p>
        </div>
        <div className="cont-p-aviso-home-emp">
          <p className="p1">{nameuser}</p>
          <p className="p2">{titulo}</p>
          <p className="p3">{profesion}</p>
          <div className="div-2">
            <p>{anosExp} Años de experiencia</p>
          </div>
        </div>
        <div className="div-3">
          <div className="item">
            <Tooltip title="Tipo de consultor">
              <div>
                <AccountCircle className="icon-card-ofertas-laborales" />
                <p style={{ color: "#2B7DE6", fontWeight: "600" }}>
                  {tipoConsultor}
                </p>
              </div>
            </Tooltip>

            <Tooltip title="Tipo de Jornada">
              <div>
                <QueryBuilder className="icon-card-ofertas-laborales" />
                <p>{jornadaLaboral}</p>
              </div>
            </Tooltip>
            <Tooltip title="Fecha de contratación">
              <div>
                <BusinessCenter className="icon-card-ofertas-laborales" />
                <p>
                  {fechaContratacion
                    ? fechaContratacion.substring(0, 10)
                    : null}
                </p>
              </div>
            </Tooltip>
            <Tooltip title="Disponibilidad de viajar">
              <div>
                <Flight className="icon-card-ofertas-laborales" />
                {dispViajar ? <p>Si</p> : <p>No</p>}
              </div>
            </Tooltip>
            <Tooltip title="Disponibilidad de viajar">
              <div style={{ position: "relative" }}>
                <LocationOn className="icon-card-ofertas-laborales" />
                <p className="direccion-aviso-emp-home">
                  {ciudad + ", " + region}
                </p>
              </div>
            </Tooltip>
          </div>

          <div className="item">
            <Tooltip title="Experiencia SAP">
              <div>
                <AccountTree className="icon-card-ofertas-laborales" />
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
                <Description className="icon-card-ofertas-laborales" />
                <p>{tipoContrato ? tipoContrato.value : null}</p>
              </div>
            </Tooltip>
            <Tooltip title="Cantidad de Vacantes">
              <div>
                <EventSeat className="icon-card-ofertas-laborales" />
                <p>{cantidadVacantes}</p>
              </div>
            </Tooltip>
            <Tooltip title="Disponibilidad de cambio de residencia">
              <div>
                <Home className="icon-card-ofertas-laborales" />
                {dispResidencia ? <p>Si</p> : <p>No</p>}
              </div>
            </Tooltip>

            <div style={{ opacity: 0 }}>
              <Home className="icon-card-ofertas-laborales" />
              <p>plantilla</p>
            </div>
          </div>
        </div>
      </div>
      <div className="right-aviso-home-emp">
        <div className="item1">
          <p>Módulos y submódulos</p>
        </div>
        <div className="item2">
          <div className="sub-item">
            {adns.map((item, index) => (
              <Modulos
                key={index}
                data={item}
                num={index}
                setActive={setActive}
                active={active}
              />
            ))}
          </div>
          <div className="sub-item">
            {submoduls
              ? submoduls.submodulos.map((item, index) => (
                  <Submodulos data={item} key={index} />
                ))
              : null}
          </div>
        </div>
        <div className="item3">
          <p>{descripcion}</p>
        </div>
        <div className="item4">
          <p>Renta Ofrecida</p>
          <p>
            {renta === 0 ? (
              " A convenir"
            ) : (
              <NumberFormat
                value={renta}
                displayType={"text"}
                thousandSeparator={true}
                prefix={" $"}
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

const Modulos = ({ data, setActive, active, num }) => {
  const [activo, setActivo] = useState(false);
  const [initFix, setInitFix] = useState(true);
  const handleClick = () => {
    setActive(data.modulo);
  };
  useEffect(() => {
    if (initFix === true) {
      if (num === 0) {
        setActive(data.modulo);
      }
      setInitFix(false);
    }

    if (active === data.modulo) {
      setActivo(true);
    } else {
      setActivo(false);
    }
    console.log(active);
  }, [active]);

  return (
    <div
      onClick={handleClick}
      className={activo ? "mod-aviso-home-emp" : "mod-aviso-home-emp-inac"}
    >
      <p>{data.modulo}</p>
    </div>
  );
};

const Submodulos = ({ data }) => {
  return (
    <div className="submod-aviso-home-emp">
      <p>{data.submodulo}</p>
    </div>
  );
};
