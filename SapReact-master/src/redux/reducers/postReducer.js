import {
  CREAR_POSTULACION,
  CREAR_POSTULACION_EXITO,
  CREAR_POSTULACION_ERROR,
  OBTENER_POSTULACION,
  OBTENER_POSTULACION_EXITO,
  OBTENER_POSTULACION_ERROR,
  OBTENER_POST_ELIMINAR,
  POST_ELIMINADO_EXITO,
  POST_ELIMINADO_ERROR,
} from "../types";

const initialState = {
  postulaciones: [],
  error: null,
  loading: false,
  postulacioneliminar: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OBTENER_POSTULACION:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREAR_POSTULACION:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case OBTENER_POSTULACION_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        postulaciones: action.payload,
      };
    case OBTENER_POSTULACION_ERROR:
    case CREAR_POSTULACION_ERROR:
    case POST_ELIMINADO_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case CREAR_POSTULACION_EXITO:
      return {
        ...state,
        loading: false,
        postulaciones: [...state.postulaciones, action.payload],
      };
    case OBTENER_POST_ELIMINAR:
      return {
        ...state,
        loading: true,
        postulacioneliminar: action.payload,
      };
    case POST_ELIMINADO_EXITO:
      return {
        ...state,
        postulaciones: state.postulaciones.filter(
          (postulacion) => postulacion._id !== state.postulacioneliminar
        ),
        postulacioneliminar: null,
        loading: false,
      };
    default:
      return state;
  }
}
