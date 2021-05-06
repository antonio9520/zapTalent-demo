import React, { useState, useEffect } from "react";
import "./Table.css";
import { SearchBar } from "../../../../containers/home/components";
import {
  withStyles,
  makeStyles,
  Tabs,
  Tab,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import CardTable from "../cardTable/CardTable";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";

const useStyles = makeStyles({
  root: {},
  select: {
    fontSize: "12px",
  },
  selectMenu: {
    fontSize: "12px",
  },
  icon: {
    color: "#197EE6",
  },
  label: {
    fontSize: "14px",
    fontStyle: "italic",
  },
});
const AntTabs = withStyles({
  root: {
    marginTop: "0px",
  },
  indicator: {
    backgroundColor: "#197EE6",
    height: "4px",
    top: "28px",
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

const Table = ({
  postulados,
  setOpenModal,
  setDataUser,
  dataFiltro,
  setQuery,
  query,
}) => {
  const [value, setValue] = useState(0);
  const [aviso, setAviso] = useState("");
  const [search, setSearch] = useState("");
  const totalusers = useSelector((state) => state.postulados.totalusers);
  const loading = useSelector((state) => state.postulados.loading);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSelect = (event) => {
    //
    setAviso(event.target.value);
  };
  useEffect(() => {
    if (value === 0) {
      setQuery({ ...query, leido: false });
    } else {
      setQuery({ ...query, leido: true });
    }
  }, [value]);

  const setIdAviso = (id) => {
    setQuery({ ...query, _id: id });
  };
  const handleClick = () => {
    setQuery({ ...query, search });
  };
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };
  return (
    <div className="table-home-emp">
      <div className="top">
        <div className="top-top-table-home-emp">
          <p>Tus postulantes</p>
          <SearchBar
            onChange={setSearch}
            onClick={handleClick}
            value={search}
            onKeyDown={_handleKeyDown}
          />
        </div>
        <div className="top-bottom-table-emp">
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            <AntTab label="No leidos" />
            <AntTab style={{ marginLeft: "20px" }} label="Leidos" />
          </AntTabs>
        </div>
      </div>
      <div className="center">
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Loader
              type="Oval"
              color="#00BFFF"
              height={50}
              width={50}
              visible={loading}
              //  timeout={3000} //3 secs
            />
          </div>
        ) : postulados.length === 0 ? (
          <div className="no-post-table-home-emp">
            <p>No hay postulaciones.</p>
          </div>
        ) : (
          postulados.map((item, index) => (
            <CardTable
              data={item}
              key={index}
              setOpenModal={setOpenModal}
              setDataUser={setDataUser}
            />
          ))
        )}
      </div>
      <div className="bottom">
        <div className="overlay-home-emp"></div>
        <div className="left">
          <p>{totalusers} Profesionales</p>
        </div>
        <div className="right">
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel
              id="demo-simple-select-required-label"
              className={classes.label}
            >
              Filtrar por aviso
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={aviso}
              label="Filtrar por aviso"
              onChange={handleChangeSelect}
              classes={{ select: classes.select, icon: classes.icon }}
            >
              <MenuItem
                value=""
                className="custom-menu-item"
                onClick={() => setIdAviso(null)}
              >
                <em>Ninguno</em>
              </MenuItem>
              {dataFiltro.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    className="custom-menu-item"
                    value={item.titulo}
                    onClick={() => setIdAviso(item._id)}
                  >
                    {item.titulo + " #"}
                    <span style={{ textTransform: "uppercase" }}>
                      {item._id.slice(18)}
                    </span>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Table;
