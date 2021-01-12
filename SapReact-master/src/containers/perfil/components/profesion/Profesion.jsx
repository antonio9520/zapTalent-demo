import React, { useState } from "react";
import "./Profesion.css";
import { useSelector, useDispatch } from "react-redux";
import { CardEst } from "./components";
import { CustomInput, Tooltip } from "../../../../components";
import { AccountCircle, Info, Close } from "@material-ui/icons";
import {
  InputAdornment,
  ListItem,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import { editarUsuarioAction } from "../../../../redux/actions/authAction";

const Profesion = ({ setOpenModalProfesion }) => {
  const dispatch = useDispatch();
  const estudios = useSelector((state) => state.estudio.estudios);
  const usuario = useSelector((state) => state.auth.usuario);
  const loading = useSelector((state) => state.auth.loading);

  const [active, setActive] = useState(
    usuario.profesion ? usuario.profesion : { _id: null, name: null }
  );
  const [error, setError] = useState(false);

  const handleClick = () => {
    if (active.name.trim() === "") {
      setError(true);
      return;
    }
    dispatch(
      editarUsuarioAction({ _id: usuario._id, profesion: active })
    ).then((res) => setOpenModalProfesion(!res));
  };
  return (
    <div className="cont-profesion">
      <Tooltip title="Cerrar" placement="top">
        <IconButton
          className="icon-btn-close-chips"
          onClick={() => setOpenModalProfesion(false)}
        >
          <Close />
        </IconButton>
      </Tooltip>
      <h1>Agregar Profesión</h1>
      <div style={{ display: "flex" }}>
        <div className="cont-estudios-profesion">
          {estudios.map((item, index) => (
            <div className="sub-cardest-profesion">
              <CardEst
                key={index}
                data={item}
                setActive={setActive}
                active={active}
              />
            </div>
          ))}
        </div>
        <div className="cont-right-profesion">
          {active._id === null ? (
            <p className="p-select-estudio-profesion">Seleccione un estudio</p>
          ) : (
            <>
              <div
                style={{ display: "flex", width: "90%", alignItems: "center" }}
              >
                <div className="cont-icon-profesion">
                  <AccountCircle />
                </div>
                <CustomInput
                  error={error}
                  helpertext="Profesión no puede estar vacio"
                  label="Profesión"
                  value={active.name}
                  onChange={(e) => {
                    setError(false);
                    setActive({ ...active, name: e.target.value });
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Tooltip title="Ej: Ingeniero en Informatica, Diseñador, Arquitecto, etc.">
                        <Info className="icon-info-profesion" />
                      </Tooltip>
                    </InputAdornment>
                  }
                />
              </div>
              <div className="cont-btn-profesion">
                <ListItem
                  button
                  className="btn-chips-hab"
                  onClick={() => setOpenModalProfesion(false)}
                >
                  <p>Cancelar</p>
                </ListItem>
                <ListItem
                  button
                  className="btn-chips-hab"
                  onClick={handleClick}
                >
                  <p>Guardar</p>
                </ListItem>
              </div>
            </>
          )}
        </div>
      </div>
      {loading ? (
        <>
          <div className="overlay-loading"></div>
          <div className="linear-progres-editar-perfil">
            <LinearProgress className="progres-editar-perfil" />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Profesion;
