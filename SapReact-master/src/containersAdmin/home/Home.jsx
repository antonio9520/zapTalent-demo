import React, { useState, useEffect } from "react";
import "./Home.css";
import {
  Header,
  Table,
  Modal,
  ModalEditar,
  ModalView,
  ModalAddPerfil,
  ModalEditPerfil,
} from "./components";
import { CardA, ModalEliminar } from "../../components";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { obtenerEmpresasAction } from "../../redux/actions/actions-admin/empresasAction";
import { useDispatch, useSelector } from "react-redux";
import clientAxios from "../../config/axios";

const Home = () => {
  const dispatch = useDispatch();

  //ADD
  const [openAddEmp, setOpenAddEmp] = useState(false);
  //EDIT
  const [openEditEmp, setOpenEditEmp] = useState(false);
  const [dataEditar, setDataEditar] = useState(null);
  //VIEW
  const [openViewEmp, setOpenViewEmp] = useState(false);
  const [dataView, setDataView] = useState(null);
  //ADD PERFIL
  const [openAddPerfil, setOpenAddPerfil] = useState(false);
  const [dataAddPerfil, setDataAddPerfil] = useState(null);
  //EDIT PERFIL
  const [openEditPerfil, setOpenEditPerfil] = useState(false);
  const [dataEditPerfil, setDataEditPerfil] = useState(null);
  const [refreshPerfiles, setRefreshPerfiles] = useState(false);
  //ELIMINAR EMPRESA
  const [idEliminar, setIdEliminar] = useState("");
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  //ELIMINAR PERFIL
  const [openModalEliminarPerfil, setOpenModalEliminarPerfil] = useState(false);

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
  const refreshPerfil = () => {
    setRefreshPerfiles(!refreshPerfiles);
  };
  return (
    <div className="container-home-admin">
      <Modal
        setOpen={setOpenAddEmp}
        open={openAddEmp}
        setOpenAlert={setOpenAlert}
      />
      <ModalEditar
        setOpen={setOpenEditEmp}
        open={openEditEmp}
        setDataEditar={setDataEditar}
        dataEditar={dataEditar}
      />
      <ModalEliminar
        empresa
        openModalEliminar={openModalEliminar}
        setOpenModalEliminar={setOpenModalEliminar}
        idEliminar={idEliminar}
        setIdEliminar={setIdEliminar}
      />
      <ModalEliminar
        perfil
        openModalEliminar={openModalEliminarPerfil}
        setOpenModalEliminar={setOpenModalEliminarPerfil}
        idEliminar={idEliminar}
        setIdEliminar={setIdEliminar}
        refreshPerfil={refreshPerfil}
      />
      <ModalView
        open={openViewEmp}
        setOpen={setOpenViewEmp}
        data={dataView}
        setDataView={setDataView}
        setDataEditPerfil={setDataEditPerfil}
        setOpenEditPerfil={setOpenEditPerfil}
        refreshPerfiles={refreshPerfiles}
        setIdEliminar={setIdEliminar}
        setOpenModalEliminar={setOpenModalEliminar}
        setOpenModalEliminarPerfil={setOpenModalEliminarPerfil}
      />
      <ModalAddPerfil
        open={openAddPerfil}
        setOpen={setOpenAddPerfil}
        idemp={dataAddPerfil}
      />
      <ModalEditPerfil
        open={openEditPerfil}
        setOpen={setOpenEditPerfil}
        data={dataEditPerfil}
        refreshPerfiles={refreshPerfiles}
        setRefreshPerfiles={setRefreshPerfiles}
      />
      <div className="top">
        <Header setOpen={setOpenAddEmp} />
      </div>
      <div className="center">
        <div className="item">
          <CardA white titulo="Total Clientes" value={totalEmpresas} />
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
        <Table
          empresas={empresas}
          totalEmpresas={totalEmpresas}
          setOpenEditEmp={setOpenEditEmp}
          setDataEditar={setDataEditar}
          setOpenViewEmp={setOpenViewEmp}
          setDataView={setDataView}
          setOpenAddPerfil={setOpenAddPerfil}
          setDataAddPerfil={setDataAddPerfil}
          setIdEliminar={setIdEliminar}
          setOpenModalEliminar={setOpenModalEliminar}
        />
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
