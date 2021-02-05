import React from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import InfoUser from "../infoUser/InfoUser";

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

  // console.log(usuario);
  const closeModal = () => {
    setOpenModal(false);
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
        <InfoUser />
      </Fade>
    </Modal>
  );
};

export default CustomModal;
