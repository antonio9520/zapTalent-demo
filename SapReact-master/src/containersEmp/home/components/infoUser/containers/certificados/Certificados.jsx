import React, { useState } from "react";
import "./Certificados.css";
import SwipeableViews from "react-swipeable-views";
import { IconButton } from "@material-ui/core";
import { GetApp, ArrowForward, ArrowBack } from "@material-ui/icons";

const Certificados = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const data = ["", "", "", "", ""];
  return (
    <div className="cont-certificados-home-emp">
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
        <IconButton className="btn-info-user-emp">
          <GetApp />
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

export default Certificados;

const Card = () => {
  return (
    <div className="card-info-certificados-home-emp">
      <div className="header-cert-home-emp">
        <p className="p1">DDBB</p>
        <div>
          <p>Certificado</p>
        </div>
      </div>
      <p className="p2">Instituto</p>
      <p className="p3">Marzo, 2020</p>
      <p className="p4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at
        vehicula odio. Praesent at venenatis metus. Sed sed tristique eros, sed
        fringilla nibh. Nam ut commodo nibh. Nam egestas eget dui quis mattis.
        Quisque gravida ipsum nec vulputate vulputate. Maecenas vestibulum
        ultricies libero, a facilisis est porta nec.
      </p>
    </div>
  );
};
