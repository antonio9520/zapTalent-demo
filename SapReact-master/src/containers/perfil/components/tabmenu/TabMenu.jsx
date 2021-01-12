import React, { useState } from "react";
import "./TabMenu.css";
import Menu from "./menu/Menu";
import SwipeableViews from "react-swipeable-views";
import { EditPerfil, Password, Location, Phone, Cv } from "./forms";
import { IconButton, LinearProgress } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Tooltip } from "../../../../components";
import { useSelector } from "react-redux";

const TabMenu = ({
  setOpenModal,
  active,
  setActive,
  activeStep,
  setActiveStep,
}) => {
  // const [active, setActive] = useState("one");
  // const [activeStep, setActiveStep] = useState(0);

  const usuario = useSelector((state) => state.auth.usuario);
  const loading = useSelector((state) => state.auth.loading);
  return (
    <div className="cont-edit-perfil">
      <Tooltip
        title="Cerrar"
        placement="top"
        className="close-modal-edit-perfil"
      >
        <IconButton onClick={() => setOpenModal(false)}>
          <Close />
        </IconButton>
      </Tooltip>

      <div className="cont-items-menu-ed-per">
        <Menu
          active={active}
          setActive={setActive}
          setActiveStep={setActiveStep}
          loading={loading}
        />
      </div>
      <div className="cont-forms-edit-perfil">
        <SwipeableViews index={activeStep}>
          <EditPerfil
            usuario={usuario}
            setOpenModal={setOpenModal}
            loading={loading}
          />
          <Password
            usuario={usuario}
            setOpenModal={setOpenModal}
            loading={loading}
          />
          <Location
            usuario={usuario}
            setOpenModal={setOpenModal}
            loading={loading}
          />
          <Phone
            usuario={usuario}
            setOpenModal={setOpenModal}
            loading={loading}
          />
          <Cv usuario={usuario} setOpenModal={setOpenModal} loading={loading} />
        </SwipeableViews>
      </div>
      {loading ? (
        <div className="linear-progres-editar-perfil">
          <LinearProgress className="progres-editar-perfil" />
        </div>
      ) : null}
    </div>
  );
};

export default TabMenu;
