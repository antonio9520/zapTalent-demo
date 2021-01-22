import React from "react";
import "./Header.css";
import { Badge, IconButton } from "@material-ui/core";
import {
  MailOutline,
  NotificationsNone,
  ArrowBackIos,
  Menu,
  ArrowBack,
} from "@material-ui/icons";
import logo from "../../../resources/images/SAPTalent/ZAPTalent-Logotipo-Horizontal-Blanco.svg";
import userlogo from "../../../resources/images/SAPTalent/icon-new-user.svg";
import { useSelector } from "react-redux";

const Header = (props) => {
  const { open, setOpen } = props;

  // const usuario = useSelector((state) => state.auth.usuario);

  return (
    <div className={!open ? "container-header-open" : "container-header"}>
      <div className="header-left">
        {open ? (
          <IconButton onClick={() => setOpen(!open)}>
            <Menu className="btn-open-sidebar-b" />
          </IconButton>
        ) : (
          <IconButton onClick={() => setOpen(!open)}>
            <ArrowBackIos className="btn-open-sidebar-b" />
          </IconButton>
        )}
      </div>
      <div className="header-right">
        {/* <div className="cont-logo-user">
          <>
            {usuario.imageURL ? (
              <img
                src={usuario.imageURL}
                alt="logo"
                className="logo-user-db"
              />
            ) : (
              <img
                src={userlogo}
                alt="logo"
                className="logo-user"
              />
            )}
          </>
        </div> */}

        <div className="cont-icon">
          <Badge badgeContent={3} color="error">
            <NotificationsNone className="icon-mail" />
          </Badge>
        </div>
        <div className="cont-icon">
          <Badge badgeContent={4} color="secondary">
            <MailOutline className="icon-mail" />
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Header;
