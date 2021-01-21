import {
  COMENZAR_DESCARGA_OFER_LABORAL,
  DESCARGA_OFER_LABORAL_ERROR,
  DESCARGA_OFER_LABORAL_EXITO,
  COMENZAR_FILTRAR_OF,
  FILTRAR_ERROR_OF,
  FILTRAR_EXITO_OF,
} from "../types";

const initialState = {
  ofertasLaborales: [],
  error: null,
  loading: false,
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
        ofertasLaborales: action.payload,
      };

    case DESCARGA_OFER_LABORAL_ERROR:
    case FILTRAR_ERROR_OF:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
}
