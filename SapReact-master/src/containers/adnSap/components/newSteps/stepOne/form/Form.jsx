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

const Form = ({ data, setDataModulo, dataModulo }) => {
  const { name, desc, idcert, obs } = data;
  const [file, setFile] = useState();
  const [id] = useState(idcert ? idcert : null);
  const [observacion] = useState(obs ? obs : null);
  const [error, setError] = useState(false);

  const fileChange = (e) => {
    setDataModulo(
      dataModulo.map((it) =>
        it.name === name ? { ...it, adnURL: e.target.files[0] } : it
      )
    );
    setFile(e.target.files[0]);
  };

  const onChangeId = (e) => {
    setDataModulo(
      dataModulo.map((it) =>
        it.name === name ? { ...it, [e.target.name]: e.target.value } : it
      )
    );
  };
  console.log(dataModulo);
  return (
    <div className="cont-form-one-adn-two">
      <div className="top-form">
        <Tooltip title={desc}>
          <div className="cont-name-one-form-two">
            <p
              className={`p1-form-adn-one-two ${
                name.length > 4 && "name-submod-large"
              }`}
              style={{ color: "white" }}
            >
              {name}
            </p>
          </div>
        </Tooltip>
      </div>
      <div className="bottom-form">
        <div style={{ margin: "5px 0", width: "100%" }}>
          <FormControl fullWidth size="small" error={error}>
            <InputLabel
              className="input-label-custom-input"
              htmlFor="component-helper"
            >
              Id Certificación (opcional)
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
              defaultValue={observacion}
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
            id={`raised-button-file${name}`}
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
                        htmlFor={`raised-button-file${name}`}
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
    </div>
  );
};

export default Form;
