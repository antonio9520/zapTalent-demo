import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import "./CustomSelectB.css";

const useStyle = makeStyles({
  // select: {
  //   maxWidth: "150px"
  // },
});

const CustomSelectB = (props) => {
  const classes = useStyle();
  const { label, error, helpertext } = props;

  return (
    <FormControl
      // className={classes.formControl}
      fullWidth
      size="small"
      error={error}
      
    >
      <InputLabel id="select-123" className="input-label-custom-select">
        {label}
      </InputLabel>
      <Select
        labelId="select-123"
        id="select-456"
        autoWidth
        // onChange={handleChange}
        className="select-custom-select-b"
        {...props}
        // classes={{ select: classes.select}}
      >
        {/* <MenuItem value="">
          <em></em>
  </MenuItem> */}
        {props.children}
      </Select>
      {error ? (
        <FormHelperText className="helper-text-custom-select-b">
          {helpertext}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default CustomSelectB;
