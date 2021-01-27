import React, { useState, useEffect } from "react";
import "./AdnForm.css";
import { CustomSelectB, Tooltip } from "../../../../../../components";
import { IconButton, MenuItem, MobileStepper, Button } from "@material-ui/core";
import Loader from "react-loader-spinner";
import { ArrowBackIos, ArrowForwardIos, Close, Info } from "@material-ui/icons";
import { modulos } from "../../../../../../assets/modulos";
import SwipeableViews from "react-swipeable-views";

const AdnForm = ({ setAdns, adns, data, errores2, _swith, setSwitch }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [modulo, setModulo] = useState(null);
  const [error, setError] = useState(false);
  const [initDefault, setInitDefault] = useState(true);
  const [nivel, setNivel] = useState(null);
  const [_switch_nivel, setSwitchNivel] = useState(false);
  const [dataNivel, setDataNivel] = useState("");
  const [errorNivel, setErrorNivel] = useState(false);
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

  const addNivel = (data) => {
    setSwitchNivel(true);
    setDataNivel(data);
  };

  useEffect(() => {
    setLoading(true);
    setActiveStep(0);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [modulo]);

  useEffect(() => {
    if (initDefault === false) {
      if (errores2.length > 0) {
        const valor = errores2.filter((item) => item === data.id);

        if (valor.length > 0) {
          setError(true);
        } else {
          setError(false);
        }
      }
    }
    setInitDefault(false);
  }, [errores2]);

  const saveNivel = (id) => {
    adns.map((it) => {
      if (it.id === id) {
        it.submodulos.push({
          submodulo: dataNivel.name,
          nivel: nivel,
        });
      }
    });
    setSwitchNivel(false);
    setLoading(true);
    setActiveStep(0);
    setNivel(null);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };
  const recargar = () => {
    setLoading(true);
    setActiveStep(0);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };
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
                              addNivel={addNivel}
                              _switch_nivel={_switch_nivel}
                              setSwitchNivel={setSwitchNivel}
                              recargar={recargar}
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
      {_switch_nivel ? (
        <div className="overlay-card-adn-emp">
          <p>Selecciona un nivel para {dataNivel.name}</p>
          <div style={{ width: "300px", marginBottom: "20px" }}>
            <CustomSelectB
              label="Nivel"
              helpertext="Seleccione un nivel"
              error={errorNivel}
              value={nivel}
              onChange={(e) => {
                setErrorNivel(false);
                setNivel(e.target.value);
              }}
            >
              <MenuItem className="custom-menu-item" value="No Maneja">
                No Maneja
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Básico">
                Básico
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Medio">
                Medio
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Avanzado">
                Avanzado
              </MenuItem>
            </CustomSelectB>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              className="btn-overlay-card-adn-emp"
              onClick={() => {
                setDataNivel(null);
                setSwitchNivel(false);
                setNivel(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              className="btn-overlay-card-adn-emp"
              onClick={() => {
                if (nivel === null) {
                  setErrorNivel(true);
                } else {
                  saveNivel(dataNivel.id);
                }
              }}
            >
              Continuar
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdnForm;

const Submodulos = ({
  data,
  id,
  setAdns,
  adns,
  addNivel,
  _switch_nivel,
  setSwitchNivel,
  recargar,
}) => {
  const [active, setActive] = useState(false);
  const [nivel, setNivel] = useState(null);
  const handleClick = () => {
    if (active) {
      adns.map((it) => {
        if (it.id === id) {
          setActive(false);
          const filtro = it.submodulos.filter(
            (i) => i.submodulo !== data.submodulo
          );
          it.submodulos = [];
          filtro.map((item) => {
            it.submodulos.push(item);
          });
        }
      });
      recargar();
    } else {
      addNivel({ name: data.submodulo, id: id });
    }
    console.log(adns);
  };

  //VALOR POR DEFAULT
  useEffect(() => {
    adns.map((it) => {
      if (it.id === id) {
        it.submodulos.map((ite) => {
          if (ite.submodulo === data.submodulo) {
            setActive(true);
            if (ite.nivel) {
              setNivel(ite.nivel);
            }
          }
        });
      }
    });
  }, [_switch_nivel]);
  // console.log(adns);
  console.log(data);
  return (
    <Tooltip title={data.desc}>
      <>
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
          {nivel ? (
            <Tooltip title={nivel} placement="top">
              <Info className="cont-info-add-form-adn" />
            </Tooltip>
          ) : null}
        </div>
      </>
    </Tooltip>
  );
};
