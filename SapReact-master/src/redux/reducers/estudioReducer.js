import {
  COMENZAR_DESCARGA_ESTUDIO,
  DESCARGA_ESTUDIO_ERROR,
  DESCARGA_ESTUDIO_EXITO,
  AGREGAR_ESTUDIO,
  AGREGAR_ESTUDIO_ERROR,
  AGREGAR_ESTUDIO_EXITO,
  OBTENER_ESTUDIO_ELIMINAR,
  ESTUDIO_ELIMINADO_EXITO,
  ESTUDIO_ELIMINADO_ERROR,
  COMENZAR_EDICION_ESTUDIO,
  ESTUDIO_EDITADO_EXITO,
  ESTUDIO_EDITADO_ERROR,
} from "../types";

const initialState = {
  estudios: [],
  error: null,
  loading: false,
  cargando: false,
  estudioeditar: null,
  estudioeliminar: null,
  alert: { show: false, msg: "", type: "" },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_ESTUDIO:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case COMENZAR_EDICION_ESTUDIO:
    case AGREGAR_ESTUDIO:
      return {
        ...state,
        cargando: true,
        error: false,
      };
    case DESCARGA_ESTUDIO_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        estudios: action.payload,
      };
    case DESCARGA_ESTUDIO_ERROR:
    case AGREGAR_ESTUDIO_ERROR:
    case ESTUDIO_ELIMINADO_ERROR:
    case ESTUDIO_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        cargando: false,
        error: true,
      };
    case AGREGAR_ESTUDIO_EXITO:
      return {
        ...state,
        cargando: false,
        estudios: [...state.estudios, action.payload],
      };
    case OBTENER_ESTUDIO_ELIMINAR:
      return {
        ...state,
        loading: true,
        estudioeliminar: action.payload,
      };
    case ESTUDIO_ELIMINADO_EXITO:
      return {
        ...state,
        estudios: state.estudios.filter(
          (estudio) => estudio._id !== state.estudioeliminar
        ),
        estudioeliminar: null,
        loading: false,
      };
    case ESTUDIO_EDITADO_EXITO:
      return {
        ...state,
        cargando: false,
        estudios: state.estudios.map((estudio) =>
          estudio._id === action.payload._id
            ? (estudio = action.payload)
            : estudio
        ),
      };
    default:
      return state;
  }
}
