import {
  INICIO_LOGIN_EMP,
  LOGIN_EXITOSO_EMP,
  OBTENER_USUARIO_EMP,
  OBTENER_USUARIO_ERROR_EMP,
  LOGIN_ERROR_EMP,
  CERRAR_SESION_EMP,
  ERROR_EMAIL_EMP,
  ERROR_PASSWORD_EMP,
  RESET_EMAIL_EMP,
  RESET_PASSWORD_EMP,
  SHOW_ALERT_EMP,
  HIDDEN_ALERT_EMP,
} from "../../types/typesEmp";

const initialState = {
  token: localStorage.getItem("tokenEmp"),
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
    case INICIO_LOGIN_EMP:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case LOGIN_EXITOSO_EMP:
      localStorage.setItem("tokenEmp", action.payload.token);
      return {
        ...state,
        autenticado: true,
        // mensaje: null,
        cargando: false,
        loading: false,
        error: false,
      };
    case CERRAR_SESION_EMP:
      localStorage.removeItem("tokenEmp");
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: null,
        // mensaje: action.payload,
        cargando: false,
      };
    case LOGIN_ERROR_EMP:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case OBTENER_USUARIO_EMP:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false,
        loading: false,
      };
    case OBTENER_USUARIO_ERROR_EMP:
      return {
        ...state,
        cargando: false,
        loading: false,
        error: false,
      };
    case ERROR_EMAIL_EMP:
      return {
        ...state,
        erroremail: true,
        loading: false,
      };
    case ERROR_PASSWORD_EMP:
      return {
        ...state,
        errorpassword: true,
        loading: false,
      };
    case RESET_EMAIL_EMP:
      return {
        ...state,
        erroremail: false,
      };
    case RESET_PASSWORD_EMP:
      return {
        ...state,
        errorpassword: false,
      };
    case SHOW_ALERT_EMP:
      return {
        ...state,
        alert: action.payload,
      };
    case HIDDEN_ALERT_EMP:
      return {
        ...state,
        alert: { show: false, msg: "", type: "" },
      };
    default:
      return state;
  }
}
