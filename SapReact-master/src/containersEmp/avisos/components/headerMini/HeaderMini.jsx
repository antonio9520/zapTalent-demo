import React, { useState } from "react";
import { withStyles, Tabs, Tab, makeStyles } from "@material-ui/core";
import { SearchBar } from "../../../../componentsEmp";
import { Add } from "@material-ui/icons";
import { Tooltip, IconButton } from "../../../../components";

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: "#187ce2",
    margin: 0,
    color: "white",
    width: 40,
    height: 40,
  },
}));

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

const HeaderMini = ({
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
  const classes = useStyles();
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
    <div className="header-mini-ofertas-laborales">
      <div className="center">
        <div className="search-ofertas-mini">
          <SearchBar
            onChange={setSearch}
            onClick={handleClick}
            onKeyDown={_handleKeyDown}
            value={search}
          />
        </div>
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
      <div className={"collapsable-close"}>
        <div className="contenedor-scroll">
          <AntTabs
            value={index}
            onChange={handleChange}
            aria-label="ant example"
          >
            <AntTab label="Todos" />
            <AntTab label="Activos" />
            <AntTab label="Caducados" />
          </AntTabs>
        </div>
      </div>
      {/* <Tooltip title="Expandir">
        <IconButton
          className={classes.expandBtn}
          onClick={() => setExpand(!expand)}
        >
          <ExpandMore />
        </IconButton>
      </Tooltip> */}
    </div>
  );
};

export default HeaderMini;
