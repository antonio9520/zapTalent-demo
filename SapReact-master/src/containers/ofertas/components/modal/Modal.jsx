import React from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import InfoEmp from "../infoEmp/InfoEmp";
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
  const { setOpen, open, data, idEmp, setIdEmp } = props;

  // console.log(usuario);
  const closeModal = () => {
    setOpen(false);
    setIdEmp(null);
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
        <InfoEmp
          setOpe={setOpen}
          data={data}
          closeModal={closeModal}
          idEmp={idEmp}
        />
      </Fade>
    </Modal>
  );
};

export default CustomModal;
