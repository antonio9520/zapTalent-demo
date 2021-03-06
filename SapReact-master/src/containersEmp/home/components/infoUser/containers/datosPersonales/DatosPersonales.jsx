import React from "react";
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
import { useHistory } from "react-router-dom";
import { Tooltip } from "../../../../../../components";

const DatosPersonales = ({ data, generarCV }) => {
  const history = useHistory();
  const {
    rut,
    phone,
    email,
    direccion,
    ecivil,
    nacion,
    comuna,
    region,
    _id,
  } = data;

  const verPerfilCompleto = () => {
    history.push(`/empresas/perfil/${_id}`);
  };

  return (
    <div className="datosPersonales-emp">
      <div className="top-b">
        <div className="item-1">
          <Item title="Rut" value={rut} icon={<Fingerprint />} />
          <Item title="Email" value={email} icon={<Mail />} />
          <Item title="Numero móvil" value={phone} icon={<PhoneAndroid />} />
        </div>
        <div className="item-1">
          <Item title="Estado Civil" value={ecivil} icon={<AccountCircle />} />
          <Item title="Nacionalidad" value={nacion} icon={<Flag />} />
          <Item
            title="Dirección"
            value={direccion + ", " + comuna + ", " + region}
            icon={<LocationOn />}
          />
        </div>
      </div>
      <div className="bottom-b">
        <Tooltip title="Ver perfil completo">
          <IconButton className="btn-info-user-emp" onClick={verPerfilCompleto}>
            <Visibility />
          </IconButton>
        </Tooltip>
        <Tooltip title="Descargar CV.">
          <IconButton className="btn-info-user-emp" onClick={() => generarCV()}>
            <GetApp />
          </IconButton>
        </Tooltip>
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
