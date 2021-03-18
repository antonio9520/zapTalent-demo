import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../resources/empresas/ZAPTalent-Empresa-Logotipo-1.png";
import {
  iniciarSesionAdminAction,
  usuarioAuthActionAdmin,
  resetEmailActionAdmin,
  resetPasswordActionAdmin,
  hiddenAlertAction,
} from "../../redux/actions/actions-admin/authAction";
import { OutInput } from "../../componentsEmp";
import { Link } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Loader from "react-loader-spinner";

const Login = (props) => {
  const dispatch = useDispatch();
  const [emailA, setEmail] = useState("");
  const [hidden, setHidden] = useState(false);
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const _alert = useSelector((state) => state.authAdmin.alert);
  const loading = useSelector((state) => state.authAdmin.loading);
  const autenticado = useSelector((state) => state.authAdmin.autenticado);
  //error
  const erroremail = useSelector((state) => state.authAdmin.erroremail);
  const errorpassword = useSelector((state) => state.authAdmin.errorpassword);

  const autenticar = () => {
    // Validar
    if (emailA.trim() === "" || password.trim() === "") {
      console.log("los campos son obligatorios");
    }
    const email = emailA.toLocaleLowerCase();
    dispatch(iniciarSesionAdminAction({ email, password }));
  };
  const handleClose = () => {
    dispatch(hiddenAlertAction());
  };
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      autenticar();
    }
  };
  useEffect(() => {
    if (autenticado) {
      props.history.push("/admin/home");
    }
    // eslint-disable-next-line
  }, [autenticado]);
  useEffect(() => {
    dispatch(usuarioAuthActionAdmin());
    // eslint-disable-next-line
  }, []);
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
                    dispatch(resetEmailActionAdmin());
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
                    dispatch(resetPasswordActionAdmin());
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
                <p style={{ color: "white" }}>Ingresar</p>
              </ListItem>
              <Link className="link" to="/empresas">
                <ListItem button className="btn-cancelar-login-emp">
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
              <a
                href="https://info.zaptalent.cl/terminos-de-usos-y-condiciones/"
                target="_blank"
              >
                Terminos y Condiciones{" "}
              </a>
              de uso.
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
          <p style={{ color: "white" }}>
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
