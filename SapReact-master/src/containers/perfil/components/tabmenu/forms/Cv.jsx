import React, { useState } from "react";
import "./Forms.css";
import { IconButton, ListItem } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { TextField, InputAdornment } from "@material-ui/core";
import { CloudUpload, Description } from "@material-ui/icons";
import { subirCVAction } from "../../../../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "../../../../../components";

const Cv = ({ loading }) => {
  const dispatch = useDispatch();
  const [editar, setEditar] = useState(true);
  const usuario = useSelector((state) => state.auth.usuario);
  const [file, setFile] = useState(usuario ? usuario.cvURL : null);
  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const cvURL = file;
  const saveCv = () => {
    if (file === null) {
      console.log("error");
      return;
    }
    // console.log(usuario._id);
    const subirImage = () => {
      dispatch(
        subirCVAction({
          _id: usuario._id,
          imageURL: cvURL,
          type: "document",
        })
      );
    };
    if (cvURL) {
      subirImage();
    }
    setEditar(true);
  };

  return (
    <div style={{ position: "relative", height: "470px" }}>
      <div className="top-edit-perfil-2">
        <p>Subir CV</p>
        <Tooltip title="Editar">
          <IconButton
            className={
              !editar || loading
                ? "icon-btn-edit-perfil-inact"
                : "icon-btn-edit-perfil"
            }
            onClick={() => setEditar(!editar)}
            disabled={!editar || loading}
          >
            <Edit />
          </IconButton>
        </Tooltip>
      </div>
      <div className="form-edit-perfil">
        <div className="item-edit-perfil">
          <Description className="icon-form-edit-perfil" />
          <input
            type="file"
            id="raised-button-file-cv"
            onChange={(e) => fileChange(e)}
            style={{ display: "none" }}
            disabled={editar}
            accept="application/pdf, image/png, .jpeg, .jpg, image/gif, .doc, .docx"
          />
          <TextField
            disabled={editar}
            fullWidth
            size="small"
            id="input-with-icon-textfield"
            label="Certificado"
            value={file ? (file.name ? file.name : file) : null}
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
                    <IconButton disabled={editar}>
                      <label
                        htmlFor="raised-button-file-cv"
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
      <div className="cont-btn-edit-perfil">
        <ListItem
          button
          className="btn-adnzap-modal"
          onClick={() => setEditar(true)}
          disabled={editar}
        >
          <p style={{ color: "white" }}>Cancelar</p>
        </ListItem>
        <ListItem
          button
          disabled={editar}
          className="btn-adnzap-modal"
          onClick={saveCv}
        >
          <p style={{ color: "white" }}>Guardar</p>
        </ListItem>
      </div>
    </div>
  );
};

export default Cv;
