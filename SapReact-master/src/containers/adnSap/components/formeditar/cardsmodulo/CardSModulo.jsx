import React, { useState } from "react";
import "./CardSModulo.css";
import { IconButton, MenuItem } from "@material-ui/core";
import { Delete, Edit, Check, Close } from "@material-ui/icons";
import { Tooltip, CustomSelectB } from "../../../../../components";
import { showAlertAction } from "../../../../../redux/actions/alertAction";
import { useDispatch } from "react-redux";

const CardSModulo = ({
  name,
  data,
  setLoading,
  editMod,
  setEditSubMod,
  editSubMod,
  submodulos,
  setSubmodulos,
  dataEditar,
}) => {
  const dispatch = useDispatch();
  const [obs, setObs] = useState(data.obs);
  const [texto, setTexto] = useState(true);
  const [nivel, setNivel] = useState(false);
  const [editInit, setEditInit] = useState(false);
  const [textoCopy, setTextoCopy] = useState(null);
  const [nivelCopy, setNivelCopy] = useState(null);
  const [nameNivel, setNameNivel] = useState(data.nivel);

  const handleEdit = () => {
    setTexto(false);
    setEditInit(true);
    textFocus("text");
    setEditSubMod(true);
    setTextoCopy(data.obs);
    setNivelCopy(data.nivel);
  };

  const textFocus = (item) => {
    const input = document.getElementById(data.desc);
    if (item === "text") {
      if (input) {
        input.focus();
        input.value = "";
        input.value = data.obs;
        input.scrollTop = "9999";
      }
    } else {
      if (input) {
        input.scrollTop = 0;
      }
    }
  };
  const handleEditNivel = () => {
    setTexto(true);
    setNivel(true);
    textFocus("nivel");
  };
  const handleCancel = () => {
    setTexto(true);
    setEditInit(false);
    setNivel(false);
    textFocus("nivel");
    changeObs(textoCopy);
    changeNivel(nivelCopy);
    setEditSubMod(false);

    const input = document.getElementById(data.desc);

    if (input) {
      input.value = textoCopy;
    }
  };

  const handleFinalEdit = () => {
    setTexto(true);
    setNivel(false);
    setEditInit(false);
    setEditSubMod(false);
  };

  const changeNivel = (e) => {
    setNameNivel(e);
    submodulos.map((item) => {
      if (item.name === name) {
        item.nivel = e;
      }
    });
  };
  const changeObs = (e) => {
    setObs(e);
    submodulos.map((item) => {
      if (item.name === name) item.obs = e;
    });
  };
  // console.log(name);
  const deleteSubmodulo = () => {
    setLoading(true);

    const subdelete = submodulos.filter((item) =>
      item.name === data.name ? null : item
    );
    submodulos = [];
    if (subdelete.length > 0) {
      dataEditar.submodulos = subdelete;
      setSubmodulos(subdelete);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } else {
      console.log("eliminar modulo");
      // deleteModulo(name);
      setTimeout(() => {
        setLoading(false);
        dispatch(
          showAlertAction({
            show: true,
            type: "error",
            msg: "El Modulo debe contener almenos un SubModulo.",
          })
        );
      }, 300);
    }

    // item.submodulos.push(subdelete);
    console.log(subdelete);
  };
  return (
    <div
      className={
        (editInit && !texto) || nivel || (editSubMod && !editInit)
          ? "card-s-modulo-adn-edit"
          : editMod
          ? "card-s-modulo-adn-editmod"
          : "card-s-modulo-adn"
      }
    >
      <div
        className={
          (editInit && !texto) || (editSubMod && !editInit)
            ? "top-card-four-adn-edit"
            : "top-card-four-adn"
        }
      >
        <div>
          <div
            style={{ overflow: "hidden" }}
            className={nivel ? "box-name-four-adn-nivel" : "box-name-four-adn"}
          >
            <p
              style={{ color: "white" }}
              className={data.name.length > 6 ? "name-submod-large" : null}
            >
              {data.name}
            </p>
          </div>
        </div>
        <div className="rigth-top-four-adn">
          <p className={nivel ? "p1-card-four-adn-nivel" : "p1-card-four-adn"}>
            {data.desc}
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="nivel-four-adn">
              <p style={{ color: "white" }} className="p2-card-four-adn">
                {nameNivel}
              </p>
            </div>
            <div
              className={
                nivel ? "select-nivel-four-adn-active" : "select-nivel-four-adn"
              }
            >
              <CustomSelectB
                disabled={!nivel}
                label="Nivel"
                defaultValue={data.nivel}
                onChange={(e) => changeNivel(e.target.value)}
              >
                <MenuItem className="custom-menu-item" value="Avanzado">
                  Avanzado
                </MenuItem>
                <MenuItem className="custom-menu-item" value="Medio">
                  Medio
                </MenuItem>
                <MenuItem className="custom-menu-item" value="Básico">
                  Básico
                </MenuItem>
                <MenuItem className="custom-menu-item" value="No Maneja">
                  No Maneja
                </MenuItem>
              </CustomSelectB>
            </div>
          </div>
        </div>
      </div>
      {data.obs || !texto ? (
        <div>
          <p
            className={
              !texto && !nivel
                ? "p3-card-four-adn-edit"
                : nivel || (editSubMod && !editInit)
                ? "p3-card-four-adn-nivel"
                : "p3-card-four-adn"
            }
          >
            Observación
          </p>

          {/* <p className="p4-card-four-adn">{data.obs}</p> */}
          <textarea
            id={data.desc}
            readOnly={texto}
            className={
              !texto && !nivel
                ? "p4-card-four-adn-edit"
                : nivel || (editSubMod && !editInit)
                ? "p4-card-four-adn-nivel"
                : "p4-card-four-adn"
            }
            type="text"
            defaultValue={obs}
            onChange={(e) => changeObs(e.target.value)}
          />
        </div>
      ) : null}

      <div className="cont-btns-card-four">
        {texto && !nivel ? (
          <>
            <Tooltip title="Eliminar submódulo" placement="right">
              <IconButton
                className="btn-card-four-adn-delete"
                onClick={deleteSubmodulo}
                disabled={editMod || (editSubMod && !editInit)}
                style={{ opacity: editSubMod && !editInit ? "0.3" : null }}
              >
                <Delete style={{ width: "18px", height: "18px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar submódulo" placement="right">
              <IconButton
                disabled={editMod || (editSubMod && !editInit)}
                className="btn-card-four-adn"
                onClick={handleEdit}
                style={{ opacity: editSubMod && !editInit ? "0.3" : null }}
              >
                <Edit style={{ width: "18px", height: "18px" }} />
              </IconButton>
            </Tooltip>
          </>
        ) : nivel ? (
          <>
            <Tooltip open={true} title="Cancelar edición" placement="right">
              <IconButton
                className="btn-card-four-adn-delete"
                onClick={handleCancel}
                disabled={editMod}
              >
                <Close style={{ width: "18px", height: "18px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Guardar" placement="right">
              <IconButton
                className="btn-card-four-adn-edit"
                onClick={handleFinalEdit}
                disabled={editMod}
              >
                <Check style={{ width: "18px", height: "18px" }} />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip open={true} title="Cancelar edición" placement="right">
              <IconButton
                className="btn-card-four-adn-delete"
                onClick={handleCancel}
                disabled={editMod}
              >
                <Close style={{ width: "18px", height: "18px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Continuar" placement="right">
              <IconButton
                className="btn-card-four-adn-edit"
                onClick={handleEditNivel}
                disabled={editMod}
              >
                <Check style={{ width: "18px", height: "18px" }} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};

export default CardSModulo;
