import {
  AGREGAR_AVISO,
  AGREGAR_AVISO_ERROR,
  AGREGAR_AVISO_EXITO,
  SHOW_ALERT_EMP,
  COMENZAR_DESCARGA_AVISO,
  DESCARGA_AVISO_EXITO_INIT,
  DESCARGA_AVISO_ERROR,
  DESCARGA_AVISO_EXITO,
  OBTENER_AVISO_ELIMINAR,
  AVISO_ELIMINADO_ERROR,
  AVISO_ELIMINADO_EXITO,
  COMENZAR_EDICION_AVISO,
  AVISO_EDITADO_ERROR,
  AVISO_EDITADO_EXITO,
  DETENER_CARGA_AVISO,
} from "../../types/typesEmp";

import clientAxios from "../../../config/axios";

const showAlert = (data) => ({
  type: SHOW_ALERT_EMP,
  payload: data,
});

//Agregar
export function agregarAvisoAction(data) {
  return async (dispatch) => {
    dispatch(agregarAviso());

    try {
      await clientAxios
        .post("/api/avisos", data)
        .then((res) => dispatch(agregarAvisoExito(res.data)));
      dispatch(
        showAlert({
          show: true,
          msg: "Aviso publicado correctamente.",
          type: "success",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(agregarAvisoError());
      showAlert({ show: true, msg: error.response.data.msg, type: "error" });
    }
  };
}

const agregarAviso = () => ({
  type: AGREGAR_AVISO,
});

const agregarAvisoExito = (data) => ({
  type: AGREGAR_AVISO_EXITO,
  payload: data,
});

const agregarAvisoError = () => ({
  type: AGREGAR_AVISO_ERROR,
});

//OBTENER
export function obtenerAvisoAction({ skip, query }) {
  return async (dispatch) => {
    console.log("funcion obtener avisos");
    dispatch(descargaAviso());
    try {
      const respuesta = await clientAxios.put(
        `/api/avisos/filter/${skip}`,
        query
      );
      if (respuesta.data.length === 0 && skip !== 0) {
        dispatch(detenerCargaAviso());
      } else {
        if (skip === 0) {
          dispatch(descargaExitoInit(respuesta.data));
        } else {
          for (let i = 0; i < respuesta.data.length; i++) {
            dispatch(descargaExito(respuesta.data[i]));
          }
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(descargaError());
    }
  };
}

const descargaAviso = () => ({
  type: COMENZAR_DESCARGA_AVISO,
});
const detenerCargaAviso = () => ({
  type: DETENER_CARGA_AVISO,
});
const descargaExito = (data) => ({
  type: DESCARGA_AVISO_EXITO,
  payload: data,
});
const descargaExitoInit = (data) => ({
  type: DESCARGA_AVISO_EXITO_INIT,
  payload: data,
});
const descargaError = () => ({
  type: DESCARGA_AVISO_ERROR,
});

//ELIMINAR
export function eliminarAvisoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerEliminarAviso(id));
    try {
      await clientAxios.delete(`/api/avisos/${id}`);
      dispatch(eliminarAvisoExito());
      dispatch(
        showAlert({ show: true, msg: "Aviso eliminado.", type: "success" })
      );
    } catch (error) {
      console.log(error);
      dispatch(eliminarAvisoError());
      dispatch(
        showAlert({ show: true, msg: error.response.data.msg, type: "error" })
      );
    }
  };
}

const obtenerEliminarAviso = (id) => ({
  type: OBTENER_AVISO_ELIMINAR,
  payload: id,
});

const eliminarAvisoExito = () => ({
  type: AVISO_ELIMINADO_EXITO,
});

const eliminarAvisoError = () => ({
  type: AVISO_ELIMINADO_ERROR,
});

//EDITAR
export function editarAvisoAction(data) {
  return async (dispatch) => {
    dispatch(comenzarEditar());

    try {
      await clientAxios
        .put(`/api/avisos/${data._id}`, data)
        .then((res) => dispatch(editarAvisoExito(res.data)));
      dispatch(
        showAlert({
          show: true,
          msg: "Aviso editado correctamente.",
          type: "success",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(editarAvisoError());
      showAlert({ show: true, msg: error.response.data.msg, type: "error" });
    }
  };
} 

const comenzarEditar = () => ({
  type: COMENZAR_EDICION_AVISO,
});

const editarAvisoExito = (data) => ({
  type: AVISO_EDITADO_EXITO,
  payload: data,
});

const editarAvisoError = () => ({
  type: AVISO_EDITADO_ERROR,
});
