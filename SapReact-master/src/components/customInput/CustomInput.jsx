import React from "react";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import "./CustomInput.css";

export default function CustomInput(props) {
  const { helpertext, error, label, funcError } = props;

  // const handleChange = (e) => {
  //   if (error) {
  //     funcError(false);
  //   }
  //   onChange(e.target.value);
  // };
  return (
    <FormControl fullWidth size="small" error={error}>
      <InputLabel
        className="input-label-custom-input"
        htmlFor="component-helper"
      >
        {label}
      </InputLabel>
      <Input
        id="component-helper"
        // defaultValue={defaultValue ? defaultValue : null}
        className="input-custom-input"
        aria-describedby="component-helper-text"
        // onChange={(e) => handleChange(e)}
        {...props}
      />
      {error ? (
        <FormHelperText className="helper-text-custom-input">
          {helpertext}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}
