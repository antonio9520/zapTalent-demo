import {
  COMENZAR_DESCARGA_TRABAJO,
  DESCARGA_TRABAJO_ERROR,
  DESCARGA_TRABAJO_EXITO,
  OBTENER_TRABAJO_ELIMINAR,
  TRABAJO_ELIMINADO_ERROR,
  TRABAJO_ELIMINADO_EXITO,
  AGREGAR_TRABAJO,
  AGREGAR_TRABAJO_ERROR,
  AGREGAR_TRABAJO_EXITO,
  COMENZAR_EDICION_TRABAJO,
  TRABAJO_EDITADO_EXITO,
  TRABAJO_EDITADO_ERROR,
  SHOW_ALERT,
  HIDDEN_ALERT,
} from "../types";
import clientAxios from "../../config/axios";

const showAlert = (data) => ({
  type: SHOW_ALERT, 
  payload: data,
});

//OBTENER
export function obtenerTrabajosAction(id) {
  return async (dispatch) => {
    dispatch(descargaTrabajos());
    try {
      const respuesta = await clientAxios.get(`/api/trabajos/${id}`);
      dispatch(descargaExito(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaError());
    }
  };
}

const descargaTrabajos = () => ({
  type: COMENZAR_DESCARGA_TRABAJO,
});

const descargaExito = (data) => ({
  type: DESCARGA_TRABAJO_EXITO,
  payload: data,
});

const descargaError = () => ({
  type: DESCARGA_TRABAJO_ERROR,
});

//ELIMINAR
export function eliminarTrabajoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerEliminarTrabajo(id));
    try {
      await clientAxios.delete(`/api/trabajos/${id}`);
      dispatch(eliminarTrabajoExito());
      dispatch(
        showAlert({ show: true, msg: "Trabajo eliminado.", type: "success" })
      );
    } catch (error) {
      console.log(error); 
      dispatch(eliminarTrabajoError());
      dispatch(
        showAlert({ show: true, msg: error.response.data.msg, type: "error" })
      );
    }
  };
}

const obtenerEliminarTrabajo = (id) => ({
  type: OBTENER_TRABAJO_ELIMINAR,
  payload: id,
});

const eliminarTrabajoExito = () => ({
  type: TRABAJO_ELIMINADO_EXITO,
});

const eliminarTrabajoError = () => ({
  type: TRABAJO_ELIMINADO_ERROR,
});

//AGREGAR
export function agregarTrabajoAction(data) {
  return async (dispatch) => {
    dispatch(agregarTrabajo());

    try {
      await clientAxios
        .post("/api/trabajos", data)
        .then((res) => dispatch(agregarTrabajoExito(res.data)));
      dispatch(
        showAlert({
          show: true,
          msg: "Trabajo agregado correctamente.",
          type: "success",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(agregarTrabajoError());
      showAlert({ show: true, msg: error.response.data.msg, type: "error" });
    }
  };
}

const agregarTrabajo = () => ({
  type: AGREGAR_TRABAJO,
});

const agregarTrabajoExito = (data) => ({
  type: AGREGAR_TRABAJO_EXITO,
  payload: data,
});

const agregarTrabajoError = () => ({
  type: AGREGAR_TRABAJO_ERROR,
});

//EDITAR
export function editarTrabajoAction(data) {
  return async (dispatch) => {
    dispatch(comenzarEditar());

    try {
      await clientAxios
        .put(`/api/trabajos/${data._id}`, data)
        .then((res) => dispatch(editarTrabajoExito(res.data)));
      dispatch(
        showAlert({
          show: true,
          msg: "Trabajo editado correctamente.",
          type: "success",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(editartrabajoError());
      showAlert({ show: true, msg: error.response.data.msg, type: "error" });
    }
  };
}

const comenzarEditar = () => ({
  type: COMENZAR_EDICION_TRABAJO,
});

const editarTrabajoExito = (data) => ({
  type: TRABAJO_EDITADO_EXITO,
  payload: data,
});

const editartrabajoError = () => ({
  type: TRABAJO_EDITADO_ERROR,
});

export function hiddenAlertAction() {
  return (dispatch) => {
    dispatch(hiddenAlert());
  };
}

const hiddenAlert = () => ({
  type: HIDDEN_ALERT,
});
