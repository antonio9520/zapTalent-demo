import React, { useState, useEffect } from "react";
import { modulos } from "../../../../assets/modulos";
import {
  IconButton,
  MobileStepper,
  ListItem,
  Snackbar,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import { Tooltip } from "../../../../components";
import "./styles.css";
import { Alert } from "@material-ui/lab";

const One = (props) => {
  const { setView, dataEditar, arraySubMod, setArraySubMod } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [_alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  //buscar modulo
  const submodulos = modulos.find((item) => item.modulo === dataEditar.name);
  let resultSubModulos = submodulos.submodulos;
  //quitar submodulos ya guardados

  const setDataSubModulos = () => {
    for (let i = 0; i < dataEditar.submodulos.length; i++) {
      const element = dataEditar.submodulos[i].name;
      resultSubModulos = resultSubModulos.filter(
        (item) => item.submodulo !== element
      );
    }
  };

  setDataSubModulos();
  let arraySubModulos = [];
  const longitudPedazos = 3;
  //partir array en grupos de 3
  for (let i = 0; i < resultSubModulos.length; i += longitudPedazos) {
    let trozo = resultSubModulos.slice(i, i + longitudPedazos);
    arraySubModulos.push(trozo);
  }
  //   console.log(data.name);
  const nextStep = () => {
    if (arraySubMod.length === 0) {
      setMsg("Debes seleccionar al menos un SubModulo");
      setAlert(true);

      return;
    }
    setView("two");
  };

  const handleClose = () => {
    setAlert(false);
  };
  return (
    <>
      <div className="cont-one-adn-edit">
        <div className="stepper-one-adn" style={{ alignItems: "center" }}>
          <h1>Seleccione el o los submodulos</h1>
          <div className="step-one-top-adn addsm">
            <div className="btn-left-adn">
              <IconButton onClick={handleBack} disabled={activeStep === 0}>
                <ArrowBackIos />
              </IconButton>
            </div>
            <div className="content-center-adn">
              <SwipeableViews index={activeStep}>
                {arraySubModulos.map((item, index) => (
                  <div key={index} className="cont-SwipeableViews">
                    {item.map((item, index) => (
                      <SubMod
                        key={index}
                        item={item}
                        arraySubMod={arraySubMod}
                        setArraySubMod={setArraySubMod}
                        //   setArrayModules={setArrayModules}
                        //   arrayModules={arrayModules}
                        //   active={active}
                        //   setErrorTwo={setErrorTwo}
                        //   setSwitch2={setSwitch2}
                      />
                    ))}
                  </div>
                ))}
              </SwipeableViews>
            </div>
            <div className="btn-right-adn">
              <IconButton
                onClick={handleNext}
                disabled={activeStep === arraySubModulos.length - 1}
              >
                <ArrowForwardIos />
              </IconButton>
            </div>
          </div>
          <div className="cont-mobile-adn">
            <MobileStepper
              variant="dots"
              steps={arraySubModulos.length}
              position="static"
              activeStep={activeStep}
              className="dots-one-adn"
            />
          </div>
        </div>
        <div className="cont-btns-one-adn-edit">
          <ListItem
            button
            className="btn-adnzap-modal"
            onClick={() => {
              setArraySubMod([]);
              setView("default");
            }}
            style={{ color: "white" }}
          >
            <p>Cancelar</p>
          </ListItem>
          <ListItem
            button
            className="btn-adnzap-modal"
            style={{ color: "white" }}
            onClick={nextStep}
          >
            <p>Continuar</p>
          </ListItem>
        </div>
        <Snackbar open={_alert} onClose={handleClose} autoHideDuration={6000}>
          <Alert severity="error">{msg}</Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default One;

const SubMod = ({
  item,
  arrayModules,
  active,
  arraySubMod,
  setArraySubMod,
}) => {
  const [actives, setActives] = useState(false);

  const handleClick = () => {
    setActives(!actives);
    if (actives) {
      setArraySubMod(arraySubMod.filter((i) => i.name !== item.submodulo));
      //   console.log(filtro);
      //   arraySubMod = [];
      //   filtro.map((item) => {
      //     arraySubMod.push(item);
      //   });
    } else {
      arraySubMod.push({
        name: item.submodulo,
        obs: "",
        nivel: "",
        desc: item.desc,
      });
    }
  };
  //   console.log(arraySubMod);
  // useEffect(() => {
  //   arrayModules.map((it) => {
  //     if (it.name === active) {
  //       it.submodulos.map((ite) => {
  //         if (ite.name === item.submodulo) {
  //           setActives(true);
  //         }
  //       });
  //     }
  //   });
  // }, []);
  useEffect(() => {
    arraySubMod.map((ite) => {
      if (ite.name === item.submodulo) {
        setActives(true);
      }
    });
  }, []);
  // console.log(arraySubMod);
  return (
    <>
      <Tooltip title={item.desc} aria-label="add">
        <div
          className={
            actives
              ? `sub-cont-SwipeableViews-active`
              : `sub-cont-SwipeableViews `
          }
          onClick={() => handleClick()}
        >
          <p style={{ color: "white" }}>{item.submodulo}</p>
        </div>
      </Tooltip>
    </>
  );
};
