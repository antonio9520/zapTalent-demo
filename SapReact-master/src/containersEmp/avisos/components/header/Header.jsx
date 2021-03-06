import React, { useState } from "react";
import "./Header.css";
import { withStyles, Tabs, Tab } from "@material-ui/core";
import { SearchBar } from "../../../../componentsEmp";
import { Add } from "@material-ui/icons";
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
  setOpenModal,
  index,
  setIndex,
  _switch,
  setSwitch,
  query,
  setSkip,
  setQuery,
  disabledNewAviso,
  tipoPlan,
  totalavisos,
}) => {
  const [search, setSearch] = useState("");
  const handleChange = (event, newValue) => {
    setQuery({});
    setSearch("");
    setSkip(0);
    setIndex(newValue);
  };
  const handleClick = () => {
    query.search = search;
    setSkip(0);
    setQuery(query);
    setSwitch(!_switch);
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
            value={search}
            onKeyDown={_handleKeyDown}
          />
        </div>
        <AntTabs value={index} onChange={handleChange} aria-label="ant example">
          <AntTab label="Todos" />
          <AntTab label="Activos" />
          <AntTab label="Caducados" />
        </AntTabs>
        <Tooltip 
          title={`Nuevo Aviso. Restantes: ${
            tipoPlan.totalAvisos === 0
              ? "Ilimitado"
              : tipoPlan.totalAvisos - totalavisos
          }`}
        >
          <IconButton
            bg="primary"
            onClick={() => (disabledNewAviso ? null : setOpenModal(true))}
          >
            <Add />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
