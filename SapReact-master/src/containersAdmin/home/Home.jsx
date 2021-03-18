import React from "react";
import "./Home.css";
import { Header, Table } from "./components";
import { CardA } from "../../components";

const Home = () => {
  return (
    <div className="container-home-admin">
      <div className="top">
        <Header />
      </div>
      <div className="center">
        <div className="item">
          <CardA white titulo="Total Clientes" value={100} />
        </div>
        <div className="item">
          <CardA white titulo="Usuarios creados" value={200} />
        </div>
        <div className="item">
          <CardA degradado titulo="Clientes morosos" value={300} />
        </div>
        <div className="item">
          <CardA degradado titulo="Total de Anuncios" value={400} />
        </div>
      </div>
      <div className="bottom">
        <Table />
      </div>
    </div>
  );
};

export default Home;
