import React from "react";
import { Tooltip, withStyles } from "@material-ui/core";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
   
  },
}))(Tooltip);

const CustomTooltip = (props) => {
  const { children } = props;
  return <LightTooltip {...props}>{children}</LightTooltip>;
};

export default CustomTooltip;
