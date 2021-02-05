import React, { useState, useEffect } from "react";
import "./StepFour.css";
import { ListItem, IconButton, LinearProgress } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Close,
  Edit,
  Check,
} from "@material-ui/icons";
import CardSModulo from "./cardsmodulo/CardSModulo";
import { Tooltip } from "../../../../../components";
import { agregarAdnAction } from "../../../../../redux/actions/adnAction";
import { useDispatch, useSelector } from "react-redux";
import { showAlertAction } from "../../../../../redux/actions/alertAction";
import Loader from "react-loader-spinner";

const StepFour = ({ setStep, arrayModules, closeModal, setArrayModules }) => {
  const dispatch = useDispatch();
  const cargando = useSelector((state) => state.adn.cargando);
  const [active, setActive] = useState(
    arrayModules.length > 0 ? arrayModules[0].name : null
  );
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editMod, setEditMod] = useState(false);
  const [editId, setEditId] = useState(false);
  const [editSubMod, setEditSubMod] = useState(false);
  const [editObs, setEditObs] = useState(false);
  const [idcopy, setIdCopy] = useState("");
  const [obscopy, setObsCopy] = useState("");
  const [largo, setLargo] = useState(arrayModules.length);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const initEdit = () => {
    setEditId(true);
    setEditMod(true);
    let data;

    data = arrayModules.find((item) => item.name === active);
    setIdCopy(data.idcert);
    setObsCopy(data.obs);
  };
  let arrayModulos = [];
  const longitudPedazos = 5;

  for (let i = 0; i < arrayModules.length; i += longitudPedazos) {
    let trozo = arrayModules.slice(i, i + longitudPedazos);
    arrayModulos.push(trozo);
  }

  const handleClick = () => {
    dispatch(agregarAdnAction(arrayModules)).then((res) =>
      res === true ? closeModal() : null
    );
  };

  const deleteModulo = (id) => {
    if (arrayModules.length > 0) {
      const subdelete = arrayModules.filter((item) =>
        item.name === id ? null : item
      );
      setArrayModules(subdelete);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };
  const editObsFunc = () => {
    // validar id
    // let data = arrayModules.find((item) => item.name === active);
    // if (data.idcert === "") {
    //   dispatch(
    //     showAlertAction({
    //       show: true,
    //       msg: "Id modulo no puede estar vacio",
    //       type: "error",
    //     })
    //   );
    //   return;
    // }
    setEditId(false);
    setEditObs(true);
  };
  const finishEdit = () => {
    setEditId(false);
    setEditMod(false);
    setEditObs(false);
  };

  useEffect(() => {
    if (!arrayModules[0]) {
      setStep("one");
      // return;
    }
    if (largo !== arrayModules.length) {
      setActive(arrayModules.length > 0 ? arrayModules[0].name : null);
      setLargo(arrayModules.length);
    }
  }, [arrayModules]);

  const cancelEdit = () => {
    setEditId(false);
    setEditMod(false);
    setEditObs(false);
    restaurarId(idcopy);
    restaurarObs(obscopy);
  };
  const restaurarId = (e) => {
    arrayModules.map((item) => {
      if (item.name === active) {
        item.idcert = e;
      }
    });
  };
  const restaurarObs = (e) => {
    arrayModules.map((item) => {
      if (item.name === active) {
        item.obs = e;
      }
    });
  };
  const onChangeId = (e) => {
    setArrayModules(
      arrayModules.map((it) =>
        it.name === active ? { ...it, [e.target.name]: e.target.value } : it
      )
    );
  };
  return (
    <div
      className={
        editMod || editSubMod
          ? "cont-four-adn-editar"
          : "cont-four-adn-formeditar"
      }
    >
      <div className="sub-cont-four-adn">
        <div
          className="cont-top-adn-four"
          style={{
            opacity: editMod || editSubMod ? "0.3" : null,
            display: "flex",
            // flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="btn-left-adn">
            <IconButton
              onClick={handleBack}
              disabled={activeStep === 0 || editMod}
            >
              <ArrowBackIos />
            </IconButton>
          </div>
          <div className="content-center-adn-four">
            <SwipeableViews index={activeStep}>
              {arrayModulos.map((item, index) => (
                <div key={index} className="cont-SwipeableViews-four">
                  {item.map((item, index) => (
                    <Modulos
                      data={item}
                      key={index}
                      setActive={setActive}
                      active={active}
                      editMod={editMod}
                      editSubMod={editSubMod}
                    />
                  ))}
                </div>
              ))}
            </SwipeableViews>
          </div>
          <div className="btn-right-adn">
            <IconButton
              onClick={handleNext}
              disabled={activeStep === arrayModulos.length - 1 || editMod}
            >
              <ArrowForwardIos />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            opacity: editObs || editSubMod ? ".5" : "",
            transition: "0.5s all ease-in-out",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IdModulo
            active={active}
            arrayModules={arrayModules}
            editId={editId}
            onChangeId={onChangeId}
          />
        </div>
        <div
          style={{
            width: "100%",
            opacity: editId || editSubMod ? "0.3" : null,
          }}
        >
          {arrayModules[0] ? (
            <Observ
              active={active}
              arrayModules={arrayModules}
              editObs={editObs}
              editMod={editMod}
              onChangeId={onChangeId}
            />
          ) : null}
        </div>
        <div className="cont-cards-s-modulos-four">
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
            arrayModules.map((item) =>
              item.name === active
                ? item.submodulos.map((it, index) => (
                    <CardSModulo
                      name={item.name}
                      setLoading={setLoading}
                      data={it}
                      key={index}
                      arrayModules={arrayModules}
                      setArrayModules={setArrayModules}
                      deleteModulo={deleteModulo}
                      editMod={editMod}
                      setEditSubMod={setEditSubMod}
                      editSubMod={editSubMod}
                    />
                  ))
                : null
            )
          )}
        </div>
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
              onClick={() => initEdit()}
              disabled={editSubMod}
              style={{ opacity: editSubMod ? "0.3" : null }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        )}
      </div>

      <div className="cont-iconbtn-close-adn">
        <IconButton onClick={closeModal}>
          <Close
            className={editMod || editSubMod ? "icon-close-edit-mod" : null}
          />
        </IconButton>
      </div>
      <div
        className={
          editMod || editSubMod ? "cont-btn-adn-four-edit" : "cont-btn-adn-four"
        }
      >
        <ListItem
          button
          className={`btn-adnzap-modal `}
          onClick={() => setStep("three")}
          disabled={editMod || editSubMod}
          style={{ opacity: editMod || editSubMod ? "0.2" : null }}
        >
          <p style={{ color: "white" }}>Atras</p>
        </ListItem>
        <ListItem
          button
          disabled={editMod || editSubMod}
          className={`btn-adnzap-modal `}
          onClick={handleClick}
          style={{ opacity: editMod || editSubMod ? "0.2" : null }}
        >
          <p style={{ color: "white" }}>Guardar ADN</p>
        </ListItem>
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
};

