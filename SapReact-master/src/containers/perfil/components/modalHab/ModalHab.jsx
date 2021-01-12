import React, { useState } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import HabChips from "../habChips/HabChips";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const CustomModal = (props) => {
  const classes = useStyles();

  const { setOpenModalHab, openModalHab, setHidden } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModalHab}
      // open={true}
      onClose={() => setOpenModalHab(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalHab}>
        <HabChips setOpenModalHab={setOpenModalHab} />
      </Fade>
    </Modal>
  );
};

export default CustomModal;
