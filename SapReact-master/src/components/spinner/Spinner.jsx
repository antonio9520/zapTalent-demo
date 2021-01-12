import React from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import Loader from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", 
  },
}));
const CustomModal = (props) => {
  const classes = useStyles();

  const { loading } = props;

  const Spinner = () => {
    return (
      <Loader
        type="Oval"
        color="#00BFFF"
        height={100}
        width={100}
        visible={loading}
        //  timeout={3000} //3 secs
      />
    );
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={loading}
      // open={true}
      //   onClose={() => deleteCancel()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={loading}>
        <Spinner />
      </Fade>
    </Modal>
  );
};

export default CustomModal;
