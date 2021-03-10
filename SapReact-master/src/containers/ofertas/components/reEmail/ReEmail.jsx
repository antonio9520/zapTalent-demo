import React from "react";
import "./ReEmail.css";
import { Button } from "../../../../components";
import clientAxios from "../../../../config/axios";

const ReEmail = ({ email }) => {
  const enviarEmail = async () => {
    // /enviarEmail/activacion
    try {
      await clientAxios.put(`/api/usuarios/enviarEmail/activacion`, { email });
      console.log("correo enviado");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="cont-reenviar-email">
      <h1>Para acceder a ofertas laborales primero debes activar tu cuenta.</h1>
      <Button variant="contained" color="primary" onClick={enviarEmail}>
        Reenviar correo
      </Button>
    </div>
  );
};

export default ReEmail;
