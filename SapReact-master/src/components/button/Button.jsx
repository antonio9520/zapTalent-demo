import React from "react";
import { makeStyles, Button } from "@material-ui/core";

const CustomButton = (props) => {
  const useStyles = makeStyles(() => ({
    // root: {
    //   "&.MuiListItem-root": {
    //     color: "white",
    //     boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.2)",
    //     borderRadius: "3px",
    //     padding: "5px",
    //     alignItems: "center",
      
    //   },
    // },
  }));

  const classes = useStyles();

  return (
    <Button {...props} >
      {props.children}
    </Button>
  );
};

export default CustomButton;
