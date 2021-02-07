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
} from "../../types/typesEmp";

import clientAxios from "../../../config/axios";

/**usuario */
//OBTENER
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

// const descargaError = () => ({
//   type: DESCARGA_AVISO_ERROR,
// });
