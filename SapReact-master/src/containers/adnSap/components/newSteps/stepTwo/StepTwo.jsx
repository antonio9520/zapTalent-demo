import React, { forwardRef, useState, useEffect } from "react";
import "./StepTwo.css";
import { Button, Tooltip } from "../../../../../components";
import {
  IconButton,
  makeStyles,
  LinearProgress,
  Snackbar,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Submodulos from "./submodulos/Submodulos";
import { Alert } from "@material-ui/lab";

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

const StepTwo = forwardRef(
  ({ setStep, closeModal, dataModulo, setDataModulo }, ref) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(dataModulo[0].name);
    const [errorTwo, setErrorTwo] = useState([]);
    const [switch2, setSwitch2] = useState(false);
    const [_alert, setAlert] = useState(false);

    const validacion = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        dataModulo.map((item) => {
          if (item.submodulos.length === 0) {
            errorTwo.push(item.name);
          }
        });
        setSwitch2(!switch2);
        nextStep();
      }, 1000);
    };
    const nextStep = () => {
      if (errorTwo.length > 0) {
        setAlert(true);
      } else {
        setStep("three");
      }
    };
    const handleClose = () => {
      setAlert(false);
    };
    return (
      <div ref={ref} className="step-two-new-modal-adn">
        <Tooltip title="Cerrar" placement="top">
          <IconButton
            size="small"
            className={classes.iconButton}
            onClick={closeModal}
          >
            <Close fontSize="small" />
          </IconButton>
        </Tooltip>
        <div className="top">
          {dataModulo.map((item, index) => (
            <Modulos
              key={index}
              data={item}
              active={active}
              setActive={setActive}
              errorTwo={errorTwo}
              switch2={switch2}
            />
          ))}
        </div>
        <p className="p1">Selecciona los Sub módulos de tu dominio</p>
        <div className="bottom">
          <Submodulos
            dataModulo={dataModulo}
            active={active}
            setDataModulo={setDataModulo}
            setErrorTwo={setErrorTwo}
            setSwitch2={setSwitch2}
          />
        </div>
        <div className="btns-steps-new-adn">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep("one")}
          >
            Atras
          </Button>
          <Button variant="contained" color="primary" onClick={validacion}>
            Guardar y seguir
          </Button>
        </div>
        {loading ? (
          <>
            <div className="overlay-loading"></div>
            <div className="linear-progres-global-adn">
              <LinearProgress className="progres-editar-perfil" />
            </div>
          </>
        ) : null}
        <Snackbar open={_alert} onClose={handleClose} autoHideDuration={6000}>
          <Alert severity="error">
            Debes seleccionar al menos un Submodulo por Modulo
          </Alert>
        </Snackbar>
      </div>
    );
  }
);

export default StepTwo;

const Modulos = ({ data, active, setActive, errorTwo, switch2 }) => {
  const { name, desc } = data;
  const [error, setError] = useState(false);

  useEffect(() => {
    errorTwo.map((i) => {
      if (i === name) {
        setError(true);
      }
    });
  }, [switch2]);

  return (
    <Tooltip title={desc} placement="top">
      <div
        onClick={() => setActive(name)}
        className={
          active === name
            ? `mod-two-active-two ${error && "error-modulo"}`
            : `mod-two-inactive-two ${error && "error-modulo"}`
        }
      >
        <p
          style={{ color: "white" }}
          className={name.length > 3 ? "name-submod-large" : null}
        >
          {name}
        </p>
      </div>
    </Tooltip>
  );
};
