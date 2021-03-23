import React, { useState, useEffect } from "react";
import "./Perfil.css";
import {
  Button,
  Tooltip,
  CustomInput,
  CustomSelectB,
} from "../../../../../../../components";
import { MenuItem, IconButton, makeStyles } from "@material-ui/core";
import { Close, VpnKey } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";
import { formatRut, RutFormat, validateRut } from "@fdograph/rut-utilities";
import shortid from "shortid";
import clientAxios from "../../../../../../../config/axios";
import validator from "validator";

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

const Perfil = ({ perfiles, setPerfiles, recargar, data, errores2 }) => {
  const {
    id,
    tipoPerfil,
    rut,
    nombres,
    apellidos,
    email,
    password,
    fechaInicio,
    fechaTermino,
  } = data;
  const classes = useStyles();
  const [tipoPlanA, setTipoPlan] = useState(tipoPerfil);
  const [rutA, setRut] = useState(rut);
  const [nombresA, setNombres] = useState(nombres);
  const [apellidosA, setApellidos] = useState(apellidos);
  const [emailA, setEmail] = useState(email);
  const [passwordA, setPassword] = useState(password);
  const [fechaInicioA, setFechaInicio] = useState(fechaInicio);
  const [fechaTerminoA, setFechaTermino] = useState(fechaTermino);
  const [initDefault, setInitDefault] = useState(true);
  const [error, setError] = useState(false);

  //ERRORES
  const [tipoPerfilError, setTipoPerfilError] = useState(false);
  const [rutError, setRutError] = useState(false);
  const [nombresError, setNombresError] = useState(false);
  const [apellidosError, setApellidosError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [fechaInicioError, setFechaInicioError] = useState(false);
  const [fechaTerminoError, setFechaTerminoError] = useState(false);
  const [emailmsg, setEmailMsg] = useState("");
  const [fechaMsg, setFechaMsg] = useState("");
  const [rutMsg, setRutMsg] = useState("");
  const [passMsg, setPassMsg] = useState("");

  const formatRut2 = () => {
    try {
      document.getElementById(
        `input-rut-empresa-usuario-admin-${id}`
      ).value = rutA;
      perfiles.map((item) => {
        if (item.id === id) {
          item.rut = rutA;
        }
      });
      console.log(perfiles);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (perfiles.length === 1) {
      return;
    } else {
      await setPerfiles(perfiles.filter((i) => i.id !== id));
      recargar();
    }
  };
  const generateKey = () => {
    let key = shortid();
    perfiles.map((item) => {
      if (item.id === id) {
        item.password = key;
      }
    });
    setPassword(key);
  };
  const validarErrores = async () => {
    let rutvalidado = validateRut(rutA.toLocaleLowerCase());
    const _email = await clientAxios.put("/api/usuarioEmpresa/validar/email", {
      email: emailA.toLocaleLowerCase(),
    });
    const emailv = validator.isEmail(emailA);
    if (tipoPlanA === "") {
      setTipoPerfilError(true);
    }
    if (rutA.trim() === "") {
      setRutMsg("No puede estar vacio");
      setRutError(true);
    } else if (rutvalidado === false) {
      setRutMsg("Ingrese un rut valido");
      setRutError(true);
    }
    if (nombresA === "") {
      setNombresError(true);
    }
    if (apellidosA === "") {
      setApellidosError(true);
    }
    if (emailA.trim() === "") {
      setEmailMsg("No puede estar vacio");
      setEmailError(true);
    } else if (emailv === false) {
      setEmailMsg("El formato es invalido");
      setEmailError(true);
    } else if (_email.data._email === true) {
      setEmailMsg("El email ya se encuentra registrado");
      setEmailError(true);
    }
    if (passwordA.trim() === "") {
      setPassMsg("No puede estar vacio");
      setPasswordError(true);
    } else if (passwordA.lenth < 6) {
      setPassMsg("Debe contener almenos 6 caracteres");
      setPasswordError(true);
    }
    if (fechaInicioA === null) {
      setFechaInicioError(true);
    } else if (fechaTermino === null) {
      setFechaMsg("No puede estar vacio");
      setFechaTerminoError(true);
    } else if (Date.parse(fechaInicioA) > Date.parse(fechaTerminoA)) {
      setFechaMsg("Fecha termino no puede ser mayor a Fecha inicio");
      setFechaTerminoError(true);
    }
  };
  useEffect(() => {
    if (initDefault === false) {
      if (errores2.length > 0) {
        console.log(errores2);
        const valor = errores2.filter((item) => item === data.id);
        if (valor.length > 0) {
          setError(true);
          document.getElementById(id).scrollIntoView();
          validarErrores();
        } else {
          setError(false);
        }
      }
    }
    setInitDefault(false);
    console.log(errores2);
  }, [errores2]);

  return (
    <div
      className="perfil-add-emp-admin"
      id={id}
      style={{
        border: error ? "1px solid #f44336" : null,
        backgroundColor: error ? "#f4433605" : null,
      }}
    >
      <div className="item">
        <CustomSelectB
          label="Tipo de perfil"
          helpertext="No puede estar vacio"
          error={tipoPerfilError}
          value={tipoPlanA}
          defaultValue={tipoPlanA}
          onChange={(e) => {
            setTipoPerfilError(false);
            perfiles.map((item) => {
              if (item.id === id) {
                item.tipoPerfil = e.target.value;
              }
            });
            setTipoPlan(e.target.value);
          }}
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
            helpertext="No puede estar vacio"
            error={nombresError}
            type="text"
            value={nombresA}
            defaultValue={nombresA}
            onChange={(e) => {
              setNombresError(false);
              perfiles.map((item) => {
                if (item.id === id) {
                  item.nombres = e.target.value;
                }
              });
              console.log(perfiles);
              setNombres(e.target.value);
            }}
          />
        </div>
        <div style={{ paddingLeft: 5 }}>
          <CustomInput
            label="Apellidos"
            helpertext="No puede estar vacio"
            error={apellidosError}
            type="text"
            value={apellidosA}
            defaultValue={apellidosA}
            onChange={(e) => {
              setApellidosError(false);
              perfiles.map((item) => {
                if (item.id === id) {
                  item.apellidos = e.target.value;
                }
              });
              setApellidos(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="item-doble">
        <div style={{ paddingRight: 5 }}>
          <CustomInput
            label="Rut"
            id={`input-rut-empresa-usuario-admin-${id}`}
            error={rutError}
            helpertext={rutMsg}
            type="text"
            // value={rut}
            defaultValue={rut}
            onChange={(e) => {
              setRutError(false);
              setRut(formatRut(e.target.value, RutFormat.DOTS_DASH));
            }}
            onBlur={formatRut2}
          />
        </div>
        <div style={{ paddingLeft: 5 }}>
          <CustomInput
            label="Email"
            helpertext={emailmsg}
            error={emailError}
            type="text"
            value={emailA}
            defaultValue={emailA}
            onChange={(e) => {
              setEmailError(false);
              perfiles.map((item) => {
                if (item.id === id) {
                  item.email = e.target.value;
                }
              });
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="item">
        <CustomInput
          label="Contraseña provisoria"
          helpertext={passMsg}
          error={passwordError}
          type="text"
          value={passwordA}
          defaultValue={passwordA}
          onChange={(e) => {
            setPasswordError(false);
            perfiles.map((item) => {
              if (item.id === id) {
                item.password = e.target.value;
              }
            });
            setPassword(e.target.value);
          }}
          endAdornment={
            <Tooltip title="Generar contraseña aleatoria" placement="top">
              <IconButton size="small" onClick={generateKey}>
                <VpnKey fontSize="small" />
              </IconButton>
            </Tooltip>
          }
        />
      </div>
      <div className="item-doble">
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
              value={fechaInicioA}
              // maxDate={new Date()}
              onChange={(newValue) => {
                setFechaInicioError(false);
                perfiles.map((item) => {
                  if (item.id === id) {
                    item.fechaInicio = newValue;
                  }
                });
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
              value={fechaTerminoA}
              minDate={new Date()}
              maxDate={new Date("2030-01-01")}
              // maxDate={new Date()}
              onChange={(newValue) => {
                setFechaTerminoError(false);
                perfiles.map((item) => {
                  if (item.id === id) {
                    item.fechaTermino = newValue;
                  }
                });
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
