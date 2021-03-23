import {
  OBTENER_USUARIO_EMP,
  CERRAR_SESION_EMP,
  INICIO_LOGIN_EMP,
  LOGIN_ERROR_EMP,
  LOGIN_EXITOSO_EMP,
  OBTENER_USUARIO_ERROR_EMP,
  ERROR_EMAIL_EMP,
  ERROR_PASSWORD_EMP,
  SHOW_ALERT_EMP,
  HIDDEN_ALERT_EMP,
  RESET_EMAIL_EMP,
  RESET_PASSWORD_EMP,
} from "../../types/typesEmp";

import clientAxios from "../../../config/axios";
import tokenAuth from "../../../config/token";

const showAlert = (data) => ({
  type: SHOW_ALERT_EMP,
  payload: data,
});
export function hiddenAlertAction() {
  return (dispatch) => {
    dispatch(hiddenAlert());
  };
}

const hiddenAlert = () => ({
  type: HIDDEN_ALERT_EMP,
});

//AUTH

export function usuarioAuthEmpAction() {
  return async (dispatch) => {
    const token = localStorage.getItem("tokenEmp");

    tokenAuth(token);

    try {
      const respuesta = await clientAxios.get("/api/authEmpresa");
      console.log(respuesta.data);
      dispatch(usuarioAuth(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(obtenerAuthError());
    }
  };
}

const usuarioAuth = (data) => ({
  type: OBTENER_USUARIO_EMP,
  payload: data,
});

const obtenerAuthError = () => ({
  type: OBTENER_USUARIO_ERROR_EMP,
});

//INICIAR SESION

export function iniciarSesionEmpAction(datos) {
  return async (dispatch) => {
    dispatch(iniciarLogin());
    try {
      console.log(datos);
      const respuesta = await clientAxios.post("/api/authEmpresa", datos);

      dispatch(iniciarSesion(respuesta));
      dispatch(usuarioAuthEmpAction());
    } catch (error) {
      console.log(error.response);
      dispatch(iniciarSesionError());
      if (error.response) {
        if (error.response.status === 404) {
          console.log("error 404");
          dispatch(errorEmail());
        } else if (error.response.status === 400) {
          dispatch(errorPassword());
          console.log("error 400");
        } else {
          dispatch(
            showAlert({
              show: true,
              msg: "Error en el servidor",
              type: "error",
            })
          );
          console.log("error en el servidor");
        }
      } else {
        dispatch(
          showAlert({
            show: true,
            msg: "Error en el servidor, Intente mas tarde",
            type: "error",
          })
        );
        console.log("error en el servidor");
      }
    }
  };
}
const iniciarLogin = () => ({
  type: INICIO_LOGIN_EMP,
});
const iniciarSesion = (respuesta) => ({
  type: LOGIN_EXITOSO_EMP,
  payload: respuesta.data,
});

const iniciarSesionError = () => ({
  type: LOGIN_ERROR_EMP,
});
const errorEmail = () => ({
  type: ERROR_EMAIL_EMP,
});
const errorPassword = () => ({
  type: ERROR_PASSWORD_EMP,
});

//RESETEAR ERROR EMAIL PASSWORD

export function resetEmailEmpAction() {
  return (dispatch) => {
    dispatch(resetEmailEmp());
  };
}

const resetEmailEmp = () => ({
  type: RESET_EMAIL_EMP,
});

export function resetPasswordEmpAction() {
  return (dispatch) => {
    dispatch(resetPasswordEmp());
  };
}

const resetPasswordEmp = () => ({
  type: RESET_PASSWORD_EMP,
});

//CERRAR SESION

export function cerrarSesionEmpAction() {
  return (dispatch) => {
    dispatch(cerrarSesionEmp());
  };
}

const cerrarSesionEmp = () => ({
  type: CERRAR_SESION_EMP,
});
