import {
  AGREGAR_AVISO,
  AGREGAR_AVISO_EXITO,
  AGREGAR_AVISO_ERROR,
  DESCARGA_AVISO_ERROR,
  DESCARGA_AVISO_EXITO,
  COMENZAR_DESCARGA_AVISO,
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
    //   case COMENZAR_EDICION_TRABAJO:
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
        avisos: action.payload,
      };
    //   case TRABAJO_EDITADO_ERROR:
    //   case TRABAJO_ELIMINADO_ERROR:
    case AGREGAR_AVISO_ERROR:
    case DESCARGA_AVISO_ERROR:
      return {
        ...state,
        loading: false,
        cargando: false,
        error: true,
      };
    //   case OBTENER_TRABAJO_ELIMINAR:
    //     return {
    //       ...state,
    //       loading: true,
    //       trabajoeliminar: action.payload,
    //     };
    //   case TRABAJO_ELIMINADO_EXITO:
    //     return {
    //       ...state,
    //       trabajos: state.trabajos.filter(
    //         (trabajo) => trabajo._id !== state.trabajoeliminar
    //       ),
    //       trabajoeliminar: null,
    //       loading: false,
    //     };
    case AGREGAR_AVISO_EXITO:
      return {
        ...state,
        cargando: false,
        avisos: [...state.avisos, action.payload],
      };
    //   case TRABAJO_EDITADO_EXITO:
    //     return {
    //       ...state,
    //       cargando: false,
    //       trabajos: state.trabajos.map((trabajo) =>
    //         trabajo._id === action.payload._id
    //           ? (trabajo = action.payload)
    //           : trabajo
    //       ),
    //     };

    default:
      return state;
  }
}
