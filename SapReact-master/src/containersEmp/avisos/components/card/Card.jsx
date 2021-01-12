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
const Card = () => {
  return (
    <div className="card-avisos-empresas">
      <div className="top-card-avisos-emp">
        <div className="left-card-avisos-emp">
          <div className="fechas-card-avisos-emp">
            <EventAvailable className="icon-calendar-avisos-emp" />
            <p>Mayo 21 - 2020</p>

            <EventBusy className="icon-calendar-avisos-emp" />
            <p>Agosto 21 - 2020</p>
          </div>
          <p className="p1">SCL Consultores</p>
          <p className="p2">Programador Python</p>
          <p className="p3">Ingeniero en informática</p>
          <div className="anos-exp-card-avisos-emp">
            <p>2 años de experiencia</p>
          </div>
          <div className="direccion-card-avisos-emp">
            <LocationOn className="icon-calendar-avisos-emp" />
            <p>San Miguel, Santiago, R. Metropolitana</p>
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
            <p>Activo</p>
          </div>
          <IconButton>
            <ArrowDropDown />
          </IconButton>
        </div>
        <div className="left-bottom-avisos-emp">
          <IconButton  className="btns-cards-avisos-emp">
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
