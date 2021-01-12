import React from "react";
import "./StepTwo.css";
import logo1 from "../../../../../../resources/cover/ZAPTalent-Clientes-1.png";
import logo2 from "../../../../../../resources/cover/ZAPTalent-Clientes-2.png";
import logo3 from "../../../../../../resources/cover/ZAPTalent-Clientes-3.png";
import logo4 from "../../../../../../resources/cover/ZAPTalent-Clientes-4.png";

const StepTwo = () => {
  return (
    <div className="cont-step-two-emp">
      <div className="sub-step-two-emp">
        <h1>Empresas que nos prefieren</h1>
        <div className="step-two-logos-emp">
          <img src={logo1} alt="logo" />
          <img src={logo2} alt="logo" />
          <img src={logo3} alt="logo" />
          <img src={logo4} alt="logo" />
          <img src={logo1} alt="logo" />
          <img src={logo2} alt="logo" />
          <img src={logo3} alt="logo" />
          <img src={logo4} alt="logo" />
          <img src={logo1} alt="logo" />
          <img src={logo2} alt="logo" />
          <img src={logo3} alt="logo" />
          <img src={logo4} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
