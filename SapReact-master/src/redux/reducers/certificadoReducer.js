import {
  COMENZAR_DESCARGA_CERT,
  DESCARGA_CERT_EXITO,
  DESCARGA_CERT_ERROR,
  AGREGAR_CERT,
  AGREGAR_CERT_ERROR,
  AGREGAR_CERT_EXITO,
  OBTENER_CERT_ELIMINAR,
  CERT_ELIMINADO_EXITO,
  CERT_ELIMINADO_ERROR,
  COMENZAR_EDICION_CERT,
  CERT_EDITADO_ERROR,
  CERT_EDITADO_EXITO,
} from "../types";

const initialState = {
  certificados: [],
  error: null,
  loading: false,
  cargando: false,
  certificadoeditar: null,
  certificadoeliminar: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_CERT:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case AGREGAR_CERT:
    case COMENZAR_EDICION_CERT:
      return {
        ...state,
        cargando: true,
        error: false,
      };
    case DESCARGA_CERT_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        certificados: action.payload,
      };
    case DESCARGA_CERT_ERROR:
    case AGREGAR_CERT_ERROR:
    case CERT_ELIMINADO_ERROR:
    case CERT_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        cargando: false,
        error: true,
      };
    case AGREGAR_CERT_EXITO:
      return {
        ...state,
        cargando: false,
        certificados: [...state.certificados, action.payload],
      };
    case OBTENER_CERT_ELIMINAR:
      return {
        ...state,
        loading: true,
        certificadoeliminar: action.payload,
      };
    case CERT_ELIMINADO_EXITO:
      return {
        ...state,
        certificados: state.certificados.filter(
          (certificado) => certificado._id !== state.certificadoeliminar
        ),
        certificadoeliminar: null,
        loading: false,
      };
    case CERT_EDITADO_EXITO:
      return {
        ...state,
        cargando: false,
        certificados: state.certificados.map((certificado) =>
          certificado._id === action.payload._id
            ? (certificado = action.payload)
            : certificado
        ),
      };
    default:
      return state;
  }
}
