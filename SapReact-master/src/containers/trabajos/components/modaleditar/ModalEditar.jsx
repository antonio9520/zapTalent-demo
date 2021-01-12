import React, { useState } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import FormEditar from "../formeditar/FormEditar";

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
    setDataEditar,
    setOpenModalEditar,
    openModalEditar,
    setHidden,
    data, 
  } = props;

  const cancelarEditar = () => {
    setDataEditar(null);
    setOpenModalEditar(false);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModalEditar}
      // open={true}
      onClose={() => cancelarEditar()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalEditar}>
        <FormEditar
          setDataEditar={setDataEditar}
          setOpenModalEditar={setOpenModalEditar}
          data={data}
        />
      </Fade>
    </Modal>
  );
};

export default CustomModal;
