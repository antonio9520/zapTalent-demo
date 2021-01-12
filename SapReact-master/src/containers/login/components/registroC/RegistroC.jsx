import React, { useState } from "react";
import "./RegistroC.css";
import logo from "../../../../resources/img/ZAPTalent-Logotipo-Vertical-Original.svg";
import {
  ListItem,
  MenuItem,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import { CustomSelect, OutInput } from "../../../../components";
import { Close } from "@material-ui/icons";
import { useSelector } from "react-redux";
const RegistroC = (props) => {
  const {
    setView,
    consultor,
    anosExp,
    anosZap,
    setAnosExp,
    setConsultor,
    setAnosZap,
    registrarUsuario,
    handleClose,
  } = props;
  const [errorconsultor, setErrorConsultor] = useState(false);
  const [errorexplaboral, setErrorExpLaboral] = useState(false);
  const [errorexpzap, setErroExpZap] = useState(false);
  const [anosExpMsg, setAnosExpMsg] = useState("");
  const [anosZapMsg, setAnosZapMsg] = useState("");
  const cargando = useSelector((state) => state.auth.cargando);
  // const cargando = true;
  const nextView = () => {
    if (consultor === "") {
      setErrorConsultor(true);

      return;
    }
    if (anosExp.trim() === "") {
      setErrorExpLaboral(true);
      setAnosExpMsg("Años experiencia no puede estar vacio");
      return;
    } else if (anosExp < 0) {
      setErrorExpLaboral(true);
      setAnosExpMsg("Ingrese un numero valido");
      return;
    }
    if (anosZap.trim() === "") {
      setErroExpZap(true);
      setAnosZapMsg("Años experiencia ZAP no puede estar vacio");
      return;
    } else if (anosZap < 0) {
      setErroExpZap(true);
      setAnosZapMsg("Ingrese un numero valido");
      return;
    }
    registrarUsuario();
  };
  return (
    <>
      <div className="cont-reg-c">
        <div style={{ padding: "0 90px 30px 90px" }}>
          <div className="btn-close-registro">
            <IconButton onClick={() => handleClose()}>
              <Close />
            </IconButton>
          </div>

          <div className="top-reg-c">
            <img src={logo} alt="logo" className="logo-login-re" />
            <p className="p-top-reg-a">¡Ya casi!</p>
            <p className="p-top-reg-a">
              Que tipo de perfil eres y cuantos años de experiencia tienes
            </p>
          </div>
          <div className="center-reg-c">
            <div className="center-3">
              <CustomSelect
                placeholder="Tipo de consultor"
                size="small"
                onChange={setConsultor}
                value={consultor}
                error={errorconsultor}
                helpertext="Seleccione un tipo de consultor"
                funcionError={setErrorConsultor}
                name="consultor"
              >
                <MenuItem className="custom-menu-item" value="Training">
                  Training
                </MenuItem>
                <MenuItem className="custom-menu-item" value="Junior">
                  Junior
                </MenuItem>
                <MenuItem className="custom-menu-item" value="Semi Senior">
                  Semi Senior
                </MenuItem>
                <MenuItem className="custom-menu-item" value="Senior">
                  Senior
                </MenuItem>
              </CustomSelect>
            </div>
            <div className="center-3">
              <OutInput
                label="Años de experiencia laboral"
                size="small"
                funcOnChange={setAnosExp}
                value={anosExp}
                type="number"
                helpertext={anosExpMsg}
                error={errorexplaboral}
                funcionError={setErrorExpLaboral}
                name="explaboral"
              ></OutInput>
            </div>
            <div className="center-3">
              <OutInput
                label="Años de experiencia SAP"
                size="small"
                funcOnChange={setAnosZap}
                value={anosZap}
                type="number"
                helpertext={anosZapMsg}
                error={errorexpzap}
                funcionError={setErroExpZap}
                name="expzap"
              ></OutInput>
            </div>
          </div>
          <div className="bottom-reg-c">
            <ListItem
              button
              className="btn-rut-reg-a"
              onClick={() => setView("B")}
            >
              <p>Atras</p>
            </ListItem>
            <ListItem button onClick={nextView} className="btn-rut-reg-a">
              <p>Registrarse!</p>
            </ListItem>
          </div>
        </div>
        {cargando ? (
          <>
            <div className="overlay-loading"></div>
            <div className="linear-progres-global" style={{ bottom: "20px" }}>
              <LinearProgress className="progres-editar-perfil" />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default RegistroC;
