import {
  COMENZAR_DESCARGA_POSTULADOS,
  DESCARGA_POSTULADOS_ERROR,
  DESCARGA_POSTULADOS_EXITO,
  POSTULANTE_LEIDO_EXITO,
  DESCARGA_POSTULADOS_EXITO_INIT,
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
      if (skip === 0) {
        dispatch(descargaExitoPostInit(respuesta.data));
      } else {
        for (let i = 0; i < respuesta.data.length; i++) {
          dispatch(descargaExitoPost(respuesta.data[i]));
        }
      }
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
