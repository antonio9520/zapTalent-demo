import React, { useState, useEffect } from "react";
import "./Forms.css";
import { IconButton, ListItem, MenuItem } from "@material-ui/core";
import {
  Edit,
  AccountCircle,
  Fingerprint,
  MailOutline,
  Group,
  Flag,
  MonetizationOn,
  Event,
} from "@material-ui/icons";
import { CustomInput, CustomSelectB, Tooltip } from "../../../../../components";
import { editarUsuarioAction } from "../../../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { formatRut, RutFormat, validateRut } from "@fdograph/rut-utilities";
import validator from "validator";
import { naciones } from "../../../../../assets/nacionalidades";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";

const EditPerfil = ({ usuario, loading }) => {
  const dispatch = useDispatch();
  const [editar, setEditar] = useState(true);
  const [nombres, setNombres] = useState(usuario ? usuario.nombres : null);
  const [apellidos, setApellidos] = useState(
    usuario ? usuario.apellidos : null
  );
  const [rut, setRut] = useState(usuario ? usuario.rut : null);
  const [passport, setPassport] = useState(usuario ? usuario.passport : null);
  const [email, setEmail] = useState(usuario ? usuario.email : null);
  const [ecivil, setEcivil] = useState(usuario ? usuario.ecivil : null);
  const [nacion, setNacion] = useState(usuario ? usuario.nacion : null);
  const [pretencion, setPretencion] = useState(
    usuario ? usuario.pretencion : null
  );
  const [fechaNacimiento, setFechaNacimiento] = useState(
    usuario ? (usuario.fechaNacimiento ? usuario.fechaNacimiento : null) : null
  );
  const [consultor, setConsultor] = useState(
    usuario ? usuario.consultor : null
  );
  const [_id] = useState(usuario ? usuario._id : null);
  const [rutmsg, setRutMsg] = useState("");
  const [rutError, setRutError] = useState(false);
  const [passportError, setPassportError] = useState(false);
  const [nacionerror, setErrorNacion] = useState(false);
  const [errornombre, setErrorNombre] = useState(false);
  const [errorapellido, setErrorApellido] = useState(false);
  const [erroremail, setErrorEmail] = useState(false);
  const [emailmsg, setEmailMsg] = useState("");
  const [nombresmsg, setNombresMsg] = useState("");
  const [apellidosmsg, setApellidosMsg] = useState("");
  const [errorpretencion, setErrorPretencion] = useState(false);
  // const [nacionmsg, setNacionMsg] = useState("");
  const [rutPassport, setRutPassport] = useState(false);

  const formatRut2 = () => {
    try {
      document.getElementById("input-rut-ed-two").value = rut;
    } catch (error) {
      console.log(error);
    }
  };
  const pattern = new RegExp(
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
  );
  const pattern2 = new RegExp(
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
  );
  const pattern3 = new RegExp(
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
  );
  const handleClick = () => {
    //validacion rut
    if (rutPassport) {
      if (passport.trim() === "") {
        setPassportError(true);
        return;
      }
    } else {
      const rutvalidado = validateRut(rut.toLocaleLowerCase());
      if (rut.trim() === "") {
        setRutMsg("Rut no puede estar vacio");
        setRutError(true);
        return;
      } else if (rutvalidado === false) {
        setRutMsg("El rut no es valido");
        setRutError(true);
        return;
      }
    }
    //validacion nombre
    if (nombres.trim() === "") {
      setErrorNombre(true);
      setNombresMsg("Nombres no puede estar vacio");
      return;
    } else if (pattern.test(nombres.trim()) === false) {
      setErrorNombre(true);
      setNombresMsg("Nombres no puede contener numeros");
      return;
    }
    //validacion apellido
    if (apellidos.trim() === "") {
      setErrorApellido(true);
      setApellidosMsg(`Apellidos no puede estar vacio`);
      return;
    } else if (pattern2.test(apellidos.trim()) === false) {
      setErrorApellido(true);
      setApellidosMsg(`Apellidos no puede contener numeros`);
      return;
    }
    //validar email
    const emailv = validator.isEmail(email);
    if (email.trim() === "") {
      setErrorEmail(true);
      setEmailMsg("Email no puede estar vacio");
      return;
    } else if (emailv === false) {
      setErrorEmail(true);
      setEmailMsg("El formato de email es erroneo");
      return;
    }

    if (parseInt(pretencion) < 1) {
      setErrorPretencion(true);
      return;
    }
    if (rutPassport) {
      dispatch(
        editarUsuarioAction({
          _id,
          passport,
          nombres,
          apellidos,
          email,
          ecivil,
          nacion,
          consultor,
          pretencion,
          fechaNacimiento,
        })
      );
    } else {
      dispatch(
        editarUsuarioAction({
          _id,
          rut,
          nombres,
          apellidos,
          email,
          ecivil,
          nacion,
          consultor,
          pretencion,
          fechaNacimiento,
        })
      );
    }

    setEditar(true);
  };

  const changeRut = (e) => {
    if (rutError === true) {
      setRutError(false);
    }
    setRut(formatRut(e.target.value, RutFormat.DOTS_DASH));
  };

  const resetForm = () => {
    setNombres(usuario ? usuario.nombres : null);
    setApellidos(usuario ? usuario.apellidos : null);
    setRut(usuario ? usuario.rut : null);
    setPassport(usuario ? usuario.passport : null);
    setEmail(usuario ? usuario.email : null);
    setEcivil(usuario ? usuario.ecivil : null);
    setNacion(usuario ? usuario.nacion : null);
    setConsultor(usuario ? usuario.consultor : null);
    setRutError(false);
    setErrorNacion(false);
    setErrorNombre(false);
    setErrorApellido(false);
    setErrorEmail(false);
    setPassportError(false);
  };
  useEffect(() => {
    if (usuario) {
      if (usuario.passport !== "") {
        setRutPassport(true);
      } else {
        setRutPassport(false);
      }
    }
  }, [usuario]);
  return (
    <>
      <div style={{ position: "relative", height: "500px" }}>
        <div className="top-edit-perfil-2">
          <p>Editar perfil</p>
          <Tooltip title="Editar">
            <IconButton
              className={
                !editar || loading
                  ? "icon-btn-edit-perfil-inact"
                  : "icon-btn-edit-perfil"
              }
              onClick={() => setEditar(!editar)}
              disabled={!editar || loading}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </div>
        <div className="form-edit-perfil">
          <div className="item-edit-perfil" style={{ marginBottom: "20px" }}>
            <AccountCircle className="icon-form-edit-perfil" />
            <p className="p-tipo-consultor-edit-perfil">Tipo Consultor</p>
            <div className="tipo-consultor-edit-perfil">
              <div
                className={consultor === "Training" ? "tc-active" : null}
                onClick={() => (editar ? null : setConsultor("Training"))}
                style={{
                  opacity: editar ? "0.5" : null,
                  cursor: editar ? "inherit" : "pointer",
                }}
              >
                <p>Training</p>
              </div>
              <div
                className={consultor === "Junior" ? "tc-active" : null}
                onClick={() => (editar ? null : setConsultor("Junior"))}
                style={{
                  opacity: editar ? "0.5" : null,
                  cursor: editar ? "inherit" : "pointer",
                }}
              >
                <p>Junior</p>
              </div>
              <div
                className={consultor === "Semi Senior" ? "tc-active" : null}
                onClick={() => (editar ? null : setConsultor("Semi Senior"))}
                style={{
                  opacity: editar ? "0.5" : null,
                  cursor: editar ? "inherit" : "pointer",
                }}
              >
                <p>Semi Senior</p>
              </div>
              <div
                className={consultor === "Senior" ? "tc-active" : null}
                onClick={() => (editar ? null : setConsultor("Senior"))}
                style={{
                  opacity: editar ? "0.5" : null,
                  cursor: editar ? "inherit" : "pointer",
                }}
              >
                <p>Senior</p>
              </div>
            </div>
          </div>
          <div className="item-edit-perfil">
            <AccountCircle className="icon-form-edit-perfil" />
            <CustomInput
              label="Nombres"
              defaultValue={nombres}
              value={nombres}
              onChange={(e) => {
                setErrorNombre(false);
                setNombres(e.target.value);
              }}
              error={errornombre}
              helpertext={nombresmsg}
              name="names"
              disabled={editar}
            />
          </div>
          <div className="item-edit-perfil">
            <AccountCircle className="icon-form-edit-perfil" />
            <CustomInput
              label="Apellidos"
              defaultValue={apellidos}
              value={apellidos}
              onChange={(e) => {
                setErrorApellido(false);
                setApellidos(e.target.value);
              }}
              error={errorapellido}
              helpertext={apellidosmsg}
              name="last-names"
              disabled={editar}
            />
          </div>
          {rutPassport ? (
            <div className="item-edit-perfil">
              <Fingerprint className="icon-form-edit-perfil" />
              <CustomInput
                label="Pasaporte"
                defaultValue={passport}
                value={passport}
                onChange={(e) => {
                  setPassportError(false);
                  setPassport(e.target.value);
                }}
                error={passportError}
                helpertext={"Pasaporte no puede estar vacio"}
                name="passport"
                disabled={editar}
              />
            </div>
          ) : (
            <div className="item-edit-perfil">
              <Fingerprint className="icon-form-edit-perfil" />
              <CustomInput
                label="Rut"
                defaultValue={rut}
                // value={rut}
                onChange={changeRut}
                onBlur={formatRut2}
                id="input-rut-ed-two"
                error={rutError}
                helpertext={rutmsg}
                name="names"
                disabled={editar}
              />
            </div>
          )}
          <div className="item-edit-perfil">
            <MailOutline className="icon-form-edit-perfil" />
            <CustomInput
              label="Email"
              defaultValue={email}
              onChange={(e) => {
                setErrorEmail(false);
                setEmail(e.target.value);
              }}
              error={erroremail}
              value={email}
              helpertext={emailmsg}
              name="email"
              disabled={editar}
            />
          </div>
          <div className="item-edit-perfil">
            <Group className="icon-form-edit-perfil" />
            <CustomSelectB
              label="Estado civil"
              defaultValue={ecivil}
              value={ecivil}
              onChange={(e) => setEcivil(e.target.value)}
              disabled={editar}
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
            </CustomSelectB>
          </div>
          <div className="item-edit-perfil">
            <Flag className="icon-form-edit-perfil" />

            <CustomSelectB
              error={nacionerror}
              label="Nacionalidad"
              defaultValue={nacion}
              value={nacion}
              onChange={(e) => {
                setErrorNacion(false);
                setNacion(e.target.value);
              }}
              name="nation"
              disabled={editar}
            >
              {naciones.map((item, index) => (
                <MenuItem key={index} className="custom-menu-item" value={item}>
                  {item}
                </MenuItem>
              ))}
            </CustomSelectB>
          </div>
          <div className="item-edit-perfil">
            <MonetizationOn className="icon-form-edit-perfil" />
            <CustomInput
              label="Pretención de renta"
              defaultValue={pretencion}
              value={pretencion}
              type="number"
              onChange={(e) => {
                setErrorPretencion(false);
                setPretencion(e.target.value);
              }}
              error={errorpretencion}
              helpertext="Introduzca un numero valido."
              name="pretencionrenta"
              disabled={editar}
            />
          </div>
          <div className="item-edit-perfil">
            <Event className="icon-form-edit-perfil" />

            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
              <KeyboardDatePicker
                // error={errorFecha}
                disabled={editar}
                fullWidth
                size="small"
                label="Fecha de nacimiento"
                // minDate={new Date("2010-01-01")}
                maxDate={new Date()}
                // helperText={
                //   errorFecha ? "Fecha de nacimiento no puede estar vacio" : null
                // }
                openTo="year"
                format="dd/MM/yyyy"
                value={fechaNacimiento}
                // maxDate={new Date()}
                onChange={(newValue) => {
                  setFechaNacimiento(newValue);
                }}
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
        <div className="cont-btn-edit-perfil">
          <ListItem
            button
            disabled={editar}
            className="btn-adnzap-modal"
            onClick={() => {
              resetForm();
              setEditar(!editar);
            }}
          >
            <p style={{ color: "white" }}>Cancelar</p>
          </ListItem>
          <ListItem
            disabled={editar}
            button
            className="btn-adnzap-modal"
            onClick={() => handleClick()}
          >
            <p style={{ color: "white" }}>Guardar</p>
          </ListItem>
        </div>
      </div>
    </>
  );
};

export default EditPerfil;
