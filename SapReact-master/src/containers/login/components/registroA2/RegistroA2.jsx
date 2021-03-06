import React, { useState } from "react";
import "./RegistroA2.css";
import { CustomSelect } from "../../../../components";
import logo from "../../../../resources/img/ZAPTalent-Logotipo-Vertical-Original.svg";
import { ListItem, MenuItem, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { naciones } from "../../../../assets/nacionalidades";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";

const RegistroA2 = (props) => {
  const {
    ecivil,
    nacion,
    sexo,
    setEcivil,
    setNacion,
    fechaNacimiento,
    setFechaNacimiento,
    setSexo,
    setView,
    handleClose,
  } = props;
  const [errornacion, setErrorNacion] = useState(false);
  const [errorcivil, setErrorCivil] = useState(false);
  const [errorsexo, setErrorSexo] = useState(false);
  const [errorFecha, setErrorFecha] = useState(false);

  //Validacion
  const validacion = () => {
    //validar estado civil
    if (ecivil === "") {
      setErrorCivil(true);
      return;
    }
    //validar sexo
    if (sexo.trim() === "") {
      setErrorSexo(true);
      return;
    }
    //validar nacionalidad
    if (nacion.trim() === "") {
      setErrorNacion(true);
      return;
    }
    if (fechaNacimiento === null) {
      setErrorFecha(true);
      return;
    }

    setView("B");
  };
  return (
    <div className="cont-reg-a2">
      <div className="btn-close-registro">
        <IconButton onClick={() => handleClose()}>
          <Close />
        </IconButton>
      </div>
      <div className="top-reg-a2">
        <img src={logo} alt="logo" className="logo-login-re" />
        <p className="p-top-reg-a">
          Para comenzar, nesesitamos tus datos básicos:
        </p>
      </div>
      <div className="center-reg-a2">
        <div className="center-2">
          <CustomSelect
            placeholder="Estado civil"
            size="small"
            onChange={setEcivil}
            helpertext="Selecciona un estado civil"
            value={ecivil}
            name="civil"
            error={errorcivil}
            funcionError={setErrorCivil}
          >
            <MenuItem className="custom-menu-item" value="Soltero/a">
              Soltero/a
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Casado/a">
              Casado/a
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Viudo/a">
              Viudo/a
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Divorciado/a">
              Divorciado/a
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Conviviente civil">
              Conviviente civil
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Separado">
              Separado
            </MenuItem>
          </CustomSelect>
        </div>
        <div className="center-2">
          <CustomSelect
            placeholder="Sexo"
            size="small"
            onChange={setSexo}
            helpertext="Selecciona un sexo"
            value={sexo}
            name="sexo"
            error={errorsexo}
            funcionError={setErrorSexo}
          >
            <MenuItem className="custom-menu-item" value="Masculino">
              Masculino
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Femenino">
              Femenino
            </MenuItem>
          </CustomSelect>
        </div>
        <div className="center-2">
          <CustomSelect
            placeholder="Nacionalidad"
            size="small"
            onChange={setNacion}
            helpertext="Selecciona una nacionalidad"
            value={nacion}
            name="nacion"
            error={errornacion}
            funcionError={setErrorNacion}
          >
            {naciones.map((item, index) => (
              <MenuItem className="custom-menu-item" value={item}>
                {item}
              </MenuItem>
            ))}
          </CustomSelect>
        </div>
        <div className="center-2">
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <KeyboardDatePicker
              error={errorFecha}
              inputVariant="outlined"
              fullWidth
              size="small"
              label="Fecha de nacimiento"
              // minDate={new Date("2010-01-01")}
              maxDate={new Date()}
              helperText={
                errorFecha ? "Fecha de nacimiento no puede estar vacio" : null
              }
              openTo="year"
              format="dd/MM/yyyy"
              value={fechaNacimiento}
              // maxDate={new Date()}
              onChange={(newValue) => {
                setErrorFecha(false);
                setFechaNacimiento(newValue);
              }}
              style={{ backgroundColor: "#F3F8FE" }}
              InputProps={{
                className: "input-date-picker-inicio",
                readOnly: true,
                style: { paddingRight: 0 },
              }}
              className="date-picker-inicio"
              InputLabelProps={{ className: "input-label-date-form" }}
              FormHelperTextProps={{
                className: "helper-text-fecha-nacimiento",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      <div className="bottom-reg-a2">
        <ListItem button className="btn-rut-reg-a" onClick={() => setView("A")}>
          <p style={{ color: "white" }}>Atras</p>
        </ListItem>
        <ListItem button onClick={validacion} className="btn-rut-reg-a">
          <p style={{ color: "white" }}>Siguiente</p>
        </ListItem>
      </div>
    </div>
  );
};

export default RegistroA2;
