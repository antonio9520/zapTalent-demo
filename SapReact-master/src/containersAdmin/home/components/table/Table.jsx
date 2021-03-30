import React, { useRef, useState } from "react";
import "./Table.css";
import Header from "./header/Header";
import Item from "./item/Item";
import { useContainerDimensions } from "../../../../hooks/useResize";
import Loader from "react-loader-spinner";

const Table = ({
  empresas,
  totalEmpresas,
  setOpenEditEmp,
  setDataEditar,
  setOpenViewEmp,
  setDataView,
  setDataAddPerfil,
  setOpenAddPerfil,
  setIdEliminar,
  setOpenModalEliminar,
  handleScroll,
  loading,
  value,
  setValue,
  setQuery,
  _switch,
  setSkip,
  setSwitch,
  query,
  setOpenModalRep,
}) => {
  const refContentTable = useRef();

  const { height } = useContainerDimensions(refContentTable);

  return (
    <div className="cont-table-home-admin">
      <div className="table-top">
        <Header
          value={value}
          setValue={setValue}
          setQuery={setQuery}
          _switch={_switch}
          setSkip={setSkip}
          setSwitch={setSwitch}
          query={query}
        />
      </div>
      <div className="table-center" ref={refContentTable}>
        <div
          className="sub-item"
          style={{ maxHeight: height }}
          onScroll={handleScroll}
        >
          {empresas.map((item, index) => (
            <Item
              key={index}
              data={item}
              setOpenEditEmp={setOpenEditEmp}
              setDataEditar={setDataEditar}
              setOpenViewEmp={setOpenViewEmp}
              setDataView={setDataView}
              setOpenAddPerfil={setOpenAddPerfil}
              setDataAddPerfil={setDataAddPerfil}
              setIdEliminar={setIdEliminar}
              setOpenModalEliminar={setOpenModalEliminar}
              setOpenModalRep={setOpenModalRep}
            />
          ))}
          {loading && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Loader
                type="Oval"
                color="#00BFFF"
                height={50}
                width={50}
                visible={loading}
                //  timeout={3000} //3 secs
              />
            </div>
          )}
        </div>
      </div>
      <div className="table-bottom">
        <div>
          <p>{totalEmpresas} Cuentas Empresas</p>
        </div>
      </div>
    </div>
  );
};

export default Table;
