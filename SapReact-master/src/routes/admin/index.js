import React from "react";
import { Home } from "../../containersAdmin";
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
  </Switch>
);

export default Routes2;
