import {
  AGREGAR_EMPRESA,
  AGREGAR_EMPRESA_ERROR,
  AGREGAR_EMPRESA_EXITO,
  SHOW_ALERT_ADMIN,
  COMENZAR_DESCARGA_EMPRESA,
  DESCARGA_EMPRESA_EXITO,
  DESCARGA_EMPRESA_EXITO_INIT,
  DESCARGA_EMPRESA_ERROR,
  DETENER_CARGA_EMPRESA,
} from "../../types/typesAdmin";

import clientAxios from "../../../config/axios";

const showAlert = (data) => ({
  type: SHOW_ALERT_ADMIN,
  payload: data,
});

//Agregar
export function agregarEmpresaAction(data) {
  return async (dispatch) => {
    dispatch(agregarEmpresa());
    console.log(data);
    try {
      const fd = new FormData();
      if (data.logoURL) {
        fd.append(
          "logoURL",
          data.logoURL,
          data.logoURL.name ? data.logoURL.name : null
        );
      }

      fd.append("tipoPlan", data.tipoPlan);
      fd.append("razonSocial", data.razonSocial);
      fd.append("rut", data.rut);
      fd.append("giro", data.giro);
      fd.append("fechaInicio", data.fechaInicio);
      fd.append("fechaTermino", data.fechaTermino);
      fd.append("resena", data.resena);
      fd.append("direcciones", JSON.stringify(data.direcciones));
      // fd.append("direcciones", data.direcciones);
      fd.append("telefonos", JSON.stringify(data.telefonos));
      /**falta recorrer los perfiles y guardarlos */
      const respuesta = await clientAxios.post("/api/empresas", fd);

      dispatch(agregarEmpresaExito(respuesta.data));
      dispatch(
        showAlert({
          show: true,
          msg: "Aviso publicado correctamente.",
          type: "success",
        })
      );
      return respuesta.data._id;
    } catch (error) {
      console.log(error);
      dispatch(agregarEmpresaError());
      showAlert({ show: true, msg: error.response.data.msg, type: "error" });
    }
  };
}

const agregarEmpresa = () => ({
  type: AGREGAR_EMPRESA,
});

const agregarEmpresaExito = (data) => ({
  type: AGREGAR_EMPRESA_EXITO,
  payload: data,
});

const agregarEmpresaError = () => ({
  type: AGREGAR_EMPRESA_ERROR,
});

//OBTENER EMPRESAS
export function obtenerEmpresasAction({ skip, query }) {
  return async (dispatch) => {
    console.log("funcion obtener avisos");
    dispatch(descargaEmpresa());
    try {
      const respuesta = await clientAxios.put(
        `/api/empresas/obtener/empresas/${skip}`,
        query
      );
      if (respuesta.data.length === 0 && skip !== 0) {
        dispatch(detenerCargaEmpresa());
      } else {
        if (skip === 0) {
          dispatch(descargaExitoInitEmpresa(respuesta.data));
        } else {
          for (let i = 0; i < respuesta.data.length; i++) {
            dispatch(descargaExitoEmpresa(respuesta.data[i]));
          }
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(descargaErrorEmpresa());
    }
  };
}

const descargaEmpresa = () => ({
  type: COMENZAR_DESCARGA_EMPRESA,
});
const detenerCargaEmpresa = () => ({
  type: DETENER_CARGA_EMPRESA,
});
const descargaExitoEmpresa = (data) => ({
  type: DESCARGA_EMPRESA_EXITO,
  payload: data,
});
const descargaExitoInitEmpresa = (data) => ({
  type: DESCARGA_EMPRESA_EXITO_INIT,
  payload: data,
});
const descargaErrorEmpresa = () => ({
  type: DESCARGA_EMPRESA_ERROR,
});
