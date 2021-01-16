import {
  AGREGAR_AVISO,
  AGREGAR_AVISO_ERROR,
  AGREGAR_AVISO_EXITO,
  SHOW_ALERT_EMP,
  COMENZAR_DESCARGA_AVISO,
  DESCARGA_AVISO_ERROR,
  DESCARGA_AVISO_EXITO,
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
export function obtenerAvisoAction(id) {
  return async (dispatch) => {
    dispatch(descargaAviso());
    try {
      const respuesta = await clientAxios.get(`/api/avisos/${id}`);
      dispatch(descargaExito(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaError());
    }
  };
}

const descargaAviso = () => ({
  type: COMENZAR_DESCARGA_AVISO,
});

const descargaExito = (data) => ({
  type: DESCARGA_AVISO_EXITO,
  payload: data,
});

const descargaError = () => ({
  type: DESCARGA_AVISO_ERROR,
});
