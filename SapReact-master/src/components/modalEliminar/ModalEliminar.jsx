import React from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import "./ModalEliminar.css";
import iconDelete from "../../resources/images/icon-info-delete.svg";
import { ListItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { eliminarTrabajoAction } from "../../redux/actions/trabajoAction";
import { eliminarEstudioAction } from "../../redux/actions/estudioAction";
import { eliminarCertificadoAction } from "../../redux/actions/certificadoAction";
import { eliminarAdnAction } from "../../redux/actions/adnAction";
import { eliminarAvisoAction } from "../../redux/actions/actions-emp/avisosAction";
import { editarUsuarioAction } from "../../redux/actions/authAction";
import { eliminarEmpresaAction } from "../../redux/actions/actions-admin/empresasAction";
import clientAxios from "../../config/axios";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const CustomModal = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const usuario = useSelector((state) => state.auth.usuario);
  const {
    setOpenModalEliminar,
    openModalEliminar,
    trabajo,
    estudio,
    certificado,
    adnsap,
    aviso,
    empresa,
    perfil,
    idEliminar,
    setIdEliminar,
    dataAdnUser,
    refreshPerfil,
  } = props;

  const deleteCancel = () => {
    setIdEliminar(null);
    setOpenModalEliminar(false);
  };

  const deleteTrabajo = async () => {
    setOpenModalEliminar(false);

    if (trabajo) {
      dispatch(eliminarTrabajoAction(idEliminar));
    }
    if (estudio) {
      dispatch(eliminarEstudioAction(idEliminar));
    }
    if (certificado) {
      dispatch(eliminarCertificadoAction(idEliminar));
    }
    if (adnsap) {
      dispatch(eliminarAdnAction(idEliminar)).then((res) =>
        res === true
          ? dispatch(
              editarUsuarioAction({
                _id: usuario._id,
                modulos: dataAdnUser.modulos,
                submodulos: dataAdnUser.submodulos,
              })
            )
          : null
      );
    }
    if (aviso) {
      dispatch(eliminarAvisoAction(idEliminar));
    }
    if (empresa) {
      dispatch(eliminarEmpresaAction(idEliminar));
    }
    if (perfil) {
      console.log(idEliminar);
      // /api/usuarioEmpresa
      try {
        await clientAxios.delete(`/api/usuarioEmpresa/${idEliminar}`);
        refreshPerfil();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const DeleteComponent = () => {
    return (
      <div className="cont-modal-eliminar">
        <div className="top-modal-eliminar">
          <img src={iconDelete} alt="icon-delete" />
          <div>
            <p>¿Está seguro que desea eliminar el item?</p>
          </div>
        </div>
        <div className="bottom-modal-eliminar">
          <ListItem
            button
            className="btn-borrar-modal-eliminar"
            onClick={() => deleteTrabajo()}
          >
            <p>Borrar</p>
          </ListItem>

          <ListItem
            button
            className="btn-cancelar-modal-eliminar"
            onClick={() => deleteCancel()}
          >
            <p>Cancelar</p>
          </ListItem>
        </div>
      </div>
    );
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModalEliminar}
      // open={true}
      onClose={() => deleteCancel()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalEliminar}>
        <DeleteComponent />
      </Fade>
    </Modal>
  );
};

export default CustomModal;
