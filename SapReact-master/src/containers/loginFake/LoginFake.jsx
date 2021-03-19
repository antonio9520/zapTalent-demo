import React from "react";
import logo from "../../resources/img/ZAPTalent-Logotipo-Vertical-Original.svg";
import "./LoginFake.css";
import { Button } from "../../components";
const LoginFake = () => {
  const redirect = () => {
    window.location.href = "https://info.zaptalent.cl/";
  };
  return (
    <div className="conteiner-login">
      <h1 className="h1-loginfake">Gracias por usar</h1>
      <img src={logo} alt="logo" className={"logo-login-fake"} />
      <h1 className="h1-loginfake">Te esperamos pronto!</h1>
      <Button variant="contained" color="primary" onClick={redirect}>
        Ir al home
      </Button>
    </div>
  );
};

export default LoginFake;
