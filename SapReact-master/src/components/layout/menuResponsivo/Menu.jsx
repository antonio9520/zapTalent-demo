import React, { useState } from "react";
import "./Menu.css";
import { ListItem, Drawer } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  ExitToApp,
  Home,
  BusinessCenter,
  School,
  Description,
  Business,
  AccountTree,
  Menu as MenuIcon,
  AccountCircle,
  Close,
} from "@material-ui/icons";
import userlogo from "../../../resources/images/SAPTalent/icon-new-user.svg";
import { Tooltip } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { cerrarSesionAction } from "../../../redux/actions/authAction";

const Menu = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const usuario = useSelector((state) => state.auth.usuario);
  const cerrarSesion = () => {
    dispatch(cerrarSesionAction());
  };
  let nombreuser;
  let apellidouser;
  let profesion;

  if (usuario) {
    nombreuser = usuario.nombres.split(" ")[0];
    apellidouser = usuario.apellidos.split(" ")[0];
    profesion = usuario.profesion ? usuario.profesion.name : null;
  }
  return (
    <>
      <div className="cont-menu-resp">
        <Tooltip title="Perfil">
          <Link to="/perfil" className={`link`}>
            <ListItem
              button
              className={
                active === "perfil"
                  ? "btn-resp-menu-active hidsm"
                  : "btn-resp-menu hidsm"
              }
              onClick={() => setActive("perfil")}
            >
              <AccountCircle />
            </ListItem>
          </Link>
        </Tooltip>

        <Tooltip title="Home">
          <Link to="/home" className={`link`}>
            <ListItem
              button
              className={
                active === "home"
                  ? "btn-resp-menu-active hidsm"
                  : "btn-resp-menu hidsm"
              }
              onClick={() => setActive("home")}
            >
              <Home />
            </ListItem>
          </Link>
        </Tooltip>
        <Tooltip title="Ofertas laborales">
          <Link to="/ofertas-laborales" className="link">
            <ListItem
              button
              className={
                active === "ofertas" ? "btn-resp-menu-active" : "btn-resp-menu"
              }
              onClick={() => setActive("ofertas")}
            >
              <BusinessCenter />
            </ListItem>
          </Link>
        </Tooltip>
        <Tooltip title="Estudios">
          <Link to="/estudios" className="link">
            <ListItem
              button
              className={
                active === "estudios"
                  ? "btn-resp-menu-active "
                  : "btn-resp-menu "
              }
              onClick={() => setActive("estudios")}
            >
              <School />
            </ListItem>
          </Link>
        </Tooltip>
        <Tooltip title="Certificados">
          <Link to="/certificaciones" className="link">
            <ListItem
              button
              className={
                active === "certificados"
                  ? "btn-resp-menu-active "
                  : "btn-resp-menu "
              }
              onClick={() => setActive("certificados")}
            >
              <Description />
            </ListItem>
          </Link>
        </Tooltip>
        <Tooltip title="Adn ZAP">
          <Link to="/sap-adn" className="link">
            <ListItem
              button
              className={
                active === "adn" ? "btn-resp-menu-active " : "btn-resp-menu "
              }
              onClick={() => setActive("adn")}
            >
              <AccountTree />
            </ListItem>
          </Link>
        </Tooltip>
        <Tooltip title="Trabajos">
          <Link to="/trabajos" className="link">
            <ListItem
              button
              className={
                active === "trabajos"
                  ? "btn-resp-menu-active hidsm"
                  : "btn-resp-menu hidsm"
              }
              onClick={() => setActive("trabajos")}
            >
              <Business />
            </ListItem>
          </Link>
        </Tooltip>
        <Tooltip title="Cerrar sesión">
          <ListItem
            button
            className="btn-cerrar-menu-resp"
            onClick={() => cerrarSesion()}
          >
            <ExitToApp />
          </ListItem>
        </Tooltip>
        <Tooltip title="Abrir menu">
          <ListItem
            button
            className="btn-open-menu-resp"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </ListItem>
        </Tooltip>
      </div>
      <CustomDrawer
        setOpen={setOpen}
        open={open}
        active={active}
        setActive={setActive}
        cerrarSesion={cerrarSesion}
        nombreuser={nombreuser}
        apellidouser={apellidouser}
        usuario={usuario}
        profesion={profesion}
      />
    </>
  );
};

export default Menu;

