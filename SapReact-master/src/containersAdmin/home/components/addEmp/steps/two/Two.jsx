import React, { forwardRef, useState } from "react";
import "./Two.css";
import { Button } from "../../../../../../components";
import { LinearProgress } from "@material-ui/core";

const Two = forwardRef(({ setStep, closeModal }, ref) => {
  const [loading, setLoading] = useState(false);

  const validacion = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("three");
    }, 1000);
  };
  return (
    <div className="two-add-emp-admin" ref={ref}>
      <p>two</p>
      <div className="bottom">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setStep("one")}
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

export default Two;
