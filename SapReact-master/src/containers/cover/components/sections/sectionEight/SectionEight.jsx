import React from "react";
import "./SectionEight.css";
import logo1 from "../../../../../resources/cover/ZAPTalent-Clientes-1.png";
import logo2 from "../../../../../resources/cover/ZAPTalent-Clientes-2.png";
import logo3 from "../../../../../resources/cover/ZAPTalent-Clientes-3.png";
import logo4 from "../../../../../resources/cover/ZAPTalent-Clientes-4.png";
const SectionEight = () => {
  return (
    <div className="cont-section-eight" id="section-eight">
      <div className="sub-section-eight">
        <div className="left-section-eight">
          <h1>Empresas que nos eligen</h1>
        </div>
        <div className="right-section-eight">
          <img src={logo1} alt="zap-talent" />
          <img src={logo2} alt="zap-talent" />
          <img src={logo3} alt="zap-talent" />
          <img src={logo4} alt="zap-talent" />
          <img src={logo1} alt="zap-talent" /> 
          <img src={logo2} alt="zap-talent" />
        </div>
      </div>
    </div>
  );
};

export default SectionEight;
