import React from "react";
import "./Datos.css";
import {
  Business,
  Fingerprint,
  AssignmentInd,
  Event,
  EventBusy,
} from "@material-ui/icons";

const Datos = ({ data }) => {
  const { fechaTermino, fechaInicio, razonSocial, giro, rut, tipoPlan } = data;
  const _fechaInicio = new Date(fechaInicio);
  const _fechaTermino = new Date(fechaTermino);

  return (
    <div className="datos-view-emp-admin">
      <div className="row">
        <div className="column">
          <Item title="Razón social" value={razonSocial} icon={<Business />} />
        </div>
        <div className="column">
          <Item title="Giro" value={giro} icon={<Business />} />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Item title="Rut" value={rut} icon={<Fingerprint />} />
        </div>
        <div className="column">
          <Item
            title="Tipo de plan"
            value={
              tipoPlan === "1"
                ? "Estandar"
                : tipoPlan === "2"
                ? "Estandar 5+"
                : tipoPlan === "3"
                ? "Estandar 5+ Plus"
                : tipoPlan === "4"
                ? "Avanzado"
                : tipoPlan === "5"
                ? "Avanzado Plus"
                : null
            }
            icon={<AssignmentInd />}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Item
            title="Fecha Ingreso"
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
        <div className="column">
          <Item
            title="Fecha de Termino"
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
  );
};

export default Datos;

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
