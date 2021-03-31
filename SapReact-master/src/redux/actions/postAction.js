import {
  CREAR_POSTULACION,
  CREAR_POSTULACION_EXITO,
  CREAR_POSTULACION_ERROR,
  OBTENER_POSTULACION,
  OBTENER_POSTULACION_EXITO,
  OBTENER_POSTULACION_ERROR,
  OBTENER_POST_ELIMINAR,
  POST_ELIMINADO_EXITO,
  POST_ELIMINADO_ERROR,
  SHOW_ALERT,
} from "../types";
import clientAxios from "../../config/axios";
const showAlert = (data) => ({
  type: SHOW_ALERT,
  payload: data,
});

//AGREGAR
export function crearPostulacionAction(data) {
  return async (dispatch) => {
    dispatch(crearPostulacion());

    try {
      await clientAxios
        .post("/api/postulacion", data)
        .then((res) => dispatch(crearPostulacionExito(res.data)));
      dispatch(
        showAlert({
          show: true,
          msg: "Postulación creada correctamente",
          type: "success",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(crearPostulacionError());
      console.log("dslfmslñfmalñmlñsfmasñlmfsdf");
      dispatch(
        showAlert({ show: true, msg: "Ocurrio un error", type: "error" })
      );
    }
  };
}

const crearPostulacion = () => ({
  type: CREAR_POSTULACION,
});

const crearPostulacionExito = (data) => ({
  type: CREAR_POSTULACION_EXITO,
  payload: data,
});

const crearPostulacionError = () => ({
  type: CREAR_POSTULACION_ERROR,
});

//OBTENER
export function obtenerPostulacionesAction(id) {
  return async (dispatch) => {
    dispatch(obtenerPostulaciones());
    try {
      const respuesta = await clientAxios.put(`/api/postulacion/${id}`);
      dispatch(obtenerExito(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(obtenerError());
    }
  };
}

const obtenerPostulaciones = () => ({
  type: OBTENER_POSTULACION,
});

const obtenerExito = (data) => ({
  type: OBTENER_POSTULACION_EXITO,
  payload: data,
});

const obtenerError = () => ({
  type: OBTENER_POSTULACION_ERROR,
});

//ELIMINAR
export function eliminarPostulacionAction(data) {
  const { _id, id_post } = data;
  return async (dispatch) => {
    dispatch(obtenerEliminarPostulacion(_id));
    try {
      await clientAxios.delete(`/api/postulacion/${id_post}`);
      dispatch(eliminarPostulacionExito());
      dispatch(
        showAlert({
          show: true,
          msg: "Postulación cancelada.",
          type: "success",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(eliminarPostulacionError());
      dispatch(
        showAlert({ show: true, msg: error.response.data.msg, type: "error" })
      );
    }
  };
}

const obtenerEliminarPostulacion = (id) => ({
  type: OBTENER_POST_ELIMINAR,
  payload: id,
});

const eliminarPostulacionExito = () => ({
  type: POST_ELIMINADO_EXITO,
});

const eliminarPostulacionError = () => ({
  type: POST_ELIMINADO_ERROR,
});
