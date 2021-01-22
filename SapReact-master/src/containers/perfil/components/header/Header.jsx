import React from "react";
import "./Header.css";
import { Settings } from "@material-ui/icons";

const Header = () => {
  return (
    <div className="cont-header-perfil">
      <div>
        <p>Perfil</p>
      </div>
      <div>
        <p>Perfil completado a 79%</p>
        <Settings className="icon-header-perfil-new"/>
      </div>
    </div>
  );
};

export default Header;
