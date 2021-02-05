import React, { useState } from "react";
import "./StepThree.css";
import { ListItem, IconButton, Snackbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import SubModulos from "./submodulos/SubModulos";
import { Alert } from "@material-ui/lab";
import { Tooltip } from "../../../../../components";

const StepThree = (props) => {
  const { setStep, arrayModules, setArrayModules, closeModal } = props;
  const [active, setActive] = useState(arrayModules[0].name);
  const [errorThree, setErrorThree] = useState([]);
  const [switch2, setSwitch2] = useState(false);
  const [_alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");

  const validation = () => {
    arrayModules.map((item) => {
      item.submodulos.map((item) => {
        if (item.nivel === "") {
          errorThree.push(item.name);
        }
      });
    });
    setSwitch2(!switch2);
    nextStep();
  };

  const nextStep = () => {
    if (errorThree.length > 0) {
      setMsg("Debes seleccionar un nivel para cada Submodulo");
      setAlert(true);
    } else {
      setStep("four");
    }
  };
  const handleClose = () => {
    setAlert(false);
  };

  return (
    <div className="cont-three-adn">
      <div className="sub-cont-three-adn">
        <div className="modulos-three-adn">
          {arrayModules.map((item, index) => (
            <Modulos
              key={index}
              data={item}
              active={active}
              setActive={setActive}
            />
          ))}
        </div>
        <div style={{ width: "100%" }}>
          <SubModulos
            arrayModules={arrayModules}
            active={active}
            setArrayModules={setArrayModules}
            setErrorThree={setErrorThree}
            switch2={switch2}
            errorThree={errorThree}
          />
          <div className="cont-btn-adn-one-custom">
            <ListItem
              button
              className={`btn-adnzap-modal `}
              onClick={() => setStep("two")}
            >
              <p style={{ color: "white" }}>Atras</p>
            </ListItem>
            <ListItem
              button
              className={`btn-adnzap-modal `}
              onClick={() => validation()}
            >
              <p style={{ color: "white" }}>Guardar y seguir</p>
            </ListItem>
          </div>
          <div className="cont-iconbtn-close-adn">
            <IconButton onClick={closeModal}>
              <Close />
            </IconButton>
          </div>
        </div>
        <Snackbar open={_alert} onClose={handleClose} autoHideDuration={6000}>
          <Alert severity="error">{msg}</Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default StepThree;

const Modulos = ({ data, active, setActive }) => {
  return (
    <Tooltip title={data.desc}>
      <div
        className={
          active === data.name
            ? "sub-modulo-three-adn-active"
            : "sub-modulo-three-adn"
        }
        onClick={() => setActive(data.name)}
      >
        <p style={{ color: "white" }}>{data.name}</p>
      </div>
    </Tooltip>
  );
};
