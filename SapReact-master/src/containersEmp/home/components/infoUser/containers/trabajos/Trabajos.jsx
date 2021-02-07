import React, { useState } from "react";
import "./Trabajos.css";
import SwipeableViews from "react-swipeable-views";
import { IconButton } from "@material-ui/core";
import {
  ArrowForward,
  ArrowBack,
  BusinessCenterOutlined,
  Mail,
  PhoneAndroid,
} from "@material-ui/icons";

const Trabajos = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const data = ["", "", "", "", ""];
  return (
    <div className="cont-trabajos-home-emp">
      <div className="top-b">
        <SwipeableViews index={activeStep}>
          {data.map((item, index) => (
            <Card key={index} data={item} />
          ))}
        </SwipeableViews>
      </div>
      <div className="bottom-b">
        <IconButton
          className="btn-info-user-emp"
          onClick={handleBack}
          disabled={activeStep === 0 ? true : false}
          style={{ opacity: activeStep === 0 ? "0.7" : null }}
        >
          <ArrowBack />
        </IconButton>

        <IconButton
          className="btn-info-user-emp"
          onClick={handleNext}
          disabled={activeStep === data.length - 1 ? true : false}
          style={{ opacity: activeStep === data.length - 1 ? "0.7" : null }}
        >
          <ArrowForward />
        </IconButton>
      </div>
    </div>
  );
};

export default Trabajos;

const Card = () => {
  return (
    <div className="card-info-trabajos-home-emp">
      <div className="left-b">
        <p className="p1">2006 - 2010</p>
        <p className="p2">SCL Consultores</p>
        <p className="p3">Ingeniero en informatica</p>
        <p className="p5">Consultoria en SAP y desarrollo</p>

        <div className="datos-icon-left">
          <BusinessCenterOutlined className="icon-card-trab-home-emp" />
          <p>Departamento de desarrollo</p>
        </div>
        <div className="datos-icon-right">
          <BusinessCenterOutlined className="icon-card-trab-home-emp" />
          <p>Programacion</p>
        </div>

        <p className="p6">Referencia</p>
        <div className="cont-datos-ref">
          <Mail className="icon-card-trab-home-emp" />
          <p>Antonio.vidal95@hotmail.com</p>
        </div>
        <div className="cont-datos-ref">
          <PhoneAndroid className="icon-card-trab-home-emp" />
          <p>+(569) 5670 7412</p>
        </div>
      </div>
      <div className="right-b">
        <div>
          <p className="p1">Personas a Cargo</p>
          <p className="p4">10</p>
        </div>
        <div>
          <p className="p2">Manejo de presupuesto Anual</p>
          <p className="p5">$ 50,000,000</p>
        </div>
        <div>
          <p className="p3">Logros</p>
          <p className="p6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at
            vehicula odio. Praesent at venenatis metus. Sed sed tristique eros,
            sed fringilla nibh. Nam ut commodo nibh.
           
          </p>
        </div>
      </div>
    </div>
  );
};
