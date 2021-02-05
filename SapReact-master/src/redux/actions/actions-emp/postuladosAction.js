import {
  COMENZAR_DESCARGA_POSTULADOS,
  DESCARGA_POSTULADOS_ERROR,
  DESCARGA_POSTULADOS_EXITO,
} from "../../types/typesEmp";

import clientAxios from "../../../config/axios";

//OBTENER
export function obtenerPostuladosAction({ _id, skip }) {
  return async (dispatch) => {
    dispatch(descargaPostulados());
    try {
      const respuesta = await clientAxios.get(
        `/api/postulacion/${_id}/${skip}`
      );

      for (let i = 0; i < respuesta.data.length; i++) {
        dispatch(descargaExitoPost(respuesta.data[i]));
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

const descargaError = () => ({
  type: DESCARGA_POSTULADOS_ERROR,
});
