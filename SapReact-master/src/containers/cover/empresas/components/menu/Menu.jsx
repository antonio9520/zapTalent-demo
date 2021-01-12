import React, { useState } from "react";
import "./Menu.css";
import { ListItem, IconButton, Drawer } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import logo from "../../../../../resources/empresas/ZAPTalent-Empresa-Logotipo-2.png";
import { Link as LinkScroll } from "react-scroll";

const Menu = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="menu-emp">
      <img src={logo} alt="zaptalent" />
      <ul className="menu-cover">
        <li>
          <LinkScroll
            className="link"
            to="section-one"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            <p className="p-menu">Inicio</p>
          </LinkScroll>
        </li>
        <li>
          <LinkScroll
            className="link"
            to="section-two"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            delay={100}
          >
            <p className="p-menu">Quienes Somos</p>
          </LinkScroll>
        </li>
        <li>
          <LinkScroll
            className="link"
            to="section-four"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            <p className="p-menu">Cómo Funciona</p>
          </LinkScroll>
        </li>
        <li>
          <LinkScroll
            className="link"
            to="section-four"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            <p className="p-menu">Servicios</p>
          </LinkScroll>
        </li>
        <li>
          <LinkScroll
            className="link"
            to="section-nine"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            <p className="p-menu">Precios</p>
          </LinkScroll>
        </li>
        <li>
          <LinkScroll
            className="link"
            to="section-four"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            <p className="p-menu">Contacto</p>
          </LinkScroll>
        </li>
      </ul>
      <IconButton className="icon-menu-responsive" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <CustomDrawer open={open} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default Menu;

const CustomDrawer = ({ open, toggleDrawer }) => {
  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer}>
      <div className="cont-img-drawer">
        <img className="img-drawer" src={logo} alt="zaptalent" />
      </div>
      <ul className="menu-cover-res">
        <LinkScroll
          className="link"
          to="section-one"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
        >
          <li onClick={() => toggleDrawer()}>
            <p className="p-menu-res">Inicio</p>
          </li>
        </LinkScroll>

        <LinkScroll
          className="link"
          to="section-two"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          delay={100}
        >
          <li>
            <p className="p-menu-res" onClick={() => toggleDrawer()}>
              Quienes Somos
            </p>
          </li>
        </LinkScroll>

        <LinkScroll
          className="link"
          to="section-four"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
        >
          <li>
            <p className="p-menu-res" onClick={() => toggleDrawer()}>
              Como Funciona
            </p>
          </li>
        </LinkScroll>

        <Link to="/login-register" className="link">
          <li>
            <p className="p-menu-res" onClick={() => toggleDrawer()}>
              Login
            </p>
          </li>
        </Link>

        <LinkScroll
          className="link"
          to="section-nine"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
        >
          <li>
            <p className="p-menu-res" onClick={() => toggleDrawer()}>
              Contacto
            </p>
          </li>
        </LinkScroll>
      </ul>
      <Link to="/empresas" className="link">
        <ListItem button className="btn-empresas-menu">
          <p className="p-menu-empresas">Empresas</p>
        </ListItem>
      </Link>
    </Drawer>
  );
};
