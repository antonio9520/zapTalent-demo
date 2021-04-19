import React, { useState, useEffect } from "react";
import "../steps/stepThree/submodulos/SubModulos.css";
import {
  IconButton,
  MobileStepper,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import Loader from "react-loader-spinner";
import SwipeableViews from "react-swipeable-views";

const SubModulos = ({
  active,
  setErrorThree,
  switch2,
  errorThree,
  arraySubMod,
  setArraySubMod,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeSM, setActiveSM] = useState(null);
  // console.log(arraySubMod);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let arraySubModulos = [];
  const longitudPedazos = 3;

  for (let i = 0; i < arraySubMod.length; i += longitudPedazos) {
    let trozo = arraySubMod.slice(i, i + longitudPedazos);
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
          <div className="stepper-one-adn">
            <div className="step-one-top-adn">
              <div className="btn-left-adn">
                <IconButton onClick={handleBack} disabled={activeStep === 0}>
                  <ArrowBackIos />
                </IconButton>
              </div>
              <div className="content-center-adn">
                <SwipeableViews index={activeStep}>
                  {arraySubModulos.map((item, index) => (
                    <div key={index} className="cont-SwipeableViews">
                      {item.map((item, index, arr) => (
                        <SubMod
                          key={index}
                          data={item}
                          arraySubMod={arraySubMod}
                          //   arrayModules={arrayModules}
                          setActiveSM={setActiveSM}
                          activeSM={activeSM}
                          active={active}
                          errorThree={errorThree}
                          switch2={switch2}
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
          <Nivel
            arraySubMod={arraySubMod}
            setArraySubMod={setArraySubMod}
            activeSM={activeSM}
            setErrorThree={setErrorThree}
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
  errorThree,
  switch2,
  arraySubMod,
}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    arraySubMod.map((item, index) => {
      if (index === 0) {
        setActiveSM(item.name);
      }
    });
  }, []);

  useEffect(() => {
    errorThree.map((i) => {
      if (i === data.name) {
        setError(true);
      }
    });
  }, [switch2]);

  const handleClick = () => {
    setActiveSM(data.name);
  };

  return (
    <div
      className={
        activeSM === data.name
          ? `sub-cont-SwipeableViews-active ${error ? "error-two" : null}`
          : `sub-cont-SwipeableViews ${error ? "error-two" : null}`
      }
      onClick={() => handleClick()}
    >
      <p style={{ color: "white" }}>{data.name}</p>
    </div>
  );
};

const Nivel = ({ activeSM, setErrorThree, arraySubMod }) => {
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
    arraySubMod.map((item) =>
      item.name === activeSM ? (item.obs = e.target.value) : item
    );
  };

  let initobs;

  useEffect(() => {
    arraySubMod.map((item) => {
      if (item.name === activeSM) {
        initobs = item.obs;
      }
    });

    setObs(initobs);
  }, [activeSM]);

  let initactive;
  useEffect(() => {
    setErrorThree([]);
    if (active === null || active === undefined) {
      arraySubMod.map((item) => {
        if (item.name === activeSM) {
          initactive = item.nivel;
        }
      });

      setActive(initactive);
      return;
    }

    arraySubMod.map((item) =>
      item.name === activeSM ? (item.nivel = active) : item
    );
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
        <div className="cont-nivel-adn-three">
          <p className="p1-three-adn">
            Selecciona el nivel del submódulo "{activeSM}"
          </p>
          <div className="cont-nivel-adn">
            <div
              className={
                active === "No Maneja"
                  ? "sub-nivel-adn-active" 
                  : "sub-nivel-adn"
              }
              onClick={() => setActive("No Maneja")}
              style={{ backgroundColor: "#BCBCBC" }}
            >
              <p style={{ color: "white" }}>No Maneja</p>
            </div>
            <div
              className={
                active === "Básico" ? "sub-nivel-adn-active" : "sub-nivel-adn"
              }
              onClick={() => setActive("Básico")}
              style={{ backgroundColor: "#909090" }}
            >
              <p style={{ color: "white" }}>Básico</p>
            </div>
            <div
              className={
                active === "Medio" ? "sub-nivel-adn-active" : "sub-nivel-adn"
              }
              onClick={() => setActive("Medio")}
              style={{ backgroundColor: "#43B6F2" }}
            >
              <p style={{ color: "white" }}>Medio</p>
            </div>
            <div
              className={
                active === "Avanzado" ? "sub-nivel-adn-active" : "sub-nivel-adn"
              }
              onClick={() => setActive("Avanzado")}
              style={{ backgroundColor: "#2169D9" }}
            >
              <p style={{ color: "white" }}>Avanzado</p>
            </div>
          </div>
          <div style={{ margin: "5px 0", width: "100%" }}>
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
              {/* {error ? (
              <FormHelperText className="helper-text-custom-input">
                {helpertext}
              </FormHelperText>
            ) : null} */}
            </FormControl>
          </div>
        </div>
      )}
    </>
  );
};
