import {
  COMENZAR_DESCARGA_POSTULADOS,
  DESCARGA_POSTULADOS_ERROR,
  DESCARGA_POSTULADOS_EXITO,
  POSTULANTE_LEIDO_EXITO,
  DESCARGA_POSTULADOS_EXITO_INIT,
  OBTENER_TOTAL_USUARIOS,
  OBTENER_TOTAL_AVISOS,
  OBTENER_TOTAL_POSTULANTES,
  OBTENER_TOTAL_NO_LEIDOS,
  OBTENER_TOTAL_USUARIOS_DIAS,
} from "../../types/typesEmp";

const initialState = {
  postulados: [],
  error: null,
  loading: false,
  totalusers: 0,
  totalpostulantes: 0,
  totalavisos: 0,
  postulantesnoleidos: 0,
  totalUsuariosDias: 0,
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
    case OBTENER_TOTAL_USUARIOS:
      return {
        ...state,
        totalusers: action.payload,
      };
    case OBTENER_TOTAL_AVISOS:
      return {
        ...state,
        totalavisos: action.payload,
      };
    case OBTENER_TOTAL_POSTULANTES:
      return {
        ...state,
        totalpostulantes: action.payload,
      };
    case OBTENER_TOTAL_NO_LEIDOS:
      return {
        ...state,
        postulantesnoleidos: action.payload,
      };
    case OBTENER_TOTAL_USUARIOS_DIAS:
      return {
        ...state,
        totalUsuariosDias: action.payload,
      };
    default:
      return state;
  }
}
