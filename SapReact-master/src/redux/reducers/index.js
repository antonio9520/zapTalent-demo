import { combineReducers } from "redux";
import authReducer from "./authReducer";
import trabajoReducer from "./trabajoReducer";
import estudioReducer from "./estudioReducer";
import certificadoReducer from "./certificadoReducer";
import adnReducer from "./adnReducer";
import alertReducer from "./alertReducer";
import ofertasLaboralesReducer from "./OfertasLaboralesReducer";
import postReducer from "./postReducer";
//EMPRESA
import authEmpReducer from "./reducers-emp/authReducer";
import avisoReducers from "./reducers-emp/avisosReducer";
import postuladosReducers from "./reducers-emp/postuladosReducer";

export default combineReducers({
  auth: authReducer,
  trabajo: trabajoReducer,
  estudio: estudioReducer,
  certificado: certificadoReducer,
  adn: adnReducer,
  alert: alertReducer,
  authEmp: authEmpReducer,
  aviso: avisoReducers,
  ofertasLaborales: ofertasLaboralesReducer,
  postulaciones: postReducer,
  postulados: postuladosReducers,
});
