import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { COVER, LOGIN_FAKE, EMPRESAS, RESTABLECER } from "../../routes/paths";
import { RESTABLECER_EMP } from "../../routes/empresas/paths";
import { ThemeProvider } from "@material-ui/core/styles";
import { LoginEmp } from "../../containersEmp";
import { LoginAdmin } from "../../containersAdmin";
import PrivadaEmp from "../../routes/empresas/privadaEmp";
import PrivadaAdmin from "../../routes/admin/privadaAdmin";

import { Login, Cover, LoginFake, Empresas } from "../";
import Privada from "../../routes/privada";
import { Provider } from "react-redux";
import tokenAuth from "../../config/token";
import store from "../../redux/store/store";
import { theme } from "../../config/theme";

function App() {
  const token = localStorage.getItem("token");

  if (token) {
    tokenAuth(token);
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path={COVER} component={Cover} />
            <Route exact path={RESTABLECER} component={Login} />
            <Route exact path={EMPRESAS} component={Empresas} />
            <Route exact path={LOGIN_FAKE} component={LoginFake} />

            {/**Usuario**/}
            <Privada
              exact
              path={[
                // "/auth",
                "/home",
                "/ofertas-laborales",
                "/postulaciones/:indice",
                "/estudios",
                "/certificaciones",
                "/sap-adn",
                "/trabajos",
                "/perfil",
              ]}
            />
            <Route exact path="/login" component={Login} />
            {/**Empresas**/}
            <PrivadaEmp
              exact
              path={[
                // "/auth-emp",
                "/empresas/home",
                "/empresas/eco-sap",
                "/empresas/avisos",
                "/empresas/publicar-aviso",
                "/empresas/perfil/:id",
                "/empresas/postulantes/:index/:idaviso",
              ]}
            />
            <Route exact path="/login-empresas" component={LoginEmp} />
            <Route exact path={RESTABLECER_EMP} component={LoginEmp} />
            {/**ADMIN**/}
            <PrivadaAdmin
              exact
              path={[
                // "/auth-emp",
                "/admin/home",
              ]}
            />
            <Route exact path="/login-admin" component={LoginAdmin} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
