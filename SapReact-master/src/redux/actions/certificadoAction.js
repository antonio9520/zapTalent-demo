import {
  SHOW_ALERT,
  COMENZAR_DESCARGA_CERT,
  DESCARGA_CERT_EXITO,
  DESCARGA_CERT_ERROR,
  AGREGAR_CERT,
  AGREGAR_CERT_ERROR,
  AGREGAR_CERT_EXITO,
  OBTENER_CERT_ELIMINAR,
  CERT_ELIMINADO_EXITO,
  CERT_ELIMINADO_ERROR,
  COMENZAR_EDICION_CERT,
  CERT_EDITADO_ERROR,
  CERT_EDITADO_EXITO,
} from "../types";
import clientAxios from "../../config/axios";

const showAlert = (data) => ({
  type: SHOW_ALERT,
  payload: data,
});

//OBTENER 
export function obtenerCertificadosAction(id) {
  return async (dispatch) => {
    dispatch(descargaCertificados());
    try {
      const respuesta = await clientAxios.get(`/api/certificacion/${id}`);
      dispatch(descargaExito(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaError());
    }
  };
}

const descargaCertificados = () => ({
  type: COMENZAR_DESCARGA_CERT,
});

const descargaExito = (data) => ({
  type: DESCARGA_CERT_EXITO,
  payload: data,
});

const descargaError = () => ({
  type: DESCARGA_CERT_ERROR,
});

//GUARDAR
export function agregarCertificadoAction(data) {
  return async (dispatch) => {
    dispatch(agregarCertificado());
    try {
      const fd = new FormData();
      if (data.certificadoURL) {
        console.log("data");
        fd.append(
          "certificadoURL",
          data.certificadoURL,
          data.certificadoURL.name ? data.certificadoURL.name : null
        );
      }

      fd.append("idusuario", data.idusuario);
      fd.append("certificacion", data.certificacion);
      fd.append("universidad", data.universidad);
      fd.append("pais", data.pais);
      fd.append("obs", data.obs);
      fd.append("fecha", data.fecha);
      fd.append("estado", data.estado);

      await clientAxios
        .post("/api/certificacion", fd)
        .then((res) => dispatch(agregarCertificadoExito(res.data)));
      dispatch(
        showAlert({
          show: true,
          msg: "Certificado agregado correctamente",
          type: "success",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(agregarCertificadoError());
      showAlert({ show: true, msg: "Hubo un error", type: "error" });
    }
  };
}
const agregarCertificado = () => ({
  type: AGREGAR_CERT,
});

const agregarCertificadoExito = (data) => ({
  type: AGREGAR_CERT_EXITO,
  payload: data,
});

const agregarCertificadoError = () => ({
  type: AGREGAR_CERT_ERROR,
});

//ELIMINAR
export function eliminarCertificadoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerEliminarCert(id));
    try {
      await clientAxios.delete(`/api/certificacion/${id}`);
      dispatch(eliminarCertExito());
      dispatch(
        showAlert({
          show: true,
          msg: "Certificado eliminado.",
          type: "success",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(eliminarCertError());
      dispatch(showAlert({ show: true, msg: "Hubo un error", type: "error" }));
    }
  };
}

const obtenerEliminarCert = (id) => ({
  type: OBTENER_CERT_ELIMINAR,
  payload: id,
});

const eliminarCertExito = () => ({
  type: CERT_ELIMINADO_EXITO,
});

const eliminarCertError = () => ({
  type: CERT_ELIMINADO_ERROR,
});

//EDITAR

export function editarCertAction(data) {
  return async (dispatch) => {
    dispatch(comenzarEditar());

    try {
      const fd = new FormData();
      if (data.certificadoURL) {
        fd.append("certificadoURL", data.certificadoURL);
      }
      if (data.idusuario) {
        fd.append("idusuario", data.idusuario);
      }
      if (data.certificacion) {
        fd.append("certificacion", data.certificacion);
      }
      if (data.universidad) {
        fd.append("universidad", data.universidad);
      }
      if (data.pais) {
        fd.append("pais", data.pais);
      }
      if (data.obs) {
        fd.append("obs", data.obs);
      }
      if (data.fecha) {
        fd.append("fecha", data.fecha);
      }
      if (data.estado) {
        fd.append("estado", data.estado);
      }
      console.log(fd.get("certificacion"));
      await clientAxios
        .put(`/api/certificacion/${data._id}`, fd)
        .then((res) => {
          console.log(res.data);
          dispatch(editarCertExito(res.data));
        });
      dispatch(
        showAlert({
          show: true,
          msg: "Certificado editado correctamente.",
          type: "success",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(editarCertError());
      showAlert({ show: true, msg: "Hubo un error", type: "error" });
    }
  };
}

const comenzarEditar = () => ({
  type: COMENZAR_EDICION_CERT,
});

const editarCertExito = (data) => ({
  type: CERT_EDITADO_EXITO,
  payload: data,
});

const editarCertError = () => ({
  type: CERT_EDITADO_ERROR,
});
