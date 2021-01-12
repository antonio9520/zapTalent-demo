import { Home, Avisos, EcoSap } from "../../containersEmp";

import React from "react";
import { Route, Switch } from "react-router-dom";

import { HOME, AVISOS, ECOSAP } from "./paths";

const Routes2 = () => (
  <Switch>
    <Route path={HOME} component={Home} />
    <Route path={AVISOS} component={Avisos} />
    <Route path={ECOSAP} component={EcoSap} />
  </Switch>
);

export default Routes2;
