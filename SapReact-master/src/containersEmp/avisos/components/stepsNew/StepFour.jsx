import React, { forwardRef, useState } from "react";
import "./Styles.css";
import {
  Button,
  IconButton,
  CustomInput,
  CustomSelectB,
} from "../../../../components";
import { LinearProgress, TextField, MenuItem } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import NumberFormat from "react-number-format";

const StepFour = forwardRef(({ setStep, ref }) => {
  const loading = false;
  const [estado, setEstado] = useState("Activo");
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
                // label="Manejo de presupuesto (opcional)"
                placeholder="$ 000.000"
                // value={manejopresupuesto}
                // onChange={(e) => {
                //   setManPressError(false);
                //   setManejoPresupuesto(e.target.value);
                // }}
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  className: "multiline-form-estudios ",
                }}
                // error={manPreError}
                InputLabelProps={{
                  className: "multiline-form-estudios manpre-form-trabajos",
                }}
                // helperText={manPreError ? "Introduzca un numero valido" : null}
              />
            </div>
          </div>
          <div style={{ flex: 1, paddingLeft: "10px" }}>
            <p className="p1">Beneficios</p>
            <CustomSelectB
              label="Seleccione"
              helpertext="no puede estar vacio"
              // error={profesionError}
              // value={profesion}
              // onChange={(e) => setProfesion(e.target.value)}
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
            // onChange={(e) => setRefLogros(e.target.value)}
            name="logros"
            type="text"
            // defaultValue={reflogros}
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log("guardar")}
          >
            Guardar
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
