import React, { useState } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import { One, Two, Three, Four, Five } from "./steps";
import shortid from "shortid";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const CustomModal = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { setOpen, open } = props;
  const [step, setStep] = useState("one");
  //STEP ONE
  const [image, setImage] = useState({
    preimage: null,
    name: "",
  });
  const [file, setFile] = useState(null);
  const [tipoPlan, setTipoPlan] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [rut, setRut] = useState("");
  const [giro, setGiro] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaTermino, setFechaTermino] = useState(null);
  const [resena, setResena] = useState("");

  //guardar aviso
  const guardarEmpresa = async () => {
    const logoURL = file;
    console.log("guardando empresa");
  };
  // console.log(usuario);
  const closeModal = () => {
    setOpen(false);
    
    setTimeout(() => {
      setStep("one");
    }, 300);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      // open={true}
      onClose={() => closeModal()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <>
          {step === "one" ? (
            <One
              setStep={setStep}
              closeModal={closeModal}
              tipoPlan={tipoPlan}
              setTipoPlan={setTipoPlan}
              razonSocial={razonSocial}
              setRazonSocial={setRazonSocial}
              rut={rut}
              setRut={setRut}
              giro={giro}
              setGiro={setGiro}
              fechaInicio={fechaInicio}
              setFechaInicio={setFechaInicio}
              fechaTermino={fechaTermino}
              setFechaTermino={setFechaTermino}
              resena={resena}
              setResena={setResena}
              image={image}
              setImage={setImage}
              file={file}
              setFile={setFile}
            />
          ) : step === "two" ? (
            <Two setStep={setStep} closeModal={closeModal} />
          ) : step === "three" ? (
            <Three setStep={setStep} closeModal={closeModal} />
          ) : step === "four" ? (
            <Four
              setStep={setStep}
              closeModal={closeModal}
              guardarEmpresa={guardarEmpresa}
            />
          ) : step === "five" ? (
            <Five setStep={setStep} closeModal={closeModal} />
          ) : null}
        </>
      </Fade>
    </Modal>
  );
};

export default CustomModal;

let data = [];
