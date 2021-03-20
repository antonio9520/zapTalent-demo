import React, { useState, useEffect } from "react";
import "./Card.css";
import { CustomInput, CustomSelectB } from "../../../../../../../components";
import { MenuItem, IconButton, makeStyles } from "@material-ui/core";
import { Close, LocationOn } from "@material-ui/icons";
import { regiones } from "../../../../../../../assets/regiones";

const useStyles = makeStyles({
  iconButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  icon: {
    color: "#9A99A1",
    marginRight: 10,
  },
});

const Card = ({
  num,
  data,
  direcciones,
  setDirecciones,
  recargar,
  errores2,
}) => {
  const classes = useStyles();
  const { id, direccion, region, comuna } = data;
  const [regionA, setRegionA] = useState("");
  const [direccionA, setDireccionA] = useState("");
  const [comunaA, setComunaA] = useState("");
  const [initDefault, setInitDefault] = useState(true);
  const [error, setError] = useState(false);

  const comunas = regiones.find((item) => item.region === regionA);

  const handleDelete = async () => {
    if (direcciones.length === 1) {
      return;
    } else {
      await setDirecciones(direcciones.filter((i) => i.id !== id));
      recargar();
    }
  };

  const changeDireccion = (e) => {
    direcciones.map((item) => {
      if (item.id === id) {
        item.direccion = e.target.value;
      }
    });
    setDireccionA(e.target.value);
  };
  const changeRegion = (e) => {
    direcciones.map((item) => {
      if (item.id === id) {
        item.region = e.target.value;
      }
    });
    setRegionA(e.target.value);
  };
  const changeComuna = (e) => {
    direcciones.map((item) => {
      if (item.id === id) {
        item.comuna = e.target.value;
      }
    });
    setComunaA(e.target.value);
  };

  useEffect(() => {
    setDireccionA(direccion);
    setRegionA(region);
    setComunaA(comuna);
  }, []);

  useEffect(() => {
    if (initDefault === false) {
      if (errores2.length > 0) {
        const valor = errores2.filter((item) => item === data.id);

        if (valor.length > 0) {
          setError(true);
          document.getElementById(id).scrollIntoView();
        } else {
          setError(false);
        }
      }
    }
    setInitDefault(false);
  }, [errores2]);
  return (
    <div
      id={id}
      className="direccion-add-emp-admin"
      style={{
        border: error ? "1px solid #f44336" : null,
        backgroundColor: error ? "#f4433605" : null,
      }}
    >
      <div className="item">
        <LocationOn className={classes.icon} fontSize="small" />
        <CustomInput
          label={`Dirección ${num}`}
          helpertext="Introduzca un nuemero valido"
          // error={razonSocialError}
          // type="text"
          defaultValue={direccionA}
          value={direccionA}
          onChange={(e) => {
            // setRazonSocialError(false);
            changeDireccion(e);
          }}
        />
      </div>
      <div className="item">
        <LocationOn className={classes.icon} fontSize="small" />
        <CustomSelectB
          label={`Región ${num}`}
          helpertext="no puede estar vacio"
          //   error={tipoPlanError}
          value={region}
          onChange={(e) => {
            // setTipoPlanError(false);
            changeRegion(e);
          }}
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
        </CustomSelectB>
      </div>
      <div className="item">
        <LocationOn className={classes.icon} fontSize="small" />
        <CustomSelectB
          label={`Comuna ${num}`}
          helpertext="no puede estar vacio"
          //   error={tipoPlanError}
          value={comuna}
          onChange={(e) => {
            // setTipoPlanError(false);
            changeComuna(e);
          }}
        >
          {comunas ? (
            comunas.comunas.map((item, index) => (
              <MenuItem className="custom-menu-item" key={index} value={item}>
                {item}
              </MenuItem>
            ))
          ) : (
            <MenuItem className="custom-menu-item" value="">
              Seleccione una región
            </MenuItem>
          )}
        </CustomSelectB>
      </div>
      <IconButton
        size="small"
        onClick={handleDelete}
        className={classes.iconButton}
      >
        <Close fontSize="small" />
      </IconButton>
    </div>
  );
};

export default Card;
