import React from "react";
import "./StepOne.css";
import logo from "../../../../../../resources/empresas/ZAPTalent-Empresa-Logotipo-1.png";
import { ListItem, Link as LinkMui } from "@material-ui/core";
import { Link } from "react-router-dom";

const StepOne = () => {
  return (
    <div className="cont-step-one-emp">
      <div className="over-emp-step-one">
        <div className="sub-step-one-emp">
          <div className="left-step-one-emp">
            <div className="circle-step-one-emp"></div>
            <h1>Los mejores talentos ZAP para tu empresa Están aquí</h1>
            <div className="line-step-one-emp"></div>
            <p>
              Ingresa a tu cuenta de usuario para encontrar los mejores
              profesionales ZAP de Chile.
            </p>
          </div>
          <div className="right-step-one-emp">
            <div className="card-step-one-emp">
              <img src={logo} alt="ZAPTalent" />
              <p className="p1-step-one-emp">Bienvenido a ZAPTAlent</p>
              <p className="p2-step-one-emp">
                Ingresa o registrate haciendo click en el botón
              </p>
              <Link to="/auth-emp" className="link">
                <ListItem button className="btn-step-one-emp">
                  <p>Ingresar</p>
                </ListItem>
              </Link>
              <LinkMui color="inherit" className="p3-step-one-emp">
                Ver/Descargar Términos y Condiciones
              </LinkMui>
              <p className="p4-step-one-emp">
                ¿Qué aún no tienes cuenta?{" "}
                <LinkMui className="p5-step-one-emp">Comienza acá</LinkMui>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
