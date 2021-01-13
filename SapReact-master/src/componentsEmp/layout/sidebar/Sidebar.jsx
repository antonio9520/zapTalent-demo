import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import userlogo from "../../../resources/images/SAPTalent/icon-new-user.svg";
import { Link } from "react-router-dom";
import { List, ListItem } from "@material-ui/core";
import { Tooltip } from "../../../components";
import { ExitToApp, Home, BusinessCenter } from "@material-ui/icons";
import {
  usuarioAuthEmpAction,
  cerrarSesionEmpAction,
} from "../../../redux/actions/actions-emp/authAction";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = (props) => {
  const { open } = props;
  const dispatch = useDispatch();
  const [active, setActive] = useState("home");
  // const [profesion, setProfesion] = useState(null);
  const usuario = useSelector((state) => state.authEmp.usuario);
  const [image, setImage] = useState();
  // console.log(usuario);

  const cerrarSesion = () => {
    dispatch(cerrarSesionEmpAction());
  };

  useEffect(() => {
    dispatch(usuarioAuthEmpAction());
  }, []);

  let nombreuser;
  let apellidouser;
  let profesion;
  // if (usuario) {
  //   nombreuser = usuario.nombres.split(" ")[0];
  //   apellidouser = usuario.apellidos.split(" ")[0];
  //   profesion = usuario.profesion ? usuario.profesion.name : null;
  // }

  useEffect(() => {
    setImage(usuario ? (usuario.imageURL ? usuario.imageURL : null) : null);
  }, [usuario]);
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
                    <p>{usuario ? nombreuser + " " + apellidouser : null}</p>
                    <p>{profesion}</p>
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
              <Link to="/empresas/home" className="link link-sidebar">
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
            onClick={() => setActive("ecosap")}
            className={active === "ecosap" ? "li-active" : "listitem"}
          >
            <Tooltip title="Ecosistema SAP" placement="right">
              <Link to="/empresas/eco-sap" className="link link-sidebar">
                {/* <img src={iconOfertas} alt="ofertas" /> */}
                <BusinessCenter className="exitapp-sidebar" />
                <p className={open ? "txt-sidebar-mini" : "txt-sidebar2"}>
                  Ecosistema SAP
                </p>
              </Link>
            </Tooltip>
          </ListItem>
          <ListItem
            button
            onClick={() => setActive("avisos")}
            className={active === "avisos" ? "li-active" : "listitem"}
          >
            <Tooltip title="Mis Avisos" placement="right">
              <Link to="/empresas/avisos" className="link link-sidebar">
                {/* <img src={iconOfertas} alt="ofertas" /> */}
                <BusinessCenter className="exitapp-sidebar" />
                <p className={open ? "txt-sidebar-mini" : "txt-sidebar2"}>
                  Mis Avisos
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
