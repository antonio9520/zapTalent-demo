import React, { forwardRef, useState } from "react";
import "./Styles.css";
import { Button, IconButton, CustomInput } from "../../../../components";
import { LinearProgress } from "@material-ui/core";
import { Close, Add } from "@material-ui/icons";
import AdnForm from "./components/adnForm/AdnForm";
import shortid from "shortid";
import { modulos } from "../../../../assets/modulos";

const StepTwo = forwardRef((props, ref) => {
  const {
    setStep,
    closeModal,
    adns,
    setAdns,
    anosExpSap,
    setAnosExpZap,
  } = props;
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState([]);
  const [errores2, setErrores2] = useState([]);
  const [errorAnosExp, setErrorAnosExp] = useState(false);
  const [_swith, setSwitch] = useState(false);

  const addModulo = () => {
    const container = document.getElementById("cont-adns-form-avisos-emp");

    setAdns([
      ...adns,
      { id: shortid.generate(), modulo: "", submodulos: [], desc: "" },
    ]);
    setTimeout(() => {
      container.scrollTop = "12000";
    }, 100);
  };
  // console.log(adns);
  const validation = async () => {
    setLoading(true);
    setErrores([]);
    await mapearDatos();

    setTimeout(() => {
      nextStep();
      setLoading(false);
    }, 500);
  };
  const mapearDatos = () => {
    if (anosExpSap !== null && anosExpSap !== "") {
      console.log("asdnkadjnkadn");
      if (anosExpSap < 1) {
        console.log("error");
        setErrorAnosExp(true);
      }
    }
    adns.map((item) => {
      if (item.modulo === "") {
        errores.push(item.id);
      } else if (item.submodulos.length === 0) {
        errores.push(item.id);
      }
    });
    setErrores2(errores);
  };
  const nextStep = async () => {
    await addDesc();
    if (errores.length === 0) {
      setStep("three");
    }
  };
  const addDesc = () => {
    modulos.map((item) => {
      adns.map((it) => {
        if (item.modulo === it.modulo) {
          it.desc = item.desc;
        }
      });
    });
  };
  return (
    <div className="container-nuevo-aviso-emp" ref={ref}>
      <div className="form-nuevo-aviso-emp">
        <h1>¿Qué perfil ADN SAP?</h1>
        {/* <p className="p1">ADN SAP</p> */}
        <div>
          <CustomInput
            label="Años de experiencia SAP (opcional)"
            helpertext="Introduzca un nuemero valido"
            error={errorAnosExp}
            defaultValue={anosExpSap}
            type="number"
            value={anosExpSap}
            onChange={(e) => {
              setErrorAnosExp(false);
              setAnosExpZap(e.target.value);
            }}
          />
        </div>
        <div
          className="cont-adns-form-avisos-emp"
          id="cont-adns-form-avisos-emp"
        >
          {adns.map((item, index) => (
            <AdnForm
              key={index}
              data={item}
              adns={adns}
              setAdns={setAdns}
              errores2={errores2}
              _swith={_swith}
              setSwitch={setSwitch}
            />
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
          <Button variant="contained" color="primary" onClick={validation}>
            Siguiente
          </Button>
        </div>
      </div>
      <div className="cont-icon-close-formulario">
        <IconButton
          bg="close"
          size="small"
          customcolor="close"
          onClick={closeModal}
        >
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
