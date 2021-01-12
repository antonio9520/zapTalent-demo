import React from "react";
import "./OutInput.css";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";
import classNames from "classnames";
import {
  resetEmailAction,
  resetPasswordAction,
} from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";

const OutInput = (props) => {
  const {
    label,
    helpertext,
    funcOnChange, 
    type,
    error,
    size,
    defaultValue,
    name,
    logininput,
    modo2,
    funcionError,
  } = props;
  const dispatch = useDispatch();
  const InputClasses = classNames({
    "form-control-login": true,
    "form-control-small": size === "small",
  });
  const helperstyle = classNames({
    "helper-text-error-inact": true,
    "helper-text-error": error,
    helperlogin: (logininput || modo2) && error,
  });
  const handleChange = (e) => {
    if (error && !logininput) {
      funcionError(false);
    }
    if (logininput) {
      if (name === "email") {
        dispatch(resetEmailAction());
      } else if (name === "password") {
        dispatch(resetPasswordAction());
      }
    }
    funcOnChange(e.target.value);
  };
  return (
    <div className={!error ? "contCustomInput" : "contCustomInputError"}>
      <FormHelperText id="helper-email" className={helperstyle}>
        {helpertext}
      </FormHelperText>
      <FormControl
        variant="outlined"
        className={InputClasses}
        size={size}
        error={error}
        fullWidth
      >
        <InputLabel htmlFor="my-input" className="input-label-login ">
          {label}
        </InputLabel>
        <OutlinedInput
          className="text-field-login "
          id="my-input"
          aria-describedby="helper-email"
          label={label}
          name={name}
          defaultValue={defaultValue}
          type={type}
          onChange={(e) => handleChange(e)}
          {...props}
        />
      </FormControl>
    </div>
  );
};

export default OutInput;
