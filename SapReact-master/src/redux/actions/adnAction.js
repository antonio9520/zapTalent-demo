import {
  COMENZAR_DESCARGA_ADN,
  DESCARGA_ADN_EXITO,
  DESCARGA_ADN_ERROR,
  AGREGAR_ADN,
  AGREGAR_ADN_ERROR,
  AGREGAR_ADN_EXITO,
  SHOW_ALERT,
  ADN_ELIMINADO_ERROR,
  ADN_ELIMINADO_EXITO,
  OBTENER_ADN_ELIMINAR,
  ADN_EDITADO_ERROR,
  ADN_EDITADO_EXITO,
  OBTENER_ADN_EDITAR,
  COMENZAR_EDICION_ADN,
} from "../types";
import clientAxios from "../../config/axios";

const showAlert = (data) => ({
  type: SHOW_ALERT,
  payload: data,
});

//AGREGAR
export function agregarAdnAction(data) {
  return async (dispatch) => {
    dispatch(agregarAdn());
    try {
      for (let i = 0; i < data.length; i++) {
        let fd = new FormData();
        if (data[i].adnURL) {
          fd.append("adnURL", data[i].adnURL, data[i].adnURL.name);
        }
        fd.append("iduser", data[i].iduser);
        fd.append("name", data[i].name);
        fd.append("desc", data[i].desc);
        fd.append("idcert", data[i].idcert);
        fd.append("obs", data[i].obs);
        const submods = JSON.stringify(data[i].submodulos);
        fd.append("submodulos", submods);

        await clientAxios.post("/api/adnsap", fd).then((res) => {
          dispatch(agregarAdnExito(res.data));
        });
      }

      dispatch(
        showAlert({
          show: true,
          msg: "Adn agregado correctamente",
          type: "success",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(agregarAdnError());
      showAlert({ show: true, msg: "No se pudo guardar", type: "error" });
    }
  };
}

const agregarAdn = () => ({
  type: AGREGAR_ADN,
});

const agregarAdnExito = (data) => ({
  type: AGREGAR_ADN_EXITO,
  payload: data,
});

const agregarAdnError = () => ({
  type: AGREGAR_ADN_ERROR,
});

//OBTENER
export function obtenerAdnAction(id) {
  return async (dispatch) => {
    dispatch(descargaAdn());
    try {
      const respuesta = await clientAxios.get(`/api/adnsap/${id}`);
      console.log(respuesta.data);
      dispatch(descargaExito(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaError());
    }
  };
}

const descargaAdn = () => ({
  type: COMENZAR_DESCARGA_ADN,
});

const descargaExito = (data) => ({
  type: DESCARGA_ADN_EXITO,
  payload: data,
});

const descargaError = () => ({
  type: DESCARGA_ADN_ERROR,
});

//ELIMINAR
export function eliminarAdnAction(id) {
  return async (dispatch) => {
    dispatch(obtenerEliminarAdn(id));
    try {
      await clientAxios.delete(`/api/adnsap/${id}`);
      dispatch(eliminarAdnExito());
      dispatch(
        showAlert({ show: true, msg: "Adn eliminado.", type: "success" })
      );
    } catch (error) {
      console.log(error);
      dispatch(eliminarAdnError());
      dispatch(
        showAlert({ show: true, msg: "Error al eliminar", type: "error" })
      );
    }
  };
}

const obtenerEliminarAdn = (id) => ({
  type: OBTENER_ADN_ELIMINAR,
  payload: id,
});

const eliminarAdnExito = () => ({
  type: ADN_ELIMINADO_EXITO,
});

const eliminarAdnError = () => ({
  type: ADN_ELIMINADO_ERROR,
});

//EDITAR

export function editarAdnAction(data) {
  return async (dispatch) => {
    dispatch(comenzarEditar(data._id));

    try {
      let fd = new FormData();
      if (data.adnURL) {
        fd.append("adnURL", data.adnURL);
      }
      if (data.iduser) {
        fd.append("iduser", data.iduser);
      }
      if (data.name) {
        fd.append("name", data.name); 
      }
      if (data.desc) {
        fd.append("desc", data.desc);
      }
      if (data.idcert) {
        fd.append("idcert", data.idcert);
      }
      if (data.obs) {
        fd.append("obs", data.obs);
      }
      if (data.submodulos) {
        const submods = JSON.stringify(data.submodulos);
        fd.append("submodulos", submods);
      }

      await clientAxios.put(`/api/adnsap/${data._id}`, fd).then((res) => {
        console.log(res);
        dispatch(editarAdnExito(res.data));
      });
      dispatch(
        showAlert({
          show: true,
          msg: "Adn editado correctamente.",
          type: "success",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(editarAdnError());
      showAlert({ show: true, msg: "Hubo un error", type: "error" });
    }
  };
}

const comenzarEditar = (data) => ({
  type: COMENZAR_EDICION_ADN,
  payload: data,
});

const editarAdnExito = (data) => ({
  type: ADN_EDITADO_EXITO,
  payload: data,
});

const editarAdnError = () => ({
  type: ADN_EDITADO_ERROR,
});
