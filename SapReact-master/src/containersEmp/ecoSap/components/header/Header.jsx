import React, { useState } from "react";
import "./Header.css";
import { SearchBar } from "../../../../componentsEmp";
import { withStyles, Tabs, Tab } from "@material-ui/core";
import { Tooltip, IconButton } from "../../../../components";
import { FilterList } from "@material-ui/icons";

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

const Header = ({
  value,
  setValue,
  setSkip,
  setUsuarios,
  _switch,
  setSwitch,
  setQuery,
  setOpen,
  query,
}) => {
  const [search, setSearch] = useState("");
  // console.log("%cVerde", "color: green; font-size: 28px");
  const handleChange = (event, newValue) => {
    setUsuarios([]);
    setQuery({});
    setSkip(0);
    setSwitch(!_switch);
    setValue(newValue);
  };
  const handleClick = () => {
    query.search = search;
    setSkip(0);
    setQuery(query);
    console.log(query);
    setSwitch(!_switch);
    // obtenerOfertas(query, 0);
    console.log("handle click");
  };
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };
  return (
    <div className="cont-header-eco-sap-emp">
      <p className="title-header-eco-sap-emp">Ecosistema SAP</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "750px",
          justifyContent: "space-between",
        }}
      >
        <SearchBar
          onChange={setSearch}
          onClick={handleClick}
          onKeyDown={_handleKeyDown}
        />
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Todos" />
          <AntTab label="Postulantes" />
        </AntTabs>
        <div className="cont-btn-filter">
          <Tooltip title="Filtrar">
            <IconButton bg="primary" onClick={() => setOpen(true)}>
              <FilterList />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Header;
