import React, { forwardRef } from "react";
import { IconButton, makeStyles } from "@material-ui/core";

const CustomIconButton = forwardRef((props, ref) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      "&.MuiIconButton-root": {
        backgroundColor:
          props.bg === "primary"
            ? theme.palette.primary.main
            : props.bg === "close"
            ? "#F0F0F0"
            : null,
        color: props.color === "close" ? "#8F8E97" : "white",
        boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.2)",
        padding: props.bg === "close" ? "10px" : null,
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
