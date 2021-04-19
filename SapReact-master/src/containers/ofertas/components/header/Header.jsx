import React, { useState } from "react";
import "./Header.css";
import { withStyles, Tabs, Tab } from "@material-ui/core";
import { SearchBar } from "../../../../componentsEmp";
import { FilterList } from "@material-ui/icons";
import { Tooltip, IconButton } from "../../../../components";

const AntTabs = withStyles((theme) => ({
  root: {
    marginTop: "8px",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexWrap: "wrap",
    },
  },
  indicator: {
    backgroundColor: "#197EE6",
    height: "5px",
  },
}))(Tabs);
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
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(1),
      fontSize: "12px",
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
    obtenerOfertas(query, 0);
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
        <div className="search-ofertas">
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

        <div className="cont-btn-filtrar-of-user">
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
