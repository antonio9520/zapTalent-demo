import React, { useState } from "react";
import "./Estudios.css";
import SwipeableViews from "react-swipeable-views";
import { IconButton } from "@material-ui/core";
import { GetApp, ArrowForward, ArrowBack } from "@material-ui/icons";

const Estudios = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const data = ["", "", "", "", ""];
  return (
    <div className="cont-estudios-home-emp">
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

export default Estudios;

const Card = () => {
  return (
    <div className="card-info-estudios-home-emp">
      <p className="p1">Universitario</p>
      <p className="p2">Ingeniero en informatica</p>
      <p className="p3">Universidad san sebastian</p>
      <p className="p4">Bioquimica</p>
      <p className="p5">2006 - 2010</p>
      <div className="cont-etiquetas">
        <div className="etiqueta-1">
          <p>Egresado</p>
        </div>
        <div className="etiqueta-2">
          <p>Certificado</p>
        </div>
      </div>

      <div className="cont-desc">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at
          vehicula odio. Praesent at venenatis metus. Sed sed tristique eros,
          sed fringilla nibh. Nam ut commodo nibh. Nam egestas eget dui quis
          mattis. Quisque gravida ipsum nec vulputate vulputate. Maecenas
        </p>
      </div>
      <div className="promedio-emp-home-est">
        <p>6.5</p>
        <p>Promedio</p>
      </div>
    </div>
  );
};
