import React, { useState } from "react";
// import "./Filtro.css";
import { CustomSelect, Button, OutInput } from "../../../../components";
import { MenuItem, Drawer } from "@material-ui/core";
import { HighlightOff, FilterList } from "@material-ui/icons";
import { modulos } from "../../../../assets/modulos";
import { regiones } from "../../../../assets/regiones";
import { actEmpresa } from "../../../../assets/actEmpresa";
import { estudios_data as carreras } from "../../../../assets/estudios";
import { Filtro } from "../";

const FiltroDrawer = ({
  value,
  query,
  setQuery,
  setSkip,
  skip,
  _switch,
  setSwitch,
  dataFiltro,
  setOpen,
  open,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      
    >
      <Filtro
        value={value}
        query={query}
        setQuery={setQuery}
        setSkip={setSkip}
        skip={skip}
        _switch={_switch}
        setSwitch={setSwitch}
        dataFiltro={dataFiltro}
        setOpen={setOpen}
        open={open}
      />
    </Drawer>
  );
};

export default FiltroDrawer;
