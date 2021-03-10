import React, { useState, forwardRef } from "react";
import {
  ListItem,
  IconButton,
  LinearProgress,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import "./FormEditar.css";
import { Close, Edit, Check, Add, CloudUpload } from "@material-ui/icons";
import CardSModulo from "./cardsmodulo/CardSModulo";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import { Tooltip, Button } from "../../../../components";
import { editarAdnAction } from "../../../../redux/actions/adnAction";
import { editarUsuarioAction } from "../../../../redux/actions/authAction";

const FormEditar = forwardRef((props, ref) => {
  const {
    dataEditar,
    setView,
    cancelarEditar,
    submodulosuser,
    setSubmodulosUser,
  } = props;
  const dispatch = useDispatch();
  const cargando = useSelector((state) => state.adn.cargando);
  const usuario = useSelector((state) => state.auth.usuario);
  const [loading, setLoading] = useState(false);
  const [editMod, setEditMod] = useState(false);
  const [editId, setEditId] = useState(false);
  const [editSubMod, setEditSubMod] = useState(false);
  const [editObs, setEditObs] = useState(false);
  const [_id] = useState(dataEditar ? dataEditar._id : null);
  const [file, setFile] = useState(
    dataEditar ? (dataEditar.adnURL ? dataEditar.adnURL : null) : null
  );

  //DATA
  const [idmod, setIdMod] = useState(dataEditar ? dataEditar.idcert : null);
  const [obs, setObs] = useState(dataEditar ? dataEditar.obs : null);
  const [submodulos, setSubmodulos] = useState(
    dataEditar ? dataEditar.submodulos : null
  );
  const adnURL = file;
  const handleClick = () => {
    dispatch(
      editarAdnAction({
        _id,
        name: dataEditar.name,
        idcert: idmod,
        obs,
        desc: dataEditar.desc,
        adnURL,
        submodulos,
      })
    ).then((res) =>
      res
        ? dispatch(
            editarUsuarioAction({
              _id: usuario._id,
              submodulos: submodulosuser,
            })
          ).then((res) => (res === true ? cancelarEditar() : null))
        : null
    );
  };
  const fileChange = (e) => {
    if (e.target.value) {
      setFile(e.target.files[0]);
    }
  };
  const editObsFunc = () => {
    setEditId(false);
    setEditObs(true);
  };
  const finishEdit = () => {
    setEditId(false);
    setEditMod(false);
    setEditObs(false);
  };

  const deleteModulo = (id) => {
    // if (arrayModules.length > 0) {
    //   const subdelete = arrayModules.filter((item) =>
    //     item.name === id ? null : item
    //   );
    //   setArrayModules([]);
    //   // if (subdelete.length > 0) {
    //   initDelete(subdelete);
    // }
  };
  const cancelEdit = () => {
    setEditId(false);
    setEditMod(false);
    setEditObs(false);
    setIdMod(dataEditar ? dataEditar.idcert : null);
    setObs(dataEditar ? dataEditar.obs : null);
    setSubmodulos(dataEditar.submodulos);
  };

  return (
    <div
      className={
        editMod || editSubMod
          ? "cont-four-adn-editar-edit"
          : "cont-four-adn-formeditar-edit"
      }
    >
      <div
        className="cont-top-adn-four-edit"
        style={{ opacity: editMod || editSubMod ? "0.3" : null }}
      >
        <Modulos data={dataEditar} />
      </div>
      <div
        style={{
          opacity: editObs || editSubMod ? ".5" : "",
          transition: "0.5s all ease-in-out",
        }}
      >
        <IdModulo
          data={dataEditar}
          editId={editId}
          idmod={idmod}
          setIdMod={setIdMod}
        />
      </div>
      <div
        style={{
          width: "100%",
          opacity: editId || editSubMod ? "0.3" : null,
        }}
      >
        {obs || editObs ? (
          <>
            <p className="pobs-title">Observación</p>
            <textarea
              className={
                editObs ? "text-area-edit-obs-mod-ac" : "text-area-edit-obs-mod"
              }
              value={obs}
              defaultValue={obs}
              readOnly={!editMod}
              onChange={(e) => setObs(e.target.value)}
            />
          </>
        ) : null}
      </div>
      {editMod ? null : (
        <div className="cont-btn-añadir-submod">
          <div style={{ margin: "5px 10px", width: "300px" }}>
            <input
              type="file"
              id={`upload-file-edit-module`}
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
                      <IconButton>
                        <label
                          htmlFor={`upload-file-edit-module`}
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
      )}
      <div className="cont-cards-s-modulos-four-edit">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <Loader
              type="Oval"
              color="#00BFFF"
              height={100}
              width={100}
              visible={loading}
              //  timeout={3000} //3 secs
            />
          </div>
        ) : (
          submodulos.map((item, index) => (
            <CardSModulo
              name={item.name}
              setLoading={setLoading}
              data={item}
              key={index}
              editMod={editMod}
              deleteModulo={deleteModulo}
              setEditSubMod={setEditSubMod}
              editSubMod={editSubMod}
              setSubmodulos={setSubmodulos}
              submodulos={submodulos}
              dataEditar={dataEditar}
              setSubmodulosUser={setSubmodulosUser}
              submodulosuser={submodulosuser}
            />
          ))
        )}
      </div>
      {editMod ? null : (
        <div className="cont-btn-añadir-submod-two">
          <Tooltip title="Añadir Submodulo">
            <IconButton
              className="btn-add-submod-editar-adn"
              disabled={editSubMod}
              style={{ opacity: editSubMod ? "0.3" : null }}
              onClick={() => setView("one")}
            >
              <Add />
            </IconButton>
          </Tooltip>
        </div>
      )}
      <div className="cont-btn-adn-formedit" style={{ padding: "0 20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => cancelarEditar()}
          disabled={editMod || editSubMod}
          style={{
            opacity: editMod || editSubMod ? "0.2" : "",
            color: "white",
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={editMod || editSubMod}
          onClick={handleClick}
          style={{
            opacity: editMod || editSubMod ? "0.2" : "",
            color: "white",
          }}
        >
          Guardar ADN
        </Button>
      </div>

      <div className="cont-iconbtn-close-adn">
        <IconButton onClick={() => cancelarEditar()}>
          <Close
            className={editMod || editSubMod ? "icon-close-edit-mod" : null}
          />
        </IconButton>
      </div>

      <div className="cont-edit-mod">
        {editMod ? (
          <div>
            <Tooltip title={editId ? "Continuar" : "Guardar"} placement="right">
              <IconButton
                className="btn-check-mod-formedit"
                onClick={editId ? editObsFunc : finishEdit}
              >
                <Check />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancelar" placement="right">
              <IconButton
                className="btn-cancel-mod-formedit"
                onClick={() => {
                  cancelEdit();
                }}
              >
                <Close />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <Tooltip title="Editar modulo" placement="right">
            <IconButton
              className="btn-edit-mod-formedit"
              onClick={() => {
                setEditId(true);
                setEditMod(true);
              }}
              disabled={editSubMod}
              style={{ opacity: editSubMod ? "0.3" : null }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        )}
      </div>

      {cargando ? (
        <>
          <div className="overlay-loading"></div>
          <div className="linear-progres-adnsap">
            <LinearProgress className="progres-editar-perfil" />
          </div>
        </>
      ) : null}
    </div>
  );
});

export default FormEditar;

const Modulos = ({ data }) => {
  return (
    <div className={"mod-two-active"} style={{ overflow: "hidden" }}>
      <p
        style={{ fontSize: "12px", color: "white" }}
        className={data.name.length > 6 ? "name-submod-large" : null}
      >
        {data.name}
      </p>
    </div>
  );
};

const IdModulo = ({ data, idmod, setIdMod, editId }) => {
  return (
    <>
      <p
        className="p-name-modulos"
        style={{
          opacity: editId ? ".3" : null,
          maxHeight: "80px",
          overflow: "auto",
          // backgroundColor: "red",
          width: "100%",
        }}
      >
        {data ? data.desc : null}
      </p>
      {idmod && !editId ? <p className="p-id-modulos">ID:{idmod}</p> : null}
      {editId ? (
        <div className="cont-id-editar-adn">
          <p className="p-id-modulos">ID:</p>
          <input
            id={idmod}
            defaultValue={idmod}
            value={idmod}
            onChange={(e) => setIdMod(e.target.value)}
          />
        </div>
      ) : null}
    </>
  );
};
