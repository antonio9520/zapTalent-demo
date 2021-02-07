import React, { useState } from "react";
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

const useStyles = makeStyles({
  root: {},
  select: {
    fontSize: "12px",
  },
  icon: {
    color: "#197EE6",
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

const Table = ({ postulados, setOpenModal, setDataUser }) => {
  const [value, setValue] = useState(0);
  const [age, setAge] = useState("");

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSelect = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="table-home-emp">
      <div className="top">
        <div className="top-top-table-home-emp">
          <p>Tus postulantes</p>
          <SearchBar />
        </div>
        <div className="top-bottom-table-emp">
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            <AntTab label="Leidos" />
            <AntTab style={{ marginLeft: "20px" }} label="No leidos" />
          </AntTabs>
        </div>
      </div>
      <div className="center">
        {postulados.map((item, index) => (
          <CardTable
            data={item}
            key={index}
            setOpenModal={setOpenModal}
            setDataUser={setDataUser}
          />
        ))}
      </div>
      <div className="bottom">
        <div className="overlay-home-emp"></div>
        <div className="left">
          <p>136 Profesionales</p>
        </div>
        <div className="right">
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel id="demo-simple-select-required-label">
              Filtrar por aviso
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={age}
              label="Filtrar por aviso"
              onChange={handleChangeSelect}
              classes={{ select: classes.select, icon: classes.icon }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Table;
