import React, { useState } from "react";
import { IconButton, ListItem, Snackbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import SubModulos from "./Submodulos";
import { Alert } from "@material-ui/lab";
const Two = (props) => {
  const {
    setView,
    dataEditar,
    arraySubMod,
    setArraySubMod,
    setDataEditar,
  } = props;
  const [errorThree, setErrorThree] = useState([]);
  const [switch2, setSwitch2] = useState(false);
  const [_alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");

  const validation = () => {
    arraySubMod.map((item) => {
      if (item.nivel === "") {
        errorThree.push(item.name);
      }
    });
    setSwitch2(!switch2);
    stepFinish();
  };

  const stepFinish = () => {
    if (errorThree.length > 0) {
      setMsg("Debes seleccionar un nivel para cada Submodulo");
      setAlert(true);
    } else {
      for (let i = 0; i < arraySubMod.length; i++) {
        dataEditar.submodulos.push(arraySubMod[i]);
      }

      setArraySubMod([]);
      setView("default");
    }
  };
  const handleClose = () => {
    setAlert(false);
  };

  return (
    <div className="cont-three-adn-edit">
      <div className="sub-cont-three-adn-edit">
        <div style={{ width: "100%", marginTop: "60px" }}>
          <SubModulos
            dataEditar={dataEditar}
            arraySubMod={arraySubMod}
            setArraySubMod={setArraySubMod}
            setErrorThree={setErrorThree}
            switch2={switch2}
            errorThree={errorThree}
          />
        </div>
        <div className="cont-iconbtn-close-adn">
          <IconButton
          //   onClick={closeModal}
          >
            <Close />
          </IconButton>
        </div>
        <div className="cont-btn-adn-one-edit">
          <ListItem
            button
            className={`btn-adnzap-modal `}
            onClick={() => setView("one")}
            style={{ color: "white" }}
          >
            <p>Atras</p>
          </ListItem>
          <ListItem
            button
            className={`btn-adnzap-modal `}
            onClick={() => validation()}
            style={{ color: "white" }}
          >
            <p>Guardar y seguir</p>
          </ListItem>
        </div>
        <Snackbar open={_alert} onClose={handleClose} autoHideDuration={6000}>
          <Alert severity="error">{msg}</Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Two;
