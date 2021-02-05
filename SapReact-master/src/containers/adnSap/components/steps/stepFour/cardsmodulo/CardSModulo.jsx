import React, { useState } from "react";
import "./CardSModulo.css";
import { IconButton, MenuItem } from "@material-ui/core";
import { Delete, Edit, Check, Close } from "@material-ui/icons";
import { Tooltip } from "../../../../../../components";
import { CustomSelectB } from "../../../../../../components";

const CardSModulo = ({
  name,
  deleteModulo,
  data,
  arrayModules,
  setOpenModalEditar,
  setLoading,
  setEditSubMod,
  editSubMod,
  editMod,
}) => {
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
    arrayModules.map((item) => {
      if (item.name === name) {
        item.submodulos.map((item) =>
          item.name === data.name ? (item.nivel = e) : item
        );
      }
    });
  };
  const changeObs = (e) => {
    arrayModules.map((item) => {
      if (item.name === name) {
        item.submodulos.map((item) =>
          item.name === data.name ? (item.obs = e) : item
        );
      }
    });
  };
  // console.log(name);
  const deleteSubmodulo = () => {
    setLoading(true);
    arrayModules.map((item) => {
      if (item.name === name) {
        const subdelete = item.submodulos.filter((item) =>
          item.name === data.name ? null : item
        );
        item.submodulos = [];
        if (subdelete.length > 0) {
          console.log(subdelete.length);
          subdelete.map((it) => item.submodulos.push(it));
          setTimeout(() => {
            setLoading(false);
          }, 300);
        } else {
          console.log("eliminar modulo");
          deleteModulo(name);
        }

        // item.submodulos.push(subdelete);
        // console.log(subdelete);
      }
    });
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
          <Tooltip title={data.desc}>
            <div
              className={
                nivel ? "box-name-four-adn-nivel" : "box-name-four-adn"
              }
            >
              <p
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                {data.name}
              </p>
            </div>
          </Tooltip>
        </div>
        <div className="rigth-top-four-adn">
          <p className={nivel ? "p1-card-four-adn-nivel" : "p1-card-four-adn"}>
            {data.desc}
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="nivel-four-adn">
              <p className="p2-card-four-adn" style={{ color: "white" }}>
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
                className="btn-card-four-adn"
                onClick={handleEdit}
                disabled={editMod || (editSubMod && !editInit)}
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
