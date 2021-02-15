import React, { useState } from "react";
import "./Forms.css";
import { IconButton, ListItem, MenuItem } from "@material-ui/core";
import { Edit, Room } from "@material-ui/icons";
import { CustomInput, CustomSelectB, Tooltip } from "../../../../../components";
import { regiones } from "../../../../../assets/regiones";
import { editarUsuarioAction } from "../../../../../redux/actions/authAction";
import { useDispatch } from "react-redux";

const Location = ({ usuario, loading }) => {
  const dispatch = useDispatch();
  const [editar, setEditar] = useState(true);
  const [region, setRegion] = useState(usuario ? usuario.region : null);
  const comunas = regiones.find((item) => item.region === region);
  const [direccion, setDireccion] = useState(
    usuario ? usuario.direccion : null
  );
  const [_id] = useState(usuario ? usuario._id : null);
  const [comuna, setComuna] = useState(usuario ? usuario.comuna : null);
  const [errorcomuna, setErrorComuna] = useState(false);
  const [errordirect, setErrorDirect] = useState(false);

  const saveLocation = () => {
    if (direccion.trim() === "") {
      setErrorDirect(true);
      return;
    }
    const com = comunas.comunas.find((item) => item === comuna);

    if (!com) {
      setErrorComuna(true);
      return;
    }

    dispatch(
      editarUsuarioAction({
        _id,
        direccion,
        comuna,
        region,
      })
    );
    setEditar(true);
  };

  const resetForm = () => {
    setRegion(usuario ? usuario.region : null);
    setDireccion(usuario ? usuario.direccion : null);
    setComuna(usuario ? usuario.comuna : null);
    setErrorComuna(false);
    setErrorDirect(false);
  };
  return (
    <div style={{ position: "relative", height: "500px" }}>
      <div className="top-edit-perfil-2">
        <p>Editar dirección</p>
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
          <Room className="icon-form-edit-perfil" />
          <CustomInput
            error={errordirect}
            label="Dirección"
            defaultValue={direccion}
            value={direccion}
            onChange={(e) => {
              setErrorDirect(false);
              setDireccion(e.target.value);
            }}
            helpertext="Dirección no puede estar vacio"
            disabled={editar}
          />
        </div>
        <div className="item-edit-perfil">
          <Room className="icon-form-edit-perfil" />
          <CustomSelectB
            label="Región"
            defaultValue={region}
            value={region}
            onChange={(e) => {
              setComuna(null);
              setRegion(e.target.value);
            }}
            disabled={editar}
          >
            {regiones.map((item, index) => (
              <MenuItem
                className="custom-menu-item"
                key={index}
                value={item.region}
              >
                {item.region}
              </MenuItem>
            ))}
          </CustomSelectB>
        </div>
        <div className="item-edit-perfil">
          <Room className="icon-form-edit-perfil" />
          <CustomSelectB
            label="Comuna"
            defaultValue={comuna}
            value={comuna}
            error={errorcomuna}
            onChange={(e) => {
              setErrorComuna(false);
              setComuna(e.target.value);
            }}
            helpertext="Seleccione una comuna"
            disabled={editar}
          >
            {comunas ? (
              comunas.comunas.map((item, index) => (
                <MenuItem className="custom-menu-item" key={index} value={item}>
                  {item}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={null}>Seleccione una región</MenuItem>
            )}
          </CustomSelectB>
        </div>
      </div>
      <div className="cont-btn-edit-perfil">
        <ListItem
          button
          disabled={editar}
          className="btn-adnzap-modal"
          onClick={() => {
            resetForm();
            setEditar(!editar);
          }}
        >
          <p style={{ color: "white" }}>Cancelar</p>
        </ListItem>
        <ListItem
          disabled={editar}
          button
          className="btn-adnzap-modal"
          onClick={saveLocation}
        >
          <p style={{ color: "white" }}>Guardar</p>
        </ListItem>
      </div>
    </div>
  );
};

export default Location;
