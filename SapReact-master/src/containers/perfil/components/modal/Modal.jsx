import React, { useState } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import TabMenu from "../tabmenu/TabMenu";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const CustomModal = (props) => {
  const classes = useStyles();

  const {
    setOpenModal,
    openModal,
    setHidden,
    active,
    setActive,
    activeStep,
    setActiveStep,
  } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      // open={true}
      onClose={() => {
        setOpenModal(false);
        setTimeout(() => {
          setActive("one");
          setActiveStep(0);
        }, 300);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <TabMenu
          setOpenModal={setOpenModal}
          active={active}
          setActive={setActive}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </Fade>
    </Modal>
  );
};

export default CustomModal;
