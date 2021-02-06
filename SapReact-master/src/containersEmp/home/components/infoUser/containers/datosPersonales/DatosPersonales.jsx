import React, { useState, useEffect } from "react";
import "./DatosPersonales.css";
import { IconButton } from "@material-ui/core";
import {
  Visibility,
  GetApp,
  Fingerprint,
  Mail,
  PhoneAndroid,
  AccountCircle,
  Flag,
  LocationOn,
} from "@material-ui/icons";

const DatosPersonales = () => {
  return (
    <div className="datosPersonales-emp">
      <div className="top-b">
        <div className="item-1">
          <Item title="Rut" value="18.88.161-0" icon={<Fingerprint />} />
          <Item
            title="Email"
            value="antonio.vidal95@hotmail.com"
            icon={<Mail />}
          />
          <Item
            title="Numero móvil"
            value="+(569) 5670 7412"
            icon={<PhoneAndroid />}
          />
        </div>
        <div className="item-1">
          <Item title="Estado Civil" value="Soltero" icon={<AccountCircle />} />
          <Item title="Nacionalidad" value="Chileno" icon={<Flag />} />
          <Item
            title="Dirección"
            value="psj. Hernando de Magallanez 4 #3777, lagunillas norte, coronel, bio bio"
            icon={<LocationOn />}
          />
        </div>
      </div>
      <div className="bottom-b">
        <IconButton className="btn-info-user-emp">
          <Visibility />
        </IconButton>
        <IconButton className="btn-info-user-emp">
          <GetApp />
        </IconButton>
      </div>
    </div>
  );
};

export default DatosPersonales;

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
