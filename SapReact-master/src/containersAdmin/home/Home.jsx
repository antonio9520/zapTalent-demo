import React, { useState } from "react";
import "./Home.css";
import { Header, Table, Modal } from "./components";
import { CardA } from "../../components";

const Home = () => {
  const [openAddEmp, setOpenAddEmp] = useState(true);
  return (
    <div className="container-home-admin">
      <Modal setOpen={setOpenAddEmp} open={openAddEmp} />
      <div className="top">
        <Header setOpen={setOpenAddEmp} />
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
