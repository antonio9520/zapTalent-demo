import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@material-ui/core";
import "./CustomSelectB.css";

const CustomSelectB = (props) => {
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
        // onChange={handleChange}
        className="select-custom-select-b"
        {...props}
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
