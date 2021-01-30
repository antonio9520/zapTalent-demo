import {
  AGREGAR_AVISO,
  AGREGAR_AVISO_EXITO,
  AGREGAR_AVISO_ERROR,
  DESCARGA_AVISO_ERROR,
  DESCARGA_AVISO_EXITO,
  COMENZAR_DESCARGA_AVISO,
  OBTENER_AVISO_ELIMINAR,
  AVISO_ELIMINADO_ERROR,
  AVISO_ELIMINADO_EXITO,
  AVISO_EDITADO_EXITO,
  AVISO_EDITADO_ERROR,
  COMENZAR_EDICION_AVISO,
} from "../../types/typesEmp";

const initialState = {
  avisos: [],
  error: null,
  loading: false,
  cargando: false,
  avisoeliminar: null,
  avisoeditar: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_AVISO:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case COMENZAR_EDICION_AVISO:
    case AGREGAR_AVISO:
      return {
        ...state,
        cargando: true,
        error: null,
      };
    case DESCARGA_AVISO_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        avisos: [...state.avisos, action.payload],
      };
    case AVISO_EDITADO_ERROR:
    case AVISO_ELIMINADO_ERROR:
    case AGREGAR_AVISO_ERROR:
    case DESCARGA_AVISO_ERROR:
      return {
        ...state,
        loading: false,
        cargando: false,
        error: true,
      };
    case OBTENER_AVISO_ELIMINAR:
      return {
        ...state,
        loading: true,
        avisoeliminar: action.payload,
      };
    case AVISO_ELIMINADO_EXITO:
      return {
        ...state,
        avisos: state.avisos.filter(
          (aviso) => aviso._id !== state.avisoeliminar
        ),
        avisoeliminar: null,
        loading: false,
      };
    case AGREGAR_AVISO_EXITO:
      return {
        ...state,
        cargando: false,
        avisos: [...state.avisos, action.payload],
      };
    case AVISO_EDITADO_EXITO:
      return {
        ...state,
        cargando: false,
        avisos: state.avisos.map((aviso) =>
          aviso._id === action.payload._id ? (aviso = action.payload) : aviso
        ),
      };

    default:
      return state;
  }
}
