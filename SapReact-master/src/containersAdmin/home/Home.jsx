import React, { useState, useEffect } from "react";
import "./Home.css";
import { Header, Table, Modal } from "./components";
import { CardA } from "../../components";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { obtenerEmpresasAction } from "../../redux/actions/actions-admin/empresasAction";
import { useDispatch, useSelector } from "react-redux";
import clientAxios from "../../config/axios";

const Home = () => {
  const dispatch = useDispatch();
  const [openAddEmp, setOpenAddEmp] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [totalEmpresas, setTotalEmpresas] = useState(0);

  const empresas = useSelector((state) => state.empresas.empresas);

  const handleClose = () => {
    setOpenAlert(false);
  };
  useEffect(() => {
    if (empresas.length === 0) {
      dispatch(obtenerEmpresasAction({ skip: 0, query: {} }));
    }
    obtenerTotalEmpresas();
  }, []);

  const obtenerTotalEmpresas = async () => {
    const respuesta = await clientAxios.get("/api/empresas/total/empresas");
    console.log(respuesta);
    if (respuesta.data.total) {
      setTotalEmpresas(respuesta.data.total);
    }
  };
  return (
    <div className="container-home-admin">
      <Modal
        setOpen={setOpenAddEmp}
        open={openAddEmp}
        setOpenAlert={setOpenAlert}
      />
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
        <Table empresas={empresas} totalEmpresas={totalEmpresas} />
      </div>
      <Snackbar open={openAlert} onClose={handleClose} autoHideDuration={5000}>
        <Alert severity="error">
          Ocurrio un error al guardar. Intentelo de nuevo
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
