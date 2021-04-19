import React from "react";
import { Drawer } from "@material-ui/core";
import { CardPerfilNew } from "../";

const DrawerPerfil = ({
  open,
  setOpen,
  openModalRRSS,
  setOpenModalRRSS,
  setOpenModal,
  setActive,
  setActiveStep,
  habilidades,
  setOpenModalHab,
  porcentaje,
  empresa,
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      {empresa ? (
        <CardPerfilNew
          empresas
          openModalRRSS={openModalRRSS}
          setOpenModalRRSS={setOpenModalRRSS}
          setOpenModal={setOpenModal}
          setActive={setActive}
          setActiveStep={setActiveStep}
          habilidades={habilidades}
          setOpenModalHab={setOpenModalHab}
          porcentaje={porcentaje}
        />
      ) : (
        <CardPerfilNew
          openModalRRSS={openModalRRSS}
          setOpenModalRRSS={setOpenModalRRSS}
          setOpenModal={setOpenModal}
          setActive={setActive}
          setActiveStep={setActiveStep}
          habilidades={habilidades}
          setOpenModalHab={setOpenModalHab}
          porcentaje={porcentaje}
        />
      )}
    </Drawer>
  );
};

export default DrawerPerfil;
