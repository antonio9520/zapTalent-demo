import React from "react";
import "./Styles.css";
import { Button } from "../../../../components";

const StepTwo = ({ setStep }) => {
  return (
    <div className="form-editar-avisos-emp">
      <h1>Two</h1>
      <div className="cont-btns-form-emp">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setStep("one")}
        >
          Atras
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setStep("three")}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
