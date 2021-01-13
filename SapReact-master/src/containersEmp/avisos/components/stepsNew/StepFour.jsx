import React from "react";
import "./Styles.css";
import { Button } from "../../../../components";

const StepFour = ({ setStep }) => {
  return (
    <div className="form-editar-avisos-emp">
      <h1>Four</h1>
      <div className="cont-btns-form-emp">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setStep("three")}
        >
          Atras
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("guardar")}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
};

export default StepFour;
