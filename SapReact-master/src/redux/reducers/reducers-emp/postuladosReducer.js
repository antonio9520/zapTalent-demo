import {
  COMENZAR_DESCARGA_POSTULADOS,
  DESCARGA_POSTULADOS_ERROR,
  DESCARGA_POSTULADOS_EXITO,
} from "../../types/typesEmp";

const initialState = {
  postulados: [],
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_POSTULADOS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    // case COMENZAR_EDICION_AVISO:
    // case AGREGAR_AVISO:
    //   return {
    //     ...state,
    //     cargando: true,
    //     error: null,
    //   };
    case DESCARGA_POSTULADOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        postulados: [...state.postulados, action.payload],
      };
    // case AVISO_EDITADO_ERROR:
    // case AVISO_ELIMINADO_ERROR:
    // case AGREGAR_AVISO_ERROR:
    case DESCARGA_POSTULADOS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    // case OBTENER_AVISO_ELIMINAR:
    //   return {
    //     ...state,
    //     loading: true,
    //     avisoeliminar: action.payload,
    //   };
    // case AVISO_ELIMINADO_EXITO:
    //   return {
    //     ...state,
    //     avisos: state.avisos.filter(
    //       (aviso) => aviso._id !== state.avisoeliminar
    //     ),
    //     avisoeliminar: null,
    //     loading: false,
    //   };
    // case AGREGAR_AVISO_EXITO:
    //   return {
    //     ...state,
    //     cargando: false,
    //     avisos: [...state.avisos, action.payload],
    //   };
    // case AVISO_EDITADO_EXITO:
    //   return {
    //     ...state,
    //     cargando: false,
    //     avisos: state.avisos.map((aviso) =>
    //       aviso._id === action.payload._id ? (aviso = action.payload) : aviso
    //     ),
    //   };

    default:
      return state;
  }
}
