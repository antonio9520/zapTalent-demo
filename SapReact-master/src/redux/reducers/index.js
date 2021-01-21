import { combineReducers } from "redux";
import authReducer from "./authReducer";
import trabajoReducer from "./trabajoReducer";
import estudioReducer from "./estudioReducer";
import certificadoReducer from "./certificadoReducer";
import adnReducer from "./adnReducer";
import alertReducer from "./alertReducer";
import ofertasLaboralesReducer from "./OfertasLaboralesReducer";
//EMPRESA
import authEmpReducer from "./reducers-emp/authReducer";
import avisoReducers from "./reducers-emp/avisosReducer";

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
});
