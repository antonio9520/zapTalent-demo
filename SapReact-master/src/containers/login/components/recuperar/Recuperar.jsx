import React from "react";
import "../../Login.css";
import { OutInput } from "../../../../components";
import { Link } from "react-router-dom";
import { ListItem } from "@material-ui/core";

const recuperar = (props) => {
  const {
    setEmail,
    restablecer,
    setrecuperar,
    errorEmailRec,
    setErrorEmailRec,
    msgEmailRec,
  } = props;

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
    }
  };

  return (
    <div className="cont-left-item">
      <div
        className="cont-top-login"
        style={{
          flex: "inherit",
          maxHeight: "100px ",
          marginTop: "20%",
        }}
      >
        <p>Recupera tu </p>
        <p>contraseña</p>
      </div>
      <p
        className="link-terminos-condiciones"
        style={{ margin: "0", marginTop: "0", fontSize: "14px" }}
      >
        Ingresa tu cuenta de correo con
      </p>
      <p
        className="link-terminos-condiciones"
        style={{ margin: "0", marginBottom: "30px", fontSize: "14px" }}
      >
        la cual creaste tu perfil ZAPTalent
      </p>
      <div className="cont-input-login">
        <div className="input-login-form-2" style={{ height: "100px" }}>
          <OutInput
            label="Ingresa tu correo"
            helpertext={msgEmailRec}
            funcOnChange={setEmail}
            size="medium"
            name="email"
            modo2
            error={errorEmailRec}
            funcionError={setErrorEmailRec}
            onKeyDown={_handleKeyDown}
          />
        </div>
      </div>
      <div className="cont-btns-login">
        <div className="cont-btn-ing-can-login">
          <ListItem button className="btn-ingresar-login" onClick={restablecer}>
            <p>Enviar</p>
          </ListItem>
          <Link className="link" to="/login-register">
            <ListItem
              button
              className="btn-cancelar-login"
              onClick={() => setrecuperar("default")}
            >
              <p style={{ width: "150px", textAlign: "center" }}>Volver</p>
            </ListItem>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default recuperar;
