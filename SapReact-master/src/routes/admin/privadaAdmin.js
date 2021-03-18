import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { LayoutAdmin } from "../../componentsAdmin";
import Routes from "../admin";
import { useSelector, useDispatch } from "react-redux";
import { usuarioAuthActionAdmin } from "../../redux/actions/actions-admin/authAction";

const Privada = ({ ...props }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authAdmin.autenticado);
  const cargando = useSelector((state) => state.authAdmin.cargando);

  useEffect(() => {
    dispatch(usuarioAuthActionAdmin());
    document.title = "ZAPTalent - Admin";
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !auth && !cargando ? (
          <Redirect to="/login-admin" />
        ) : (
          <LayoutAdmin>
            <Routes {...props} />
          </LayoutAdmin>
        )
      }
    />
  );
};

export default Privada;
