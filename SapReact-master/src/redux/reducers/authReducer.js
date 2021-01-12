import {
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  OBTENER_USUARIO,
  ERROR_EMAIL,
  ERROR_PASSWORD,
  INICIO_LOGIN,
  RESET_EMAIL,
  RESET_PASSWORD,
  REGISTRO_ERROR,
  REGISTRO_EXITOSO,
  COMENZAR_REGISTRO,
  COMENZAR_EDICION_USUARIO,
  USUARIO_EDITADO_EXITO,
  USUARIO_EDITADO_ERROR,
  USUARIO_EDITADO_EXITO_PASS,
  OBTENER_USUARIO_ERROR,
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  autenticado: null,
  usuario: null,
  cargando: true,
  erroremail: false,
  errorpassword: false,
  loading: false,
  error: false,
  status: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INICIO_LOGIN:
    case COMENZAR_EDICION_USUARIO:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case COMENZAR_REGISTRO:
      return {
        ...state,
        cargando: true,
        error: false,
      };
    case REGISTRO_EXITOSO:
      return {
        ...state,
        cargando: false,
        loading: false,
        error: false,
      };
    case LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        // mensaje: null,
        cargando: false,
        loading: false,
        error: false,
      };
    case USUARIO_EDITADO_EXITO_PASS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case USUARIO_EDITADO_EXITO:
      return {
        ...state,
        cargando: false,
        loading: false,
        error: false,
        usuario: action.payload,
      };
    case CERRAR_SESION:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: null,
        // mensaje: action.payload,
        cargando: false,
      };
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        cargando: false,
      };
    case USUARIO_EDITADO_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        cargando: false,
        status: action.payload,
      };
    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false,
        loading: false,
      };
    case OBTENER_USUARIO_ERROR:
      return {
        ...state,
        cargando: false,
        loading: false,
        error: false,
      };
    case ERROR_EMAIL:
      return {
        ...state,
        erroremail: true,
        loading: false,
      };
    case ERROR_PASSWORD:
      return {
        ...state,
        errorpassword: true,
        loading: false,
      };
    case RESET_EMAIL:
      return {
        ...state,
        erroremail: false,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        errorpassword: false,
      };
    default:
      return state;
  }
}
