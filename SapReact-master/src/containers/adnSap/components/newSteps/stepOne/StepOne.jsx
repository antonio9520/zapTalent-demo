import React, { forwardRef, useState, useEffect } from "react";
import "./styles.css";
import { Button, Tooltip } from "../../../../../components";
import { IconButton, makeStyles, MobileStepper } from "@material-ui/core";
import { Close, ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { useSelector } from "react-redux";
import Modulos from "./modulos/Modulos";
import Form from "./form/Form";
import { modulos } from "../../../../../assets/modulos";

const useStyles = makeStyles({
  iconButton: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "#F0F0F0",
  },
  arrowBtns: {
    backgroundColor: "#F0F0F0",
  },
});

const StepOne = forwardRef((props, ref) => {
  const { setStep, closeModal } = props;
  const classes = useStyles();
  const adns = useSelector((state) => state.adn.adns);

  const [activeStep, setActiveStep] = useState(0);
  const [dataModulo, setDataModulo] = useState([]);

  let modulosFiltrados = modulos;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validacion = () => {
    setStep("two");
  };

  const setearModulos = () => {
    adns.map((item) => {
      modulosFiltrados = modulosFiltrados.filter((i) => i.modulo !== item.name);
    });
  };
  setearModulos();
  return (
    <div ref={ref} className="step-one-new-modal-adn">
      <IconButton
        size="small"
        className={classes.iconButton}
        onClick={closeModal}
      >
        <Close fontSize="small" />
      </IconButton>
      <div className="top">
        <p className="p1">Selecciona el módulo en el que destacas</p>
        <p className="p2">¿En qué eres consultor(a)?</p>
      </div>
      <div className="stepper-one-adn">
        <div className="step-one-top-adn">
          <div className="btn-left-adn">
            <Tooltip title="Anterior" placement="top">
              <IconButton
                onClick={handleBack}
                disabled={activeStep === 0}
                size="small"
                className={classes.arrowBtns}
              >
                <ArrowBackIos fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="content-center-adn">
            <Modulos
              activeStep={activeStep}
              modulos={modulosFiltrados}
              setDataModulo={setDataModulo}
              dataModulo={dataModulo}
            />
          </div>
          <div className="btn-right-adn">
            <Tooltip title="Siguiente" placement="top">
              <IconButton
                onClick={handleNext}
                size="small"
                className={classes.arrowBtns}
                disabled={activeStep === Math.ceil(modulos.length / 3) - 1}
              >
                <ArrowForwardIos fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="cont-mobile-adn">
          <MobileStepper
            variant="dots"
            steps={Math.ceil(modulos.length / 3)}
            position="static"
            activeStep={activeStep}
            className="dots-one-adn"
          />
        </div>
      </div>
      <div className="center" id="step-one-new-modal-adn-center">
        {dataModulo[0] ? (
          dataModulo.map((item, index) => (
            <Form
              key={index}
              setDataModulo={setDataModulo}
              dataModulo={dataModulo}
              data={item}
            />
          ))
        ) : (
          <div className="list-empty-modulos">
            <p>No haz seleccionado ningun módulo</p>
          </div>
        )}
      </div>
      <div className="btns-steps-new-adn">
        <Button variant="contained" color="primary" onClick={closeModal}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={validacion}>
          Guardar y seguir
        </Button>
      </div>
    </div>
  );
});

export default StepOne;
