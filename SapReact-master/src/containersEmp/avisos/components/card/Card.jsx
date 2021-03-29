import React, { useState } from "react";
import "./Card.css";
import {
  EventAvailable,
  EventBusy,
  LocationOn,
  Cached,
  FileCopy,
  Edit,
  Delete,
  ArrowDropDown,
} from "@material-ui/icons";
import {
  IconButton,
  Dialog,
  Button,
  MenuItem,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import { Tooltip, CustomSelectB } from "../../../../components";
import { editarAvisoAction } from "../../../../redux/actions/actions-emp/avisosAction";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Card = ({
  data,
  setOpenModalEliminar,
  setIdEliminar,
  setOpenModalEditar,
  setDataEditar,
  setOpenModalCopy,
  setDataCopy,
  setOpenModalRep,
  disabledNewAviso,
  tipoPlan,
  totalavisos,
}) => {
  const history = useHistory();
  const inicio = new Date(data.fechaInicio);
  const termino = new Date(data.fechaTermino);
  const [open, setOpen] = useState(false);
  const [state, setEstado] = useState(data.estado);
  
  const MESES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const initDelete = () => {
    setIdEliminar(data._id);
    setOpenModalEliminar(true);
  };

  const comenzarCopiar = () => {
    setDataCopy(data);
    setTimeout(() => {
      setOpenModalCopy(true);
    }, 200);
  };

  const comenzarEditar = () => {
    setDataEditar(data);
    setTimeout(() => {
      setOpenModalEditar(true);
    }, 200);
  };

  const republicar = () => {
    setDataEditar(data);
    setTimeout(() => {
      setOpenModalRep(true);
    }, 200);
  };

  return (
    <div className="card-avisos-empresas">
      <div className="top-card-avisos-emp">
        <div className="left-card-avisos-emp">
          <div className="fechas-card-avisos-emp">
            <EventAvailable className="icon-calendar-avisos-emp" />
            <p>
              {MESES[inicio.getMonth()]}{" "}
              {inicio.toLocaleDateString().substring(0, 2)} -{" "}
              {inicio.getFullYear()}
            </p>

            <EventBusy className="icon-calendar-avisos-emp" />
            <p>
              {MESES[termino.getMonth()]}{" "}
              {termino.toLocaleDateString().substring(0, 2)} -{" "}
              {termino.getFullYear()}
            </p>
          </div>
          <p className="p1">{data.razonSocial}</p>
          <Tooltip title={data.titulo} placement="top">
            <p className="p2">
              {data.titulo.length > 27
                ? data.titulo.substring(0, 27) + "..."
                : data.titulo}
            </p>
          </Tooltip>
          <p className="p3">{data.profesion}</p>
          {data.anosExp ? (
            <div className="anos-exp-card-avisos-emp">
              <p>{data.anosExp} años de experiencia</p>
            </div>
          ) : (
            <div className="anos-exp-card-avisos-emp">
              <p>Sin experiencia laboral</p>
            </div>
          )}

          <div className="direccion-card-avisos-emp">
            <LocationOn className="icon-calendar-avisos-emp" />
            <p>
              {data.ciudad}, {data.region}
            </p>
          </div>
        </div>
        <div className="right-card-avisos-emp">
          {/* <Link to="/empresas/eco-sap/postulantes/1"> */}
          <Tooltip title="Ver postulantes" placement="top">
            <div
              className="sub-right-avisos-emp"
              onClick={() =>
                history.push(`/empresas/postulantes/1/${data._id}`)
              }
            >
              <div>
                <p className="p1">Inscritos</p>
                <p className="p2">
                  {data.postulaciones ? data.postulaciones : 0}
                </p>
              </div>
              <div>
                <p className="p1">No leídos</p>
                <p className="p2">{data.noLeido ? data.noLeido : 0}</p>
              </div>
            </div>
          </Tooltip>
          {/* </Link> */}
        </div>
      </div>
      <div className="bottom-card-avisos-emp">
        <div className="right-bottom-avisos-emp">
          <p className="p1">Estado: </p>
          <div className="estado-card-avisos-emp">
            <p>{data.estado}</p>
          </div>
          <IconButton onClick={() => setOpen(true)}>
            <ArrowDropDown />
          </IconButton>
        </div>
        <div className="left-bottom-avisos-emp">
          <Tooltip title="Republicar">
            <IconButton className="btns-cards-avisos-emp" onClick={republicar}>
              <Cached />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={`Duplicar. Restantes: ${
              tipoPlan.totalAvisos === 0
                ? "Ilimitado"
                : tipoPlan.totalAvisos - totalavisos
            }`}
          >
            <IconButton
              className="btns-cards-avisos-emp"
              onClick={() => (disabledNewAviso ? null : comenzarCopiar())}
            >
              <FileCopy />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton
              className="btns-cards-avisos-emp"
              onClick={comenzarEditar}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton className="btns-cards-avisos-emp" onClick={initDelete}>
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <DialogEstate
        setOpen={setOpen}
        open={open}
        setEstado={setEstado}
        state={state}
        id={data._id}
      />
    </div>
  );
};

export default Card;

const DialogEstate = ({ setOpen, open, setEstado, state, id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const guardarAvisoEditado = async () => {
    setLoading(true);
    dispatch(
      editarAvisoAction({
        _id: id,
        estado: state,
      })
    ).then((res) => (res === true ? setOpen(false) : null));
    setLoading(false);
  };
  return (
    <Dialog
      // disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <div className="cont-change-estado-aviso-emp">
        <p>Cambiar estado</p>

        <div className="container-inputs-form-emp">
          <CustomSelectB
            label="Estado"
            helpertext="no puede estar vacio"
            // error={areaError}
            value={state}
            onChange={(e) => {
              setEstado(e.target.value);
            }}
          >
            <MenuItem className="custom-menu-item" value="Activo">
              Activo
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Proceso Finalizado">
              Proceso Finalizado
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Cancelado">
              Cancelado
            </MenuItem>
          </CustomSelectB>
        </div>
        <div className="cont-action-estado-aviso-emp">
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancelar
          </Button>
          <Button
            onClick={guardarAvisoEditado}
            variant="contained"
            color="primary"
          >
            Guardar
          </Button>
        </div>
      </div>
      {loading ? (
        <>
          <div className="overlay-loading"></div>
          <div className="linear-progres-global">
            <LinearProgress className="progres-editar-perfil" />
          </div>
        </>
      ) : null}
    </Dialog>
  );
};
