import {
  COMENZAR_DESCARGA_TRABAJO,
  DESCARGA_TRABAJO_ERROR,
  DESCARGA_TRABAJO_EXITO,
  OBTENER_TRABAJO_ELIMINAR,
  TRABAJO_ELIMINADO_ERROR,
  TRABAJO_ELIMINADO_EXITO,
  AGREGAR_TRABAJO,
  AGREGAR_TRABAJO_EXITO,
  AGREGAR_TRABAJO_ERROR,
  COMENZAR_EDICION_TRABAJO,
  TRABAJO_EDITADO_ERROR,
  TRABAJO_EDITADO_EXITO,
  SHOW_ALERT,
  HIDDEN_ALERT,
} from "../types";

const initialState = {
  trabajos: [],
  error: null,
  loading: false,
  cargando: false,
  trabajoeliminar: null,
  trabajoeditar: null,
  alert: { show: false, msg: "", type: "" },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_TRABAJO:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case COMENZAR_EDICION_TRABAJO:
    case AGREGAR_TRABAJO:
      return {
        ...state,
        cargando: true,
        error: null,
      };
    case DESCARGA_TRABAJO_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        trabajos: action.payload,
      };
    case TRABAJO_EDITADO_ERROR:
    case AGREGAR_TRABAJO_ERROR:
    case TRABAJO_ELIMINADO_ERROR:
    case DESCARGA_TRABAJO_ERROR:
      return {
        ...state,
        loading: false,
        cargando: false,
        error: true,
      };
    case OBTENER_TRABAJO_ELIMINAR:
      return {
        ...state,
        loading: true,
        trabajoeliminar: action.payload,
      };
    case TRABAJO_ELIMINADO_EXITO:
      return {
        ...state,
        trabajos: state.trabajos.filter(
          (trabajo) => trabajo._id !== state.trabajoeliminar
        ),
        trabajoeliminar: null,
        loading: false,
      };
    case AGREGAR_TRABAJO_EXITO:
      return {
        ...state,
        cargando: false,
        trabajos: [...state.trabajos, action.payload],
      };
    case TRABAJO_EDITADO_EXITO:
      return {
        ...state,
        cargando: false,
        trabajos: state.trabajos.map((trabajo) =>
          trabajo._id === action.payload._id
            ? (trabajo = action.payload)
            : trabajo
        ),
      };
    case SHOW_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case HIDDEN_ALERT:
      return {
        ...state,
        alert: { show: false, msg: "", type: "" },
      };
    default:
      return state;
  }
}
