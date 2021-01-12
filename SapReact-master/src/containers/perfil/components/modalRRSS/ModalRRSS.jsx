import React, { useState } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import RRSS from "../rrss/RRSS";
import { CustomInput } from "../../../../components";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const ModalRRSS = (props) => {
  const classes = useStyles();

  const {
    setOpenModalRRSS,
    openModalRRSS,
    setHidden,
    type,
    action,
    url,
  } = props;
  // console.log(url);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModalRRSS}
      // open={true}
      onClose={() =>
        setOpenModalRRSS({ open: false, type: null, url: null, action: "add" })
      }
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalRRSS}>
        <RRSS
          setOpenModal={setOpenModalRRSS}
          type={type}
          action={action}
          url2={url}
        />
      </Fade>
    </Modal>
  );
};

export default ModalRRSS;
