import React from "react";
import "./Perfil.css";
import {
  Button,
  Tooltip,
  CustomInput,
  CustomSelectB,
} from "../../../../../../../components";
import { MenuItem, IconButton, makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles({
  iconButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  icon: {
    color: "#9A99A1",
    marginRight: 10,
  },
});

const Perfil = ({ perfiles, setPerfiles, recargar, data }) => {
  const { id } = data;
  const classes = useStyles();

  const handleDelete = async () => {
    if (perfiles.length === 1) {
      return;
    } else {
      await setPerfiles(perfiles.filter((i) => i.id !== id));
      recargar();
    }
  };
  return (
    <div className="perfil-add-emp-admin">
      <div className="item">
        <CustomSelectB
          label="Tipo de perfil"
          helpertext="no puede estar vacio"
          //   error={tipoPlanError}
          //   value={tipoPlan}
          //   onChange={(e) => {
          //     setTipoPlanError(false);
          //     setTipoPlan(e.target.value);
          //   }}
        >
          <MenuItem className="custom-menu-item" value="admin">
            Administrador
          </MenuItem>
          <MenuItem className="custom-menu-item" value="gest">
            Gestionador
          </MenuItem>
        </CustomSelectB>
      </div>
      <div className="item-doble">
        <div style={{ paddingRight: 5 }}>
          <CustomInput
            label="Nombre"
            helpertext="Introduzca un nuemero valido"
            //   error={giroError}
            type="text"
            //   value={giro}
            //   onChange={(e) => {
            //     setGiroError(false);
            //     setGiro(e.target.value);
            //   }}
          />
        </div>
        <div style={{ paddingLeft: 5 }}>
          <CustomInput
            label="Apellidos"
            helpertext="Introduzca un nuemero valido"
            //   error={giroError}
            type="text"
            //   value={giro}
            //   onChange={(e) => {
            //     setGiroError(false);
            //     setGiro(e.target.value);
            //   }}
          />
        </div>
      </div>
      <div className="item-doble">
        <div style={{ paddingRight: 5 }}>
          <CustomInput
            label="Rut"
            id="input-rut-empresa-admin"
            // error={rutError}
            // helpertext={rutmsg}
            type="text"
            // value={rut}
            // onChange={changeRut}
            // onBlur={formatRut2}
          />
        </div>
        <div style={{ paddingLeft: 5 }}>
          <CustomInput
            label="Email"
            helpertext="Introduzca un nuemero valido"
            //   error={giroError}
            type="text"
            //   value={giro}
            //   onChange={(e) => {
            //     setGiroError(false);
            //     setGiro(e.target.value);
            //   }}
          />
        </div>
      </div>

      <div className="item">
        <CustomInput
          label="Contraseña provisoria"
          helpertext="Introduzca un nuemero valido"
          //   error={giroError}
          type="text"
          //   value={giro}
          //   onChange={(e) => {
          //     setGiroError(false);
          //     setGiro(e.target.value);
          //   }}
        />
      </div>
      <div className="item-doble">
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
          <div className="date-left-estudio">
            <KeyboardDatePicker
              //   error={inicioError}
              fullWidth
              size="small"
              label="Inicio"
              minDate={new Date()}
              maxDate={new Date("2030-01-01")}
              //   helperText={
              //     inicioError ? "Fecha inicio no puede estar vacio" : null
              //   }
              format="dd/MM/yyyy"
              //   value={fechaInicio}
              // maxDate={new Date()}
              //   onChange={(newValue) => {
              //     setInicioError(false);
              //     setFechaInicio(newValue);
              //   }}
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
              //   error={terminoError}
              size="small"
              fullWidth
              label="Término"
              format="dd/MM/yyyy"
              //   helperText={terminoError ? fechaMsg : null}
              //   value={fechaTermino}
              minDate={new Date()}
              maxDate={new Date("2030-01-01")}
              // maxDate={new Date()}
              //   onChange={(newValue) => {
              //     setTerminoError(false);
              //     setFechaTermino(newValue);
              //   }}
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
      <IconButton
        size="small"
        onClick={handleDelete}
        className={classes.iconButton}
      >
        <Close fontSize="small" />
      </IconButton>
    </div>
  );
};

export default Perfil;
