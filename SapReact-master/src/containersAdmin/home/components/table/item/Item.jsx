import React, { useState } from "react";
import "./Item.css";
import { IconButton, makeStyles } from "@material-ui/core";
import { ArrowDropDown, PersonAdd, Edit, Delete } from "@material-ui/icons";
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
const Item = ({ data }) => {
  const {
    razonSocial,
    rut,
    giro,
    tipoPlan,
    direcciones,
    telefonos,
    fechaInicio,
    fechaTermino,
  } = data;
  const _fechaTermino = new Date(fechaTermino);
  try {
    console.log(JSON.parse(telefonos));
  } catch (error) {
    console.log(error);
  }

  const classes = useStyles();
  return (
    <div className="item-table-home-admin">
      <div className="item-1">
        <div>
          <p>Activo</p>
        </div>
        <IconButton>
          <ArrowDropDown />
        </IconButton>
      </div>
      <div className="item-2">
        <div>
          <div>
            <img className="img-logo" src={logouser} alt="logo" />
          </div>
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
          {fechaTermino
            ? _fechaTermino.getDate() +
              "/" +
              _fechaTermino.getMonth() +
              "/" +
              _fechaTermino.getFullYear()
            : null}
        </p>
      </div>
      <div className="item-5">
        <p>Fono</p>
        <p>{telefonos[0].telefono}</p>
      </div>
      <div className="item-6">
        <p>Rut</p>
        <p>{rut}</p>
      </div>
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
        <IconButton className={classes.iconButton}>
          <PersonAdd fontSize="small" className={classes.icon} />
        </IconButton>
        <IconButton className={classes.iconButton}>
          <Edit fontSize="small" />
        </IconButton>
        <IconButton className={classes.iconButton}>
          <Delete fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};

export default Item;