export default StepFour;

const Modulos = ({ data, active, setActive, editMod, editSubMod }) => {
  return (
    <Tooltip title={data.desc}>
      <div
        onClick={() => (editMod || editSubMod ? null : setActive(data.name))}
        className={active === data.name ? "mod-two-active" : "mod-two-inactive"}
        style={{ cursor: editMod || editSubMod ? "default" : "pointer" }}
      >
        <p style={{ fontSize: "8px", textAlign: "center", color: "white" }}>
          {data.name}
        </p>
      </div>
    </Tooltip>
  );
};

const IdModulo = ({ active, arrayModules, editId, onChangeId }) => {
  let data;

  data = arrayModules.find((item) => item.name === active);

  return (
    <>
      {data ? (
        <>
          <p
            className="p-name-modulos"
            style={{ opacity: editId ? ".3" : null }}
          >
            {data ? data.desc : null}
          </p>
          {data.idcert && !editId ? (
            <p className="p-id-modulos">ID:{data.idcert}</p>
          ) : null}

          {editId ? (
            <div className="cont-id-editar-adn">
              <p className="p-id-modulos">ID:</p>
              <input
                id={data.idcert}
                defaultValue={data.idcert}
                onChange={(e) => onChangeId(e)}
                name="idcert"
              />
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
};

const Observ = ({ active, arrayModules, editObs, editMod, onChangeId }) => {
  let data;
  if (arrayModules[0]) {
    data = arrayModules.find((item) => item.name === active);
  }
  return (
    <>
      {data ? (
        data.obs !== "" || editObs ? (
          <>
            <p className="pobs-title">Observación</p>
            {/* <p className="pobs-desc">{data.obs}</p> */}
            <textarea
              className={
                editObs ? "text-area-edit-obs-mod-ac" : "text-area-edit-obs-mod"
              }
              value={data.obs}
              name="obs"
              defaultValue={data.obs}
              readOnly={!editMod}
              onChange={(e) => onChangeId(e)}
            />
          </>
        ) : null
      ) : null}
    </>
  );
};
