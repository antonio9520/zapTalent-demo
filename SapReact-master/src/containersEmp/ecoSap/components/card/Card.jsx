import React, { useState, forwardRef } from "react";
import "./Card.css";
import imguser from "../../../../resources/img/bg-error.webp";
import { IconButton, MobileStepper } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import {
  Visibility,
  GetApp,
  ArrowBackIos,
  ArrowForwardIos,
} from "@material-ui/icons";
import { Tooltip } from "../../../../components";

const Card = ({ data }) => {
  const { nombres, apellidos, imageURL, profesion, anosZap, adns } = data;
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="card-eco-sap-emp">
      <div className="foto-card-eco-sap-emp">
        {imageURL ? (
          <img src={imageURL} alt="userimage" />
        ) : (
          <img src={imguser} alt="userimage" />
        )}
      </div>
      <div
        style={{
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p className="p1">
          {nombres} {apellidos}
        </p>
        <p className="p2">{profesion ? profesion.name : null}</p>
        <div className="anos-exp-eco-sap-card">
          <p>{anosZap} años de experiencia</p>
        </div>
      </div>
      <div>
        <div className="swip-home-emp">
          <div className="top-swip-home-emp">
            <div className="left-swip-home-emp">
              <IconButton
                className="btn-swip-home-emp"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <ArrowBackIos className="icon-swip-home-emp" />
              </IconButton>
            </div>
            <div className="center-swip-home-emp">
              {adns ? (
                adns.length === 0 ? (
                  <div className="no-posee-card-table-home-emp">
                    <p>No posee</p>
                  </div>
                ) : (
                  <Modulos activeStep={activeStep} data={adns} />
                )
              ) : null}
            </div>
            <div className="right-swip-home-emp">
              <IconButton
                className="btn-swip-home-emp"
                onClick={handleNext}
                // disabled={activeStep === Math.ceil(lenghtArray / 3) - 1}
              >
                <ArrowForwardIos className="icon-swip-home-emp" />
              </IconButton>
            </div>
          </div>
          <div className="stepper-user-home-emp">
            <MobileStepperCustom activeStep={activeStep} lenghtArray={2} />
          </div>
        </div>
      </div>
      <div className="bottom-card-eco-sap-emp">
        <IconButton className="btn-eco-sap-emp">
          <Visibility />
        </IconButton>
        <IconButton className="btn-eco-sap-emp">
          <GetApp />
        </IconButton>
      </div>
    </div>
  );
};

export default Card;

const Modulos = ({ data, activeStep }) => {
  const [activo, setActivo] = useState(true);
  let arrayModulos = [];
  const longitudPedazos = 3;

  for (let i = 0; i < data.length; i += longitudPedazos) {
    let trozo = data.slice(i, i + longitudPedazos);
    arrayModulos.push(trozo);
  }

  return (
    <SwipeableViews index={activeStep}>
      {arrayModulos
        ? arrayModulos.map((item, index) => (
            <div key={index} className="swip-cont-home-emp">
              {item.map((item, index) => (
                <Tooltip key={index} title={item.desc}>
                  <div
                    className={
                      activo ? "swip-item-home-emp" : "wip-item-home-emp-inac "
                    }
                  >
                    <p
                      className={
                        item.name.length > 2 ? "name-submod-large" : null
                      }
                    >
                      {item.name}
                    </p>
                  </div>
                </Tooltip>
              ))}
            </div>
          ))
        : null}
    </SwipeableViews>
  );
};

const MobileStepperCustom = forwardRef((props, ref) => {
  const { activeStep, lenghtArray } = props;
  console.log(Math.round(lenghtArray / 3));

  return (
    <MobileStepper
      ref={ref}
      variant="dots"
      steps={Math.ceil(lenghtArray / 3)}
      position="static"
      activeStep={activeStep}
      className="dots-one-adn"
    />
  );
});
