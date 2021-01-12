import React from "react";
import "./Header.css";
import { withStyles, Tabs, Tab, IconButton } from "@material-ui/core";
import { SearchBar } from "../../../../componentsEmp";
import { Add } from "@material-ui/icons";
import { Tooltip } from "../../../../components";

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

const Header = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Todos" />
          <AntTab label="Activos" />
          <AntTab label="Caducados" />
        </AntTabs>
        <Tooltip title="Nuevo Aviso">
          <IconButton className="btn-add-avisos-empresas">
            <Add />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
