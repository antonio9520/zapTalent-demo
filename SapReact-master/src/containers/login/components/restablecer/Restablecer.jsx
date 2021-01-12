import React, { useEffect, useState } from "react";
import "../../Login.css";
import { OutInput } from "../../../../components";
import { Link } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import axios from "axios";

const Restablecer = (props) => {
  const {
    setrecuperar,
    token,
    setCargando,
    setErrorMsg,
    setShowAlert,
    setAlertType,
  } = props;
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      validar();
    }
  };
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  const [errorpass, setErrorPass] = useState(false);
  const [errorrepass, setErrorRePass] = useState(false);
  const [msgPass, setMsgPass] = useState("");
  const [msg, setMsg] = useState("");

  const validar = () => {
    if (pass.trim() === "") {
      console.log("pass Vacio");
      setMsgPass("Campo no puede estar vacío");
      setErrorPass(true);
      return;
    } else if (repass.trim() === "") {
      console.log("rePass Vacio hijo puta");
      setMsg("Campo no puede estar vacío");
      setErrorRePass(true);
      return;
    } else if (pass.length < 6) {
      setMsgPass("Password debe de ser de almenos 6 caracteres");
      setErrorPass(true);
      return;
    } else if (repass !== pass) {
      console.log("contraseña desigual");
      setMsg("Las contraseñas no coinciden");
      setErrorRePass(true);
      return;
    }

    setCargando(true);
    axios({
      method: "POST",
      url: `https://zaptalent.azurewebsites.net/api/actualizarpass/${token}`,
      data: { password: pass },
    })
      .then(() => {
        setCargando(false);
        setrecuperar("default");
        setErrorMsg("Contraseña actualizada correctamente");
        setAlertType("success");
        setShowAlert(true);
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg("Error en el servidor");
        setAlertType("error");
        setShowAlert(true);
      });
  };

  return (
    <div className="cont-left-item" style={{ justifyContent: "center" }}>
      <div className="cont-top-login" style={{ maxHeight: "35px" }}>
        <p>Nueva Contraseña</p>
      </div>
      <p
        className="link-terminos-condiciones"
        style={{ fontSize: "14px", marginTop: "20px", marginBottom: "20px" }}
      >
        Ingresa la nueva contraseña para tu cuenta
      </p>
      <div className="cont-input-login" style={{ maxHeight: "150px" }}>
        <div className="input-login-form-2">
          <OutInput
            label="Ingresa tu contraseña nueva"
            helpertext={msgPass}
            funcOnChange={setPass}
            size="medium"
            name="Pass"
            modo2
            error={errorpass}
            funcionError={setErrorPass}
            onKeyDown={_handleKeyDown}
            type="password"
          />
        </div>
        <div className="input-login-form-2">
          <OutInput
            label="Repite tu contraseña nueva"
            helpertext={msg}
            funcOnChange={setRepass}
            size="medium"
            name="RePass"
            modo2
            error={errorrepass}
            funcionError={setErrorRePass}
            onKeyDown={_handleKeyDown}
            type="password"
          />
        </div>
      </div>
      <div className="cont-btns-login" style={{ maxHeight: "100px" }}>
        <div className="cont-btn-ing-can-login">
          <ListItem button className="btn-ingresar-login" onClick={validar}>
            <p style={{ color: "white" }}>Restablecer</p>
          </ListItem>
          <Link className="link" to="/login-register">
            <ListItem
              button
              className="btn-cancelar-login"
              onClick={() => setrecuperar("default")}
            >
              <p
                style={{ color: "white", width: "150px", textAlign: "center" }}
              >
                Cancelar
              </p>
            </ListItem>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Restablecer;
