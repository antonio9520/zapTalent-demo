import React, { useState } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import Profesion from "../profesion/Profesion";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const CustomModal = (props) => {
  const classes = useStyles();

  const { setOpenModalProfesion, openModalProfesion } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModalProfesion}
      // open={true}
      onClose={() => setOpenModalProfesion(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalProfesion}>
        <Profesion setOpenModalProfesion={setOpenModalProfesion} />
      </Fade>
    </Modal>
  );
};

export default CustomModal;
