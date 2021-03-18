import React, { useState } from "react";
import "./Header.css";
import { withStyles, Tabs, Tab } from "@material-ui/core";
import { SearchBar } from "../../../../../containers/home/components";

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

const Header = () => {
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClick = () => {
    // setQuery({ ...query, search });
    console.log("handleclick");
  };
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };
  return (
    <div className="header-table-home-admin">
      <p className="p1">Clientes empresas</p>
      <div className="right">
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Activos" />
          <AntTab style={{ marginLeft: "20px" }} label="Caducados" />
          <AntTab style={{ marginLeft: "20px" }} label="Cercanos a caducar" />
        </AntTabs>
        <div className="cont-search">
          <SearchBar
            onChange={setSearch}
            onClick={handleClick}
            value={search}
            onKeyDown={_handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
