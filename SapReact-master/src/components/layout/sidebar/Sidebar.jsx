import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import userlogo from "../../../resources/images/SAPTalent/icon-new-user.svg";
import { Link, useHistory } from "react-router-dom";
import { List, ListItem } from "@material-ui/core";
import { Tooltip } from "../../";
import {
  ExitToApp,
  Home,
  BusinessCenter,
  School,
  Description,
  Business,
  AccountTree,
} from "@material-ui/icons";
import { cerrarSesionAction } from "../../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../resources/images/SAPTalent/ZAPTalent-Logotipo-horizontal-Blanco.png";

const Sidebar = (props) => {
  const { open } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [active, setActive] = useState("home");
  // const [profesion, setProfesion] = useState(null);
  const usuario = useSelector((state) => state.auth.usuario);
  const [image, setImage] = useState();
  // console.log(usuario);

  const cerrarSesion = () => {
    // dispatch(cerrarSesionAction()).then(() => history.push("/login"));
    dispatch(cerrarSesionAction())

  };

  // useEffect(() => {
  //   dispatch(usuarioAuthAction());
  // }, []);

  let nombreuser;
  let apellidouser;
  let profesion;
  if (usuario) {
    nombreuser = usuario.nombres.split(" ")[0];
    apellidouser = usuario.apellidos.split(" ")[0];
    profesion = usuario.profesion ? usuario.profesion.name : null;
  }

  useEffect(() => {
    setImage(usuario ? (usuario.imageURL ? usuario.imageURL : null) : null);
  }, [usuario]);
  return (
    <div
      style={{ paddingTop: "75px" }}
      className={open ? "cont-sidebar-mini" : "cont-sidebar"}
    >
      <div className="header-logo-sidebar">
        <img src={logo} alt="SAP" />
      </div>
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
            onClick={() => setActive("perfil")}
          >
            <Tooltip title="Perfil" placement="right">
              <Link
                to="/perfil"
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
                    <p style={{ color: "white" }}>
                      {usuario ? nombreuser + " " + apellidouser : null}
                    </p>
                    <p style={{ color: "white" }}>{profesion}</p>
                  </>
                ) : null}
              </Link>
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
              <Link to="/home" className="link link-sidebar">
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
            onClick={() => setActive("ofertas")}
            className={active === "ofertas" ? "li-active" : "listitem"}
          >
            <Tooltip title="Ofertas laborales" placement="right">
              <Link to="/ofertas-laborales" className="link link-sidebar">
                {/* <img src={iconOfertas} alt="ofertas" /> */}
                <BusinessCenter className="exitapp-sidebar" />
                <p className={open ? "txt-sidebar-mini" : "txt-sidebar2"}>
                  Ofertas Laborales
                </p>
              </Link>
            </Tooltip>
          </ListItem>
          <ListItem
            button
            onClick={() => setActive("estudios")}
            className={active === "estudios" ? "li-active" : "listitem"}
          >
            <Tooltip title="Estudios" placement="right">
              <Link to="/estudios" className="link link-sidebar">
                {/* <img src={iconEstudios} alt="estudios" /> */}
                <School className="exitapp-sidebar" />

                <p className={open ? "txt-sidebar-mini" : "txt-sidebar3"}>
                  Mis Estudios
                </p>
              </Link>
            </Tooltip>
          </ListItem>
          <ListItem
            button
            onClick={() => setActive("certificados")}
            className={active === "certificados" ? "li-active" : "listitem"}
          >
            <Tooltip title="Certificados" placement="right">
              <Link to="/certificaciones" className="link link-sidebar">
                {/* <img src={iconCertificados} alt="certificados" /> */}
                <Description className="exitapp-sidebar" />
                <p className={open ? "txt-sidebar-mini" : "txt-sidebar4"}>
                  Mis Certificaciones
                </p>
              </Link>
            </Tooltip>
          </ListItem>
          <ListItem
            button
            onClick={() => setActive("adn-sap")}
            className={active === "adn-sap" ? "li-active" : "listitem"}
          >
            <Tooltip title="Mi ADN-ZAP" placement="right">
              <Link to="/sap-adn" className="link link-sidebar">
                {/* <img src={iconSapAdn}></img> */}
                <AccountTree className="exitapp-sidebar" />
                <p className={open ? "txt-sidebar-mini" : "txt-sidebar5"}>
                  Mi SAP ADN
                </p>
              </Link>
            </Tooltip>
          </ListItem>
          <ListItem
            button
            onClick={() => setActive("trabajos")}
            className={active === "trabajos" ? "li-active" : "listitem"}
          >
            <Tooltip title="Trabajos" placement="right">
              <Link to="/trabajos" className="link link-sidebar">
                {/* <img src={iconTrabajos} alt="trabajos" /> */}
                <Business className="exitapp-sidebar" />
                <p className={open ? "txt-sidebar-mini" : "txt-sidebar6"}>
                  Mis Trabajos
                </p>
              </Link>
            </Tooltip>
          </ListItem>
          <ListItem
            button
            onClick={() => cerrarSesion()}
            className={"btn-cerrar-sesion"}
          >
            <Link to="/redirect" className="link link-sidebar">
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
