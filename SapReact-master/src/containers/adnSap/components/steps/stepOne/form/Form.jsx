import React, { useState, useEffect } from "react";
import "./Form.css";
import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { Tooltip } from "../../../../../../components";

const Form = ({
  item,
  arrayModules,
  setArrayModules,
  errorOne,
  switch2,
  setErrorOne,
}) => {
  const [file, setFile] = useState();
  const [id] = useState(item.idcert ? item.idcert : "");
  const [obs] = useState(item.obs);
  const [error, setError] = useState(false);

  const fileChange = (e) => {
    setArrayModules(
      arrayModules.map((it) =>
        it.name === item.name ? { ...it, adnURL: e.target.files[0] } : it
      )
    );
    setFile(e.target.files[0]);
  };

  const onChangeId = (e) => {
    if (error === true && e.target.name === "idcert") {
      setError(false);
      setErrorOne([]);
    }
    setArrayModules(
      arrayModules.map((it) =>
        it.name === item.name ? { ...it, [e.target.name]: e.target.value } : it
      )
    );
  };
  // console.log(arrayModules);
  useEffect(() => {
    setTimeout(() => {
      errorOne.map((i) => {
        if (i === item.name) {
          setError(true);
        }
      });
    }, 300);

    console.log(errorOne);
  }, [switch2]);

  return (
    <div className="cont-form-one-adn">
      <div className="cont-name-one-form">
        <p className="p1-form-adn-one" style={{ color: "white" }}>
          {item.name.length > 3 ? item.name.substring(0, 3) : item.name}
        </p>
      </div>
      <div style={{ margin: "5px 0", width: "100%" }}>
        <FormControl fullWidth size="small" error={error}>
          <InputLabel
            className="input-label-custom-input"
            htmlFor="component-helper"
          >
            Id Certificacion {item.name} (opcional)
          </InputLabel>
          <Input
            id="component-helper"
            defaultValue={id}
            className="input-custom-input"
            aria-describedby="component-helper-text"
            name="idcert"
            // type={type}
            onChange={(e) => onChangeId(e)}
          />
          {/* {error ? (
            <FormHelperText className="helper-text-custom-input">
              {helpertext}
            </FormHelperText>
          ) : null} */}
        </FormControl>
      </div>
      <div style={{ margin: "5px 0", width: "100%" }}>
        <FormControl fullWidth size="small">
          <InputLabel
            className="input-label-custom-input"
            htmlFor="component-helper"
          >
            Observaciones (opcional)
          </InputLabel>
          <Input
            id="component-helper"
            defaultValue={obs}
            className="input-custom-input"
            aria-describedby="component-helper-text"
            name="obs"
            // type={type}
            onChange={(e) => onChangeId(e)}
          />
          {/* {error ? (
            <FormHelperText className="helper-text-custom-input">
              {helpertext}
            </FormHelperText>
          ) : null} */}
        </FormControl>
      </div>
      <div style={{ margin: "5px 0", width: "100%" }}>
        <input
          type="file"
          id={`raised-button-file${item.name}`}
          onChange={(e) => fileChange(e)}
          style={{ display: "none" }}
          name="adnURL"
          accept="application/pdf, image/png, .jpeg, .jpg, image/gif, .doc, .docx"
        />
        <TextField
          fullWidth
          size="small"
          id="input-with-icon-textfield"
          label="Cargar archivo (opcional)"
          value={file ? (file.name ? file.name : null) : null}
          defaultValue="Selecciona un archivo"
          InputLabelProps={{
            className: "input-file-estudios",
          }}
          InputProps={{
            readOnly: true,
            className: "input-file-estudios",
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Subir archivo">
                  <IconButton>
                    <label
                      htmlFor={`raised-button-file${item.name}`}
                      style={{ cursor: "pointer" }}
                    >
                      <CloudUpload className="icon-file-estudios" />
                    </label>
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Form;
