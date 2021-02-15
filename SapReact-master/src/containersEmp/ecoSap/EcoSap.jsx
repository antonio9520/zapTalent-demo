import React, { useState, useEffect } from "react";
import "./EcoSap.css";
import { Card, Filtro, Header } from "./components";
import clientAxios from "../../config/axios";
const EcoSap = () => {
  const [value, setValue] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [skip, setSkip] = useState(0);
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
  const cargarUsuarios = async () => {
    try {
      const respuesta = await clientAxios.get(`/api/ecoSap/${skip}`);
      setUsuarios(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    cargarUsuarios();
  }, []);
  return (
    <div className="eco-sap-empresas">
      <div className="top-eco-sap-emp">
        <div className="header-eco-sap-emp">
          <Header value={value} setValue={setValue} />
        </div>
        <div className="space-top-eco-sap-emp"></div>
      </div>
      <div className="bottom-eco-sap-emp">
        <div className="content-eco-sap">
          {usuarios.map((item, index) => (
            <Card key={index} data={item}/>
          ))}
        </div>
        <div className="filtros-eco-sap-emp">
          <Filtro value={value} />
        </div>
      </div>
    </div>
  );
};

export default EcoSap;
