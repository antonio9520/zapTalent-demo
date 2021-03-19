import React, { forwardRef, useState } from "react";
import "./Three.css";
import { Button } from "../../../../../../components";
import { LinearProgress } from "@material-ui/core";

const Three = forwardRef(({ setStep, closeModal }, ref) => {
  const [loading, setLoading] = useState(false);

  const validacion = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("four");
    }, 1000);
  };
  return (
    <div className="three-add-emp-admin" ref={ref}>
      <p>three</p>
      <div className="bottom">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setStep("two")}
        >
          Atras
        </Button>
        <Button variant="contained" color="primary" onClick={validacion}>
          Siguiente
        </Button>
      </div>
      {loading ? (
        <>
          <div className="overlay-loading"></div>
          <div className="linear-progres-global">
            <LinearProgress className="progres-editar-perfil" />
          </div>
        </>
      ) : null}
    </div>
  );
});

export default Three;
