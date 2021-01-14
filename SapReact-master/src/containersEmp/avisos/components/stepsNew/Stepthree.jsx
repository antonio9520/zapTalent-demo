import React, { forwardRef, useState } from "react";
import "./Styles.css";
import {
  Button,
  IconButton,
  CustomSelectB,
  CustomInput,
} from "../../../../components";
import { Close } from "@material-ui/icons";
import { LinearProgress, MenuItem } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";

const Stepthree = forwardRef(({ setStep, ref }) => {
  const loading = false;
  const [dispViajar, setDispViajar] = useState("Si");
  const [cambioRes, setCambioRes] = useState("No");

  return (
    <div className="container-nuevo-aviso-emp" ref={ref}>
      <div className="form-nuevo-aviso-emp">
        <h1>Detalles del Empleo</h1>
        <div style={{ display: "flex", marginBottom: "40px" }}>
          <div style={{ flex: 1, paddingRight: "10px" }}>
            <div className="container-inputs-form-emp">
              <CustomSelectB
                label="Jornada Laboral"
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
            <div className="container-inputs-form-emp">
              <CustomInput
                label="Cantidad de vacantes"
                helpertext="no puede estar vacio"
                type="number"
                // error={areaError}
                // value={area}
                // onChange={(e) => setArea(e.target.value)}
              />
            </div>
          </div>
          <div style={{ flex: 1, paddingLeft: "10px" }}>
            <div className="container-inputs-form-emp">
              <CustomSelectB
                label="Tipo de Contrato"
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
            <div className="container-inputs-form-emp">
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <KeyboardDatePicker
                  // error={fechaInicioError}
                  fullWidth
                  size="small"
                  label="Inicio"
                  // helperText={
                  // diainicioError ? "Fecha inicio no puede estar vacio" : null
                  // }
                  format="dd/MM/yyyy"
                  // value={fechaInicio}
                  // onChange={(newValue) => setFechaInicio(newValue)}
                  InputProps={{
                    className: "input-date-picker-inicio",
                    readOnly: true,
                  }}
                  className="date-picker-inicio"
                  InputLabelProps={{ className: "input-label-date-form" }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
        </div>
        <p className="p1">Lugar de Trabajo</p>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, paddingRight: "10px" }}>
            <div className="container-inputs-form-emp">
              <CustomSelectB
                label="País"
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
            <div className="container-inputs-form-emp">
              <CustomSelectB
                label="Región"
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
          <div style={{ flex: 1, paddingLeft: "10px" }}>
            <div className="container-inputs-form-emp">
              <CustomSelectB
                label="Ciudad"
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
        </div>
        <div style={{ display: "flex", marginTop: "40px" }}>
          <div style={{ flex: 1, paddingRight: "5px" }}>
            <p className="p1">Disponibilidad para Viajar</p>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <button
                className={
                  dispViajar === "Si" ? "btn-yes-no-active" : "btn-yes-no"
                }
                onClick={() => setDispViajar("Si")}
              >
                Si
              </button>

              <button
                className={
                  dispViajar === "No" ? "btn-yes-no-active" : "btn-yes-no"
                }
                style={{ marginLeft: "10px" }}
                onClick={() => setDispViajar("No")}
              >
                No
              </button>
            </div>
          </div>
          <div style={{ flex: 1, paddingLeft: "5px" }}>
            <p className="p1">Disponibilidad cambio de Residencia</p>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <button
                className={
                  cambioRes === "Si" ? "btn-yes-no-active" : "btn-yes-no"
                }
                onClick={() => setCambioRes("Si")}
              >
                Si
              </button>

              <button
                className={
                  cambioRes === "No" ? "btn-yes-no-active" : "btn-yes-no"
                }
                style={{ marginLeft: "10px" }}
                onClick={() => setCambioRes("No")}
              >
                No
              </button>
            </div>
          </div>
        </div>
        <div className="cont-btns-form-emp" style={{ marginTop: "100px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep("two")}
          >
            Atras
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep("four")}
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

export default Stepthree;
