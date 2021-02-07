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
} from "../../types/typesEmp";

const initialState = {
  usuario: {},
  estudios: [],
  trabajos: [],
  certificados: [],
  adnSap: [],
  error: null,
  loading: false,
  loadingEst: false,
  loadingTrab: false,
  loadingCert: false,
  loadingAdn: false,
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
    case RESET_DATA_USER_INFO:
      return {
        ...state,
        usuario: {},
        estudios: [],
        trabajos: [],
        certificados: [],
        adnSap: [],
        error: null,
      };
    default:
      return state;
  }
}
