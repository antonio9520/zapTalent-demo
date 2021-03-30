import React from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import EditDate from "./EditDate";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const CustomModal = (props) => {
  const classes = useStyles();

  const { openModalRep, setOpenModalRep, data, setDataEditar } = props;

  // console.log(usuario);
  const closeModal = () => {
    setOpenModalRep(false);
    setDataEditar(null);
  };
  
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModalRep}
      // open={true}
      onClose={() => closeModal()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalRep}>
        <EditDate closeModal={closeModal} data={data} />
      </Fade>
    </Modal>
  );
};

export default CustomModal;
