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
  RESET_DATA_USER_INFO_B,
  POSTULANTE_LEIDO_EXITO,
} from "../../types/typesEmp";

import clientAxios from "../../../config/axios";

/**usuario */
//OBTENER datos de usuario
export function obtenerUserInfoAction(data) {
  return async (dispatch) => {
    dispatch(descargaUserInfo());
    try {
      setTimeout(() => {
        dispatch(descargaExitoUserInfo(data));
      }, 1000);
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
/**ESTUDIOS */
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

/**trabajos */
export function obtenertrabajosUserInfoAction(id) {
  return async (dispatch) => {
    dispatch(descargaTrabajosUserInfo());
    try {
      const respuesta = await clientAxios.get(`/api/trabajos/${id}`);
      setTimeout(() => {
        dispatch(descargaTrabajosExitoUserInfo(respuesta.data));
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
}

const descargaTrabajosUserInfo = () => ({
  type: OBTENER_TRABAJO_USER_INFO,
});

const descargaTrabajosExitoUserInfo = (data) => ({
  type: OBTENER_TRABAJO_EXITO_USER_INFO,
  payload: data,
});
/**CERTIFICADOS  */
export function obtenerCertificadosUserInfoAction(id) {
  return async (dispatch) => {
    dispatch(descargaCertUserInfo());
    try {
      const respuesta = await clientAxios.get(`/api/certificacion/${id}`);
      setTimeout(() => {
        dispatch(descargaCertExitoUserInfo(respuesta.data));
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
}

const descargaCertUserInfo = () => ({
  type: OBTENER_CERTIFICADO_USER_INFO,
});

const descargaCertExitoUserInfo = (data) => ({
  type: OBTENER_CERT_EXITO_USER_INFO,
  payload: data,
});
/**ADNS  */
export function obtenerAdnUserInfoAction(id) {
  return async (dispatch) => {
    dispatch(descargaAdnsUserInfo());
    try {
      const respuesta = await clientAxios.get(`/api/adnsap/${id}`);
      setTimeout(() => {
        dispatch(descargaAdnsExitoUserInfo(respuesta.data));
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
}

const descargaAdnsUserInfo = () => ({
  type: OBTENER_ADN_USER_INFO,
});

const descargaAdnsExitoUserInfo = (data) => ({
  type: OBTENER_ADN_EXITO_USER_INFO,
  payload: data,
});
/**RESET DATA
 */
export function resetDataUserInfoAction(type) {
  return async (dispatch) => {
    if (type === "b") {
      dispatch(resetDataUserInfoB());
    } else {
      dispatch(resetDataUserInfo());
    }
  };
}

const resetDataUserInfo = () => ({
  type: RESET_DATA_USER_INFO,
});

const resetDataUserInfoB = () => ({
  type: RESET_DATA_USER_INFO_B,
});


