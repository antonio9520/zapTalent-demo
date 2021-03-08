import React, { useState, useEffect } from "react";
import "./Submodulos.css";
import { IconButton, MobileStepper, makeStyles } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import Loader from "react-loader-spinner";
import { modulos } from "../../../../../../assets/modulos";
import SwipeableViews from "react-swipeable-views";
import { Tooltip } from "../../../../../../components";

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
  setErrorTwo,
  setSwitch2,
}) => {
  const classes = useStyles();
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
              <Tooltip title="Anterior" placement="top">
                <IconButton
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  className={classes.arrowBtns}
                >
                  <ArrowBackIos fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
            <div className="content-center-adn">
              <SwipeableViews index={activeStep}>
                {arraySubModulos.map((item, index) => (
                  <div key={index} className="cont-SwipeableViews">
                    {item.map((item, index) => (
                      <SubMod
                        key={index}
                        data={item}
                        setDataModulo={setDataModulo}
                        dataModulo={dataModulo}
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
              <Tooltip title="Siguiente" placement="top">
                <IconButton
                  size="small"
                  className={classes.arrowBtns}
                  onClick={handleNext}
                  disabled={
                    activeStep === Math.ceil(arraySubModulos.length - 1)
                  }
                >
                  <ArrowForwardIos fontSize="small" />
                </IconButton>
              </Tooltip>
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

const SubMod = ({ data, dataModulo, active, setErrorTwo, setSwitch2 }) => {
  const { submodulo, desc } = data;
  const [actives, setActives] = useState(false);

  const handleClick = () => {
    setErrorTwo([]);
    setSwitch2(false);
    setActives(!actives);
    if (actives) {
      dataModulo.map((item) => {
        if (item.name === active) {
          const filtro = item.submodulos.filter((i) => i.name !== submodulo);
          item.submodulos = [];
          filtro.map((i) => {
            item.submodulos.push(i);
          });
        }
      });
    } else {
      dataModulo.map((item) => {
        if (item.name === active) {
          item.submodulos.push({
            name: submodulo,
            obs: "",
            nivel: "",
            desc: desc,
          });
        }
      });
    }
  };

  useEffect(() => {
    dataModulo.map((item) => {
      if (item.name === active) {
        item.submodulos.map((i) => {
          if (i.name === submodulo) {
            setActives(true);
          }
        });
      }
    });
  }, []);

  return (
    <>
      <Tooltip title={desc} placement="top">
        <div
          className={
            actives
              ? `sub-cont-SwipeableViews-active-two`
              : `sub-cont-SwipeableViews-two `
          }
          onClick={() => handleClick()}
        >
          <p
            style={{ color: "white" }}
            className={submodulo.length > 6 ? "name-submod-large" : null}
          >
            {submodulo}
          </p>
        </div>
      </Tooltip>
    </>
  );
};
