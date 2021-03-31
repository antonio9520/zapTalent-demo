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
        <div
          className="cont-left-item"
          style={{
            paddingTop: "80px",
            paddingBottom: "80px",
          }}
        >
          <div className="cont-top-login">
            <p>Accede a tu cuenta </p>
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

              <ListItem
                button
                className="btn-cancelar-login-emp"
                onClick={() =>
                  (window.location.href = "https://info.zaptalent.cl/")
                }
              >
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
            </div>
            {/* <div style={{ width: 200, height: 500 }}></div> */}
          </div>
        </div>

        <div className="right-card-login-emp">
          <h1>Plataforma Administradora</h1>
        </div>
      </div>

      <Snackbar
        open={_alert.show}
        onClose={handleClose}
        autoHideDuration={5000}
      >
        <Alert severity={_alert.type}>{_alert.msg}</Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
