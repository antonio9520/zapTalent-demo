import React, { useState } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import Formulario from "./formulario/Formulario";
import { useDispatch } from "react-redux";

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
  const { setOpen, open, data, refreshPerfiles, setRefreshPerfiles } = props;

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      disableBackdropClick
      // open={true}
      onClose={() => closeModal()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Formulario
          closeModal={closeModal}
          data={data}
          refreshPerfiles={refreshPerfiles}
          setRefreshPerfiles={setRefreshPerfiles}
        />
      </Fade>
    </Modal>
  );
};

export default CustomModal;
