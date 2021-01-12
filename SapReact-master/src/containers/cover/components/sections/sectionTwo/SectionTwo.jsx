import React from "react";
import "./SectionTwo.css";
import logo from "../../../../../resources/images/SAPTalent/ZAPTalent-Logotipo-Original.svg";
import image from "../../../../../resources/cover/ZAPTalent-Section-About.png";
const SectionTwo = () => {
  return (
    <div className="cont-section-two" id="section-two">
      <div className="sub-section-two">
        <div className="left-section-two">
          <img src={logo} alt="zap-talent" />
          <div className="cont-h1-sectionTwo">
            <h1>Somos ZAPTalent</h1>
            {/* <h1>is simply dummy</h1> */}
          </div>
          <p>
            ZAPTalent®; es una plataforma creado por SCL Consultores que es una
            empresa con más de 20 años de experiencia en las areas de TI y con
            más de 15 años en SAP, con proyectos realizados en Chile y en el
            extranjero cumpliendo diferentes Roles.
          </p>
          <p>
            Somos una consultoria emergente con más de 5 años en el mercado que
            atiende a clientes de diferentes industrias. Hemos creado la
            plataforma ZAPTalent® cuyo objetivo es generar una comunidad
            especializada en Talentos SAP en cual podrá optar por las mejores
            ofertas laborales de las mas importantes empresas de Chile.
          </p>
        </div>
        <div className="right-section-two">
          <img src={image} alt="zap-talent" />
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
