import React from "react";
import "./CustomSelect.css";
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@material-ui/core";
import classNames from "classnames";

const CustomSelect = (props) => {
  const {
    value,
    onChange,
    children,
    placeholder,
    size,
    error,
    helpertext,
    name,
    funcionError,
  } = props;

  const changeSelect = (e) => {
    if(error){
      funcionError(false);
    }
    onChange(e.target.value);
  };
  return (
    <div className={!error ? "cont-custom-select" : "cont-custom-select-error"}>
      <FormHelperText
        className={error ? "form-helper-select" : "form-helper-select-inact"}
      >
        {helpertext}
      </FormHelperText>
      <FormControl
        variant="outlined"
        fullWidth
        size={size}
        className="custom-select-form"
      >
        <InputLabel id="custom-select" className="label-custom-select">
          {placeholder}
        </InputLabel>
        <Select
          className="select-custom-select"
          labelId="custom-select"
          value={value}
          onChange={(e) => changeSelect(e)}
          label={placeholder}
          name={name}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          {children}
        </Select>
      </FormControl>
    </div>
  );
};

export default CustomSelect;
