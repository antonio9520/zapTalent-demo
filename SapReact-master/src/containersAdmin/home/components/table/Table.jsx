import React, { useRef } from "react";
import "./Table.css";
import Header from "./header/Header";
import Item from "./item/Item";
import { useContainerDimensions } from "../../../../hooks/useResize";

const Table = ({ empresas, totalEmpresas }) => {
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
            <Item key={index} data={item} />
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
