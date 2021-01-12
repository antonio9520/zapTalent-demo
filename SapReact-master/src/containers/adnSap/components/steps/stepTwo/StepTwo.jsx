import React, { useState, useEffect } from "react";
import "./StepTwo.css";
import { ListItem, IconButton, Snackbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import SubModulos from "./submodulos/SubModulos";
import { Alert } from "@material-ui/lab";

const StepTwo = (props) => {
  const { setStep, arrayModules, setArrayModules, closeModal } = props;
  const [active, setActive] = useState(arrayModules[0].name);
  const [errorTwo, setErrorTwo] = useState([]);
  const [switch2, setSwitch2] = useState(false);
  const [_alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");

  const validation = () => {
    arrayModules.map((item) => {
      if (item.submodulos.length === 0) {
        errorTwo.push(item.name);
      }
    });

    setSwitch2(!switch2);
    nextStep();
  };

  const nextStep = () => {
    if (errorTwo.length > 0) {
      setMsg("Debes seleccionar al menos un Submodulo por Modulo");
      setAlert(true);
    } else {
      setStep("three");
    }
  };

  const handleClose = () => {
    setAlert(false);
  };
  return (
    <div className="cont-two-adn">
      <div className="sub-cont-one-adn">
        <div className="cont-mod-two-adn">
          {arrayModules.map((item, index) => (
            <Modulos
              key={index}
              item={item}
              active={active}
              errorTwo={errorTwo}
              setActive={setActive}
              switch2={switch2}
            />
          ))}
        </div>
        <p className="p1-two-adn">Selecciona los Sub módulos de tu dominio</p>

        <div className="cont-sub-mnodulo-two-adn">
          <SubModulos
            arrayModules={arrayModules}
            setArrayModules={setArrayModules}
            active={active}
            setErrorTwo={setErrorTwo}
            setSwitch2={setSwitch2}
          />
        </div>
        <div className="cont-iconbtn-close-adn">
          <IconButton onClick={closeModal}>
            <Close />
          </IconButton>
        </div>
        <div className="cont-btn-adn-one">
          <ListItem
            button
            className={`btn-adnzap-modal }`}
            onClick={() => setStep("one")}
          >
            <p>Atras</p>
          </ListItem>
          <ListItem
            button
            className={`btn-adnzap-modal`}
            onClick={() => validation()}
          >
            <p>Guardar y seguir</p>
          </ListItem>
        </div>
        <Snackbar open={_alert} onClose={handleClose} autoHideDuration={6000}>
          <Alert severity="error">{msg}</Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default StepTwo;

const Modulos = ({ item, active, setActive, errorTwo, switch2 }) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    errorTwo.map((i) => {
      if (i === item.name) {
        setError(true);
      }
    });
  }, [switch2]);
  return (
    <div
      onClick={() => setActive(item.name)}
      className={
        active === item.name
          ? `mod-two-active ${error ? "error-two" : null}`
          : `mod-two-inactive ${error ? "error-two" : null}`
      }
    >
      <p>{item.name}</p>
    </div>
  );
};
