import React, { useState } from "react";
import "./RegistroA2.css";
import { OutInput, CustomSelect } from "../../../../components";
import logo from "../../../../resources/img/ZAPTalent-Logotipo-Vertical-Original.svg";
import { ListItem, MenuItem, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { naciones } from "../../../../assets/nacionalidades";

const RegistroA2 = (props) => {
  const {
    ecivil,
    nacion,
    sexo,
    setEcivil,
    setNacion,
    setSexo,
    setView,
    handleClose,
  } = props;
  const [errornacion, setErrorNacion] = useState(false);
  const [errorcivil, setErrorCivil] = useState(false);
  const [errorsexo, setErrorSexo] = useState(false);

  //Validacion
  const validacion = () => {
    //validar estado civil
    if (ecivil === "") {
      setErrorCivil(true);
      return;
    }
    //validar sexo
    if (sexo.trim() === "") {
      setErrorSexo(true);
      return;
    }
    //validar nacionalidad
    if (nacion.trim() === "") {
      setErrorNacion(true);
      return;
    }
    setView("B");
  };
  return (
    <div className="cont-reg-a2">
      <div className="btn-close-registro">
        <IconButton onClick={() => handleClose()}>
          <Close />
        </IconButton>
      </div>
      <div className="top-reg-a2">
        <img src={logo} alt="logo" className="logo-login-re" />
        <p className="p-top-reg-a">
          Para comenzar, nesesitamos tus datos básicos:
        </p>
      </div>
      <div className="center-reg-a2">
        <div className="center-2">
          <CustomSelect
            placeholder="Estado civil"
            size="small"
            onChange={setEcivil}
            helpertext="Selecciona un estado civil"
            value={ecivil}
            name="civil"
            error={errorcivil}
            funcionError={setErrorCivil}
          >
            <MenuItem className="custom-menu-item" value="Soltero">
              Soltero
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Casado">
              Casado
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Viudo">
              Viudo
            </MenuItem>
          </CustomSelect>
        </div>
        <div className="center-2">
          <CustomSelect
            placeholder="Sexo"
            size="small"
            onChange={setSexo}
            helpertext="Selecciona un sexo"
            value={sexo}
            name="sexo"
            error={errorsexo}
            funcionError={setErrorSexo}
          >
            <MenuItem className="custom-menu-item" value="Masculino">
              Masculino
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Femenino">
              Femenino
            </MenuItem>
          </CustomSelect>
        </div>
        <div className="center-2">
          <CustomSelect
            placeholder="Nacionalidad"
            size="small"
            onChange={setNacion}
            helpertext="Selecciona una nacionalidad"
            value={nacion}
            name="nacion"
            error={errornacion}
            funcionError={setErrorNacion}
          >
            {naciones.map((item, index) => (
              <MenuItem className="custom-menu-item" value={item}>
                {item}
              </MenuItem>
            ))}
          </CustomSelect>
        </div>
      </div>
      <div className="bottom-reg-a2">
        <ListItem button className="btn-rut-reg-a" onClick={() => setView("A")}>
          <p style={{ color: "white" }}>Atras</p>
        </ListItem>
        <ListItem button onClick={validacion} className="btn-rut-reg-a">
          <p style={{ color: "white" }}>Siguiente</p>
        </ListItem>
      </div>
    </div>
  );
};

export default RegistroA2;
