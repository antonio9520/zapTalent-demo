import React, { forwardRef, useState } from "react";
import "./Four.css";
import { Button } from "../../../../../../components";
import { LinearProgress } from "@material-ui/core";

const Four = forwardRef(({ setStep, closeModal, guardarEmpresa }, ref) => {
  const [loading, setLoading] = useState(false);
  const validacion = () => {
    setLoading(true);
    guardarEmpresa();
  };
  return (
    <div className="four-add-emp-admin" ref={ref}>
      <p>four</p>
      <div className="bottom">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setStep("three")}
        >
          Atras
        </Button>
        <Button variant="contained" color="primary" onClick={validacion}>
          Guardar
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

export default Four;
