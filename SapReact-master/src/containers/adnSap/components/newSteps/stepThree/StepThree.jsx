import React, { forwardRef, useState, useEffect } from "react";
import "./StepThree.css";
import {
  LinearProgress,
  makeStyles,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Button, Tooltip } from "../../../../../components";
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

const StepThree = forwardRef(
  ({ closeModal, setStep, dataModulo, setDataModulo }, ref) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(dataModulo[0].name);
    const [errorThree, setErrorThree] = useState([]);
    const [switch2, setSwitch2] = useState(false);
    const [_alert, setAlert] = useState(false);

    const validacion = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        dataModulo.map((item) => {
          item.submodulos.map((i) => {
            if (i.nivel === "" || i.nivel === null) {
              errorThree.push({ name: i.name, namemod: item.name });
            }
          });
        });

        nextStep();
      }, 1000);
    };

    const nextStep = () => {
      if (errorThree.length > 0) {
        setAlert(true);
        setActive(errorThree[0].namemod);
        setSwitch2(!switch2);
      } else {
        setSwitch2(!switch2);
        setStep("four");
      }
    };

    const handleClose = () => {
      setAlert(false);
    };

    return (
      <div ref={ref} className="step-three-new-modal-adn">
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
              setErrorThree={setErrorThree}
              switch2={switch2}
              errorThree={errorThree}
            />
          ))}
        </div>
        <div>
          <Submodulos
            dataModulo={dataModulo}
            setDataModulo={setDataModulo}
            active={active}
            setErrorThree={setErrorThree}
            switch2={switch2}
            errorThree={errorThree}
            setSwitch2={setSwitch2}
          />
        </div>
        <div className="btns-steps-new-adn">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep("two")}
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
            Debes seleccionar un nivel para cada Submodulo
          </Alert>
        </Snackbar>
      </div>
    );
  }
);

export default StepThree;

const Modulos = ({ data, active, setActive, switch2, errorThree }) => {
  const { name, desc } = data;
  const [error, setError] = useState(false);

  useEffect(() => {
    let error = errorThree.filter((i) => i.namemod === name);
   
    if (error[0]) {
      setError(true);
    } else {
      setError(false);
    }
  }, [switch2]);
  return (
    <Tooltip title={desc} placement="top">
      <div
        onClick={() => setActive(name)}
        className={
          active === name
            ? `mod-two-active-two  ${error && "error-modulo"}`
            : `mod-two-inactive-two  ${error && "error-modulo"} `
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
