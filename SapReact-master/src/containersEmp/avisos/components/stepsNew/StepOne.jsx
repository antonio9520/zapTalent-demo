import React, { forwardRef } from "react";
import "./Styles.css";
import { Button } from "../../../../components";

const StepOne = forwardRef(({ setStep, ref }) => {
  return (
    <div className="form-editar-avisos-emp" ref={ref}>
      <h1>One</h1>
      <div className="cont-btns-form-emp">
        <Button variant="contained" color="primary">
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setStep("two")}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
});

export default StepOne;
