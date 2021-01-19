import React, { useState, useEffect } from "react";
import "./StepOne.css";
import {
  ListItem,
  MobileStepper,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos, Close } from "@material-ui/icons";
import { modulos } from "../../../../../assets/modulos";
import Modulos from "./modulos/Modulos";
import Form from "./form/Form";
import { Alert } from "@material-ui/lab";

const StepOne = (props) => {
  const { arrayModules, setArrayModules, setStep, closeModal, adns } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [errorOne, setErrorOne] = useState([]);
  const [switch2, setSwitch2] = useState(false);
  const [_alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");
  console.log(modulos);
  let modulosFiltrados = modulos;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validation = () => {
    if (arrayModules.length === 0) {
      setMsg("Debes seleccionar al menos un modulo");
      setAlert(true);
      return;
    }
    setSwitch2(!switch2);
    setStep("two");
  };

  const handleClose = () => {
    setAlert(false);
  };

  const funcion = () => {
    console.log("in");
    adns.map((item) => {
      modulosFiltrados = modulosFiltrados.filter((i) => i.modulo !== item.name);
    });
  };
  funcion();

  console.log(modulosFiltrados);
  return (
    <div className="cont-one-adn">
      <div className="sub-cont-one-adn">
        <p className="p1-one-adn">Selecciona el módulo en el que destacas</p>
        <p className="p2-one-adn">¿En qué eres consultor(a)?</p>
        <div className="stepper-one-adn">
          <div className="step-one-top-adn">
            <div className="btn-left-adn">
              <IconButton onClick={handleBack} disabled={activeStep === 0}>
                <ArrowBackIos />
              </IconButton>
            </div>
            <div className="content-center-adn">
              <Modulos
                activeStep={activeStep}
                modulos={modulosFiltrados}
                setArrayModules={setArrayModules}
                arrayModules={arrayModules}
              />
            </div>
            <div className="btn-right-adn">
              <IconButton
                onClick={handleNext}
                disabled={activeStep === modulos.length / 3 - 1}
              >
                <ArrowForwardIos />
              </IconButton>
            </div>
          </div>
          <div className="cont-mobile-adn">
            <MobileStepper
              variant="dots"
              steps={modulos.length / 3}
              position="static"
              activeStep={activeStep}
              className="dots-one-adn"
            />
          </div>
        </div>
        <div className="inputs-one-adn">
          {arrayModules.length > 0
            ? arrayModules.map((item, index) => (
                <Form
                  key={index}
                  item={item}
                  arrayModules={arrayModules}
                  setArrayModules={setArrayModules}
                  errorOne={errorOne}
                  switch2={switch2}
                  setErrorOne={setErrorOne}
                />
              ))
            : null}
        </div>

        <div className="cont-btn-adn-one">
          <ListItem button className="btn-adnzap-modal" onClick={closeModal}>
            <p style={{ color: "white" }}>Cancelar</p>
          </ListItem>
          <ListItem
            button
            className="btn-adnzap-modal"
            onClick={() => validation()}
          >
            <p style={{ color: "white" }}>Guardar y seguir</p>
          </ListItem>
        </div>
        <Snackbar open={_alert} onClose={handleClose} autoHideDuration={6000}>
          <Alert severity="error">{msg}</Alert>
        </Snackbar>
      </div>
      <div className="cont-iconbtn-close-adn">
        <IconButton onClick={closeModal}>
          <Close />
        </IconButton>
      </div>
    </div>
  );
};

export default StepOne;
