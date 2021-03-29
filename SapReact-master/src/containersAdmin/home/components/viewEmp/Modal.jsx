import React from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import { ViewEmp } from "./views";
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
  const {
    open,
    setOpen,
    data,
    setDataView,
    setDataEditPerfil,
    setOpenEditPerfil,
    refreshPerfiles,
    setIdEliminar,
    setOpenModalEliminarPerfil,
  } = props;

  // console.log(usuario);
  const closeModal = () => {
    setOpen(false);
    setTimeout(() => {
      setDataView(null);
    }, 300);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      // open={true}
      onClose={() => closeModal()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ViewEmp
          setOpen={setOpen}
          data={data}
          closeModal={closeModal}
          setDataEditPerfil={setDataEditPerfil}
          setOpenEditPerfil={setOpenEditPerfil}
          refreshPerfiles={refreshPerfiles}
          setIdEliminar={setIdEliminar}
          setOpenModalEliminar={setOpenModalEliminarPerfil}
        />
      </Fade>
    </Modal>
  );
};

export default CustomModal;
