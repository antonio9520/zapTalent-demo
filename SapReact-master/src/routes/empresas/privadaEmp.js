import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { LayoutEmp } from "../../componentsEmp";
import Routes2 from "../empresas";
import { useSelector, useDispatch } from "react-redux";
import { usuarioAuthEmpAction } from "../../redux/actions/actions-emp/authAction";

const Privada = ({ ...props }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authEmp.autenticado);
  const cargando = useSelector((state) => state.authEmp.cargando);

  useEffect(() => {
    dispatch(usuarioAuthEmpAction());
    console.log("privada");
    // eslint-disable-next-line
  }, []);


  return (
    <Route
      {...props}
      render={(props) =>
        !auth && !cargando ? (
          <Redirect to="/login-empresas" />
        ) : (
          <LayoutEmp>
            <Routes2 {...props} />
          </LayoutEmp>
        )
      }
    />
  );
};

export default Privada;
