import React from "react";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import "./CustomInput.css";

export default function CustomInput(props) {
  const { helpertext, error, label } = props;

  return (
    <FormControl fullWidth size="small" error={error}>
      <InputLabel
        className="input-label-custom-input"
        htmlFor="component-helper"
      >
        {label}
      </InputLabel>
      <Input
        {...props}
      
        className="input-custom-input"
        aria-describedby="component-helper-text"
      />
      {error ? (
        <FormHelperText className="helper-text-custom-input">
          {helpertext}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}
