import React from "react";
import { FormControl, InputLabel, Select, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {},
  selectEmpty: {},
  root: {
    "&.MuiSelect-root": {
      backgroundColor: "#000",
      color: "green",
    },
  },
}));

const CustomSelectC = (props) => {
  const { label, size, children } = props;
  const classes = useStyles();
  return (
    <FormControl fullWidth size={size} variant="outlined">
      <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
      <Select {...props} className={classes.root}>
        {children}
      </Select>
    </FormControl>
  );
};

export default CustomSelectC;
