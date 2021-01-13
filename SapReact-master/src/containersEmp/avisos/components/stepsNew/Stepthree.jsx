import React from "react";
import "./Styles.css";
import { Button } from "../../../../components";

const Stepthree = ({ setStep }) => {
  return (
    <div className="form-editar-avisos-emp">
      <h1>Three</h1>
      <div className="cont-btns-form-emp">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setStep("two")}
        >
          Atras
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setStep("four")}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default Stepthree;
