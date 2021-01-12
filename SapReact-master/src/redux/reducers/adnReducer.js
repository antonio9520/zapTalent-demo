import {
  COMENZAR_DESCARGA_ADN,
  DESCARGA_ADN_EXITO,
  AGREGAR_ADN,
  AGREGAR_ADN_ERROR,
  AGREGAR_ADN_EXITO,
  DESCARGA_ADN_ERROR,
  ADN_ELIMINADO_ERROR,
  ADN_ELIMINADO_EXITO,
  OBTENER_ADN_ELIMINAR,
  ADN_EDITADO_ERROR,
  ADN_EDITADO_EXITO,
  COMENZAR_EDICION_ADN,
} from "../types";

const initialState = {
  adns: [],
  error: null,
  loading: false,
  cargando: false,
  adneditar: null,
  andeliminar: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_ADN:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case AGREGAR_ADN:
    case COMENZAR_EDICION_ADN:
      return {
        ...state,
        cargando: true,
        error: false,
        adneditar: action.payload,
      };
    case DESCARGA_ADN_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        adns: action.payload,
      };
    case DESCARGA_ADN_ERROR:
    case AGREGAR_ADN_ERROR:
    case ADN_ELIMINADO_ERROR:
    case ADN_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        cargando: false,
        error: true,
      };
    case AGREGAR_ADN_EXITO:
      return {
        ...state,
        cargando: false,
        adns: [...state.adns, action.payload],
      };
    case OBTENER_ADN_ELIMINAR:
      return {
        ...state,
        loading: true,
        andeliminar: action.payload,
      };
    case ADN_ELIMINADO_EXITO:
      return {
        ...state,
        adns: state.adns.filter((adn) => adn._id !== state.andeliminar),
        andeliminar: null,
        loading: false,
      };
    case ADN_EDITADO_EXITO:
      return {
        ...state,
        adns: state.adns.map((adn) =>
          adn._id === state.adneditar ? action.payload : adn
        ),
        cargando: false,
        error: false,
      };
    default:
      return state;
  }
}
