import React from "react";
import "./RegistroD.css";
import logo from "../../../../resources/images/brand/Logotipo-SAPTalent-original.svg";
import logoemail from "../../../../resources/images/ZAPTalent-RevisatuCorreo.png";
import { ListItem } from "@material-ui/core";

const RegistroD = ({ handleClose }) => {
  return (
    <div className="cont-reg-d">
      <div>
        <img src={logo} alt="logo" className="logo-login-re" />
      </div>
      <div>
        <img src={logoemail} alt="logo" className="logo-login-re-email" />
      </div>
      <div>
        <p>
          Y por último, dentro de los proximos 5 minutos enviaremos un email de
          confirmación a tu cuenta de correo (Si no vez el correo recuerda
          revisar tu bandeja de Spam).
        </p>
        <p>Activa y comienza a ser parte de ZAPTalent</p>
      </div>
      <div className="reg-bottom-d2">
        <ListItem button className="btn-rut-reg-d2" onClick={handleClose}>
          <p style={{ color: "white" }}>Iniciar sesiòn</p>
        </ListItem>
      </div>
    </div>
  );
};

export default RegistroD;
