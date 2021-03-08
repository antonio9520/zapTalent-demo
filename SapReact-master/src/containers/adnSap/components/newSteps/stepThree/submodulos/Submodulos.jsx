import React, { useState, useEffect } from "react";
import "./Submodulos.css";
import {
  IconButton,
  MobileStepper,
  FormControl,
  InputLabel,
  Input,
  makeStyles,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import Loader from "react-loader-spinner";
import SwipeableViews from "react-swipeable-views";
import { Tooltip } from "../../../../../../components";
import { useSelector } from "react-redux";

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

const SubModulos = ({
  dataModulo,
  setDataModulo,
  active,
  switch2,
  errorThree,
  setErrorThree,
  setSwitch2,
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeSM, setActiveSM] = useState(null);
  const [number, setNumber] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  let submodulos = dataModulo.find((item) => item.name === active);

  let arraySubModulos = [];
  const longitudPedazos = 3;

  for (let i = 0; i < submodulos.submodulos.length; i += longitudPedazos) {
    let trozo = submodulos.submodulos.slice(i, i + longitudPedazos);
    arraySubModulos.push(trozo);
  }
  useEffect(() => {
    setLoading(true);
    setActiveStep(0);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [active]);
  return (
    <>
      {loading ? (
        <div className="cont-loading-adn">
          <Loader
            type="Oval"
            color="#00BFFF"
            height={50}
            width={50}
            visible={loading}
            //  timeout={3000} //3 secs
          />
        </div>
      ) : (
        <>
          <div className="stepper-one-adn-two">
            <div className="step-one-top-adn-two">
              <div className="btn-left-adn">
                <IconButton
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  className={classes.arrowBtns}
                >
                  <ArrowBackIos fontSize="small" />
                </IconButton>
              </div>
              <div className="content-center-adn">
                <SwipeableViews index={activeStep}>
                  {arraySubModulos.map((item, index) => (
                    <div key={index} className="cont-SwipeableViews-two">
                      {item.map((item, index) => (
                        <SubMod
                          key={index}
                          data={item}
                          arrayModules={dataModulo}
                          setActiveSM={setActiveSM}
                          activeSM={activeSM}
                          active={active}
                          num={index}
                          errorThree={errorThree}
                          switch2={switch2}
                          setErrorThree={setErrorThree}
                          setSwitch2={setSwitch2}
                          setActiveStep={setActiveStep}
                          setNumber={setNumber}
                        />
                      ))}
                    </div>
                  ))}
                </SwipeableViews>
              </div>
              <div className="btn-right-adn">
                <IconButton
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === arraySubModulos.length - 1}
                  className={classes.arrowBtns}
                >
                  <ArrowForwardIos fontSize="small" />
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
          <Nivel
            modActive={active}
            activeSM={activeSM}
            setArrayModules={setDataModulo}
            arrayModules={dataModulo}
            switch2={switch2}
            setErrorThree={setErrorThree}
            setSwitch2={setSwitch2}
            errorThree={errorThree}
          />
        </>
      )}
    </>
  );
};

export default SubModulos;

const SubMod = ({
  data,
  setActiveSM,
  activeSM,
  arrayModules,
  active,
  errorThree,
  switch2,
  setErrorThree,
  setSwitch2,
  setActiveStep,
  setNumber,
  num,
}) => {
  const { name, desc } = data;
  const [error, setError] = useState(false);

  useEffect(() => {
    arrayModules.map((item) => {
      if (item.name === active) {
        item.submodulos.map((item, index) => {
          if (index === 0) {
            setActiveSM(item.name);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    let error = errorThree.filter((i) => i.name === name);
    console.log(error);
    if (error[0]) {
      setError(true);
      setNumber(num);
    } else {
      setError(false);
    }
  }, [switch2]);

  const handleClick = () => {
    // setSwitch2(!switch2);
    setActiveSM(name);
  };

  return (
    <Tooltip title={desc} placement="top">
      <div
        className={
          activeSM === name
            ? `sub-cont-SwipeableViews-active-three  ${error && "error-modulo"}`
            : `sub-cont-SwipeableViews-three ${error && "error-modulo"}`
        }
        onClick={() => handleClick()}
      >
        <p
          style={{ color: "white" }}
          className={name.length > 6 ? "name-submod-large" : null}
        >
          {name}
        </p>
      </div>
    </Tooltip>
  );
};

const Nivel = ({
  activeSM,
  modActive,
  arrayModules,
  setErrorThree,
  errorThree,
  switch2,
  setSwitch2,
}) => {
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [obs, setObs] = useState(null);

  useEffect(() => {
    setLoading(true);
    setActive(null);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [activeSM]);

  const onChangeObs = (e) => {
    arrayModules.map((item) => {
      if (item.name === modActive) {
        item.submodulos.map((item) =>
          item.name === activeSM ? (item.obs = e.target.value) : item
        );
      }
    });
  };

  let initobs;

  useEffect(() => {
    arrayModules.map((item) => {
      if (item.name === modActive) {
        item.submodulos.map((item) => {
          if (item.name === activeSM) {
            initobs = item.obs;
          }
        });
      }
    });
    setObs(initobs);
  }, [activeSM]);

  let initactive;
  useEffect(() => {
    if (active === null || active === undefined) {
      arrayModules.map((item) => {
        if (item.name === modActive) {
          item.submodulos.map((item) => {
            if (item.name === activeSM) {
              initactive = item.nivel;
            }
          });
        }
      });
      setActive(initactive);
      return;
    }
    arrayModules.map((item) => {
      if (item.name === modActive) {
        item.submodulos.map((item) =>
          item.name === activeSM ? (item.nivel = active) : item
        );
      }
    });
    setErrorThree(errorThree.filter((item) => item.name !== activeSM));
  }, [active]);

  return (
    <>
      {loading ? (
        <div className="cont-loading-adn-nivel">
          <Loader
            type="Oval"
            color="#00BFFF"
            height={80}
            width={80}
            visible={loading}
            //  timeout={3000} //3 secs
          />
        </div>
      ) : (
        <div className="cont-nivel-adn-three-two">
          <p className="p1">Selecciona el nivel del submódulo "{activeSM}"</p>
          <div className="cont-nivel-adn">
            <div
              className={
                active === "No Maneja"
                  ? "sub-nivel-adn-active-two"
                  : "sub-nivel-adn-two"
              }
              onClick={() => {
                setActive("No Maneja");
                setSwitch2(!setSwitch2);
              }}
              style={{
                background:
                  "linear-gradient(129deg, rgba(207,207,207,1) 0%, rgba(183,183,183,1) 100%)",
              }}
            >
              <p style={{ color: "white" }}>No Maneja</p>
            </div>
            <div
              className={
                active === "Básico"
                  ? "sub-nivel-adn-active-two"
                  : "sub-nivel-adn-two"
              }
              onClick={() => {
                setActive("Básico");
                setSwitch2(!setSwitch2);
              }}
              style={{
                background:
                  "linear-gradient(129deg, rgba(181,181,181,1) 0%, rgba(144,144,144,1) 100%)",
              }}
            >
              <p style={{ color: "white" }}>Básico</p>
            </div>
            <div
              className={
                active === "Medio"
                  ? "sub-nivel-adn-active-two"
                  : "sub-nivel-adn-two"
              }
              onClick={() => {
                setActive("Medio");
                setSwitch2(!setSwitch2);
              }}
              style={{
                background:
                  "linear-gradient(129deg, rgba(75,193,244,1) 0%, rgba(26,129,231,1) 100%)",
              }}
            >
              <p style={{ color: "white" }}>Medio</p>
            </div>
            <div
              className={
                active === "Avanzado"
                  ? "sub-nivel-adn-active-two"
                  : "sub-nivel-adn-two"
              }
              onClick={() => {
                setActive("Avanzado");
                setSwitch2(!setSwitch2);
              }}
              style={{
                background:
                  "linear-gradient(129deg, rgba(21,133,233,1) 0%, rgba(46,74,199,1) 100%)",
              }}
            >
              <p style={{ color: "white" }}>Avanzado</p>
            </div>
          </div>
          <div style={{ margin: "0", width: "100%" }}>
            <FormControl fullWidth size="small">
              <InputLabel
                className="input-label-custom-input"
                htmlFor="component-helper"
              >
                Observaciones (opcional)
              </InputLabel>
              <Input
                id="component-helper"
                defaultValue={obs}
                className="input-custom-input"
                aria-describedby="component-helper-text"
                name="obs"
                // type={type}
                onChange={(e) => onChangeObs(e)}
              />
            </FormControl>
          </div>
        </div>
      )}
    </>
  );
};
