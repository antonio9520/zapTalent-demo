import React, { useState } from "react";
import "./Formulario.css";
import {
  IconButton,
  TextField,
  InputAdornment,
  ListItem,
} from "@material-ui/core";
import { Close, CloudUpload } from "@material-ui/icons";
import { CustomInput, CustomSelectB } from "../../../../components";
import { useSelector } from "react-redux";

const Formulario = () => {
  const [file, setFile] = useState(null);
  const usuario = useSelector((state) => state.auth.usuario);
  const fileChange = (e) => {
    setFile({ file: e.target.files[0] });
  };
  return (
    <div className="cont-form-edit-perfil">
      <div className="close-btn-form-estudios">
        <IconButton>
          <Close />
        </IconButton>
      </div>
      <div className="top-edit-perfil">
        <div className="item-edit-perfil">
          <CustomInput
            label="Rut"
            defaultValue={usuario.rut ? usuario.rut : null}
          />
        </div>
        <div className="item-edit-perfil">
          <CustomInput
            label="Nombre"
            defaultValue={usuario.nombres ? usuario.nombres : null}
          />
        </div>
        <div className="item-edit-perfil">
          <CustomInput
            label="Apellidos"
            defaultValue={usuario.apellidos ? usuario.apellidos : null}
          />
        </div>
        <div className="item-edit-perfil">
          <CustomInput
            label="Numero móvil"
            defaultValue={usuario.phone ? usuario.phone : null}
          />
        </div>
        <div className="item-edit-perfil">
          <CustomInput
            label="Email"
            defaultValue={usuario.email ? usuario.email : null}
          />
        </div>
        <div className="item-edit-perfil">
          <CustomSelectB
            label="Estado civil"
            defaultValue={usuario.ecivil ? usuario.ecivil : null}
          />
        </div>
        <div className="item-edit-perfil">
          <CustomInput
            label="Nacionalidad"
            defaultValue={usuario.nacion ? usuario.nacion : null}
          />
        </div>
        <div className="item-edit-perfil">
          <CustomInput
            label="Dirección"
            defaultValue={usuario.direccion ? usuario.direccion : null}
          />
        </div>
        <div className="item-edit-perfil">
          <input
            type="file"
            id="raised-button-file"
            onChange={(e) => fileChange(e)}
            style={{ display: "none" }}
          />
          <TextField
            fullWidth
            size="small"
            id="input-with-icon-textfield"
            label="Subir CV"
            value={file ? file.file.name : null}
            defaultValue="Selecciona un archivo"
            InputLabelProps={{
              className: "input-file-estudios",
            }}
            InputProps={{
              readOnly: true,
              className: "input-file-estudios",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <label
                      htmlFor="raised-button-file"
                      style={{ cursor: "pointer" }}
                    >
                      <CloudUpload className="icon-file-estudios" />
                    </label>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className="bottom-edit-perfil">
        <ListItem button className="btn-form-estudio">
          <p>Guardar</p>
        </ListItem>
      </div>
    </div>
  );
};

export default Formulario;
