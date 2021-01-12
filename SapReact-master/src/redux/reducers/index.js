import { combineReducers } from "redux";
import authReducer from "./authReducer";
import trabajoReducer from "./trabajoReducer";
import estudioReducer from "./estudioReducer";
import certificadoReducer from "./certificadoReducer";
import adnReducer from "./adnReducer";
import alertReducer from "./alertReducer";
//EMPRESA
import authEmpReducer from "./reducers-emp/authReducer";

export default combineReducers({
  auth: authReducer,
  trabajo: trabajoReducer,
  estudio: estudioReducer,
  certificado: certificadoReducer,
  adn: adnReducer,
  alert: alertReducer,
  authEmp: authEmpReducer,
});
