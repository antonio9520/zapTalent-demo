import {
  OBTENER_USER_USER_INFO,
  OBTENER_ESTUDIO_USER_INFO,
  OBTENER_TRABAJO_USER_INFO,
  OBTENER_CERTIFICADO_USER_INFO,
  OBTENER_ADN_USER_INFO,
  OBTENER_EXITO_USER_INFO,
  OBTENER_ESTUDIO_EXITO_USER_INFO,
  OBTENER_TRABAJO_EXITO_USER_INFO,
  OBTENER_CERT_EXITO_USER_INFO,
  OBTENER_ADN_EXITO_USER_INFO,
  RESET_DATA_USER_INFO,
  RESET_DATA_USER_INFO_B,
  OBTENER_POSTULACIONES_ID_EMPRESA,
  COMENZAR_OBTENER_POST_ID_EMPRESA,
} from "../../types/typesEmp";

const initialState = {
  usuario: {},
  estudios: [],
  trabajos: [],
  certificados: [],
  adns: [],
  postulaciones: [],
  error: null,
  loading: false,
  loadingEst: false,
  loadingTrab: false,
  loadingCert: false,
  loadingAdn: false,
  loadingPost: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OBTENER_USER_USER_INFO:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case OBTENER_EXITO_USER_INFO:
      return {
        ...state,
        loading: false,
        usuario: action.payload,
        error: false,
      };
    case OBTENER_ESTUDIO_USER_INFO:
      return {
        ...state,
        loadingEst: true,
      };
    case OBTENER_ESTUDIO_EXITO_USER_INFO:
      return {
        ...state,
        loadingEst: false,
        estudios: action.payload,
      };
    case OBTENER_TRABAJO_USER_INFO:
      return {
        ...state,
        loadingTrab: true,
      };
    case OBTENER_TRABAJO_EXITO_USER_INFO:
      return {
        ...state,
        loadingTrab: false,
        trabajos: action.payload,
      };
    case OBTENER_CERTIFICADO_USER_INFO:
      return {
        ...state,
        loadingCert: true,
      };
    case OBTENER_CERT_EXITO_USER_INFO:
      return {
        ...state,
        loadingCert: false,
        certificados: action.payload,
      };
    case OBTENER_ADN_USER_INFO:
      return {
        ...state,
        loadingAdn: true,
      };
    case OBTENER_ADN_EXITO_USER_INFO:
      return {
        ...state,
        loadingAdn: false,
        adns: action.payload,
      };
    case RESET_DATA_USER_INFO:
      return {
        ...state,
        usuario: {},
        estudios: [],
        trabajos: [],
        certificados: [],
        adns: [],
        postulaciones: [],
        error: null,
        loading: false,
        loadingEst: false,
        loadingTrab: false,
        loadingCert: false,
        loadingAdn: false,
      };
    case RESET_DATA_USER_INFO_B:
      return {
        ...state,
        estudios: [],
        trabajos: [],
        certificados: [],
        postulaciones: [],
        adns: [],
        error: null,
        loadingEst: false,
        loadingTrab: false,
        loadingCert: false,
        loadingAdn: false,
      };
    case COMENZAR_OBTENER_POST_ID_EMPRESA:
      return {
        ...state,
        loadingPost: true,
      };
    case OBTENER_POSTULACIONES_ID_EMPRESA:
      return {
        ...state,
        loadingPost: false,
        postulaciones: action.payload,
      };
    default:
      return state;
  }
}
