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
import { Tooltip } from "../../../../components";

const CardTable = ({ data, setOpenModal }) => {
  const {
    nombres,
    imageURL,
    apellidos,
    profesion,
    consultor,
    anosZap,
    comuna,
    region,
    phone,
    adns,
  } = data;
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const lenghtArray = adns.length;
  const nombreuser = nombres.split(" ");
  const apellidosuser = apellidos.split(" ");
  const nombrecompleto =
    nombreuser[0] + " " + apellidosuser[0] + " " + apellidosuser[1];

  const verUsuario = () => {
    setOpenModal(true);
  };
  return (
    <Tooltip title="Ver postulante">
      <div className="card-table-home-emp" onClick={verUsuario}>
        <div className="item-1">
          <div className="cont-imagen">
            <img src={imageURL ? imageURL : null} alt="userimage" />
          </div>
        </div>
        <div className="item-2">
          <p className="p1">{nombrecompleto}</p>
          <p className="p2">{profesion ? profesion.name : null}</p>
          <div className="tipo-cons-home-post-emp">
            <p>Consultor {consultor}</p>
          </div>
        </div>
        <div className="item-4">
          <div>
            <AccountTree className="icon-user-home-emp" /> <p>{anosZap} Años</p>
          </div>
          <div>
            <LocationOn className="icon-user-home-emp" />
            <p>
              {comuna}, {region}
            </p>
          </div>
          <div>
            <PhoneIphone className="icon-user-home-emp" /> <p>{phone}</p>
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
    </Tooltip>
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
                <Tooltip title={item.desc}>
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