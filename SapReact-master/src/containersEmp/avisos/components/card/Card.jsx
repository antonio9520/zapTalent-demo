import React from "react";
import "./Card.css";
import {
  EventAvailable,
  EventBusy,
  LocationOn,
  Cached,
  Print,
  FileCopy,
  Edit,
  Delete,
  ArrowDropDown,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const Card = ({ data }) => {
  console.log(data);
  const inicio = new Date(data.fechaInicio);
  const termino = new Date(data.fechaTermino);

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
  return (
    <div className="card-avisos-empresas">
      <div className="top-card-avisos-emp">
        <div className="left-card-avisos-emp">
          <div className="fechas-card-avisos-emp">
            <EventAvailable className="icon-calendar-avisos-emp" />
            <p>
              {MESES[inicio.getMonth()]} {inicio.getDay()} -{" "}
              {inicio.getFullYear()}
            </p>

            <EventBusy className="icon-calendar-avisos-emp" />
            <p>
              {MESES[termino.getMonth()]} {termino.getDay()} -{" "}
              {termino.getFullYear()}
            </p>
          </div>
          <p className="p1">SCL Consultores</p>
          <p className="p2">{data.titulo}</p>
          <p className="p3">{data.profesion}</p>
          <div className="anos-exp-card-avisos-emp">
            <p>{data.anosExp} años de experiencia</p>
          </div>
          <div className="direccion-card-avisos-emp">
            <LocationOn className="icon-calendar-avisos-emp" />
            <p>
              {data.ciudad}, {data.region}
            </p>
          </div>
        </div>
        <div className="right-card-avisos-emp">
          <div className="sub-right-avisos-emp">
            <div>
              <p className="p1">Inscritos</p>
              <p className="p2">55</p>
            </div>
            <div>
              <p className="p1">No leídos</p>
              <p className="p2">45</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-card-avisos-emp">
        <div className="right-bottom-avisos-emp">
          <p className="p1">Estado: </p>
          <div className="estado-card-avisos-emp">
            <p>{data.estado}</p>
          </div>
          <IconButton>
            <ArrowDropDown />
          </IconButton>
        </div>
        <div className="left-bottom-avisos-emp">
          <IconButton className="btns-cards-avisos-emp">
            <Cached />
          </IconButton>
          <IconButton className="btns-cards-avisos-emp">
            <Print />
          </IconButton>
          <IconButton className="btns-cards-avisos-emp">
            <FileCopy />
          </IconButton>
          <IconButton className="btns-cards-avisos-emp">
            <Edit />
          </IconButton>
          <IconButton className="btns-cards-avisos-emp">
            <Delete />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Card;
