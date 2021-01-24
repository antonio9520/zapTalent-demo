import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { Layout } from "../components";
import Routes from "../routes";
import { useSelector, useDispatch } from "react-redux";
import { usuarioAuthAction } from "../redux/actions/authAction";

const Privada = ({ ...props }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.autenticado);
  const loading = useSelector((state) => state.auth.fixcargando);
  // const auth = false;
  useEffect(() => {
    dispatch(usuarioAuthAction());
    // eslint-disable-next-line
    console.log("auth-privada");
  }, []);
  console.log("privada: " + loading);
  return (
    <>
      <Route
        {...props}
        render={(props) =>
          !auth && !loading ? (
            <Redirect to="/login" />
          ) : (
            <Layout>
              <Routes {...props} />
            </Layout>
          )
        }
      />
    </>
  );
};

export default Privada;
