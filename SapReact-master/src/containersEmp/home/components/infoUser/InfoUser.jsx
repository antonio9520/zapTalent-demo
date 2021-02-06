import React, { forwardRef, useState } from "react";
import "./InfoUser.css";
import { withStyles, Tabs, Tab } from "@material-ui/core";
import userimage from "../../../../resources/images/la-roca.jpg";
import {
  AdnSap,
  Certificados,
  DatosPersonales,
  Estudios,
  Trabajos,
} from "./containers";

const AntTabs = withStyles({
  root: {
    marginTop: "8px",
  },
  indicator: {
    backgroundColor: "#197EE6",
    height: "4px",
    top: "35px",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 50,
    minHeight: 30,
    padding: "5px",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "12px",
    fontFamily: ["Roboto"].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const InfoUser = forwardRef((props, ref) => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div ref={ref} className="info-user-home-emp">
      <div className="top">
        <div>
          <img src={userimage} alt="userimage" />
        </div>
        <div className="cont-p">
          <p className="p1">Cristina Teresa Portnoy Welz</p>
          <p className="p2">Ingeniero en informática</p>
          <div className="exp-adn">
            <p>Experiencia 5 años</p>
          </div>
          <p className="p3">Programador Javascript #5411452</p>
        </div>
      </div>
      <div className="bottom">
        <div className="tab-menu-emp-user">
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            <AntTab label="Datos personales" />
            <AntTab style={{ marginLeft: "20px" }} label="Estudios" />
            <AntTab style={{ marginLeft: "20px" }} label="Trabajos" />
            <AntTab style={{ marginLeft: "20px" }} label="Certificados" />
            <AntTab style={{ marginLeft: "20px" }} label="ADN SAP" />
          </AntTabs>
        </div>

        {value === 0 ? (
          <DatosPersonales />
        ) : value === 1 ? (
          <Estudios />
        ) : value === 2 ? (
          <Trabajos />
        ) : value === 3 ? (
          <Certificados />
        ) : value === 4 ? (
          <AdnSap />
        ) : null}
      </div>
    </div>
  );
});

export default InfoUser;
