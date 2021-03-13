import React from "react";
import { Home, Avisos, EcoSap, PerfilCompleto } from "../../containersEmp";
import { Route, Switch } from "react-router-dom";
import {
  HOME,
  AVISOS,
  ECOSAP,
  PERFIL_COMPLETO,
  ECOSAP_POSTULANTES,
} from "./paths";

const Routes2 = () => (
  <Switch>
    <Route path={HOME} component={Home} />
    <Route path={AVISOS} component={Avisos} />
    <Route path={ECOSAP} component={EcoSap} />
    <Route path={ECOSAP_POSTULANTES} component={EcoSap} />
    <Route path={PERFIL_COMPLETO} component={PerfilCompleto} />
  </Switch>
);

export default Routes2;
