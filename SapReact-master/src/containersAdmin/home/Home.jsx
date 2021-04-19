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
  ModalEditDate,
} from "./components";
import { CardA, ModalEliminar } from "../../components";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { obtenerEmpresasAction } from "../../redux/actions/actions-admin/empresasAction";
import { obtenerTotalUsuariosAction } from "../../redux/actions/actions-emp/postuladosAction";
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
  //FILTROS
  const [skip, setSkip] = useState(0);
  const [query, setQuery] = useState({ state: "activo" });
  const [value, setValue] = useState(0);
  const [_switch, setSwitch] = useState(false);
  //EDITAR FECHA TERMINO
  const [openModalRep, setOpenModalRep] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [totalEmpresas, setTotalEmpresas] = useState(0);
  const [totalMorosos, setTotalMorosos] = useState(0);
  const [totalAvisos, setTotalAvisos] = useState(0);

  const empresas = useSelector((state) => state.empresas.empresas);
  const loading = useSelector((state) => state.empresas.loading);
  const totalusers = useSelector((state) => state.postulados.totalusers);
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop === scrollHeight) {
      setSkip(empresas.length);
    }
  };

  const handleClose = () => {
    setOpenAlert(false);
  };

  useEffect(() => {
    dispatch(obtenerEmpresasAction({ skip: skip, query }));
    dispatch(obtenerTotalUsuariosAction());
    obtenerTotales();
  }, [skip, _switch]);

  const obtenerTotales = async () => {
    try {
      //MOROSOS
      const morosos = await clientAxios.get("/api/empresas/total/morosos");
      setTotalMorosos(morosos.data.total);
      //TOTAL EMPRESAS
      const _totalEmpresas = await clientAxios.get(
        "/api/empresas/total/empresas"
      );
      setTotalEmpresas(_totalEmpresas.data.total);
      //TOTAL AVISOS
      const totalAvisos = await clientAxios.get("/api/avisos/total/avisos");
      setTotalAvisos(totalAvisos.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (value === 0) {
      setSkip(0);
      setQuery({ state: "activo" });
    } else if (value === 1) {
      setSkip(0);
      setQuery({ state: "caducado" });
    }
    setSwitch(!_switch);
  }, [value]);

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
      <ModalEditDate
        openModalRep={openModalRep}
        setOpenModalRep={setOpenModalRep}
        data={dataEditar}
        setDataEditar={setDataEditar}
      />
      <div className="top">
        <Header setOpen={setOpenAddEmp} />
      </div>
      <div className="center">
        <div className="item" style={{ paddingLeft: 0 }}>
          <CardA white titulo="Total Clientes" value={totalEmpresas} />
        </div>
        <div className="item">
          <CardA white titulo="Usuarios creados" value={totalusers} />
        </div>
        <div className="item">
          <CardA degradado titulo="Clientes morosos" value={totalMorosos} />
        </div>
        <div className="item" style={{ paddingRight: 0 }}>
          <CardA degradado titulo="Total de Anuncios" value={totalAvisos} />
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
          handleScroll={handleScroll}
          loading={loading}
          value={value}
          setValue={setValue}
          setQuery={setQuery}
          _switch={_switch}
          setSkip={setSkip}
          setSwitch={setSwitch}
          query={query}
          setOpenModalRep={setOpenModalRep}
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
