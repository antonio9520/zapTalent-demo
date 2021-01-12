import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";

const CustomIconButton = (props) => {
  return (
    <>
      <IconButton>{props.children}</IconButton>
    </>
  );
};

export default CustomIconButton;
