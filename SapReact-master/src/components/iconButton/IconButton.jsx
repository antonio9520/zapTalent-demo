import React, { forwardRef } from "react";
import { IconButton, makeStyles } from "@material-ui/core";

const CustomIconButton = forwardRef((props, ref) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      "&.MuiIconButton-root": {
        backgroundColor:
          props.bg === "primary" ? theme.palette.primary.main : null,
        color: "white",
        boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.2)",
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      <IconButton {...props} className={classes.root} ref={ref}>
        {props.children}
      </IconButton>
    </>
  );
});

export default CustomIconButton;
