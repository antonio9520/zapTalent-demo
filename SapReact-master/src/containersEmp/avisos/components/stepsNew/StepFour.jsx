import React, { forwardRef, useState, useEffect } from "react";
import "./Styles.css";
import { Button, IconButton, CustomSelectB } from "../../../../components";
import { LinearProgress, TextField, MenuItem } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import NumberFormat from "react-number-format";

const StepFour = forwardRef((props, ref) => {
  const {
    setStep,
    renta,
    setRenta,
    beneficios,
    setBeneficios,
    descripcion,
    setDescripcion,
    estado,
    setEstado,
    guardarAviso,
    cargando,
  } = props;

  const [initDefault, setInitDefault] = useState(true);
  const [errorRenta, setErrorRenta] = useState(false);
  const [errorBeneficios, setErrorBeneficios] = useState(false);
  const [errorDescripcion, setErrorDescripcion] = useState(false);
  const [_switch, setSwitch] = useState(false);

  const validacion = () => {
    if (renta < 1) {
      setErrorRenta(true);
    }
    if (beneficios === "") {
      setErrorBeneficios(true);
    }
    if (descripcion === "") {
      setErrorDescripcion(true);
    }
    setInitDefault(false);
    setTimeout(() => {
      setSwitch(!_switch);
    }, 100);
  };

  useEffect(() => {
    if (initDefault === false) {
      if (errorRenta || errorBeneficios || errorDescripcion) {
        return;
      } else {
        guardarAviso();
      }
    }
  }, [_switch]);

  return (
    <div className="container-nuevo-aviso-emp" ref={ref}>
      <div className="form-nuevo-aviso-emp">
        <h1>Renta del empleo</h1>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, paddingRight: "10px" }}>
            <p className="p1">Renta ofrecida</p>
            <div style={{ marginTop: "14px" }}>
              <TextField
                fullWidth
                placeholder="$ 000.000"
                value={renta}
                onChange={(e) => {
                  setErrorRenta(false);
                  setRenta(e.target.value);
                }}
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  className: "multiline-form-estudios ",
                }}
                error={errorRenta}
                InputLabelProps={{
                  className: "multiline-form-estudios manpre-form-trabajos",
                }}
                helperText={errorRenta ? "Introduzca un numero valido" : null}
              />
            </div>
          </div>
          <div style={{ flex: 1, paddingLeft: "10px" }}>
            <p className="p1">Beneficios</p>
            <CustomSelectB
              label="Seleccione"
              helpertext="Seleccione un beneficio"
              error={errorBeneficios}
              value={beneficios}
              onChange={(e) => {
                setErrorBeneficios(false);
                setBeneficios(e.target.value);
              }}
            >
              <MenuItem className="custom-menu-item" value="item1">
                item1
              </MenuItem>
              <MenuItem className="custom-menu-item" value="item2">
                item2
              </MenuItem>
              <MenuItem className="custom-menu-item" value="item3">
                item3
              </MenuItem>
              <MenuItem className="custom-menu-item" value="item4">
                item4
              </MenuItem>
            </CustomSelectB>
          </div>
        </div>
        <div className="container-inputs-form-emp">
          <p className="p1" style={{ marginTop: "40px", marginBottom: "20px" }}>
            Sobre el trabajo
          </p>
          <TextField
            fullWidth
            id="standard-multiline-static"
            label="Describa el empleo"
            onChange={(e) => {
              setErrorDescripcion(false);
              setDescripcion(e.target.value);
            }}
            name="logros"
            type="text"
            error={errorDescripcion}
            value={descripcion}
            // defaultValue={reflogros}
            helperText={errorDescripcion ? "No puede estar vacio" : null}
            multiline
            rows={2}
            InputLabelProps={{ className: "multiline-form-estudios" }}
            InputProps={{ className: "multiline-form-estudios" }}
          />
        </div>
        <div
          className="container-inputs-form-emp"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "100px",
          }}
        >
          <p style={{ margin: "0", fontSize: "14px", color: "#7d7f80" }}>
            Estado:{" "}
          </p>
          <div
            style={{
              display: "flex",
              marginLeft: "20px",
              alignItems: "center",
            }}
          >
            <div
              className={
                estado === "Activo"
                  ? "div-tipo-consultor-active"
                  : "div-tipo-consultor"
              }
              style={{ backgroundColor: "#187EE6" }}
              onClick={() => setEstado("Activo")}
            >
              <p>Activo</p>
            </div>
            <div
              className={
                estado === "Proceso Finalizado"
                  ? "div-tipo-consultor-active"
                  : "div-tipo-consultor"
              }
              style={{ backgroundColor: "#909090" }}
              onClick={() => setEstado("Proceso Finalizado")}
            >
              <p>Proceso Finalizado</p>
            </div>
            <div
              className={
                estado === "Cancelado"
                  ? "div-tipo-consultor-active"
                  : "div-tipo-consultor"
              }
              style={{ backgroundColor: "#BCBCBC" }}
              onClick={() => setEstado("Cancelado")}
            >
              <p>Cancelado</p>
            </div>
          </div>
        </div>
        <div className="cont-btns-form-emp">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep("three")}
          >
            Atras
          </Button>
          <Button variant="contained" color="primary" onClick={validacion}>
            Guardar
          </Button>
        </div>
      </div>
      <div className="cont-icon-close-formulario">
        <IconButton bg="close" size="small" customcolor="close">
          <Close className="icon-close" />
        </IconButton>
      </div>
      {cargando ? (
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

export default StepFour;

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}
