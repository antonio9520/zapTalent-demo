import {
  COMENZAR_DESCARGA_POSTULADOS,
  DESCARGA_POSTULADOS_ERROR,
  DESCARGA_POSTULADOS_EXITO,
  POSTULANTE_LEIDO_EXITO,
  DESCARGA_POSTULADOS_EXITO_INIT,
  OBTENER_TOTAL_USUARIOS,
  OBTENER_POSTULACIONES_ID_EMPRESA,
  COMENZAR_OBTENER_POST_ID_EMPRESA,
  OBTENER_TOTAL_AVISOS,
  OBTENER_TOTAL_POSTULANTES,
  OBTENER_TOTAL_NO_LEIDOS,
  OBTENER_TOTAL_USUARIOS_DIAS,
} from "../../types/typesEmp";

import clientAxios from "../../../config/axios";

//OBTENER
export function obtenerPostuladosAction({ _id, skip, query }) {
  return async (dispatch) => {
    dispatch(descargaPostulados());
    try {
      const respuesta = await clientAxios.put(
        `/api/postulacion/postulados/${_id}/${skip}`,
        query
      );
      console.log(skip);
      setTimeout(() => {
        if (skip === 0) {
          dispatch(descargaExitoPostInit(respuesta.data));
        } else {
          for (let i = 0; i < respuesta.data.length; i++) {
            dispatch(descargaExitoPost(respuesta.data[i]));
          }
        }
      }, 1000);
    } catch (error) {
      console.log(error);
      dispatch(descargaError());
    }
  };
}

const descargaPostulados = () => ({
  type: COMENZAR_DESCARGA_POSTULADOS,
});

const descargaExitoPost = (data) => ({
  type: DESCARGA_POSTULADOS_EXITO,
  payload: data,
});
const descargaExitoPostInit = (data) => ({
  type: DESCARGA_POSTULADOS_EXITO_INIT,
  payload: data,
});

const descargaError = () => ({
  type: DESCARGA_POSTULADOS_ERROR,
});

/**Leido */
export function changeLeidoPostulanteAction(id) {
  return async (dispatch) => {
    try {
      await clientAxios.put(`/api/postulacion/leido/${id}`);
      dispatch(postulanteLeidoExito(id));
    } catch (error) {
      console.log(error);
    }
  };
}

const postulanteLeidoExito = (id) => ({
  type: POSTULANTE_LEIDO_EXITO,
  payload: id,
});

export function obtenerPostulacionesEmpresaAction({ iduser, idemp }) {
  return async (dispatch) => {
    dispatch(descargaPostulacionesEmp());
    try {
      const respuesta = await clientAxios.get(
        `/api/postulacion/${iduser}/${idemp}`
      );

      setTimeout(() => {
        dispatch(descargaExitoPostulacionesEmp(respuesta.data));
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
}

const descargaPostulacionesEmp = () => ({
  type: COMENZAR_OBTENER_POST_ID_EMPRESA,
});

const descargaExitoPostulacionesEmp = (data) => ({
  type: OBTENER_POSTULACIONES_ID_EMPRESA,
  payload: data,
});

//OBTENER total usuarios
export function obtenerTotalUsuariosAction() {
  return async (dispatch) => {
    try {
      const respuesta = await clientAxios.get("/api/usuarios/total/usuarios");
      console.log(respuesta);
      dispatch(obtenerTotalUsuarios(respuesta.data));
    } catch (error) {
      console.log(error);
    }
  };
}

const obtenerTotalUsuarios = (data) => ({
  type: OBTENER_TOTAL_USUARIOS,
  payload: data,
});

//OBTENER total postulantes
export function obtenerTotalPostulantesAction(id) {
  return async (dispatch) => {
    try {
      const respuesta = await clientAxios.get(
        `/api/postulacion/total/postulantes/emp/${id}`
      );
      console.log(respuesta);
      dispatch(obtenerTotalPostulantes(respuesta.data));
    } catch (error) {
      console.log(error);
    }
  };
}

const obtenerTotalPostulantes = (data) => ({
  type: OBTENER_TOTAL_POSTULANTES,
  payload: data,
});

//OBTENER total avisos
export function obtenerTotalAvisosAction(id) {
  return async (dispatch) => {
    try {
      const respuesta = await clientAxios.get(
        `/api/postulacion/total/avisos/emp/${id}`
      );
      console.log(respuesta);
      dispatch(obtenerTotalAvisos(respuesta.data));
    } catch (error) {
      console.log(error);
    }
  };
}

const obtenerTotalAvisos = (data) => ({
  type: OBTENER_TOTAL_AVISOS,
  payload: data,
});

//OBTENER total postulantes no leidos
export function obtenerTotalPostNoLeidosAction(id) {
  return async (dispatch) => {
    try {
      const respuesta = await clientAxios.get(
        `/api/postulacion/total/noleidos/emp/${id}`
      );
      console.log(respuesta);
      dispatch(obtenerTotalPostNoLeidos(respuesta.data));
    } catch (error) {
      console.log(error);
    }
  };
}

const obtenerTotalPostNoLeidos = (data) => ({
  type: OBTENER_TOTAL_NO_LEIDOS,
  payload: data,
});

//OBTENER total postulantes no leidos
export function obtenerTotalUsuariosDiaAction() {
  return async (dispatch) => {
    try {
      const respuesta = await clientAxios.get(
        `/api/usuarios/totaldia/usuarios`
      );
      console.log(respuesta);
      dispatch(obtenerTotalUsuariosDia(respuesta.data));
    } catch (error) {
      console.log(error);
    }
  };
}

const obtenerTotalUsuariosDia = (data) => ({
  type: OBTENER_TOTAL_USUARIOS_DIAS,
  payload: data,
});
