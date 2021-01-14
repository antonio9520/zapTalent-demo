import React, { useState } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import { StepOne, StepTwo, StepThree, StepFour } from "../stepsNew";

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
  const [step, setStep] = useState("four");

  const closeModal = () => {
    setOpenModal(false);
    setTimeout(() => {
      setStep("one");
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
    >
      <Fade in={openModal}>
        {step === "one" ? (
          <StepOne setStep={setStep} closeModal={closeModal} />
        ) : step === "two" ? (
          <StepTwo setStep={setStep} closeModal={closeModal} />
        ) : step === "three" ? (
          <StepThree setStep={setStep} closeModal={closeModal} />
        ) : step === "four" ? (
          <StepFour setStep={setStep} closeModal={closeModal} />
        ) : null}
      </Fade>
    </Modal>
  );
};

export default CustomModal;
