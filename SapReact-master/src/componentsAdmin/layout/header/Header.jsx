import React from "react";
import logo from "../../../resources/images/SAPTalent/ZAPTalent-Logotipo-Horizontal-Blanco.svg";


const Header = (props) => {
  const { open, setOpen } = props;

  // const usuario = useSelector((state) => state.auth.usuario);

  return (
    <div className="container-header-emp" style={{ zIndex: 100 }}>
      <div className="header-left">
        <div className="cont-logo-principal">
          <img src={logo} alt="logo" className="logo-principal" />
        </div>
        <button className="btn-open-sidebar" onClick={() => setOpen(!open)}>
          <div className="icon-bars">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
      </div>
      <div className="header-right"></div>
    </div>
  );
};

export default Header;
