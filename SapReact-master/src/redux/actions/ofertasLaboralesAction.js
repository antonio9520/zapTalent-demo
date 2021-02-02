import {
  COMENZAR_DESCARGA_OFER_LABORAL,
  DESCARGA_OFER_LABORAL_ERROR,
  DESCARGA_OFER_LABORAL_EXITO,
  COMENZAR_FILTRAR_OF,
  FILTRAR_ERROR_OF,
  FILTRAR_EXITO_OF,
  DETENER_CARGA_OF,
  INIT_OBTENER_OF,
  FILTRAR_EXITO_OF_INIT,
} from "../types";
import clientAxios from "../../config/axios";

//OBTENER
export function obtenerOferLaboralesAction(skip) {
  return async (dispatch) => {
    dispatch(descargaOferLaborales());

    try {
      const respuesta = await clientAxios.get(`/api/ofertasLaborales/${skip}`);

      if (respuesta.data.length === 0) {
        dispatch(detenerCarga());
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

const descargaOferLaborales = () => ({
  type: COMENZAR_DESCARGA_OFER_LABORAL,
});
const detenerCarga = () => ({
  type: DETENER_CARGA_OF,
});
const descargaExito = (data) => ({
  type: DESCARGA_OFER_LABORAL_EXITO,
  payload: data,
});
const descargaExitoInit = (data) => ({
  type: INIT_OBTENER_OF,
  payload: data,
});
const descargaError = () => ({
  type: DESCARGA_OFER_LABORAL_ERROR,
});
//FILTRAR
export function filtrarOferLaboralesAction(query) {
  const { skip } = query;
  // console.log(skip);
  return async (dispatch) => {
    dispatch(comenzarFiltrar());
    try {
      const respuesta = await clientAxios.post(`/api/ofertasLaborales/`, query);
      if (respuesta.data.length === 0) {
        dispatch(detenerCarga());
        dispatch(filtrarExitoInit(respuesta.data));
      } else {
        if (skip === 0) {
          dispatch(filtrarExitoInit(respuesta.data));
        } else {
          for (let i = 0; i < respuesta.data.length; i++) {
            dispatch(filtrarExito(respuesta.data[i]));
          }
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(filtrarError());
    }
  };
}

const comenzarFiltrar = () => ({
  type: COMENZAR_FILTRAR_OF,
});
const filtrarExitoInit = (data) => ({
  type: FILTRAR_EXITO_OF_INIT,
  payload: data,
});
const filtrarExito = (data) => ({
  type: FILTRAR_EXITO_OF,
  payload: data,
});
const filtrarError = () => ({
  type: FILTRAR_ERROR_OF,
});
