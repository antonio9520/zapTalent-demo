import React, { useState } from "react";
import "./Header.css";
import { SearchBar } from "../../../../componentsEmp";
import { withStyles, Tabs, Tab } from "@material-ui/core";

const AntTabs = withStyles({
  root: {
    marginTop: "8px",
  },
  indicator: {
    backgroundColor: "#197EE6",
    height: "5px",
  },
})(Tabs);
const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "16px",
    marginRight: theme.spacing(2),
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

const Header = ({ value, setValue }) => {
  // console.log("%cVerde", "color: green; font-size: 28px");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="cont-header-eco-sap-emp">
      <p className="title-header-eco-sap-emp">Ecosistema SAP</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "700px",
          justifyContent: "space-between",
        }}
      >
        <SearchBar />
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Todos" />
          <AntTab label="Postulantes" />
        </AntTabs>
      </div>
    </div>
  );
};

export default Header;
