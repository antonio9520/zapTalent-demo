import React from "react";
import "./Header.css";
import { IconButton, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
const useStyles = makeStyles({
  root: {
    backgroundColor: "#187ce2",
    color: "white",
    boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.2)",
    "&:hover": {
      backgroundColor: "#105296",
    },
  },
});
const Header = () => {
  const classes = useStyles();
  return (
    <div className="header-home-admin">
      <p>Dashboard SCL Consultores</p>
      <IconButton className={classes.root}>
        <Add />
      </IconButton>
    </div>
  );
};

export default Header;
