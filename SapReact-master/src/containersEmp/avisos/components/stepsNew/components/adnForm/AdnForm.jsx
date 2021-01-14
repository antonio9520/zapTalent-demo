import React, { useState, useEffect } from "react";
import "./AdnForm.css";
import { CustomSelectB, Tooltip } from "../../../../../../components";
import { IconButton, MenuItem, MobileStepper } from "@material-ui/core";
import Loader from "react-loader-spinner";
import { ArrowBackIos, ArrowForwardIos, Close } from "@material-ui/icons";
import { modulos } from "../../../../../../assets/modulos";
import SwipeableViews from "react-swipeable-views";

const AdnForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modulo, setModulo] = useState(null);
  const [active] = useState("");
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  let arraySubModulos = [];
  const longitudPedazos = 5;
  if (modulo) {
    let submodulos = modulos.find((item) => item.modulo === modulo);

    for (let i = 0; i < submodulos.submodulos.length; i += longitudPedazos) {
      let trozo = submodulos.submodulos.slice(i, i + longitudPedazos);
      arraySubModulos.push(trozo);
    }
  }

  useEffect(() => {
    setLoading(true);
    setActiveStep(0);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [modulo]);

  return (
    <div className="adn-form-avisos-emp">
      <div className="container-inputs-form-emp">
        <CustomSelectB
          label="Módulo"
          helpertext="no puede estar vacio"
          // error={profesionError}
          // value={profesion}
          onChange={(e) => setModulo(e.target.value)}
        >
          {modulos.map((item, index) => (
            <MenuItem
              key={index}
              className="custom-menu-item"
              value={item.modulo}
            >
              {item.modulo}
            </MenuItem>
          ))}
        </CustomSelectB>
      </div>
      <>
        {loading ? (
          <div className="cont-loading-adn-emp">
            <Loader
              type="Oval"
              color="#00BFFF"
              height={30}
              width={30}
              visible={loading}
              //  timeout={3000} //3 secs
            />
          </div>
        ) : (
          <div className="stepper-submod-form-emp">
            {modulo === null ? (
              <p className="p2">Selecciona un modulo</p>
            ) : (
              <>
                <div className="step-one-top-adn">
                  <div className="btn-left-adn">
                    <IconButton
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      <ArrowBackIos />
                    </IconButton>
                  </div>
                  <div className="content-center-adn">
                    <SwipeableViews index={activeStep}>
                      {arraySubModulos.map((item, index) => (
                        <div key={index} className="cont-SwipeableViews-emp">
                          {item.map((item, index) => (
                            <Submodulos key={index} data={item} />
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
              </>
            )}
          </div>
        )}
      </>
      <div style={{ position: "absolute", right: "5px", top: "5px" }}>
        <IconButton size="small">
          <Close className="icon-close"/>
        </IconButton>
      </div>
    </div>
  );
};

export default AdnForm;

const Submodulos = ({ data }) => {
  const [active, setActive] = useState(false);
  return (
    <Tooltip title={data.desc}>
      <div
        className={
          active ? "cont-submod-avisos-emp" : "cont-submod-avisos-emp-inact"
        }
        onClick={() => setActive(!active)}
      >
        <p
          className={
            data.submodulo.length > 3 ? "name-submod-large-aviso-emp" : null
          }
        >
          {data.submodulo}
        </p>
      </div>
    </Tooltip>
  );
};
