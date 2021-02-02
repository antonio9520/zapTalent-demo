import {
  COMENZAR_DESCARGA_OFER_LABORAL,
  DESCARGA_OFER_LABORAL_ERROR,
  DESCARGA_OFER_LABORAL_EXITO,
  COMENZAR_FILTRAR_OF,
  FILTRAR_ERROR_OF,
  FILTRAR_EXITO_OF,
  DETENER_CARGA_OF,
  INIT_OBTENER_OF,
  FILTRAR_EXITO_OF_INIT,
} from "../types";

const initialState = {
  ofertasLaborales: [],
  error: null,
  loading: false,
  cargando: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_OFER_LABORAL:
    case COMENZAR_FILTRAR_OF:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DESCARGA_OFER_LABORAL_EXITO:
    case FILTRAR_EXITO_OF:
      return {
        ...state, 
        loading: false,
        error: null,
        ofertasLaborales: [...state.ofertasLaborales, action.payload],
      };
    case FILTRAR_EXITO_OF_INIT:
    case INIT_OBTENER_OF:
      return {
        ...state,
        loading: false,
        error: null,
        ofertasLaborales: action.payload,
      };
    case DESCARGA_OFER_LABORAL_ERROR:
    case FILTRAR_ERROR_OF:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case DETENER_CARGA_OF:
      return {
        ...state,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
}
