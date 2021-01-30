import React from "react";
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
    backgroundColor: "#4653B1",
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

const Header = ({ setOpen, indexTab, setindexTab }) => {
  const handleChange = (event, newValue) => {
    setindexTab(newValue);
  };
  return (
    <div className="header-avisos-emp">
      <div className="left-header-avisos-emp">
        <p>Mis Avisos</p>
      </div>
      <div className="right-header-avisos-emp">
        <div style={{ width: "350px", marginRight: "50px" }}>
          <SearchBar />
        </div>
        <AntTabs
          value={indexTab}
          onChange={handleChange}
          aria-label="ant example"
        >
          <AntTab label="Todos" />
          <AntTab label="Mis Postulaciones" />
          <AntTab label="Activos" />
          <AntTab label="Caducados" />
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
