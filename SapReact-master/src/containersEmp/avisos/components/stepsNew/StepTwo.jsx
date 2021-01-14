import React, { forwardRef, useState } from "react";
import "./Styles.css";
import { Button, IconButton } from "../../../../components";
import { LinearProgress, MenuItem } from "@material-ui/core";
import { Close, Add } from "@material-ui/icons";
import AdnForm from "./components/adnForm/AdnForm";

const StepTwo = forwardRef(({ setStep, ref }) => {
  const [_array, setArray] = useState(["1"]);

  const loading = false;

  const addModulo = () => {
    setArray([..._array, "1"]);
  };

  return (
    <div className="container-nuevo-aviso-emp" ref={ref}>
      <div className="form-nuevo-aviso-emp">
        <h1>¿Qué perfil ADN SAP?</h1>
        {/* <p className="p1">ADN SAP</p> */}
        <div className="cont-adns-form-avisos-emp">
          {_array.map((item, index) => (
            <AdnForm key={index} data={item} />
          ))}
        </div>
        <div className="add-mod-form-avisos-adn-emp">
          <IconButton bg="primary" size="small" onClick={addModulo}>
            <Add />
          </IconButton>
          <p>Agregar otro módulo</p>
        </div>
        <div className="cont-btns-form-emp">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep("one")}
          >
            Atras
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep("three")}
          >
            Siguiente
          </Button>
        </div>
      </div>
      <div className="cont-icon-close-formulario">
        <IconButton bg="close" size="small" color="close">
          <Close className="icon-close" />
        </IconButton>
      </div>
      {loading ? (
        <>
          <div className="overlay-loading"></div>
          <div className="linear-progres-global">
            <LinearProgress className="progres-editar-perfil" />
          </div>
        </>
      ) : null}
    </div>
  );
});

export default StepTwo;
