import React, { useRef } from "react";
import "./Table.css";
import Header from "./header/Header";
import Item from "./item/Item";
import { useContainerDimensions } from "../../../../hooks/useResize";

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
}) => {
  const refContentTable = useRef();
  const { height } = useContainerDimensions(refContentTable);
  return (
    <div className="cont-table-home-admin">
      <div className="table-top">
        <Header />
      </div>
      <div className="table-center" ref={refContentTable}>
        <div className="sub-item" style={{ maxHeight: height }}>
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
            />
          ))}
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
