import {
  AGREGAR_EMPRESA,
  AGREGAR_EMPRESA_ERROR,
  AGREGAR_EMPRESA_EXITO,
  SHOW_ALERT_ADMIN,
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
      fd.append("direcciones", data.direcciones);
      fd.append("telefonos", data.telefonos);
      /**falta recorrer los perfiles y guardarlos */
      await clientAxios
        .post("/api/empresas", fd)
        .then((res) => dispatch(agregarEmpresaExito(res.data)));
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
