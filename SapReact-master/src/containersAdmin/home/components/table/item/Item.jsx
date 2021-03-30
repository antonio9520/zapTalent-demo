import React, { useState, useEffect } from "react";
import "./Item.css";
import { Tooltip } from "../../../../../components";
import { IconButton, makeStyles } from "@material-ui/core";
import { PersonAdd, Edit, Delete, EventAvailable } from "@material-ui/icons";
import logouser from "../../../../../resources/ZAPTalent-Icon-Empty.svg";

const useStyles = makeStyles({
  iconButton: {
    backgroundColor: "#187ce2",
    color: "white",
    boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.2)",
    transition: "0.5s all ease-in-out",
    "&:hover": {
      backgroundColor: "#105296",
      transition: "0.5s all ease-in-out",
      transform: "scale(1.1)",
    },
  },
});
const Item = ({
  data,
  setOpenEditEmp,
  setDataEditar,
  setOpenViewEmp,
  setDataView,
  setOpenAddPerfil,
  setDataAddPerfil,
  setIdEliminar,
  setOpenModalEliminar,
  setOpenModalRep,
}) => {
  const {
    razonSocial,
    rut,
    giro,
    tipoPlan,
    direcciones,
    telefonos,
    fechaInicio,
    fechaTermino,
    logoURL,
    _id,
  } = data;
  const [estado, setEstado] = useState(null);
  const [color, setColor] = useState("#187ce2");

  const _fechaInicio = new Date(fechaInicio);
  const _fechaTermino = new Date(fechaTermino);
  const _fechaTermino_ = new Date(fechaTermino);

  const now = new Date();

  const sevenDays = sumarDias(_fechaTermino_, -7);

  function sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }
  const classes = useStyles();

  const editarEmpresa = () => {
    setDataEditar(data);
    setOpenEditEmp(true);
  };

  const verEmpresa = () => {
    setOpenViewEmp(true);
    setDataView(data);
  };
  const initDelete = () => {
    setIdEliminar(data._id);
    setOpenModalEliminar(true);
  };
  const agregarPerfil = () => {
    setDataAddPerfil(_id);
    setOpenAddPerfil(true);
  };

  const republicar = () => {
    setDataEditar(data);
    setOpenModalRep(true);
  };

  const setearEstado = () => {
    if (now <= _fechaTermino && now >= sevenDays) {
      setEstado("Activo");
      setColor("#F7B217");
    } else if (_fechaTermino >= now) {
      setEstado("Activo");
      setColor("#187ce2");
    } else if (_fechaTermino <= now) {
      setEstado("Caducado");
      setColor("#f44336");
    }
  };
  useEffect(() => {
    if (fechaTermino) {
      setearEstado();
    }
  }, [fechaTermino]);
  return (
    <div className="item-table-home-admin">
      <div className="item-1">
        <div style={{ backgroundColor: color }}>
          <p>{estado}</p>
        </div>
        <Tooltip title="Editar la fecha de termino" placement="top">
          <IconButton onClick={republicar}>
            <EventAvailable />
          </IconButton>
        </Tooltip>
      </div>
      <div className="item-2">
        <div>
          <Tooltip title="Ver empresa" placement="top">
            <div className="border-logo-item-emp" onClick={verEmpresa}>
              {logoURL ? (
                <img className="img-logo" src={logoURL} alt="logo" />
              ) : (
                <img className="img-logo" src={logouser} alt="logo" />
              )}
            </div>
          </Tooltip>
        </div>
        <div style={{ padding: "0 10px 0 10px" }}>
          <p className="p1">{razonSocial}</p>
          <p className="p2">{giro}</p>
        </div>
      </div>
      <div className="item-3">
        <p>Plan</p>
        <p>
          {tipoPlan === "1"
            ? "Estandar"
            : tipoPlan === "2"
            ? "Estandar 5+"
            : tipoPlan === "3"
            ? "Estandar 5+ Plus"
            : tipoPlan === "4"
            ? "Avanzado"
            : tipoPlan === "5"
            ? "Avanzado Plus"
            : null}
        </p>
      </div>
      <div className="item-4">
        <p>Ingreso</p>
        <p>
          {fechaInicio
            ? _fechaInicio.getDate() +
              "/" +
              (_fechaInicio.getMonth() + 1) +
              "/" +
              _fechaInicio.getFullYear()
            : null}
        </p>
      </div>
      <div className="item-4">
        <p>Término</p>
        <p>
          {fechaTermino
            ? _fechaTermino.getDate() +
              "/" +
              (_fechaTermino.getMonth() + 1) +
              "/" +
              _fechaTermino.getFullYear()
            : null}
        </p>
      </div>
      <div className="item-5">
        <p>Fono</p>
        <p>{telefonos[0].telefono}</p>
      </div>
      {/* <div className="item-6">
        <p>Rut</p>
        <p>{rut}</p>
      </div> */}
      <div className="item-7">
        <p>Localizado</p>
        <p>{direcciones[0].comuna + ", " + direcciones[0].region}</p>
      </div>
      {/* <div className="item-8">
        <p>Admin</p>
        <p>Mario Cáceres</p>
        <p>info@agrosuper.cl</p>
      </div> */}
      <div className="item-9">
        <Tooltip title="Agregar perfil" placement="top">
          <IconButton className={classes.iconButton} onClick={agregarPerfil}>
            <PersonAdd fontSize="small" className={classes.icon} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar empresa" placement="top">
          <IconButton className={classes.iconButton} onClick={editarEmpresa}>
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar empresa" placement="top">
          <IconButton className={classes.iconButton} onClick={initDelete}>
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Item;
