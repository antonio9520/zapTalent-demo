import {
  OBTENER_USER_USER_INFO,
  OBTENER_ESTUDIO_USER_INFO,
  OBTENER_TRABAJO_USER_INFO,
  OBTENER_CERTIFICADO_USER_INFO,
  OBTENER_ADN_USER_INFO,
  OBTENER_EXITO_USER_INFO,
  OBTENER_ESTUDIO_EXITO_USER_INFO,
  OBTENER_TRABAJO_EXITO_USER_INFO,
  OBTENER_CERT_EXITO_USER_INFO,
  OBTENER_ADN_EXITO_USER_INFO,
  RESET_DATA_USER_INFO,
} from "../../types/typesEmp";

import clientAxios from "../../../config/axios";

/**usuario */
//OBTENER datos de usuario
export function obtenerUserInfoAction(data) {
  return async (dispatch) => {
    dispatch(descargaUserInfo());
    try {
      dispatch(descargaExitoUserInfo(data));
    } catch (error) {
      console.log(error);
    }
  };
}

const descargaUserInfo = () => ({
  type: OBTENER_USER_USER_INFO,
});

const descargaExitoUserInfo = (data) => ({
  type: OBTENER_EXITO_USER_INFO,
  payload: data,
});

export function obtenerEstudiosUserInfoAction(id) {
  return async (dispatch) => {
    dispatch(descargaEstudiosUserInfo());
    try {
      const respuesta = await clientAxios.get(`/api/estudios/${id}`);
      setTimeout(() => {
        dispatch(descargaEstudiosExitoUserInfo(respuesta.data));
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
}

const descargaEstudiosUserInfo = () => ({
  type: OBTENER_ESTUDIO_USER_INFO,
});

const descargaEstudiosExitoUserInfo = (data) => ({
  type: OBTENER_ESTUDIO_EXITO_USER_INFO,
  payload: data,
});

/**RESET DATA
 */
export function resetDataUserInfoAction(id) {
  return async (dispatch) => {
    dispatch(resetDataUserInfo());
  };
}

const resetDataUserInfo = () => ({
  type: RESET_DATA_USER_INFO,
});
