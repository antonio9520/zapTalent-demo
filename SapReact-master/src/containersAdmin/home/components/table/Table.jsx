import React, { useRef } from "react";
import "./Table.css";
import Header from "./header/Header";
import Item from "./item/Item";
import { useContainerDimensions } from "../../../../hooks/useResize";

const Table = () => {
  const refContentTable = useRef();
  const { height } = useContainerDimensions(refContentTable);
  return (
    <div className="cont-table-home-admin">
      <div className="table-top">
        <Header />
      </div>
      <div className="table-center" ref={refContentTable}>
        <div className="sub-item" style={{ maxHeight: height }}>
          {data.map((item, index) => (
            <Item key={index} />
          ))}
        </div>
      </div>
      <div className="table-bottom">
        <div>
          <p>136 Cuentas Empresas</p>
        </div>
      </div>
    </div>
  );
};

export default Table;

const data = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];
