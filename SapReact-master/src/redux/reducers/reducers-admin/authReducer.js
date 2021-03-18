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

const initialState = {
  token: localStorage.getItem("tokenAdmin"),
  autenticado: null,
  usuario: null,
  cargando: true,
  erroremail: false,
  errorpassword: false,
  loading: false,
  error: false,
  status: 0,
  alert: { show: false, msg: "", type: "" },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INICIO_LOGIN_ADMIN:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case LOGIN_EXITOSO_ADMIN:
      console.log(action.payload.token)
      localStorage.setItem("tokenAdmin", action.payload.token);
      return {
        ...state,
        autenticado: true,
        // mensaje: null,
        cargando: false,
        loading: false,
        error: false,
      };
    case CERRAR_SESION_ADMIN:
      localStorage.removeItem("tokenAdmin");
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: null,
        // mensaje: action.payload,
        cargando: false,
      };
    case LOGIN_ERROR_ADMIN:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case OBTENER_USUARIO_ADMIN:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false,
        loading: false,
      };
    case OBTENER_USUARIO_ERROR_ADMIN:
      return {
        ...state,
        cargando: false,
        loading: false,
        error: false,
      };
    case ERROR_EMAIL_ADMIN:
      return {
        ...state,
        erroremail: true,
        loading: false,
      };
    case ERROR_PASSWORD_ADMIN:
      return {
        ...state,
        errorpassword: true,
        loading: false,
      };
    case RESET_EMAIL_ADMIN:
      return {
        ...state,
        erroremail: false,
      };
    case RESET_PASSWORD_ADMIN:
      return {
        ...state,
        errorpassword: false,
      };
    case SHOW_ALERT_ADMIN:
      return {
        ...state,
        alert: action.payload,
      };
    case HIDDEN_ALERT_ADMIN:
      return {
        ...state,
        alert: { show: false, msg: "", type: "" },
      };
    default:
      return state;
  }
}
