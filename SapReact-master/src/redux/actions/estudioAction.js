import {
  COMENZAR_DESCARGA_ESTUDIO,
  DESCARGA_ESTUDIO_EXITO,
  DESCARGA_ESTUDIO_ERROR,
  SHOW_ALERT,
  AGREGAR_ESTUDIO,
  AGREGAR_ESTUDIO_EXITO,
  AGREGAR_ESTUDIO_ERROR,
  OBTENER_ESTUDIO_ELIMINAR,
  ESTUDIO_ELIMINADO_ERROR,
  ESTUDIO_ELIMINADO_EXITO,
  COMENZAR_EDICION_ESTUDIO,
  ESTUDIO_EDITADO_EXITO,
  ESTUDIO_EDITADO_ERROR,
} from "../types";
import clientAxios from "../../config/axios";

const showAlert = (data) => ({
  type: SHOW_ALERT,
  payload: data,
});

//OBTENER
export function obtenerEstudiosAction(id) {
  return async (dispatch) => {
    dispatch(descargaEstudios());
    try {
      const respuesta = await clientAxios.get(`/api/estudios/${id}`);
      dispatch(descargaExito(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaError());
    }
  };
}

const descargaEstudios = () => ({
  type: COMENZAR_DESCARGA_ESTUDIO,
});

const descargaExito = (data) => ({
  type: DESCARGA_ESTUDIO_EXITO,
  payload: data,
});

const descargaError = () => ({
  type: DESCARGA_ESTUDIO_ERROR,
});

//GUARDAR
export function agregarEstudioAction(data) {
  return async (dispatch) => {
    dispatch(agregarEstudio());
    // console.log(data);
    try {
      const fd = new FormData();
      if (data.estudioURL) {
        fd.append(
          "estudioURL",
          data.estudioURL,
          data.estudioURL.name ? data.estudioURL.name : null
        );
      }
      fd.append("idusuario", data.idusuario);
      fd.append("tipoestudio", data.tipoestudio);
      fd.append("carrera", data.carrera);
      fd.append("institucion", data.institucion);
      fd.append("areaestudio", data.areaestudio);
      fd.append("escalanotas", data.escalanotas);
      fd.append("promedio", data.promedio);
      fd.append("pais", data.pais);
      fd.append("observacion", data.observacion);
      fd.append("estado", data.estado);
      fd.append("diainicio", data.diainicio);
      fd.append("diafin", data.diafin);
      // console.log(fd);
      await clientAxios
        .post("/api/estudios", fd)
        .then((res) => dispatch(agregarEstudioExito(res.data)));
      dispatch(
        showAlert({
          show: true,
          msg: "Estudio agregado correctamente",
          type: "success",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(agregarEstudioError());
      showAlert({ show: true, msg: "Hubo un error", type: "error" });
    }
    //error.response.data.msg
  };
}

const agregarEstudio = () => ({
  type: AGREGAR_ESTUDIO,
});

const agregarEstudioExito = (data) => ({
  type: AGREGAR_ESTUDIO_EXITO,
  payload: data,
});

const agregarEstudioError = () => ({
  type: AGREGAR_ESTUDIO_ERROR,
});

//ELIMINAR
export function eliminarEstudioAction(id) {
  return async (dispatch) => {
    dispatch(obtenerEliminarEstudio(id));
    try {
      await clientAxios.delete(`/api/estudios/${id}`);
      dispatch(eliminarEstudioExito());
      dispatch(
        showAlert({ show: true, msg: "Estudio eliminado.", type: "success" })
      );
    } catch (error) {
      console.log(error);
      dispatch(eliminarEstudioError());
      dispatch(
        showAlert({ show: true, msg: error.response.data.msg, type: "error" })
      );
    }
  };
}

const obtenerEliminarEstudio = (id) => ({
  type: OBTENER_ESTUDIO_ELIMINAR,
  payload: id,
});

const eliminarEstudioExito = () => ({
  type: ESTUDIO_ELIMINADO_EXITO,
});

const eliminarEstudioError = () => ({
  type: ESTUDIO_ELIMINADO_ERROR,
});

//EDITAR
export function editarEstudioAction(data) {
  return async (dispatch) => {
    dispatch(comenzarEditar());

    try {
      const fd = new FormData();

      if (data.estudioURL) {
        fd.append("estudioURL", data.estudioURL);
      }

      fd.append("idusuario", data.idusuario);
      if (data.tipoestudio) {
        fd.append("tipoestudio", data.tipoestudio);
      }
      if (data.carrera) {
        fd.append("carrera", data.carrera);
      }
      if (data.institucion) {
        fd.append("institucion", data.institucion);
      }
      if (data.areaestudio) {
        fd.append("areaestudio", data.areaestudio);
      }
      if (data.escalanotas) {
        fd.append("escalanotas", data.escalanotas);
      }
      if (data.promedio) {
        fd.append("promedio", data.promedio);
      }
      if (data.pais) {
        fd.append("pais", data.pais);
      }
      if (data.observacion) {
        fd.append("observacion", data.observacion);
      }
      if (data.estado) {
        fd.append("estado", data.estado);
      }
      if (data.diainicio) {
        fd.append("diainicio", data.diainicio);
      }
      if (data.diafin) {
        fd.append("diafin", data.diafin);
      }

      await clientAxios
        .put(`/api/estudios/${data._id}`, fd)
        .then((res) => dispatch(editarEstudioExito(res.data)));
      dispatch(
        showAlert({
          show: true,
          msg: "Estudio editado correctamente.",
          type: "success",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(editarEstudioError());
      showAlert({ show: true, msg: "Hubo un error", type: "error" });
    }
  };
}

const comenzarEditar = () => ({
  type: COMENZAR_EDICION_ESTUDIO,
});

const editarEstudioExito = (data) => ({
  type: ESTUDIO_EDITADO_EXITO,
  payload: data,
});

const editarEstudioError = () => ({
  type: ESTUDIO_EDITADO_ERROR,
});
