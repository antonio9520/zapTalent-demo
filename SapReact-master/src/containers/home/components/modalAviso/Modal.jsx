import React from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import { Card } from "../../../ofertas/components";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const CustomModal = (props) => {
  const classes = useStyles();

  const { setOpenModal, openModal,  data } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      // open={true}
      onClose={() => setOpenModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <Card data={data} />
      </Fade>
    </Modal>
  );
};

export default CustomModal;
