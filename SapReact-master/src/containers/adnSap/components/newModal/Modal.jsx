import React, { useState } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import { StepOne, StepTwo, StepThree, StepFour } from "../newSteps";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const CustomModal = (props) => {
  const classes = useStyles();
  const { setOpenModal, openModal } = props;
  const [step, setStep] = useState("one");
  const [dataModulo, setDataModulo] = useState([]);

  const closeModal = () => {
    setOpenModal(false);
    setTimeout(() => {
      setStep("one");
      setDataModulo([]);
    }, 300);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      // open={true}
      onClose={() => closeModal()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      //   PaperProps={{ tabIndex: -1 }}
    >
      <Fade in={openModal}>
        {step === "one" ? (
          <StepOne
            setStep={setStep}
            closeModal={closeModal}
            setDataModulo={setDataModulo}
            dataModulo={dataModulo}
          />
        ) : step === "two" ? (
          <StepTwo
            setStep={setStep}
            closeModal={closeModal}
            setDataModulo={setDataModulo}
            dataModulo={dataModulo}
          />
        ) : step === "three" ? (
          <StepThree
            setStep={setStep}
            closeModal={closeModal}
            setDataModulo={setDataModulo}
            dataModulo={dataModulo}
          />
        ) : step === "four" ? (
          <StepFour
            setStep={setStep}
            closeModal={closeModal}
            setDataModulo={setDataModulo}
            dataModulo={dataModulo}
          />
        ) : null}
      </Fade>
    </Modal>
  );
};

export default CustomModal;

const data = [
  {
    name: "FI",
    desc: "Finanzas",
    idcert: "51654654343",
    obs:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    submodulos: [
      {
        name: "GL",
        obs:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
        nivel: "",
        desc: "Contabilidad general",
      },
      {
        name: "AP",
        obs:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        nivel: "",
        desc: "Cuentas por pagar",
      },
    ],
    adnURL: "",
    iduser: "5f9f1680f0ce9c2ed45074c2",
  },
  {
    name: "CO",
    desc: "Gestión de costes",
    idcert: "51515DSFSDF",
    obs:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    submodulos: [
      {
        name: "CCA",
        obs: "",
        nivel: "Medio",
        desc: "Contabilidad por centros de costos",
      },
      {
        name: "CEL",
        obs:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
        nivel: "Básico",
        desc: "Contabilidad de elementos de costos",
      },
    ],
    adnURL: "",
    iduser: "5f9f1680f0ce9c2ed45074c2",
  },
];
