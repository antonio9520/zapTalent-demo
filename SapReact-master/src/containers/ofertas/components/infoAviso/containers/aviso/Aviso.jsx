import React from "react";
import "../styles.css";
import { EventAvailable, EventBusy, LocationOn } from "@material-ui/icons";
import { Tooltip } from "../../../../../../components";

const Aviso = ({ data, data2 }) => {
  const {
    titulo,
    profesion,
    tipoConsultor,
    anosExpSap,
    estado,
    descripcion,
    pais,
    region,
    ciudad,
    fechaInicio,
    fechaTermino,
  } = data;
  const { razonSocial, giro } = data2;

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
  const inicio = new Date(fechaInicio);
  const termino = new Date(fechaTermino);

  return (
    <div className="aviso-infoAviso-of">
      <div className="item-1">
        <div>
          <EventAvailable className="icon-date-infoAviso" />
          <p>
            {MESES[inicio.getMonth()] +
              " " +
              inicio.getDate() +
              " - " +
              inicio.getFullYear()}
          </p>
        </div>
        <div>
          <EventBusy className="icon-date-infoAviso" />
          <p>
            {MESES[termino.getMonth()] +
              " " +
              termino.getDate() +
              " - " +
              termino.getFullYear()}
          </p>
        </div>
      </div>
      <Tooltip title={titulo} placement="top">
        <h1 className="h1">
          {titulo.length > 30 ? titulo.substring(0, 30) + "..." : titulo}
        </h1>
      </Tooltip>
      <p className="p1">{profesion}</p>
      <p className="p2">{razonSocial}</p>
      <p className="p3">{giro}</p>
      <div className="item-2">
        <div>
          <p>{tipoConsultor}</p>
        </div>
        <div>
          <p>
            {anosExpSap === 1 ? `${anosExpSap} año ` : `${anosExpSap} años `}de
            experiencia
          </p>
        </div>
      </div>
      <div className="item-5">
        <p>{estado}</p>
      </div>
      <div className="item-3">
        <LocationOn className="icon-date-infoAviso" />
        <p>
          {ciudad}, {region}, {pais}
        </p>
      </div>
      <div className="item-4">
        <p>{descripcion}</p>
      </div>
    </div>
  );
};

export default Aviso;

const texto =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu metus orci. Mauris luctus vitae purus ut feugiat. Nunc porttitor, dui sed rutrum viverra, eros tortor convallis velit, vitae tempor nunc eros et massa. Phasellus eget metus eros. Nunc gravida sollicitudin velit, non bibendum nulla consequat a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris ultrices congue sem, in volutpat diam mollis ut. Aliquam fermentum mi eu euismod pretium. Maecenas pulvinar dictum sapien, at ultricies ipsum viverra eget. Morbi fermentum nunc ac aliquam viverra. Vestibulum maximus ex quis ultricies ultricies. Nulla dui purus, gravida nec nibh vel, molestie porttitor urna. Phasellus eget placerat massa. Nulla nec convallis erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam in ullamcorper orci. Integer consequat justo ut nisi accumsan posuere. Quisque non dapibus massa. Etiam dolor nunc, euismod eget commodo in, pellentesque non lorem. Nam pulvinar lacinia ante, id volutpat sapien pellentesque ac. Fusce scelerisque, lectus quis aliquam finibus, nibh sem lobortis elit, eget posuere urna ex non nisl. Nam leo est, euismod ac nunc nec, facilisis convallis mauris. Vivamus blandit elit eget nibh tempus, ut egestas quam iaculis. Maecenas est ante, sagittis efficitur nibh in, volutpat feugiat mauris. Maecenas tempus lorem at bibendum iaculis.";
