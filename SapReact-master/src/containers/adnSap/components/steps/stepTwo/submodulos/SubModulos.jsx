import React, { useState, useEffect } from "react";
import "./SubModulos.css";
import { IconButton, MobileStepper } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import Loader from "react-loader-spinner";
import { modulos } from "../../../../../../assets/modulos";
import SwipeableViews from "react-swipeable-views";
import { Tooltip } from "../../../../../../components"; 

const SubModulos = ({
  arrayModules,
  setArrayModules,
  active,
  setErrorTwo,
  setSwitch2,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let submodulos = modulos.find((item) => item.modulo === active);

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
                    {item.map((item, index) => (
                      <SubMod
                        key={index}
                        item={item}
                        setArrayModules={setArrayModules}
                        arrayModules={arrayModules}
                        active={active}
                        setErrorTwo={setErrorTwo}
                        setSwitch2={setSwitch2}
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
      )}
    </>
  );
};

export default SubModulos;

const SubMod = ({ item, arrayModules, active, setErrorTwo, setSwitch2 }) => {
  const [actives, setActives] = useState(false);

  const handleClick = () => {
    setErrorTwo([]);
    setSwitch2(false);
    setActives(!actives);
    if (actives) {
      arrayModules.map((it) => {
        if (it.name === active) {
          const filtro = it.submodulos.filter((i) => i.name !== item.submodulo);
          it.submodulos = [];
          filtro.map((item) => {
            it.submodulos.push(item);
          });
        }
      });
    } else {
      arrayModules.map((it) => {
        if (it.name === active) {
          it.submodulos.push({
            name: item.submodulo,
            obs: "",
            nivel: "",
            desc: item.desc,
          });
        }
      });
    }
  };

  useEffect(() => {
    arrayModules.map((it) => {
      if (it.name === active) {
        it.submodulos.map((ite) => {
          if (ite.name === item.submodulo) {
            setActives(true);
          }
        });
      }
    });
  }, []);

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
          <p>{item.submodulo}</p>
        </div>
      </Tooltip>
    </>
  );
};
