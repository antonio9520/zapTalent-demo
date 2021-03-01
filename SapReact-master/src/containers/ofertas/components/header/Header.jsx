import React, { useState } from "react";
import "./Header.css";
import { withStyles, Tabs, Tab } from "@material-ui/core";
import { SearchBar } from "../../../../componentsEmp";
import { FilterList } from "@material-ui/icons";
import { Tooltip, IconButton } from "../../../../components";

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
  setOpen,
  indexTab,
  setindexTab,
  setSkip,
  obtenerOfertas,
  query,
  setQuery,
  search,
  setSearch,
}) => {
  const handleChange = (event, newValue) => {
    setindexTab(newValue);
    setQuery({});
    setSearch("");
    setSkip(0);
    query.skip = 0;
    if (newValue !== 1) {
      obtenerOfertas(query, newValue);
    }
  };

  const handleClick = () => {
    query.search = search;
    setSkip(0);
    setQuery(query);
    console.log(query);
    obtenerOfertas(query, 0);
    console.log("handle click");
  };
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };
  return (
    <div className="header-avisos-emp" style={{ width: "inherit" }}>
      <div className="left-header-avisos-emp">
        <p>Mis Avisos</p>
      </div>
      <div className="right-header-avisos-emp">
        <div style={{ width: "350px", marginRight: "50px" }}>
          <SearchBar
            onChange={setSearch}
            onClick={handleClick}
            onKeyDown={_handleKeyDown}
            value={search}
          />
        </div>
        <AntTabs
          value={indexTab}
          onChange={handleChange}
          aria-label="ant example"
        >
          <AntTab label="Activos" />
          <AntTab label="Mis Postulaciones" />
          <AntTab label="Caducados" />
          <AntTab label="Todos" />
        </AntTabs>
        <Tooltip title="Filtrar">
          <IconButton bg="primary" onClick={() => setOpen(true)}>
            <FilterList />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
