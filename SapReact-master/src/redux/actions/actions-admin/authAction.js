import {
  OBTENER_USUARIO_ADMIN,
  LOGIN_EXITOSO_ADMIN,
  LOGIN_ERROR_ADMIN,
  CERRAR_SESION_ADMIN,
  INICIO_LOGIN_ADMIN,
  OBTENER_USUARIO_ERROR_ADMIN,
  ERROR_EMAIL_ADMIN,
  ERROR_PASSWORD_ADMIN,
  SHOW_ALERT_ADMIN,
  HIDDEN_ALERT_ADMIN,
  RESET_EMAIL_ADMIN,
  RESET_PASSWORD_ADMIN,
} from "../../types/typesAdmin";
import clientAxios from "../../../config/axios";
import tokenAuth from "../../../config/token";
const showAlert = (data) => ({
  type: SHOW_ALERT_ADMIN,
  payload: data,
});
export function hiddenAlertAction() {
  return (dispatch) => {
    dispatch(hiddenAlert());
  };
}

const hiddenAlert = () => ({
  type: HIDDEN_ALERT_ADMIN,
});
//CERRAR SESION
export function cerrarSesionActionAdmin() {
  return async (dispatch) => {
    await dispatch(cerrarSesionAdmin());
  };
}

const cerrarSesionAdmin = () => ({
  type: CERRAR_SESION_ADMIN,
});

//AUTH
export function usuarioAuthActionAdmin() {
  return async (dispatch) => {
    const token = localStorage.getItem("tokenAdmin");
    console.log(token);

    tokenAuth(token);

    try {
      const respuesta = await clientAxios.get("/api/authAdmin");
      console.log(respuesta.data.usuario);
      dispatch(usuarioAuthAdmin(respuesta.data.usuario));
    } catch (error) {
      console.log(error.response.msg);
      dispatch(obtenerAuthAdminError());
    }
  };
}

const usuarioAuthAdmin = (data) => ({
  type: OBTENER_USUARIO_ADMIN,
  payload: data,
});

const obtenerAuthAdminError = () => ({
  type: OBTENER_USUARIO_ERROR_ADMIN,
});

//INICIAR SESION
export function iniciarSesionAdminAction(datos) {
  return async (dispatch) => {
    dispatch(iniciarLogin());
    try {
      console.log(datos);
      const respuesta = await clientAxios.post("/api/authAdmin", datos);
      console.log(respuesta);
      await dispatch(iniciarSesionAdmin(respuesta));
      await dispatch(usuarioAuthActionAdmin());
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
  type: INICIO_LOGIN_ADMIN,
});
const iniciarSesionAdmin = (respuesta) => ({
  type: LOGIN_EXITOSO_ADMIN,
  payload: respuesta.data,
});

const iniciarSesionError = () => ({
  type: LOGIN_ERROR_ADMIN,
});
const errorEmail = () => ({
  type: ERROR_EMAIL_ADMIN,
});
const errorPassword = () => ({
  type: ERROR_PASSWORD_ADMIN,
});

export function resetEmailActionAdmin() {
  return (dispatch) => {
    dispatch(resetEmail());
  };
}

const resetEmail = () => ({
  type: RESET_EMAIL_ADMIN,
});

export function resetPasswordActionAdmin() {
  return (dispatch) => {
    dispatch(resetPassword());
  };
}

const resetPassword = () => ({
  type: RESET_PASSWORD_ADMIN,
});
