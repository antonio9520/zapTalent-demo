import React, { useState, useEffect } from "react";
import "./CardJob.css";
import SwipeableViews from "react-swipeable-views";
import {
  ArrowForward,
  ArrowBack,
  BusinessCenter,
  Person,
  Email,
  PhoneAndroid,
  AccountCircle,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { Tooltip } from "../../../../components";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

const CardJob = ({ data }) => {
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
    <div className="cont-job-perfil">
      <SwipeableViews index={activeStep}>
        {datasort.map((item, index) => (
          <Trabajo key={index} data={item} />
        ))}
      </SwipeableViews>
      <div className="cont-arrow-btns-perfil">
        <IconButton
          disabled={activeStep === 0}
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

export default CardJob;

const Trabajo = ({ data }) => {
  const [_switch, setSwitch] = useState(false);
  let ano = new Date().getFullYear();
  let fechaTermino = data.findate.substring(0, 4);

  useEffect(() => {
    if (fechaTermino > ano.toString()) {
      setSwitch(true);
    }
  }, []);
  return (
    <div className="cont-card-job-perfil">
      {/* <div className="cont-img-card-job-b">
        <img src={icontrabajo} alt="icon-trabajo" />
      </div> */}
      <div className="sub-right-job-b-perfil">
        <p className="p-mis-trabajos-perfil">Mis trabajos</p>

        <p className="p2-job-b-perfil">{data.nomempresa}</p>

        <p className="p3-job-b-perfil">{data.cargo}</p>
        <p className="p4-job-b-perfil">{data.actempresa}</p>
        <div className="sub-right-job-b2-perfil">
          <div className="sub-right-job-b1-perfil">
            <BusinessCenter className="icon-suitcase" />
            <Tooltip title={data.areapuesto}>
              {data.areapuesto.length > 15 ? (
                <p className="short-text-job-perfil">
                  {data.areapuesto.substring(0, 20)}...
                </p>
              ) : (
                <p className="short-text-job-perfil">{data.areapuesto}</p>
              )}
            </Tooltip>
          </div>
          <div className="sub-right-job-b1-2-perfil">
            <BusinessCenter className="icon-suitcase" />
            <Tooltip title={data.subarea}>
              {data.subarea.length > 15 ? (
                <p className="short-text-job-perfil">
                  {data.subarea.substring(0, 20)}...
                </p>
              ) : (
                <p className="short-text-job-perfil">{data.subarea}</p>
              )}
            </Tooltip>
          </div>
        </div>
        <p className="p1-job-b-perfil">
          {data.inidate.substring(0, 4)} -{" "}
          {_switch ? "Actualidad" : data.findate.substring(0, 4)}, {data.pais}
        </p>
      </div>
      <div className="sub-right-job-b-2-perfil">
        <div className="cont-pc-pa">
          {data.personacargo ? (
            <div className="item-2-job-b-perfil">
              <p className="p6-job-b">Personas a Cargo</p>
              <div>
                <p className="p7-job-b">
                  <NumberFormat
                    value={data.personacargo}
                    displayType={"text"}
                    thousandSeparator={true}
                    // prefix={"$"}
                  />
                </p>
              </div>
            </div>
          ) : null}
        </div>
        {data.manejopresupuesto ? (
          <div className="item-2-job-b-perfil">
            <p className="p6-job-b">Manejo de presupuesto Anual</p>
            <div>
              <p className="p7-job-b">
                <NumberFormat
                  value={data.manejopresupuesto}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </p>
            </div>
          </div>
        ) : null}
        {data.reflogros ? (
          <div className="item-1-job-b-perfil ">
            <p className="p6-job-b-perfil">Logros</p>
            <div>
              <textarea readOnly defaultValue={data.reflogros}></textarea>
            </div>
          </div>
        ) : null}
        {data.expzap ? (
          <div className="item-1-job-b-perfil ">
            <p className="p6-job-b-perfil">Experiencia ZAP</p>
            <div>
              <textarea readOnly defaultValue={data.expzap}></textarea>
            </div>
          </div>
        ) : null}
        {data.refnombre || data.email || data.refphone || data.refrelacion ? (
          <div className="item-1-job-b-2-perfil">
            <p className="p6-job-b">Referencia</p>
            {data.refnombre ? (
              <div>
                <Person className="icon-ref-card-job" />
                <p className="p8-job-b"> {data.refnombre}</p>
              </div>
            ) : null}
            {data.email ? (
              <div>
                <Email className="icon-ref-card-job" />
                <p className="p8-job-b">{data.email}</p>
              </div>
            ) : null}
            {data.refphone ? (
              <div>
                <PhoneAndroid className="icon-ref-card-job" />
                <p className="p8-job-b">{data.refphone}</p>
              </div>
            ) : null}
            {data.refrelacion ? (
              <div>
                <AccountCircle className="icon-ref-card-job" />
                <p className="p8-job-b">{data.refrelacion}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
