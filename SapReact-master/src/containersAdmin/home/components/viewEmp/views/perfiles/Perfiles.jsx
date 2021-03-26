import React, { useState, useEffect } from "react";
import "./Perfiles.css";
import { IconButton, makeStyles } from "@material-ui/core";
import {
  Event,
  Fingerprint,
  Edit,
  Delete,
  EventBusy,
  Email,
} from "@material-ui/icons";
import { Tooltip } from "../../../../../../components";
import Loader from "react-loader-spinner";
import clientAxios from "../../../../../../config/axios";

const useStyles = makeStyles({
  dateBtn: {
    marginLeft: 5,
    color: "#187ce2",
    height: 40,
    width: 40,
    transition: "0.5s all ease-in-out",
    "&:hover": {
      backgroundColor: "#187ce2",
      color: "white",
      transition: "0.5s all ease-in-out",
      boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.2)",
    },
  },
  actionBtns: {
    backgroundColor: "#4BC1F4",
    color: "white",
    height: 40,
    width: 40,
    marginLeft: 5,
    boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.2)",
    transition: "0.5s all ease-in-out",
    "&:hover": {
      backgroundColor: "#3280A2",
    },
  },
});

const Perfiles = ({
  idemp,
  setDataEditPerfil,
  setOpenEditPerfil,
  refreshPerfiles,
}) => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);

  const obtenerDatos = async () => {
    setloading(true);
    try {
      const respuesta = await clientAxios.get(
        `/api/usuarioEmpresa/obtener/perfiles/${idemp}`
      );
      setData(respuesta.data);
      setTimeout(() => {
        setloading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, [refreshPerfiles]);
  return (
    <div className="perfiles-view-emp-admin">
      {loading ? (
        <div className="cont-loader-perfiles-emp-admin">
          <Loader
            type="Oval"
            color="#00BFFF"
            height={70}
            width={70}
            visible={loading}
            //  timeout={3000} //3 secs
          />
        </div>
      ) : (
        <div className="column">
          {data.map((item, index) => (
            <Perfil
              key={index}
              data={item}
              setDataEditPerfil={setDataEditPerfil}
              setOpenEditPerfil={setOpenEditPerfil}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Perfiles;

const Perfil = ({ data, setDataEditPerfil, setOpenEditPerfil }) => {
  const classes = useStyles();
  const {
    tipoPerfil,
    rut,
    nombres,
    apellidos,
    email,
    fechaInicio,
    fechaTermino,
  } = data;
  const [estado, setEstado] = useState(true);
  const _fechaInicio = new Date(fechaInicio);
  const _fechaTermino = new Date(fechaTermino);

  const editarPerfil = () => {
    setDataEditPerfil(data);
    setOpenEditPerfil(true);
  };

  return (
    <div className="perfil-view-emp-admin">
      <div className="row-1">
        <p className="p1">{nombres + " " + apellidos}</p>
        <p className="p2">
          {tipoPerfil
            ? tipoPerfil === "admin"
              ? "Administrador"
              : tipoPerfil === "gest"
              ? "Gestionador"
              : null
            : null}
        </p>
      </div>
      <div className="row-2">
        <div className="cont-item">
          <div>
            <Item title="Rut" value={rut} icon={<Fingerprint />} />
          </div>
          <div>
            <Item
              title="Fecha inicio"
              value={
                fechaInicio
                  ? _fechaInicio.getDate() +
                    "/" +
                    _fechaInicio.getMonth() +
                    "/" +
                    _fechaInicio.getFullYear()
                  : null
              }
              icon={<Event />}
            />
          </div>
        </div>
        <div className="cont-item">
          <div>
            <Item title="Email" value={email} icon={<Email />} />
          </div>
          <div>
            <Item
              title="Fecha termino"
              value={
                fechaTermino
                  ? _fechaTermino.getDate() +
                    "/" +
                    _fechaTermino.getMonth() +
                    "/" +
                    _fechaTermino.getFullYear()
                  : null
              }
              icon={<EventBusy />}
            />
          </div>
        </div>
      </div>
      <div className="row-3">
        <div className="left">
          {estado ? (
            <div className="activo">
              <p>Activo</p>
            </div>
          ) : (
            <div className="caducado">
              <p>Caducado</p>
            </div>
          )}
          <Tooltip title="Cambiar fecha de termino" placement="top">
            <IconButton className={classes.dateBtn}>
              <Event />
            </IconButton>
          </Tooltip>
        </div>
        <div className="right">
          <Tooltip title="Editar" placement="top">
            <IconButton className={classes.actionBtns} onClick={editarPerfil}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton className={classes.actionBtns}>
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
const Item = ({ title, value, icon }) => {
  return (
    <div className="item-datos-pers-emp-home">
      <div className="left-dp">
        <div>{icon}</div>
      </div>
      <div className="right-dp">
        <div className="top-dp">
          <p>{title}</p>
        </div>
        <div className="bottom-dp">
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
};

// const data = [
//   {
//     tipoPerfil: "admin",
//     rut: "18.822.161-0",
//     nombres: "Abraham",
//     apellidos: "Vidal Carrasco",
//     email: "antonio.vidal95@hotmail.com",
//     fechaInicio: "2021-03-21T22:59:28.388+00:00",
//     fechaTermino: "2021-03-31T22:59:00.000+00:00",
//   },
//   {
//     tipoPerfil: "gest",
//     rut: "18.822.161-0",
//     nombres: "Abraham",
//     apellidos: "Vidal Carrasco",
//     email: "antonio.vidal95@hotmail.com",
//     fechaInicio: "2021-03-21T22:59:28.388+00:00",
//     fechaTermino: "2021-03-31T22:59:00.000+00:00",
//   },
//   {
//     tipoPerfil: "admin",
//     rut: "18.822.161-0",
//     nombres: "Abraham",
//     apellidos: "Vidal Carrasco",
//     email: "antonio.vidal95@hotmail.com",
//     fechaInicio: "2021-03-21T22:59:28.388+00:00",
//     fechaTermino: "2021-03-31T22:59:00.000+00:00",
//   },
//   {
//     tipoPerfil: "admin",
//     rut: "rut",
//     nombres: "Abraham",
//     apellidos: "Vidal Carrasco",
//     email: "antonio.vidal95@hotmail.com",
//     fechaInicio: "2021-03-21T22:59:28.388+00:00",
//     fechaTermino: "2021-03-31T22:59:00.000+00:00",
//   },
// ];