const CustomDrawer = ({
  setOpen,
  open,
  active,
  setActive,
  cerrarSesion,
  nombreuser,
  apellidouser,
  usuario,
  profesion,
}) => {
  const _onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer anchor="right" open={open} onClose={_onClose}>
      <div className="cont-menu-resp-drawer">
        <div className="cont-item-menu-rest-perfil">
          <Link to="/perfil" className="link">
            <ListItem
              button
              className={
                active === "perfil"
                  ? "perfil-resp-act-perfil"
                  : "perfil-resp-perfil"
              }
              onClick={() => {
                setActive("perfil");
                setOpen(false);
              }}
            >
              {usuario ? (
                usuario.imageURL ? (
                  <div className="cont-img-menu-resp-image">
                    <img src={usuario.imageURL} alt="zaptalent"></img>
                  </div>
                ) : (
                  <div className="cont-img-menu-resp">
                    <img src={userlogo} alt="zaptalent"></img>
                  </div>
                )
              ) : null}

              <p className="p1-menu-resp">
                {nombreuser} {apellidouser}
              </p>
              <p>{profesion}</p>
            </ListItem>
          </Link>
        </div>
        <div className="cont-item-menu-rest">
          <Link to="/home" className="link">
            <ListItem
              button
              className={active === "home" ? "perfil-resp-act" : "perfil-resp"}
              onClick={() => {
                setActive("home");
                setOpen(false);
              }}
            >
              <div
                className={
                  active === "home"
                    ? "cont-icon-resp-menu-act"
                    : "cont-icon-resp-menu"
                }
              >
                <Home />
              </div>
              <p>Home</p>
            </ListItem>
          </Link>
        </div>
        <div className="cont-item-menu-rest">
          <Link to="/ofertas-laborales" className="link">
            <ListItem
              button
              className={
                active === "ofertas" ? "perfil-resp-act" : "perfil-resp"
              }
              onClick={() => {
                setActive("ofertas");
                setOpen(false);
              }}
            >
              <div
                className={
                  active === "ofertas"
                    ? "cont-icon-resp-menu-act"
                    : "cont-icon-resp-menu"
                }
              >
                <BusinessCenter />
              </div>
              <p>Ofertas Laborales</p>
            </ListItem>
          </Link>
        </div>
        <div className="cont-item-menu-rest">
          <Link to="/estudios" className="link">
            <ListItem
              button
              className={
                active === "estudios" ? "perfil-resp-act" : "perfil-resp"
              }
              onClick={() => {
                setActive("estudios");
                setOpen(false);
              }}
            >
              <div
                className={
                  active === "estudios"
                    ? "cont-icon-resp-menu-act"
                    : "cont-icon-resp-menu"
                }
              >
                <School />
              </div>
              <p>Mis Estudios</p>
            </ListItem>
          </Link>
        </div>
        <div className="cont-item-menu-rest">
          <Link to="/certificaciones" className="link">
            <ListItem
              button
              className={
                active === "certificados" ? "perfil-resp-act" : "perfil-resp"
              }
              onClick={() => {
                setActive("certificados");
                setOpen(false);
              }}
            >
              <div
                className={
                  active === "certificados"
                    ? "cont-icon-resp-menu-act"
                    : "cont-icon-resp-menu"
                }
              >
                <Description />
              </div>
              <p>Mis Certificaciones</p>
            </ListItem>
          </Link>
        </div>
        <div className="cont-item-menu-rest">
          <Link to="/sap-adn" className="link">
            <ListItem
              button
              className={active === "adn" ? "perfil-resp-act" : "perfil-resp"}
              onClick={() => {
                setActive("adn");
                setOpen(false);
              }}
            >
              <div
                className={
                  active === "adn"
                    ? "cont-icon-resp-menu-act"
                    : "cont-icon-resp-menu"
                }
              >
                <AccountTree />
              </div>
              <p>Mi ZAP ADN</p>
            </ListItem>
          </Link>
        </div>
        <div className="cont-item-menu-rest">
          <Link to="/trabajos" className="link">
            <ListItem
              button
              className={
                active === "trabajos" ? "perfil-resp-act" : "perfil-resp"
              }
              onClick={() => {
                setActive("trabajos");
                setOpen(false);
              }}
            >
              <div
                className={
                  active === "trabajos"
                    ? "cont-icon-resp-menu-act"
                    : "cont-icon-resp-menu"
                }
              >
                <Business />
              </div>
              <p>Mis Trabajos</p>
            </ListItem>
          </Link>
        </div>
        <div className="cont-item-menu-rest">
          <ListItem
            button
            className="perfil-resp"
            onClick={() => cerrarSesion()}
          >
            <div className="cont-icon-resp-menu">
              <ExitToApp />
            </div>
            <p>Cerrar sesión</p>
          </ListItem>
        </div>
        <ListItem
          button
          className="close-menu-resp"
          onClick={() => setOpen(false)}
        >
          <Close />
        </ListItem>
      </div>
    </Drawer>
  );
};
