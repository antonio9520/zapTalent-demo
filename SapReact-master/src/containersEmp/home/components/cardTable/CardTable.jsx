import React, { useState, forwardRef } from "react";
import "./CardTable.css";
import imagen from "../../../../resources/images/brand/SAPTalent-card-habilities-woman-new.png";
import { MobileStepper, IconButton } from "@material-ui/core";
import {
  ArrowBackIos,
  ArrowForwardIos,
  AccountTree,
  LocationOn,
  Mail,
  PhoneIphone,
} from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";

const CardTable = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const adns = [
    {
      modulo: "FI",
      desc: "descripcion",
      submodulos: [
        { submodulo: "CA", desc: "Descripcion" },
        { submodulo: "LO", desc: "Descripcion" },
        { submodulo: "JY", desc: "Descripcion" },
      ],
    },
    {
      modulo: "CO",
      desc: "descripcion",
      submodulos: [{ submodulo: "CA", desc: "Descripcion" }],
    },
    {
      modulo: "FI",
      desc: "descripcion",
      submodulos: [
        { submodulo: "CA", desc: "Descripcion" },
        { submodulo: "LO", desc: "Descripcion" },
        { submodulo: "JY", desc: "Descripcion" },
        { submodulo: "CA", desc: "Descripcion" },
        { submodulo: "LO", desc: "Descripcion" },
        { submodulo: "JY", desc: "Descripcion" },
      ],
    },
    {
      modulo: "FI",
      desc: "descripcion",
      submodulos: [
        { submodulo: "CA", desc: "Descripcion" },
        { submodulo: "LO", desc: "Descripcion" },
        { submodulo: "JY", desc: "Descripcion" },
      ],
    },
  ];
  const lenghtArray = adns.length;

  console.log(adns.length);
  return (
    <div className="card-table-home-emp">
      <div className="item-1">
        <div className="cont-imagen">
          <img src={imagen} alt="userimage" />
        </div>
      </div>
      <div className="item-2">
        <p className="p1">Abraham Vidal Carrasco.</p>
        <p className="p2">Ingeniero en informatica</p>
        <div className="tipo-cons-home-post-emp">
          <p>Consultor Semi Senior</p>
        </div>
      </div>
      <div className="item-4">
        <div>
          <AccountTree className="icon-user-home-emp" /> <p>5 Años</p>
        </div>
        <div>
          <LocationOn className="icon-user-home-emp" /> <p>Coronel, Bio Bio</p>
        </div>
        <div>
          <PhoneIphone className="icon-user-home-emp" /> <p>+(569) 5670 7412</p>
        </div>
      </div>
      <div className="item-3">
        <p className="p1">Modulos</p>
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
              <Modulos activeStep={activeStep} data={adns} />
            </div>
            <div className="right-swip-home-emp">
              <IconButton
                className="btn-swip-home-emp"
                onClick={handleNext}
                disabled={activeStep === Math.ceil(lenghtArray / 3) - 1}
              >
                <ArrowForwardIos className="icon-swip-home-emp" />
              </IconButton>
            </div>
          </div>
          <div className="stepper-user-home-emp">
            <MobileStepperCustom
              activeStep={activeStep}
              lenghtArray={lenghtArray}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTable;

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
                <div
                  className={
                    activo ? "swip-item-home-emp" : "wip-item-home-emp-inac "
                  }
                >
                  <p>{item.modulo}</p>
                </div>
              ))}
            </div>
          ))
        : null}
    </SwipeableViews>
  );
};

const Submodulos = ({ activeStep }) => {
  const data = [];
  return <p>iusa</p>;
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
