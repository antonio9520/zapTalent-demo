import React, { useState } from "react";
import "./RegistroB.css";
import logo from "../../../../resources/img/ZAPTalent-Logotipo-Vertical-Original.svg";
import { ListItem, MenuItem, IconButton } from "@material-ui/core";
import { CustomSelect, OutInput } from "../../../../components";
import { regiones } from "../../../../assets/regiones";
import { Close } from "@material-ui/icons";

const RegistroB = (props) => {
  const {
    setView,
    region,
    comuna,
    direccion,
    setRegion,
    setComuna,
    setDireccion,
    handleClose,
  } = props;
  const comunas = regiones.find((item) => item.region === region);
  const [errorregion, setErrorRegion] = useState(false);
  const [errorcomuna, setErrorComuna] = useState(false);
  const [errordirec, setErrorDirec] = useState(false);
  const nextView = () => {
    if (region.trim() === "") {
      setErrorRegion(true);
      return;
    }
    if (comuna === "") {
      setErrorComuna(true);
      return;
    }
    if (direccion === "") {
      setErrorDirec(true);
      return;
    }
    setView("C");
  };
  return (
    <div className="cont-reg-b">
      <div className="btn-close-registro">
        <IconButton onClick={() => handleClose()}>
          <Close />
        </IconButton>
      </div>
      <div className="top-reg-b">
        <img src={logo} alt="logo" className="logo-login-re" />
        <p className="p-top-reg-a">Seguimos con tu georreferenciación</p>
      </div>
      <div className="center-reg-b">
        <div className="center-3">
          <CustomSelect
            placeholder="Región"
            size="small"
            onChange={setRegion}
            value={region}
            helpertext="Seleccione una región"
            error={errorregion}
            funcionError={setErrorRegion}
            name="region"
          >
            {regiones.map((item, index) => (
              <MenuItem
                className="custom-menu-item"
                key={index}
                value={item.region}
              >
                {item.region}
              </MenuItem>
            ))}
          </CustomSelect>
        </div>
        <div className="center-3">
          <CustomSelect
            placeholder="Comuna"
            size="small"
            onChange={setComuna}
            value={comuna}
            helpertext="Seleccione una comuna"
            error={errorcomuna}
            funcionError={setErrorComuna}
            name="comuna"
          >
            {comunas ? (
              comunas.comunas.map((item, index) => (
                <MenuItem className="custom-menu-item" key={index} value={item}>
                  {item}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">Seleccione una región</MenuItem>
            )}
          </CustomSelect>
        </div>
        <div className="center-3">
          <OutInput
            label="Dirección"
            helpertext="La dirección no puede estar vacia"
            funcOnChange={setDireccion}
            defaultValue={direccion}
            size="small"
            name="direction"
            error={errordirec}
            funcionError={setErrorDirec}
          />
        </div>
      </div>
      <div className="bottom-reg-b">
        <ListItem
          button
          className="btn-rut-reg-a"
          onClick={() => setView("A2")}
        >
          <p>Atras</p>
        </ListItem>
        <ListItem button onClick={nextView} className="btn-rut-reg-a">
          <p>Siguiente</p>
        </ListItem>
      </div>
    </div>
  );
};

export default RegistroB;
