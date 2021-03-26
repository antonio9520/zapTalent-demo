import React, { forwardRef, useState, useEffect } from "react";
import clientAxios from "../../../../../config/axios";
import {
  CustomInput,
  CustomSelectB,
  IconButton as CustomIconButton,
  Button,
} from "../../../../../components";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Close } from "@material-ui/icons";
import { MenuItem, LinearProgress } from "@material-ui/core";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";
import { formatRut, RutFormat, validateRut } from "@fdograph/rut-utilities";

import validator from "validator";

const Formulario = forwardRef(
  ({ data, closeModal, refreshPerfiles, setRefreshPerfiles }, ref) => {
    const [tipoPerfil, setTipoPerfil] = useState(data ? data.tipoPerfil : "");
    const [rut, setRut] = useState(data ? data.rut : "");
    const [nombres, setNombres] = useState(data ? data.nombres : "");
    const [apellidos, setApellidos] = useState(data ? data.apellidos : "");
    const [email, setEmail] = useState(data ? data.email : "");
    const [fechaInicio, setFechaInicio] = useState(
      data ? data.fechaInicio : null
    );
    const [fechaTermino, setFechaTermino] = useState(
      data ? data.fechaTermino : null
    );
    const [emailCopy] = useState(data ? data.email : "");
    const [loading, setLoading] = useState(false);
    const [_switch, setSwitch] = useState(false);
    const [initDefault, setInitDefault] = useState(true);

    //ERRORES
    const [tipoPerfilError, setTipoPerfilError] = useState(false);
    const [rutError, setRutError] = useState(false);
    const [nombresError, setNombresError] = useState(false);
    const [apellidosError, setApellidosError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [fechaInicioError, setFechaInicioError] = useState(false);
    const [fechaTerminoError, setFechaTerminoError] = useState(false);
    const [emailmsg, setEmailMsg] = useState("");
    const [fechaMsg, setFechaMsg] = useState("");
    const [rutMsg, setRutMsg] = useState("");

    console.log(data);
    const guardarPerfil = async () => {
      setLoading(true);
      try {
        await clientAxios.put(`/api/usuarioEmpresa/${data._id}`, {
          tipoPerfil,
          nombres,
          apellidos,
          rut,
          email: email.toLocaleLowerCase(),
          fechaInicio,
          fechaTermino,
        });
        setTimeout(() => {
          setLoading(false);
          setRefreshPerfiles(!refreshPerfiles);
          closeModal();
        }, 1000);
        console.log("perfil editado correctamente");
      } catch (error) {
        console.log(error);
      }
    };

    const validacion = async () => {
      let rutvalidado = validateRut(rut.toLocaleLowerCase());
      const _email = await clientAxios.put(
        "/api/usuarioEmpresa/validar/email",
        {
          email: email.toLocaleLowerCase(),
        }
      );
      const emailv = validator.isEmail(email);
      if (tipoPerfil === "") {
        setTipoPerfilError(true);
      }
      if (rut.trim() === "") {
        setRutMsg("No puede estar vacio");
        setRutError(true);
      } else if (rutvalidado === false) {
        setRutMsg("Ingrese un rut valido");
        setRutError(true);
      }
      if (nombres === "") {
        setNombresError(true);
      }
      if (apellidos === "") {
        setApellidosError(true);
      }
      if (email.trim() === "") {
        setEmailMsg("No puede estar vacio");
        setEmailError(true);
      } else if (emailv === false) {
        setEmailMsg("El formato es invalido");
        setEmailError(true);
      } else if (emailCopy !== email) {
        if (_email.data._email === true) {
          setEmailMsg("El email ya se encuentra registrado");
          setEmailError(true);
        }
      }

      if (fechaInicio === null) {
        setFechaInicioError(true);
      } else if (fechaTermino === null) {
        setFechaMsg("No puede estar vacio");
        setFechaTerminoError(true);
      } else if (Date.parse(fechaInicio) > Date.parse(fechaTermino)) {
        setFechaMsg("Fecha termino no puede ser mayor a Fecha inicio");
        setFechaTerminoError(true);
      }

      setTimeout(() => {
        setInitDefault(false);
        setSwitch(!_switch);
      }, 100);
    };

    const formatRut2 = () => {
      try {
        document.getElementById(`input-rut-add-perfil-emp-admin`).value = rut;
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      if (initDefault === false) {
        if (
          tipoPerfilError ||
          rutError ||
          nombresError ||
          apellidosError ||
          emailError ||
          fechaInicioError ||
          fechaTerminoError
        ) {
          return;
        } else {
          guardarPerfil();
        }
      }
    }, [_switch]);
    return (
      <div ref={ref} className="form-add-perfil-emp-admin">
        <div style={{ padding: 40 }}>
          <p className="p1">Editar perfil</p>
          <div className="item">
            <CustomSelectB
              label="Tipo de perfil"
              helpertext="No puede estar vacio"
              error={tipoPerfilError}
              value={tipoPerfil}
              defaultValue={tipoPerfil}
              onChange={(e) => {
                setTipoPerfilError(false);
                setTipoPerfil(e.target.value);
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
          <div className="item">
            <CustomInput
              label="Nombre"
              helpertext="No puede estar vacio"
              error={nombresError}
              type="text"
              value={nombres}
              defaultValue={nombres}
              onChange={(e) => {
                setNombresError(false);
                setNombres(e.target.value);
              }}
            />
          </div>
          <div className="item">
            <CustomInput
              label="Apellidos"
              helpertext="No puede estar vacio"
              error={apellidosError}
              type="text"
              value={apellidos}
              defaultValue={apellidos}
              onChange={(e) => {
                setApellidosError(false);
                setApellidos(e.target.value);
              }}
            />
          </div>
          <div className="item">
            <CustomInput
              label="Rut"
              id={`input-rut-add-perfil-emp-admin`}
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
          <div className="item">
            <CustomInput
              label="Email"
              helpertext={emailmsg}
              error={emailError}
              type="text"
              value={email}
              defaultValue={email}
              onChange={(e) => {
                setEmailError(false);
                setEmail(e.target.value);
              }}
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
                    fechaInicioError
                      ? "Fecha inicio no puede estar vacio"
                      : null
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
          <div className="bottom">
            <Button variant="contained" color="primary" onClick={closeModal}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={validacion}>
              Guardar
            </Button>
          </div>
        </div>
        {loading ? (
          <>
            <div className="overlay-loading"></div>
            <div className="linear-progres-global">
              <LinearProgress className="progres-editar-perfil" />
            </div>
          </>
        ) : null}
        <div className="cont-icon-close-formulario">
          <CustomIconButton
            bg="close"
            size="small"
            customcolor="close"
            onClick={closeModal}
            disabled={loading}
          >
            <Close className="icon-close" />
          </CustomIconButton>
        </div>
      </div>
    );
  }
);

export default Formulario;
