import {
  AGREGAR_AVISO,
  AGREGAR_AVISO_ERROR,
  AGREGAR_AVISO_EXITO,
  SHOW_ALERT_EMP,
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
