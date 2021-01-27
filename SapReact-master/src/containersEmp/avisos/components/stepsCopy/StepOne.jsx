import React, { forwardRef, useState, useEffect } from "react";
import "./Styles.css";
import { Button } from "../../../../components";
import { LinearProgress, MenuItem } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { CustomInput, CustomSelectB, IconButton } from "../../../../components";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";
import { actEmpresa } from "../../../../assets/actEmpresa";

const StepOne = forwardRef((props, ref) => {
  const {
    setStep,
    closeModal,
    titulo,
    setTitulo,
    profesion,
    setProfesion,
    area,
    setArea,
    fechaInicio,
    setFechaInicio,
    fechaTermino,
    setFechaTermino,
    tipoConsultor,
    setTipoConsultor,
    anosExp,
    setAnosExp,
  } = props;

  //errores
  const [tituloError, setTituloError] = useState(false);
  const [profesionError, setProfesionError] = useState(false);
  const [areaError, setAreaError] = useState(false);
  const [errorAnosExp, setErrorAnosExp] = useState(false);
  const [fechaInicioError, setFechaInicioError] = useState(false);
  const [fechaTerminoError, setFechaTerminoError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fechaMsg, setFechaMsg] = useState("");
  const [initDefault, setInitDefault] = useState(true);
  const [_switch, setSwitch] = useState(false);

  const validacion = () => {
    setLoading(true);
    if (titulo.trim() === "") {
      setTituloError(true);
    }
    if (profesion === "") {
      setProfesionError(true);
    }
    if (area === "") {
      setAreaError(true);
    }
    if (anosExp !== null && anosExp !== "") {
      if (anosExp < 1) {
        setErrorAnosExp(true);
      }
    }

    if (fechaInicio === null) {
      setFechaInicioError(true);
    }
    if (fechaTermino === null) {
      setFechaTerminoError(true);
      setFechaMsg("Fecha Termino no puede estar vacio");
    } else {
      if (Date.parse(fechaInicio) > Date.parse(fechaTermino)) {
        setFechaTerminoError(true);
        setFechaMsg("Fecha Termino no puede ser menor a la fecha Inicial");
      }
    }
    setInitDefault(false);
    setTimeout(() => {
      setLoading(false);
      setSwitch(!_switch);
    }, 500);
  };

  useEffect(() => {
    if (initDefault === false) {
      if (
        tituloError ||
        profesionError ||
        areaError ||
        errorAnosExp ||
        fechaInicioError ||
        fechaTerminoError
      ) {
        return;
      } else {
        setStep("two");
      }
    }
  }, [_switch]);
  console.log(titulo);
  return (
    <div className="container-nuevo-aviso-emp" ref={ref}>
      <div className="form-nuevo-aviso-emp">
        <h1>Duplica este aviso</h1>
        <div className="container-inputs-form-emp">
          <CustomInput
            label="Título de aviso"
            helpertext="no puede estar vacio"
            error={tituloError}
            defaultValue={titulo}
            value={titulo}
            onChange={(e) => {
              setTituloError(false);
              setTitulo(e.target.value);
            }}
          />
        </div>
        <div className="container-inputs-form-emp">
          <CustomInput
            label="Profesión"
            helpertext="no puede estar vacio"
            defaultValue={profesion}
            error={profesionError}
            value={profesion}
            onChange={(e) => {
              setProfesionError(false);
              setProfesion(e.target.value);
            }}
          />
        </div>
        <div className="container-inputs-form-emp">
          <CustomSelectB
            label="Área empresa"
            helpertext="no puede estar vacio"
            error={areaError}
            value={area}
            onChange={(e) => {
              setAreaError(false);
              setArea(e.target.value);
            }}
          >
            {actEmpresa.map((item, index) => (
              <MenuItem
                key={index}
                className="custom-menu-item"
                value={item.Seleccionar}
              >
                {item.Seleccionar}
              </MenuItem>
            ))}
          </CustomSelectB>
        </div>
        <div className="container-inputs-form-emp">
          <CustomInput
            label="Años de experiencia (opcional)"
            helpertext="Introduzca un nuemero valido"
            error={errorAnosExp}
            type="number"
            value={anosExp}
            onChange={(e) => {
              setErrorAnosExp(false);
              setAnosExp(e.target.value);
            }}
          />
        </div>
        <div
          className="campo-date-form-avisos-emp"
          style={{ marginTop: "5px" }}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <div className="date-left-estudio">
              <KeyboardDatePicker
                error={fechaInicioError}
                fullWidth
                size="small"
                label="Inicio"
                minDate={new Date()}
                maxDate={new Date("2030-01-01")}
                helperText={
                  fechaInicioError ? "Fecha inicio no puede estar vacio" : null
                }
                format="dd/MM/yyyy"
                value={fechaInicio}
                // maxDate={new Date()}
                onChange={(newValue) => {
                  setFechaInicioError(false);
                  setFechaInicio(newValue);
                }}
                InputProps={{
                  className: "input-date-picker-inicio",
                  readOnly: true,
                }}
                className="date-picker-inicio"
                InputLabelProps={{ className: "input-label-date-form" }}
              />
            </div>
            <div className="date-right-estudio">
              <KeyboardDatePicker
                error={fechaTerminoError}
                size="small"
                fullWidth
                label="Término"
                format="dd/MM/yyyy"
                helperText={fechaTerminoError ? fechaMsg : null}
                value={fechaTermino}
                minDate={new Date()}
                maxDate={new Date("2030-01-01")}
                // maxDate={new Date()}
                onChange={(newValue) => {
                  setFechaTerminoError(false);
                  setFechaTermino(newValue);
                }}
                InputProps={{
                  className: "input-date-picker-inicio",
                  readOnly: true,
                }}
                className="date-picker-inicio"
                InputLabelProps={{ className: "input-label-date-form" }}
              />
            </div>
          </MuiPickersUtilsProvider>
        </div>
        <div className="cont-tipo-consultor-form-emp">
          <p>Tipo de Consultor</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className={
                tipoConsultor === "Training"
                  ? "div-tipo-consultor-active"
                  : "div-tipo-consultor"
              }
              style={{ backgroundColor: "#BCBCBC" }}
              onClick={() => setTipoConsultor("Training")}
            >
              <p>Training</p>
            </div>
            <div
              className={
                tipoConsultor === "Junior"
                  ? "div-tipo-consultor-active"
                  : "div-tipo-consultor"
              }
              style={{ backgroundColor: "#909090" }}
              onClick={() => setTipoConsultor("Junior")}
            >
              <p>Junior</p>
            </div>
            <div
              className={
                tipoConsultor === "Semi Senior"
                  ? "div-tipo-consultor-active"
                  : "div-tipo-consultor"
              }
              style={{ backgroundColor: "#4BC1F4" }}
              onClick={() => setTipoConsultor("Semi Senior")}
            >
              <p>Semi Senior</p>
            </div>
            <div
              className={
                tipoConsultor === "Senior"
                  ? "div-tipo-consultor-active"
                  : "div-tipo-consultor"
              }
              style={{ backgroundColor: "#1D72DE" }}
              onClick={() => setTipoConsultor("Senior")}
            >
              <p>Senior</p>
            </div>
          </div>
        </div>
        <div className="cont-btns-form-emp">
          <Button variant="contained" color="primary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={validacion}>
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

export default StepOne;
