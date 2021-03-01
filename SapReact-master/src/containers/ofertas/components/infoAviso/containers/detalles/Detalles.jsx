import React from "react";
import "../styles.css";
import {
  BusinessCenter,
  Flight,
  Home,
  Room,
  AccountCircle,
  QueryBuilder,
  EventSeat,
  Description,
  AccountTree,
} from "@material-ui/icons";

const Detalles = ({ data }) => {
  const {
    tipoConsultor,
    anosExpSap,
    tipoContrato: { desc },
    jornadaLaboral,
    cantidadVacantes,
    fechaContratacion,
    dispViajar,
    dispResidencia,
    ciudad,
    region,
    pais,
  } = data;

  const contratacion = new Date(fechaContratacion);
  return (
    <div className="detalles-infoAviso-of">
      <div className="item-1">
        <Item
          title="Tipo de consultor"
          value={tipoConsultor}
          icon={<AccountCircle />}
        />
      </div>
      {anosExpSap ? (
        <div className="item-1">
          <Item
            title="Experiencia SAP"
            value={anosExpSap}
            icon={<AccountTree />}
          />
        </div>
      ) : null}

      <div className="item-1">
        <Item
          title="Tipo de jornada"
          value={jornadaLaboral}
          icon={<QueryBuilder />}
        />
      </div>
      <div className="item-1">
        <Item title="Tipo de contrato" value={desc} icon={<Description />} />
      </div>
      <div className="item-1">
        <Item
          title="Cantidad de vacantes"
          value={cantidadVacantes}
          icon={<EventSeat />}
        />
      </div>
      <div className="item-1">
        <Item
          title="Fecha de contratación"
          value={
            fechaContratacion
              ? contratacion.getDate() +
                "/" +
                contratacion.getMonth() +
                "/" +
                contratacion.getFullYear()
              : null
          }
          icon={<BusinessCenter />}
        />
      </div>
      <div className="item-1">
        <Item
          title="Disponibilidad para viajar"
          value={dispViajar ? "Si" : "No"}
          icon={<Flight />}
        />
      </div>
      <div className="item-1">
        <Item
          title="Cambio de residencia"
          value={dispResidencia ? "Si" : "No"}
          icon={<Home />}
        />
      </div>
      <div className="item-1">
        <Item title="Ciudad" value={ciudad} icon={<Room />} />
      </div>
      <div className="item-1">
        <Item title="Región" value={region} icon={<Room />} />
      </div>
      <div className="item-1">
        <Item title="País" value={pais} icon={<Room />} />
      </div>
    </div>
  );
};

export default Detalles;

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
