import React, { useState } from "react";
import "./Card.css";
import {
  ArrowForward,
  ArrowBack,
  BusinessCenter,
  Person,
  Email,
  PhoneAndroid,
  AccountCircle,
  Business,
  Visibility,
  Edit,
  CloudUpload,
} from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import { IconButton } from "@material-ui/core";
import { Tooltip } from "../../../../components";

const Card = ({ data }) => {
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

  return (
    <div className="card-job-new-perfil">
      <div className="cont-swipeables-new-perfil">
        <div className="header-card-job-new-perfil">
          <Business className="header-icon-cert-new-perfil" />
          <p className="p-mis-cert-perfil">Mis Certificados</p>
          <Tooltip title="Editar">
            <IconButton className="btn-edit-new-perfil-job">
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
        {/* <div className="sub-swipeables-new-perfil"> */}
        <SwipeableViews index={activeStep}>
          {datasort.map((item, index) => (
            <Certificado key={index} data={item} />
          ))}
        </SwipeableViews>
        {/* </div> */}
        <div className="overlay-view-more"></div>
      </div>
      <div className="cont-arrow-btns-new-perfil">
        <IconButton className={"btn-arrow-perfil-job"}>
          <CloudUpload />
        </IconButton>
        <div>
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
    </div>
  );
};

export default Card;

const Certificado = ({ data }) => {
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
  const f = new Date(data.fecha);

  return (
    <div className="sub-swipeables-new-perfil">
      <div className="cont-card-job-perfil">
        <p className="p2-cert-b-perfil">{data.certificacion}</p>
        <p className="p3-job-b-perfil">{data.universidad}</p>
        <p className="p4-cert-perfil-new-perfil">
          {data
            ? MESES[f.getMonth()] + ", " + data.fecha.substring(0, 4)
            : null}
        </p>
        <div className="estado-cert-perfil-new">
          <p>{data.estado}</p>
        </div>
        <div>
          <p className="p-obs-cert-perfil-new">{data.obs}</p>
        </div>
        {/* <p className="p-obs-cert-perfil-new">{data.obs}</p> */}
      </div>
    </div>
  );
};
