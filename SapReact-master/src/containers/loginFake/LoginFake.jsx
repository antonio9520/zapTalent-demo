import React from "react";
import logo from "../../resources/img/ZAPTalent-Logotipo-Vertical-Original.svg";
import "./LoginFake.css";
const LoginFake = () => {
  return (
    <div className="conteiner-login">
      <img src={logo} alt="logo" className={"logo-login-fake"} />
      <h1 className="h1-loginfake">Redireccionando</h1>
    </div>
  );
};

export default LoginFake;
