import React, { useState } from "react";
import "./HeaderMini.css";
import {
  withStyles,
  Tabs,
  Tab,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { SearchBar } from "../../../../componentsEmp";
import { FilterList } from "@material-ui/icons";
import { Tooltip } from "../../../../components";

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
  const classes = useStyles();
  const [expand, setExpand] = useState(false);

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
        <Tooltip title="Filtrar">
          <IconButton className={classes.btn} onClick={() => setOpen(true)}>
            <FilterList />
          </IconButton>
        </Tooltip>
      </div>
      <div className={"collapsable-close"}>
        <div className="contenedor-scroll">
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
