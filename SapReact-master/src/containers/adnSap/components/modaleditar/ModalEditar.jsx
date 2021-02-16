import React, { useState } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import FormEditar from "../formeditar/FormEditar";
import One from "../addSM/One";
import Two from "../addSM/Two";
import { useSelector } from "react-redux";

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
    setSwitch,
    setOpenModalEditar,
    openModalEditar,
    dataEditar,
    evitarBug,
  } = props;
  const [view, setView] = useState("default");
  const usuario = useSelector((state) => state.auth.usuario);
  const [submodulos, setSubmodulos] = useState(
    dataEditar ? dataEditar.submodulos : null
  );
  const [arraySubMod, setArraySubMod] = useState([]);
  const [submodulosuser, setSubmodulosUser] = useState(
    usuario ? usuario.submodulos : null
  );
  const cancelarEditar = () => {
    evitarBug();
    setOpenModalEditar(false);
    setTimeout(() => {
      // setSwitch(false);
      setDataEditar(null);
      setView("default");
    }, 500);
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
        {view === "default" ? (
          <FormEditar
            setDataEditar={setDataEditar}
            setOpenModalEditar={setOpenModalEditar}
            dataEditar={dataEditar}
            setView={setView}
            cancelarEditar={cancelarEditar}
            submodulosuser={submodulosuser}
            setSubmodulosUser={setSubmodulosUser}
          />
        ) : view === "one" ? (
          <One
            setView={setView}
            dataEditar={dataEditar}
            arraySubMod={arraySubMod}
            setArraySubMod={setArraySubMod}
          />
        ) : view === "two" ? (
          <Two
            setView={setView}
            dataEditar={dataEditar}
            arraySubMod={arraySubMod}
            setArraySubMod={setArraySubMod}
            setDataEditar={setDataEditar}
            submodulos={submodulos}
            setSubmodulos={setSubmodulos}
            submodulosuser={submodulosuser}
          />
        ) : null}
      </Fade>
    </Modal>
  );
};

export default CustomModal;
