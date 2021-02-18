import {
  COMENZAR_OBTENER_USUARIO,
  LOGIN_EXITOSO,
  CERRAR_SESION,
  LOGIN_ERROR,
  OBTENER_USUARIO,
  ERROR_EMAIL,
  ERROR_PASSWORD,
  INICIO_LOGIN,
  RESET_EMAIL,
  RESET_PASSWORD,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  COMENZAR_REGISTRO,
  COMENZAR_EDICION_USUARIO,
  USUARIO_EDITADO_ERROR,
  USUARIO_EDITADO_EXITO,
  USUARIO_EDITADO_EXITO_PASS,
  SUBIR_IMAGEN,
  SHOW_ALERT,
  OBTENER_USUARIO_ERROR,
} from "../types";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";

const showAlert = (data) => ({
  type: SHOW_ALERT,
  payload: data,
});

//CERRAR SESION
export function cerrarSesionAction() {
  return (dispatch) => {
    dispatch(cerrarSesion());
  };
}

const cerrarSesion = () => ({
  type: CERRAR_SESION,
});

//AUTH
export function usuarioAuthAction() {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clientAxios.get("/api/auth");
      //   console.log(respuesta.data.usuario);
      dispatch(usuarioAuth(respuesta.data.usuario));
    } catch (error) {
      console.log(error);
      dispatch(obtenerAuthError());
    }
  };
}

const usuarioAuth = (data) => ({
  type: OBTENER_USUARIO,
  payload: data,
});

const obtenerAuthError = () => ({
  type: OBTENER_USUARIO_ERROR,
});

//INICIAR SESION
export function iniciarSesionAction(datos) {
  return async (dispatch) => {
    dispatch(iniciarLogin());
    try {
      console.log(datos);
      const respuesta = await clientAxios.post("/api/auth", datos);

      dispatch(iniciarSesion(respuesta));
      dispatch(usuarioAuthAction());
    } catch (error) {
      console.log(error.response);
      dispatch(iniciarSesionError());
      if (error.response) {
        if (error.response.status === 404) {
          dispatch(errorEmail());
        } else if (error.response.status === 400) {
          dispatch(errorPassword());
        } else {
          dispatch(
            showAlert({
              show: true,
              msg: "Error en el servidor",
              type: "error",
            })
          );
        }
      } else {
        dispatch(
          showAlert({
            show: true,
            msg: "Error en el servidor, Intente mas tarde",
            type: "error",
          })
        );
      }
    }
  };
}
const iniciarLogin = () => ({
  type: INICIO_LOGIN,
});
const iniciarSesion = (respuesta) => ({
  type: LOGIN_EXITOSO,
  payload: respuesta.data,
});

const iniciarSesionError = () => ({
  type: LOGIN_ERROR,
});
const errorEmail = () => ({
  type: ERROR_EMAIL,
});
const errorPassword = () => ({
  type: ERROR_PASSWORD,
});

export function resetEmailAction() {
  return (dispatch) => {
    dispatch(resetEmail());
  };
}

const resetEmail = () => ({
  type: RESET_EMAIL,
});

export function resetPasswordAction() {
  return (dispatch) => {
    dispatch(resetPassword());
  };
}

const resetPassword = () => ({
  type: RESET_PASSWORD,
});

//REGISTRAR
export function registrarUsuarioAction(data) {
  return async (dispatch) => {
    dispatch(comenzarRegistro());
    try {
      const respuesta = await clientAxios.post("/api/usuarios", data);
      dispatch(registrarUsuario());
      return respuesta.data;
    } catch (error) {
      console.log(error);
      dispatch(registroError());
    }
  };
}

const registrarUsuario = (data) => ({
  type: REGISTRO_EXITOSO,
});

const registroError = () => ({
  type: REGISTRO_ERROR,
});

const comenzarRegistro = () => ({
  type: COMENZAR_REGISTRO,
});

