import React, { forwardRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./StepFour.css";
import { IconButton, LinearProgress, makeStyles } from "@material-ui/core";
import { Button, Tooltip } from "../../../../../components";
import SwipeableViews from "react-swipeable-views";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Close,
  Edit,
  Check,
} from "@material-ui/icons";
import CardSModulo from "./cardsmodulo/CardSModulo";
import { agregarAdnAction } from "../../../../../redux/actions/adnAction";
import { editarUsuarioAction } from "../../../../../redux/actions/authAction";
import Loader from "react-loader-spinner";

const useStyles = makeStyles({
  iconButton: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "#F0F0F0",
  },
  arrowBtns: {
    backgroundColor: "#F0F0F0",
  },
});

const StepFour = forwardRef(
  ({ setStep, closeModal, dataModulo, setDataModulo }, ref) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cargando = useSelector((state) => state.adn.cargando);
    const usuario = useSelector((state) => state.auth.usuario);
    const [active, setActive] = useState(
      dataModulo.length > 0 ? dataModulo[0].name : null
    );
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [editMod, setEditMod] = useState(false);
    const [editId, setEditId] = useState(false);
    const [editSubMod, setEditSubMod] = useState(false);
    const [editObs, setEditObs] = useState(false);
    const [idcopy, setIdCopy] = useState("");
    const [obscopy, setObsCopy] = useState("");
    const [largo, setLargo] = useState(dataModulo.length);

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

      data = dataModulo.find((item) => item.name === active);
      setIdCopy(data.idcert);
      setObsCopy(data.obs);
    };
    let arrayModulos = [];
    const longitudPedazos = 5;

    for (let i = 0; i < dataModulo.length; i += longitudPedazos) {
      let trozo = dataModulo.slice(i, i + longitudPedazos);
      arrayModulos.push(trozo);
    }

    const handleClick = () => {
      let modulos = usuario.modulos;
      let submodulos = usuario.submodulos;

      dataModulo.map((item) => {
        modulos.push(item.name);
        item.submodulos.map((i) => {
          submodulos.push(i.name);
        });
      });

      dispatch(agregarAdnAction(dataModulo)).then((res) =>
        res === true
          ? dispatch(
              editarUsuarioAction({ _id: usuario._id, modulos, submodulos })
            ).then((res) => (res === true ? closeModal() : null))
          : null
      );
    };

    const deleteModulo = (id) => {
      if (dataModulo.length > 0) {
        const subdelete = dataModulo.filter((item) =>
          item.name === id ? null : item
        );
        setDataModulo(subdelete);
        setTimeout(() => {
          setLoading(false);
        }, 300);
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

    useEffect(() => {
      if (!dataModulo[0]) {
        setStep("one");
        // return;
      }
      if (largo !== dataModulo.length) {
        setActive(dataModulo.length > 0 ? dataModulo[0].name : null);
        setLargo(dataModulo.length);
      }
    }, [dataModulo]);

    const cancelEdit = () => {
      setEditId(false);
      setEditMod(false);
      setEditObs(false);
      restaurarId(idcopy);
      restaurarObs(obscopy);
    };
    const restaurarId = (e) => {
      dataModulo.map((item) => {
        if (item.name === active) {
          item.idcert = e;
        }
      });
    };
    const restaurarObs = (e) => {
      dataModulo.map((item) => {
        if (item.name === active) {
          item.obs = e;
        }
      });
    };
    const onChangeId = (e) => {
      setDataModulo(
        dataModulo.map((it) =>
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
        ref={ref}
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
                size="small"
                className={classes.arrowBtns}
              >
                <ArrowBackIos fontSize="small" />
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
                size="small"
                className={classes.arrowBtns}
              >
                <ArrowForwardIos fontSize="small" />
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
              arrayModules={dataModulo}
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
            {dataModulo[0] ? (
              <Observ
                active={active}
                arrayModules={dataModulo}
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
              dataModulo.map((item) =>
                item.name === active
                  ? item.submodulos.map((it, index) => (
                      <CardSModulo
                        name={item.name}
                        setLoading={setLoading}
                        data={it}
                        key={index}
                        arrayModules={dataModulo}
                        setArrayModules={setDataModulo}
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
              <Tooltip
                title={editId ? "Continuar" : "Guardar"}
                placement="right"
              >
                <IconButton
                  className="btn-card-four-adn-edit"
                  onClick={editId ? editObsFunc : finishEdit}
                  style={{ top: 20 }}
                >
                  <Check style={{ width: "18px", height: "18px" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancelar" placement="right">
                <IconButton
                  className="btn-card-four-adn-delete"
                  onClick={() => {
                    cancelEdit();
                  }}
                  style={{ top: 20 }}
                >
                  <Close style={{ width: "18px", height: "18px" }} />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <Tooltip title="Editar modulo" placement="right">
              <IconButton
                className="btn-card-four-adn"
                onClick={() => initEdit()}
                disabled={editSubMod}
                style={{ opacity: editSubMod ? "0.3" : null, top: 20 }}
              >
                <Edit style={{ width: "18px", height: "18px" }} />
              </IconButton>
            </Tooltip>
          )}
        </div>

        <div className="cont-iconbtn-close-adn">
          <Tooltip title="Cerrar" placement="top">
            <IconButton
              size="small"
              className={classes.iconButton}
              onClick={closeModal}
            >
              <Close
                fontSize="small"
                className={editMod || editSubMod ? "icon-close-edit-mod" : null}
              />
            </IconButton>
          </Tooltip>
        </div>
        <div
          className={
            editMod || editSubMod
              ? "cont-btn-adn-four-edit"
              : "cont-btn-adn-four"
          }
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep("three")}
            disabled={editMod || editSubMod}
            style={{ opacity: editMod || editSubMod ? "0.2" : null }}
          >
            Atras
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={editMod || editSubMod}
            onClick={handleClick}
            style={{ opacity: editMod || editSubMod ? "0.2" : null }}
          >
            ¡ADN SAP Listo!
          </Button>
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
  }
);

export default StepFour;

const Modulos = ({ data, active, setActive, editMod, editSubMod }) => {
  const { name, desc } = data;
  return (
    <Tooltip title={desc} placement="top">
      <div
        onClick={() => (editMod || editSubMod ? null : setActive(name))}
        className={
          active === name ? `mod-two-active-two` : `mod-two-inactive-two`
        }
        style={{ cursor: editMod || editSubMod ? "default" : "pointer" }}
      >
        <p
          style={{ color: "white" }}
          className={name.length > 3 ? "name-submod-large" : null}
        >
          {name}
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
            <p className="p-id-modulos">ID: {data.idcert}</p>
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
        data.obs !== null  || editObs ? (
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
