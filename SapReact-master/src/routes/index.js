import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  Home,
  Ofertas,
  Estudios,
  Certificados,
  AdnSap,
  Trabajos,
  Perfil,
} from "../containers";
import {
  HOME,
  OFERTAS,
  ESTUDIOS,
  CERTIFICACIONES,
  SAP_ADN,
  TRABAJOS,
  PERFIL,
} from "./paths";

const Routes = () => (
  <Switch>
    <Route path={ESTUDIOS} component={Estudios} />
    <Route path={HOME} component={Home} />
    <Route path={OFERTAS} component={Ofertas} />
    <Route path={CERTIFICACIONES} component={Certificados} />
    <Route path={SAP_ADN} component={AdnSap} />
    <Route path={TRABAJOS} component={Trabajos} />
    <Route path={PERFIL} component={Perfil} />
  </Switch>
);

export default Routes;
