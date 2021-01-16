import React, { useState, useEffect } from "react";
import "./AdnForm.css";
import { CustomSelectB, Tooltip } from "../../../../../../components";
import { IconButton, MenuItem, MobileStepper } from "@material-ui/core";
import Loader from "react-loader-spinner";
import { ArrowBackIos, ArrowForwardIos, Close } from "@material-ui/icons";
import { modulos } from "../../../../../../assets/modulos";
import SwipeableViews from "react-swipeable-views";

const AdnForm = ({ setAdns, adns, data, errores2, _swith, setSwitch }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [modulo, setModulo] = useState(null);
  const [error, setError] = useState(false);
  const [initDefault, setInitDefault] = useState(true);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  let arraySubModulos = [];
  const longitudPedazos = 5;
  if (data.modulo !== "") {
    let submodulos = modulos.find((item) => item.modulo === data.modulo);

    for (let i = 0; i < submodulos.submodulos.length; i += longitudPedazos) {
      let trozo = submodulos.submodulos.slice(i, i + longitudPedazos);
      arraySubModulos.push(trozo);
    }
  }
  const deleteModulo = () => {
    if (adns.length > 1) {
      const result = adns.filter((item) => item.id !== data.id);
      setAdns(result);
    }
  };

  const addModulo = (e) => {
    setModulo(e);
    setSwitch(!_swith);
    adns.map((item) => {
      if (item.id === data.id) {
        item.modulo = e;
        item.submodulos = [];
      }
    });
    
  };

  useEffect(() => {
    setLoading(true);
    setActiveStep(0);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [modulo]);

  useEffect(() => {
    console.log(errores2);
    if (initDefault === false) {
      if (errores2.length > 0) {
        const valor = errores2.filter((item) => item === data.id);
        console.log(valor);
        console.log("entro useEffect");
        if (valor.length > 0) {
          setError(true);
        } else {
          setError(false);
        }
      }
    }
    setInitDefault(false);
  }, [errores2]);
  console.log(adns);
  // console.log(data);
  useEffect(() => {
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
    }, 200);
  }, [_swith]);
  return (
    <div
      className="adn-form-avisos-emp"
      style={{
        border: error ? "1px solid #f44336" : null,
        backgroundColor: error ? "#f4433605" : null,
      }}
    >
      <div className="container-inputs-form-emp">
        <CustomSelectB
          label="Módulo"
          helpertext="no puede estar vacio"
          // error={profesionError}
          value={data.modulo}
          onChange={(e) => addModulo(e.target.value)}
        >
          {cargando
            ? null
            : modulos.map((item, index) => {
                const valor = adns.filter((i) => i.modulo === item.modulo);
                console.log(valor);
                return valor.length > 0 ? (
                  <MenuItem
                    key={index}
                    className="custom-menu-item"
                    value={item.modulo}
                    disabled
                  >
                    {item.modulo}
                  </MenuItem>
                ) : (
                  <MenuItem
                    key={index}
                    className="custom-menu-item"
                    value={item.modulo}
                  >
                    {item.modulo}
                  </MenuItem>
                );
                // <MenuItem
                //   key={index}
                //   className="custom-menu-item"
                //   value={item.modulo}
                //   disabled
                // >
                //   {item.modulo}
                // </MenuItem>
              })}
        </CustomSelectB>
      </div>
      <>
        {loading ? (
          <div className="cont-loading-adn-emp">
            <Loader
              type="Oval"
              color="#00BFFF"
              height={35}
              width={35}
              visible={loading}
              //  timeout={3000} //3 secs
            />
          </div>
        ) : (
          <div className="stepper-submod-form-emp">
            {data.modulo === "" ? (
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
                            <Submodulos
                              key={index}
                              data={item}
                              setAdns={setAdns}
                              adns={adns}
                              id={data.id}
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
              </>
            )}
          </div>
        )}
      </>
      <div style={{ position: "absolute", right: "5px", top: "5px" }}>
        <IconButton size="small" onClick={deleteModulo}>
          <Close className="icon-close" />
        </IconButton>
      </div>
    </div>
  );
};

export default AdnForm;

const Submodulos = ({ data, id, setAdns, adns }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    if (active) {
      adns.map((it) => {
        if (it.id === id) {
          const filtro = it.submodulos.filter(
            (i) => i.submodulo !== data.submodulo
          );
          it.submodulos = [];
          filtro.map((item) => {
            it.submodulos.push(item);
          });
        }
      });
    } else {
      adns.map((it) => {
        if (it.id === id) {
          it.submodulos.push({
            submodulo: data.submodulo,
          });
        }
      });
    }
    console.log(adns);
  };
  useEffect(() => {
    adns.map((it) => {
      if (it.id === id) {
        it.submodulos.map((ite) => {
          if (ite.submodulo === data.submodulo) {
            setActive(true);
          }
        });
      }
    });
  }, []);
  // console.log(adns);
  return (
    <Tooltip title={data.desc}>
      <div
        className={
          active ? "cont-submod-avisos-emp" : "cont-submod-avisos-emp-inact"
        }
        onClick={handleClick}
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
