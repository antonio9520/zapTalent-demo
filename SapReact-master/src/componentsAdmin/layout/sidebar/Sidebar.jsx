import React, { useState, useEffect } from "react";
import userlogo from "../../../resources/images/SAPTalent/icon-new-user.svg";
import { Link } from "react-router-dom";
import { List, ListItem } from "@material-ui/core";
import { Tooltip } from "../../../components";
import { ExitToApp, Home, AccountTree, RecentActors } from "@material-ui/icons";
import { cerrarSesionActionAdmin } from "../../../redux/actions/actions-admin/authAction";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = (props) => {
  const { open } = props;
  const dispatch = useDispatch();
  const [active, setActive] = useState("home");
  // const [profesion, setProfesion] = useState(null);
  const usuario = useSelector((state) => state.authAdmin.usuario);
  const [tipoPlan, setTipoPlan] = useState("");
  const [image, setImage] = useState();
  // console.log(usuario);

  const cerrarSesion = () => {
    dispatch(cerrarSesionActionAdmin());
  };

  // useEffect(() => {
  //   dispatch(usuarioAuthEmpAction());
  // }, []);

  useEffect(() => {
    if (usuario) {
      setImage(usuario ? (usuario.logoURL ? usuario.logoURL : null) : null);
      setearTipoPlan();
    }
  }, [usuario]);

  const setearTipoPlan = () => {
    if (usuario.tipoPerfil === "admin") {
      setTipoPlan("Administrador");
    } else if (usuario.tipoPerfil === "gest") {
      setTipoPlan("Gestionador");
    }
  };
  return (
    <div
      style={{ paddingTop: "55px" }}
      className={open ? "cont-sidebar-mini" : "cont-sidebar"}
    >
      <div className="sidebar-body">
        <List className="list-sidebar">
          <ListItem
            button
            className={
              open
                ? `header-sidebar-mini ${
                    active === "perfil" ? "active-header" : null
                  }`
                : `header-sidebar ${
                    active === "perfil" ? "active-header" : null
                  }`
            }
            // onClick={() => setActive("perfil")}
          >
            <Tooltip title="Perfil" placement="right">
              <div
                // to="/perfil"
                className={`link  ${
                  open ? "link-header-mini" : "link-header-sidebar"
                }`}
              >
                {image ? (
                  <div
                    className={
                      !open
                        ? "cont-img-perfil-sidebar"
                        : "cont-img-perfil-sidebar-mini"
                    }
                  >
                    <img
                      src={image}
                      className={
                        open
                          ? `foto-perfil-mini `
                          : `foto-perfil foto-db-perfil`
                      }
                      alt="perfil"
                    />
                  </div>
                ) : (
                  <img
                    src={image ? image : userlogo}
                    className={open ? `foto-perfil-mini ` : `foto-perfil`}
                    alt="perfil"
                  />
                )}

                {!open ? (
                  <>
                    <p style={{ color: "white", marginTop: "10px" }}>
                      {usuario ? usuario.name : null}
                    </p>
                    <p style={{ color: "white" }}>
                      {" "}
                      {usuario ? "Administrador Master" : null}
                    </p>
                  </>
                ) : null}
              </div>
            </Tooltip>
          </ListItem>

          <ListItem
            button
            onClick={() => setActive("home")}
            className={
              active === "home" ? "li-active first-item" : "listitem first-item"
            }
          >
            <Tooltip title="Home" placement="right">
              <Link to="/admin/home" className="link link-sidebar">
                {/* <img src={iconHome} alt="home" /> */}
                <Home className="exitapp-sidebar" />
                <p className={open ? "txt-sidebar-mini" : "txt-sidebar"}>
                  Home
                </p>
              </Link>
            </Tooltip>
          </ListItem>

          <ListItem
            button
            onClick={() => cerrarSesion()}
            className={"btn-cerrar-sesion"}
          >
            <Link to="" className="link link-sidebar">
              <ExitToApp className="exitapp-sidebar" />
              <p className={open ? "txt-sidebar-mini" : "txt-sidebar6"}>
                Cerrar sesión
              </p>
            </Link>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
