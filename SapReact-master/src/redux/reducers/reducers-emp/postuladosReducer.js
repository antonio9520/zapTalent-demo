import {
  COMENZAR_DESCARGA_POSTULADOS,
  DESCARGA_POSTULADOS_ERROR,
  DESCARGA_POSTULADOS_EXITO,
  POSTULANTE_LEIDO_EXITO,
  DESCARGA_POSTULADOS_EXITO_INIT,
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
    case DESCARGA_POSTULADOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        postulados: [...state.postulados, action.payload],
      };
    case DESCARGA_POSTULADOS_EXITO_INIT:
      return {
        ...state,
        loading: false,
        error: null,
        postulados: action.payload,
      };
    case DESCARGA_POSTULADOS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case POSTULANTE_LEIDO_EXITO:
      return {
        ...state,
        postulados: state.postulados.filter(
          (postulado) => postulado.id_post !== action.payload
        ),
      };
    default:
      return state;
  }
}
