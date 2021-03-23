import {
  AGREGAR_EMPRESA,
  AGREGAR_EMPRESA_ERROR,
  AGREGAR_EMPRESA_EXITO,
  SHOW_ALERT_ADMIN,
  COMENZAR_DESCARGA_EMPRESA,
  DESCARGA_EMPRESA_EXITO,
  DESCARGA_EMPRESA_EXITO_INIT,
  DESCARGA_EMPRESA_ERROR,
  DETENER_CARGA_EMPRESA,
} from "../../types/typesAdmin";

const initialState = {
  empresas: [],
  loading: false,
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_EMPRESA:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AGREGAR_EMPRESA:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DESCARGA_EMPRESA_ERROR:
    case AGREGAR_EMPRESA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case AGREGAR_EMPRESA_EXITO:
      return {
        ...state,
        loading: false,
        empresas: [...state.empresas, action.payload],
      };
    case DESCARGA_EMPRESA_EXITO_INIT:
      return {
        ...state,
        loading: false,
        error: null,
        empresas: action.payload,
      };
    case DETENER_CARGA_EMPRESA:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DESCARGA_EMPRESA_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        empresas: [...state.empresas, action.payload],
      };
    default:
      return state;
  }
}