//SUBIR IMAGEN
export function subirImagenAction(data) {
  return async (dispatch) => {
    dispatch(comenzarEditar());
    try {
      const fd = new FormData();
      if (data.imageURL) {
        fd.append("imageURL", data.imageURL);
        await clientAxios.put(
          `/api/usuarios/subir-foto-perfil/${data._id}`,
          fd
        );
        dispatch(usuarioAuthAction());
        dispatch(
          showAlert({
            show: true,
            msg: "Foto de perfil actualizada",
            type: "success",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(editarError());
    }
  };
}

//SUBIR IMAGEN
export function subirCVAction(data) {
  return async (dispatch) => {
    dispatch(comenzarEditar());
    try {
      const fd = new FormData();
      if (data.imageURL) {
        fd.append("imageURL", data.imageURL);
        await clientAxios.put(`/api/usuarios/actualizar-cv/${data._id}`, fd);
        dispatch(usuarioAuthAction());
        dispatch(
          showAlert({
            show: true,
            msg: "Archivo guardado correctamente",
            type: "success",
          })
        );
      }
      dispatch(editarUsuarioAction({ _id: data._id, dateActCV: new Date() }));
    } catch (error) {
      console.log(error);
      dispatch(editarError());
    }
  };
}

const editarError = () => ({
  type: USUARIO_EDITADO_ERROR,
});

const comenzarEditar = () => ({
  type: COMENZAR_EDICION_USUARIO,
});

//EDITAR
export function editarUsuarioAction(data) {
  return async (dispatch) => {
    dispatch(comenzarEditar());

    try {
      if (data.password) {
        await clientAxios
          .put(`/api/usuarios/actualizar-password/${data._id}`, data)
          .then((res) => {
            dispatch(editarUsuarioExitoPass());
            console.log(res.status);
            dispatch(editarUsuarioError(res.status));
          });

        dispatch(
          showAlert({
            show: true,
            msg: "Contraseña actualizada correctamente.",
            type: "success",
          })
        );
      } else if (data.habilidades) {
        await clientAxios.put(`/api/usuarios/${data._id}`, data).then((res) => {
          dispatch(editarUsuarioExito(res.data));
        });
        dispatch(
          showAlert({
            show: true,
            msg: "Se ha guardado correctamente.",
            type: "success",
          })
        );
      } else if (data.profesion) {
        await clientAxios.put(`/api/usuarios/${data._id}`, data).then((res) => {
          dispatch(editarUsuarioExito(res.data));
        });
        dispatch(
          showAlert({
            show: true,
            msg: "Profesión agregada correctamente.",
            type: "success",
          })
        );
        return true;
      } else if (
        data.rrss ||
        data.modulos ||
        data.submodulos ||
        data.industria ||
        data.carreras ||
        data.dateActCV
      ) {
        await clientAxios.put(`/api/usuarios/${data._id}`, data).then((res) => {
          dispatch(editarUsuarioExito(res.data));
        });
        return true;
      } else {
        await clientAxios.put(`/api/usuarios/${data._id}`, data).then((res) => {
          dispatch(editarUsuarioExito(res.data));
        });
        dispatch(
          showAlert({
            show: true,
            msg: "Usuario editado correctamente.",
            type: "success",
          })
        );
      }
    } catch (error) {
      dispatch(editarUsuarioError(0));
      if (error.response) {
        dispatch(
          showAlert({ show: true, msg: error.response.data.msg, type: "error" })
        );
        dispatch(editarUsuarioError(error.response.status));
        return;
      }
      dispatch(
        showAlert({ show: true, msg: "Error en el servidor", type: "error" })
      );
      dispatch(editarUsuarioError(error.response.status));
    }
  };
}

const editarUsuarioExito = (data) => ({
  type: USUARIO_EDITADO_EXITO,
  payload: data,
});

const editarUsuarioError = (data) => ({
  type: USUARIO_EDITADO_ERROR,
  payload: data,
});

const editarUsuarioExitoPass = (data) => ({
  type: USUARIO_EDITADO_EXITO_PASS,
});
