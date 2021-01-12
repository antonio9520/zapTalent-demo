import React, { useState, useEffect } from "react";
import "../../containers/login/Login.css";
import "./Login.css";
import logo from "../../resources/empresas/ZAPTalent-Empresa-Logotipo-1.png";
import { OutInput } from "../../componentsEmp";
import { ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  usuarioAuthEmpAction,
  iniciarSesionEmpAction,
  resetEmailEmpAction,
  resetPasswordEmpAction,
  hiddenAlertAction,
} from "../../redux/actions/actions-emp/authAction";

const Login = (props) => {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(false);
  const [emailA, setEmail] = useState("");
  // const [emailRec, setEmailRec] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state) => state.authEmp.loading);
  const [cargando, setCargando] = useState(false);
  const autenticado = useSelector((state) => state.authEmp.autenticado);
  const _alert = useSelector((state) => state.authEmp.alert);
  //error
  const erroremail = useSelector((state) => state.authEmp.erroremail);
  const errorpassword = useSelector((state) => state.authEmp.errorpassword);

  const autenticar = () => {
    // Validar
    if (emailA.trim() === "" || password.trim() === "") {
      console.log("los campos son obligatorios");
    }
    const email = emailA.toLocaleLowerCase();

    dispatch(iniciarSesionEmpAction({ email, password }));
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      autenticar();
    }
  };
  const handleClose = () => {
    dispatch(hiddenAlertAction());
  };
  useEffect(() => {
    dispatch(usuarioAuthEmpAction());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (autenticado) {
      props.history.push("/empresas/home");
    }
    // eslint-disable-next-line
  }, [autenticado]);
  return (
    <div className="conteiner-login-emp">
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

      <img
        src={logo}
        alt="logo"
        className={!hidden ? "logo-login" : "hidden-login"}
      />
      <div className={!hidden ? "card-login" : "card-login-hidden"}>
        <div className="cont-left-item">
          <div className="cont-top-login">
            <p>Accede a tu cuenta </p>
            <p>ZAPTalent</p>
          </div>
          <div className="cont-input-login-emp">
            <div className="input-login-form-2">
              <OutInput
                label="Ingresa tu correo"
                helpertext="Usuario erróneo, intente nuevamente"
                onChange={(e) => {
                  if (erroremail) {
                    dispatch(resetEmailEmpAction());
                  }
                  setEmail(e.target.value);
                }}
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
                onChange={(e) => {
                  if (errorpassword) {
                    dispatch(resetPasswordEmpAction());
                  }
                  setPassword(e.target.value);
                }}
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
                onClick={autenticar}
              >
                <p>Ingresar</p>
              </ListItem>
              <Link className="link" to="/empresas">
                <ListItem button className="btn-cancelar-login-emp">
                  <p style={{ width: "150px", textAlign: "center" }}>
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
              className="btn-recuperar-login-emp"
              // onClick={() => setrecuperar("recuperar")}
            >
              <p>Recuperar</p>
            </ListItem>
            <p>
              ¿Qué aun no tienes cuenta? <a href="#">Comienza acá</a>
            </p>
          </div>
        </div>

        {/* <div className="cont-right-item"> */}
        <div className="right-card-login-emp">
          <h1>Encuentra a los mejores profesionales SAP de Chile.</h1>
          <p>
            Así de fácil es poder acceder y ser parte de la red de profesionales
            SAP más grande de Chile.
          </p>
        </div>
      </div>
      {/* </div> */}
      <Snackbar
        open={_alert.show}
        onClose={handleClose}
        autoHideDuration={5000}
      >
        <Alert severity={_alert.type}>{_alert.msg}</Alert>
      </Snackbar>
      {/* <Snackbar
        open={showAlert}
        onClose={() => setShowAlert(false)}
        autoHideDuration={5000}
      >
        <Alert severity={alertType}>{errormsg}</Alert>
      </Snackbar> */}
    </div>
  );
};

export default Login;
