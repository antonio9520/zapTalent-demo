import React from "react";
import "../../Login.css";
import { OutInput } from "../../../../components";
import { Link } from "react-router-dom";
import { ListItem } from "@material-ui/core";

const EmailEnviado = (props) => {
  const { setrecuperar } = props;

  return (
    <div className="cont-left-item" style={{ justifyContent: "center" }}>
      <div
        className="cont-top-login"
        style={{
          flex: "inherit",
          maxHeight: "100px ",
        }}
      >
        <p>Listo! </p>
        <p>Esperamos</p>
        <p>Verte pronto</p>
      </div>
      <p
        className="link-terminos-condiciones"
        style={{ margin: "0", marginTop: "30px", fontSize: "14px" }}
      >
        Hemos enviado un correo para
      </p>
      <p
        className="link-terminos-condiciones"
        style={{ margin: "0", marginBottom: "30px", fontSize: "14px" }}
      >
        que restablezcas tu contraseña (Revisa tu bandeja de Spam).
      </p>
      <Link className="link" to="/login-register">
        <ListItem
          button
          className="btn-cancelar-login"
          onClick={() => setrecuperar("default")}
        >
          <p>Volver</p>
        </ListItem>
      </Link>
    </div>
  );
};

export default EmailEnviado;
