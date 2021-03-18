import React, { useState, useEffect } from "react";
import "./RegistroA.css";
import logo from "../../../../resources/img/ZAPTalent-Logotipo-Vertical-Original.svg";
import {
  ListItem,
  FormControl,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { formatRut, RutFormat, validateRut } from "@fdograph/rut-utilities";
import InputMask from "react-input-mask";
import validator from "validator";
import { OutInput } from "../../../../components";
import clienteAxios from "../../../../config/axios";

const RegistroA = (props) => {
  const {
    setView,
    rut,
    passport,
    nombres,
    apellidos,
    phone,
    email,
    password,
    rpassword,
    setRut,
    setPassport,
    setNombres,
    setApellidos,
    setPhone,
    setEmail,
    setPassword,
    setRpassword,
    handleClose,
    inputRut,
    setInputRut,
  } = props;

  const [rutmsg, setRutMsg] = useState("");
  const [rutError, setRutError] = useState(false);
  const [passportError, setPassportError] = useState(false);
  const [errornombre, setErrorNombre] = useState(false);
  const [errorapellido, setErrorApellido] = useState(false);
  const [errorpassword, setErrorPassword] = useState(false);
  const [passwordmsg, setPasswordMsg] = useState("");
  const [errorrpassword, setErrorRpassword] = useState(false);
  const [rpasswordmsg, setRpasswordMsg] = useState("");
  const [erroremail, setErrorEmail] = useState(false);
  const [emailmsg, setEmailMsg] = useState("");
  const [errorphone, setErrorPhone] = useState(false);
  const [phonemsg, setPhoneMsg] = useState("");
  const [_switch, setSwitch] = useState(false);
  const [initDefault, setInitDefault] = useState(true);
  const [nombresmsg, setNombresMsg] = useState("");
  const [apellidomsg, setApellidoMsg] = useState("");

  const formatRut2 = () => {
    document.getElementById("input-rut").value = rut;
  };
  const pattern = new RegExp(
    /^[a-zA-ZÀ-ÿ\-\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\-\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\-\u00f1\u00d1]+$/g
  );
  const pattern2 = new RegExp(
    /^[a-zA-ZÀ-ÿ\-\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\-\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\-\u00f1\u00d1]+$/g
  );

  //Validacion
  const validacion = async () => {
    //validacion rut
    console.log(rut.toLocaleLowerCase());

    if (inputRut === true) {
      const rutvalidado = validateRut(rut.toLocaleLowerCase());
      if (rut.trim() === "") {
        setRutMsg("Rut no puede estar vacio");
        setRutError(true);

        // return;
      } else if (rutvalidado === false) {
        setRutMsg("El rut no es valido");
        setRutError(true);

        // return;
      }
    } else {
      //validacion pasaporte
      if (passport.trim() === "") {
        setPassportError(true);

        // return;
      }
    }

    //validacion nombre
    if (nombres.trim() === "") {
      setErrorNombre(true);
      setNombresMsg("Nombres no puede estar vacio");
      // return;
    } else if (pattern.test(nombres.trim()) === false) {
      setErrorNombre(true);
      setNombresMsg("Nombres no puede contener numeros");
    }
    //validacion apellido
    if (apellidos.trim() === "") {
      setErrorApellido(true);
      setApellidoMsg("Apellidos no puede estar vacio");
      // return;
    } else if (pattern2.test(apellidos.trim()) === false) {
      setErrorApellido(true);
      setApellidoMsg(`Apellidos no puede contener numeros`);
    }
    //validacion password
    if (password.trim() === "") {
      setErrorPassword(true);
      setPasswordMsg("Password no puede estar vacio");
      // return;
    } else if (password.length < 6) {
      setErrorPassword(true);
      setPasswordMsg("Password debe ser de almenos 6 caracteres");
      // return;
    }
    //validacion repetir password
    if (rpassword.trim() === "") {
      setErrorRpassword(true);
      setRpasswordMsg("Password no puede estar vacio");
      // return;
    } else if (rpassword !== password) {
      setErrorRpassword(true);
      setRpasswordMsg("Password no coincide");
      // return;
    }
    //validar telefono
    if (phone.trim() === "") {
      setErrorPhone(true);
      setPhoneMsg("Ingrese un numero de telefono");
      // return;
    } else {
      let numberPhone = phone.replace(/\D/g, "");
      if (numberPhone.length < 11) {
        setErrorPhone(true);
        setPhoneMsg("Ingrese un numero de telefono valido");
      }
    }
    //validar email
    const emailv = validator.isEmail(email);
    if (email.trim() === "") {
      setErrorEmail(true);
      setEmailMsg("Email no puede estar vacio");
      // return;
    } else if (emailv === false) {
      setErrorEmail(true);
      setEmailMsg("El formato de email es erroneo");
      // return;
    }
    await validarEmailRut({
      email,
      rut,
    }).then((res) => {
      if (res._email) {
        setErrorEmail(res._email ? true : false);
        setEmailMsg("El email ya se encuentra registrado");
      }
      if (res._rut) {
        setRutError(res._rut ? true : false);
        setRutMsg("El rut ya pertenece a un usuario");
      }
    });

    //validar estado civil
    setInitDefault(false);
    setSwitch(!_switch);
  };

  // console.log(validator.isEmail("foobar.com"));
  const changeRut = (e) => {
    if (rutError === true) {
      setRutError(false);
    }
    setRut(formatRut(e.target.value, RutFormat.DOTS_DASH));
  };

  const changePhone = (e) => {
    setErrorPhone(false);
    setPhone(e.target.value);
  };

  const validarEmailRut = async ({ email, rut }) => {
    let data;
    const lowerEmail = email.toLocaleLowerCase();
    try {
      await clienteAxios
        .post("/api/usuarios/validacion/rut-email", { email: lowerEmail, rut })
        .then((res) => (data = res.data));

      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (initDefault === false) {
      if (
        errornombre === true ||
        erroremail === true ||
        errorapellido === true ||
        errorpassword === true ||
        errorrpassword === true ||
        errorphone === true ||
        rutError === true ||
        passportError === true
      ) {
        return;
      } else {
        setView("A2");
      }
    }
  }, [_switch]);
  console.log(phone);
  return (
    <div className="cont-reg-A">
      <div className="btn-close-registro">
        <IconButton onClick={() => handleClose()}>
          <Close />
        </IconButton>
      </div>
      <div className="top-reg-A">
        <img src={logo} alt="logo" className="logo-login-re" />
        <p className="p-top-reg-a">
          Para comenzar, nesesitamos tus datos básicos:
        </p>
        <div>
          <ListItem
            button
            className="btn-rut-reg-a"
            disabled={!inputRut ? false : true}
            onClick={() => {
              setInputRut(true);
              setPassport("");
              setPassportError(false);
            }}
          >
            <p style={{ color: "white" }}>Rut</p>
          </ListItem>
          <ListItem
            button
            className="btn-rut-reg-a"
            disabled={inputRut ? false : true}
            onClick={() => {
              setInputRut(false);
              setRutError(false);
              setRut("");
            }}
          >
            <p style={{ color: "white" }}>Pasaporte</p>
          </ListItem>
        </div>
      </div>
      <div className="center-reg-A">
        <div className="center-1">
          {inputRut ? (
            <div
              className={!rutError ? "contCustomInput" : "contCustomInputError"}
            >
              <FormHelperText
                id="helper-email"
                className={
                  rutError ? "helper-text-error" : "helper-text-error-inact"
                }
              >
                {rutmsg}
              </FormHelperText>
              <FormControl
                variant="outlined"
                className="form-control-login form-control-small"
                size="small"
                fullWidth
                error={rutError}
              >
                <InputLabel htmlFor="my-input" className="input-label-login ">
                  Rut
                </InputLabel>
                <OutlinedInput
                  className="text-field-login "
                  id="input-rut"
                  aria-describedby="helper-email"
                  label="Rut"
                  name="rut"
                  defaultValue={rut}
                  onBlur={formatRut2}
                  onChange={(e) => {
                    changeRut(e);
                    // setInitDefault(true);
                  }}
                />
              </FormControl>
            </div>
          ) : null}
          {!inputRut ? (
            <OutInput
              label="Pasaporte"
              helpertext="Pasaporte no puede estar vacio"
              funcOnChange={setPassport}
              size="small"
              name="passport"
              defaultValue={passport}
              setPassportError={setPassportError}
              error={passportError}
            />
          ) : null}
        </div>
        <div className="center-1">
          <OutInput
            label="Nombres"
            helpertext={nombresmsg}
            funcOnChange={setNombres}
            defaultValue={nombres}
            name="names"
            size="small"
            type="text"
            error={errornombre}
            funcionError={setErrorNombre}
          />
        </div>
        <div className="center-1">
          <OutInput
            label="Apellidos"
            helpertext={apellidomsg}
            funcOnChange={setApellidos}
            defaultValue={apellidos}
            name="lastnames"
            size="small"
            error={errorapellido}
            funcionError={setErrorApellido}
          />
        </div>
        <div className="center-1">
          <OutInput
            label="Password"
            helpertext={passwordmsg}
            funcOnChange={setPassword}
            defaultValue={password}
            type="password"
            name="passwordR"
            size="small"
            error={errorpassword}
            funcionError={setErrorPassword}
          />
        </div>
        <div className="center-1">
          <OutInput
            label="Repite el password"
            helpertext={rpasswordmsg}
            funcOnChange={setRpassword}
            defaultValue={rpassword}
            type="password"
            name="rpasswordR"
            size="small"
            error={errorrpassword}
            funcionError={setErrorRpassword}
          />
        </div>
        <div className="center-1">
          <div
            className={
              !errorphone ? "cont-phone-reg-a" : "cont-phone-reg-a-error"
            }
          >
            <FormHelperText
              id="helper-email"
              className={
                errorphone ? "helper-text-error" : "helper-text-error-inact"
              }
            ></FormHelperText>
            <FormHelperText
              id="helper-email"
              className={
                errorphone ? "helper-text-error" : "helper-text-error-inact"
              }
            >
              {phonemsg}
            </FormHelperText>
            <FormControl
              variant="outlined"
              className="form-control-login form-control-small"
              size="small"
              fullWidth
              error={errorphone}
            >
              <InputMask
                className="input-mask-custom"
                // mask="+(999) 9999 9999"
                placeholder="+(569) 7890 7890"
                defaultValue={phone}
                mask="+(56\9) 9999 9999"
                // maskChar={null}
                onChange={(e) => changePhone(e)}
              />
            </FormControl>
          </div>
        </div>
        <div className="center-1">
          <OutInput
            label="Correo electrónico"
            helpertext={emailmsg}
            funcOnChange={setEmail}
            defaultValue={email}
            name="correo"
            size="small"
            error={erroremail}
            funcionError={setErrorEmail}
          />
        </div>
      </div>
      <div className="bottom-reg-A">
        <ListItem button className="btn-rut-reg-a" disabled>
          <p style={{ color: "white" }}>Atras</p>
        </ListItem>
        <ListItem
          button
          // onClick={validacion}
          onClick={validacion}
          className="btn-rut-reg-a"
        >
          <p style={{ color: "white" }}>Siguiente</p>
        </ListItem>
      </div>
    </div>
  );
};

export default RegistroA;
