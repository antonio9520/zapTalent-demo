import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../../resources/img/ZAPTalent-Logotipo-Vertical-Original.svg";
import { ListItem } from "@material-ui/core";
import { Facebook } from "@material-ui/icons";
import { Modal, Restablecer, Recuperar, EmailEnviado } from "./components";
import { OutInput } from "../../components";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  iniciarSesionAction,
  usuarioAuthAction,
} from "../../redux/actions/authAction";
import { hiddenAlertAction } from "../../redux/actions/trabajoAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

const Login = (props) => {
  const {
    match: { params },
  } = props;
  const dispatch = useDispatch();
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [emailB, setEmailB] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [emailA, setEmail] = useState("");
  const [emailRec, setEmailRec] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmailRec, setErrorEmailRec] = useState(false);
  const [msgEmailRec, setMsgEmailRec] = useState("");

  const OpenModalF = () => {
    setOpenModal(true);
    setHidden(true);
  };

  const [recuperar, setrecuperar] = useState("default");
  const [token] = useState(params.token);
  // const token = useSelector((state) => state.auth.token);
  const autenticado = useSelector((state) => state.auth.autenticado);
  const erroremail = useSelector((state) => state.auth.erroremail);
  const errorpassword = useSelector((state) => state.auth.errorpassword);
  const loading = useSelector((state) => state.auth.loading);
  const [cargando, setCargando] = useState(false);

  //error reestablecer contraseña msg
  const [errormsg, setErrorMsg] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  // console.log(autenticado);
  useEffect(() => {
    if (autenticado) {
      props.history.push("/ofertas-laborales");
    }
    // eslint-disable-next-line
  }, [autenticado]);
  const funcLogin = () => {
    // Validar
    if (emailA.trim() === "" || password.trim() === "") {
      console.log("los campos son obligatorios");
    }
    const email = emailA.toLocaleLowerCase();

    dispatch(iniciarSesionAction({ email, password }));
  };

  //login facebook
  const responseFacebook = (response) => {
    try {
      axios({
        method: "POST",
        url: "https://zaptalent.azurewebsites.net/api/facebooklogin",
        data: {
          accessToken: response.accessToken,
          userID: response.userID,
          email: response.rese,
        },
      })
        .then((response) => {
          if (response.data.type === "USUARIO_NUEVO") {
            const cadena = () => {
              let cade = response.data.name;
              const cadspl = cade.split(" ");
              if (cadspl.length === 2) {
                setNombres(cadspl[0]);
                setApellidos(cadspl[1]);
              } else if (cadspl.length === 3) {
                setNombres(cadspl[0]);
                setApellidos(cadspl[1] + " " + cadspl[2]);
              } else if (cadspl.length === 4) {
                setNombres(cadspl[0] + " " + cadspl[1]);
                setApellidos(cadspl[2] + " " + cadspl[3]);
              } else if (cadspl.length > 4) {
                setApellidos(
                  cadspl[cadspl.length - 2] + " " + cadspl[cadspl.length - 1]
                );
                for (let i = 0; i < cadspl.length - 2; i++) {
                  setNombres(...nombres, cadspl[i] + " ");
                }
              } else {
                setNombres(cade);
              }
            };
            cadena();
            setEmailB(response.data.email);
            setOpenModal(true);
          } else if (response.data.type === "USUARIO_ENCONTRADO") {
            console.log(response.data.token);
            localStorage.setItem("token", response.data.token);
            dispatch(usuarioAuthAction());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Login google
  const responseGoogle = (response) => {
    try {
      axios({
        method: "POST",
        url: "https://zaptalent.azurewebsites.net/api/googlelogin",
        data: { tokenId: response.tokenId },
      }).then((response) => {
        console.log("Google login sucess", response);
        if (response.data.type === "USUARIO_NUEVO") {
          setNombres(response.data.given_name);
          setApellidos(response.data.family_name);
          setEmailB(response.data.email);
          setOpenModal(true);
        } else if (response.data.type === "USUARIO_ENCONTRADO") {
          localStorage.setItem("token", response.data.token);
          dispatch(usuarioAuthAction());
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //login twitter
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      funcLogin();
    }
  };

  const _alert = useSelector((state) => state.trabajo.alert);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    dispatch(hiddenAlertAction());
  };

  const restablecer = (res) => {
    if (emailRec.trim() === "") {
      setErrorEmailRec(true);
      setMsgEmailRec("El email no debe estar vacio");
      return;
    }

    setCargando(true);
    let emails = emailRec.toLocaleLowerCase();
    axios({
      method: "POST",
      url: `https://zaptalent.azurewebsites.net/api/restablecer/${emails}`,
    })
      .then((res) => {
        setCargando(false);
        setErrorEmailRec(false);
        setrecuperar("emailenviado");
      })
      .catch((error) => {
        console.log(error);
        setCargando(false);
        if (error.response) {
          if (error.response.status === 404) {
            setErrorEmailRec(true);
            setMsgEmailRec("El email no se encuentra registrado");
          }
        }
        console.log(error.response.status);
      });
  };

  useEffect(() => {
    if (token) {
      setrecuperar("restablecer");
    }
  }, [token]);
  useEffect(() => {
    dispatch(usuarioAuthAction());
    // eslint-disable-next-line
  }, []);
  return (
    <div className="conteiner-login">
      <div
        className={
          loading || cargando
            ? "conteniner-spinner-login"
            : "conteniner-spinner-login-hidden"
        }
      >
        <Loader
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          visible={loading || cargando}
          //  timeout={3000} //3 secs
        />
      </div>
      <Modal
        setOpenModal={setOpenModal}
        openModal={openModal}
        setHidden={setHidden}
        setNombres={setNombres}
        setApellidos={setApellidos}
        setEmail={setEmailB}
        nombres={nombres}
        apellidos={apellidos}
        emailA={emailB}
      />
      <img
        src={logo}
        alt="logo"
        className={!hidden ? "logo-login" : "hidden-login"}
      />
      <div className={!hidden ? "card-login" : "card-login-hidden"}>
        {recuperar === "default" ? (
          <div className="cont-left-item">
            <div className="cont-top-login">
              <p>Accede a tu cuenta </p>
              <p>ZAPTalent</p>
            </div>
            <div className="cont-input-login">
              <div className="input-login-form-2">
                <OutInput
                  label="Ingresa tu correo"
                  helpertext="Usuario erróneo, intente nuevamente"
                  funcOnChange={setEmail}
                  error={erroremail}
                  size="medium"
                  name="email"
                  logininput
                  onKeyDown={_handleKeyDown}
                />
              </div>
              <div className="input-login-form-3">
                <OutInput
                  label="Password"
                  helpertext="Password incorrecto"
                  funcOnChange={setPassword}
                  type="password"
                  error={errorpassword}
                  size="medium"
                  name="password"
                  logininput
                  onKeyDown={_handleKeyDown}
                />
              </div>
            </div>
            <div className="cont-btns-login">
              <label>
                <input type="checkbox" name="recordarme" id="" />
                Recordarme
              </label>
              <div className="cont-btn-ing-can-login">
                <ListItem
                  button
                  className="btn-ingresar-login"
                  onClick={() => funcLogin()}
                >
                  <p style={{ color: "white" }}>Ingresar</p>
                </ListItem>
                <Link className="link" to="/inicio">
                  <ListItem button className="btn-cancelar-login">
                    <p
                      style={{
                        width: "150px",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      Cancelar
                    </p>
                  </ListItem>
                </Link>
              </div>
              <p className="link-terminos-condiciones">
                Al ingresar estás aceptando los
                <a href="">Terminos y Condiciones </a>de uso.
              </p>
            </div>
            <div>
              <p>¿Olvidaste tu contraseña?</p>
              <ListItem
                button
                className="btn-recuperar-login"
                onClick={() => setrecuperar("recuperar")}
              >
                <p>Recuperar</p>
              </ListItem>
            </div>
          </div>
        ) : recuperar === "recuperar" ? (
          <Recuperar
            setEmail={setEmailRec}
            setrecuperar={setrecuperar}
            restablecer={restablecer}
            errorEmailRec={errorEmailRec}
            setErrorEmailRec={setErrorEmailRec}
            msgEmailRec={msgEmailRec}
            setCargando={setCargando}
          />
        ) : recuperar === "restablecer" ? (
          <Restablecer
            setrecuperar={setrecuperar}
            token={token}
            setCargando={setCargando}
            setErrorMsg={setErrorMsg}
            setShowAlert={setShowAlert}
            setAlertType={setAlertType}
          />
        ) : recuperar === "emailenviado" ? (
          <EmailEnviado setrecuperar={setrecuperar} />
        ) : null}

        <div className="cont-right-item">
          <div className="cont-top-right-login">
            <p style={{ color: "white" }}>¿Qué aún no tienes Cuenta?</p>
            <ListItem
              button
              className="btn-registrate-login"
              onClick={OpenModalF}
            >
              <p style={{ color: "white" }}>Regístrate</p>
            </ListItem>
          </div>
          <div className="cont-center-right-login">
            <p style={{ color: "white" }}>Accede desde tu cuenta favorita</p>
            <p style={{ color: "white" }}>
              Así de fácil es poder acceder y ser parte de la red de
              profesionales SAP más grande de Chile.
            </p>
          </div>
          <div
            className="cont-bottom-right-login"
            style={{ justifyContent: "space-around" }}
          >
            <div>
              <FacebookLogin
                size="medium"
                textButton="Ingresar con facebook"
                cssClass="rs-1-loginf"
                appId="3304426579683351"
                autoLoad={false}
                callback={responseFacebook}
                icon={
                  <Facebook style={{ color: "#506BA3", marginRight: "10px" }} />
                }
              />
            </div>

            <GoogleLogin
              clientId="461564686457-ah096iok3dhnsimuqvhieom283j1d6ml.apps.googleusercontent.com"
              buttonText="Ingresar con Google"
              className="rs-2-loging"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />

            {/* <TwitterLogin
      authCallback={authHandler}
      buttonTheme="rs-2-loging"
    /> */}
          </div>
        </div>
      </div>
      <Snackbar
        open={_alert.show}
        onClose={handleClose}
        autoHideDuration={5000}
      >
        <Alert severity={_alert.type}>{_alert.msg}</Alert>
      </Snackbar>
      <Snackbar
        open={showAlert}
        onClose={() => setShowAlert(false)}
        autoHideDuration={5000}
      >
        <Alert severity={alertType}>{errormsg}</Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
