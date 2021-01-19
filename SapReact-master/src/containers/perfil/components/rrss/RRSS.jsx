import React, { useState, useEffect } from "react";
import "./RRSS.css";
import {
  Instagram,
  Facebook,
  Twitter,
  LinkedIn,
  Close,
  Delete,
} from "@material-ui/icons";
import { CustomInput, Tooltip } from "../../../../components";
import {
  ListItem,
  IconButton,
  LinearProgress,
  InputAdornment,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { editarUsuarioAction } from "../../../../redux/actions/authAction";
import { showAlertAction } from "../../../../redux/actions/alertAction";

const RRSS = ({ type, setOpenModal, action, url2 }) => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);
  const [_id] = useState(usuario ? usuario._id : null);
  const [url, setUrl] = useState(url2 ? url2 : "");
  const [link, setLink] = useState("");
  const [error, setError] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  // const loading = true;
  let rrss = usuario ? (usuario.rrss ? usuario.rrss : []) : [];
  const handleClick = () => {
    if (url.trim() === "") {
      console.log("campo vacio ");
      setError(true);
      return;
    }
    let rrss2 = rrss.filter((item) => item.name !== type);

    rrss = [];
    for (let i = 0; i < rrss2.length; i++) {
      rrss.push(rrss2[i]);
    }
    rrss.push({ name: type, url: link + url });
    setTimeout(() => {
      guardarRRSS();
    }, 300);
  };

  const handleDelete = () => {
    let rrss2 = rrss.filter((item) => item.name !== type);

    rrss = [];
    for (let i = 0; i < rrss2.length; i++) {
      rrss.push(rrss2[i]);
    }
    // console.log(rrss);
    setTimeout(() => {
      eliminarRRSS();
    }, 300);
  };

  // console.log(rrss);
  const eliminarRRSS = () => {
    dispatch(
      editarUsuarioAction({
        _id,
        rrss,
      })
    ).then((res) =>
      res === true
        ? _alert({
            show: true,
            msg: "Red Social Eliminada",
            type: "success",
          })
        : null
    );
  };
  const guardarRRSS = () => {
    dispatch(
      editarUsuarioAction({
        _id,
        rrss,
      })
    ).then((res) =>
      res === true
        ? _alert({
            show: true,
            msg: "Red social guardada correctamente",
            type: "success",
          })
        : null
    );
  };

  const _alert = (msg) => {
    setOpenModal(false);
    dispatch(showAlertAction(msg));
  };

  useEffect(() => {
    console.log(type);
    if (type === "Instagram") {
      setLink("https://www.instagram.com/");
    } else if (type === "Facebook") {
      setLink("https://www.facebook.com/");
    } else if (type === "Twitter") {
      setLink("https://twitter.com/");
    } else if (type === "LinkedIn") {
      setLink("https://www.linkedin.com/in/");
    }
  }, []);
  return (
    <div className="cont-rrss-perfil">
      <div className="close-btn-form-estudios">
        <IconButton onClick={() => setOpenModal(false)}>
          <Close />
        </IconButton>
      </div>

      <h1>{action === "add" ? "Añade " : "Edita "}tu perfil de </h1>
      <h1>{type}</h1>
      <div className="cont-input-rrss-perfil">
        {type === "Instagram" ? (
          <Instagram className="icon-modal-rrss-perfil" />
        ) : type === "Facebook" ? (
          <Facebook className="icon-modal-rrss-perfil" />
        ) : type === "LinkedIn" ? (
          <LinkedIn className="icon-modal-rrss-perfil" />
        ) : type === "Twitter" ? (
          <Twitter className="icon-modal-rrss-perfil" />
        ) : null}

        <CustomInput
          label="Link de perfil"
          value={url}
          onChange={(e) => {
            setError(false);
            setUrl(e.target.value);
          }}
          helpertext="Campo no puede estar vacio"
          error={error}
          defaultValue={url}
          startAdornment={
            <InputAdornment
              className="input-adorment-perfil-rrss"
              position="start"
            >
              {link}
            </InputAdornment>
          }
        />

        {action === "add" ? null : (
          <Tooltip title="Eliminar red social" placement="top">
            <IconButton
              className="btn-delete-rrss-perfil"
              onClick={handleDelete}
            >
              <Delete style={{ width: "20px", height: "20px" }} />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <div className="cont-btn-rrss-perfil">
        <ListItem
          button
          className="btn-chips-hab"
          onClick={() => setOpenModal(false)}
        >
          <p style={{ fontSize: "12px", color: "white" }}>Cancelar</p>
        </ListItem>
        <ListItem button className="btn-chips-hab" onClick={handleClick}>
          <p style={{ fontSize: "12px", color: "white" }}>Guardar</p>
        </ListItem>
      </div>
      {loading ? (
        <>
          <div className="overlay-loading"></div>
          <div className="linear-progres-adnsap">
            <LinearProgress className="progres-editar-perfil" />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default RRSS;
