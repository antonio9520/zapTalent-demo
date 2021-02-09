import React from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import InfoUser from "../infoUser/InfoUser";
import { useDispatch } from "react-redux";
import { resetDataUserInfoAction } from "../../../../redux/actions/actions-emp/infoUserAction";

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
  const { setOpenModal, openModal, data } = props;

  // console.log(usuario);
  const closeModal = () => {
    setOpenModal(false);
    setTimeout(() => {
      dispatch(resetDataUserInfoAction("a"));
    }, 200);
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
        <InfoUser
          setOpenModal={setOpenModal}
          data={data}
          closeModal={closeModal}
        />
      </Fade>
    </Modal>
  );
};

export default CustomModal;
