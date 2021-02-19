import React, { useEffect, useState } from "react";
import "./Home.css";
import { Grid } from "@material-ui/core";
import { HeaderHome, CardPerfil } from "../../containers/home/components";
import { CardA } from "../../components";
import { CardAvisos, Table, Modal, CardAvisosEmpty } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { obtenerAvisoAction } from "../../redux/actions/actions-emp/avisosAction";
import {
  obtenerPostuladosAction,
  obtenerTotalUsuariosAction,
  obtenerTotalAvisosAction,
  obtenerTotalPostNoLeidosAction,
  obtenerTotalPostulantesAction,
} from "../../redux/actions/actions-emp/postuladosAction";

const Home = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.authEmp.usuario);
  const avisos = useSelector((state) => state.aviso.avisos);
  const postulados = useSelector((state) => state.postulados.postulados);
  const totalpostulantes = useSelector(
    (state) => state.postulados.totalpostulantes
  );
  const totalavisos = useSelector((state) => state.postulados.totalavisos);
  const postulantesnoleidos = useSelector(
    (state) => state.postulados.postulantesnoleidos
  );
  const [openModal, setOpenModal] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [dataFiltro, setDataFiltro] = useState([]);
  const [query, setQuery] = useState({ leido: false });
  // console.table(avisos);
  useEffect(() => {
    if (usuario) {
      if (avisos.length === 0) {
        const cargarAvisos = () =>
          dispatch(obtenerAvisoAction({ _id: usuario._id, skip: 0 }));
        cargarAvisos();
      }

      const cargarPostulados = () =>
        dispatch(obtenerPostuladosAction({ _id: usuario._id, skip: 0, query }));
      cargarPostulados();

      const cargarTotalUsers = () => dispatch(obtenerTotalUsuariosAction());
      cargarTotalUsers();

      const cargarTotalAvisos = () =>
        dispatch(obtenerTotalAvisosAction(usuario._id));
      cargarTotalAvisos();

      const cargarTotalPostulantes = () =>
        dispatch(obtenerTotalPostulantesAction(usuario._id));
      cargarTotalPostulantes();

      const cargarTotalNoLeidos = () => 
        dispatch(obtenerTotalPostNoLeidosAction(usuario._id));
      cargarTotalNoLeidos();
      console.log("funcion");
    }

    // eslint-disable-next-line
  }, [usuario]);
  useEffect(() => {
    if (usuario) {
      const cargarPostulados = () =>
        dispatch(obtenerPostuladosAction({ _id: usuario._id, skip: 0, query }));
      cargarPostulados();
    }

    // eslint-disable-next-line
  }, [query]);
  // const adns = [];
  // const trabajos = [];
  useEffect(() => {
    for (let i = 0; i < avisos.length; i++) {
      console.log(avisos[i].titulo);
      setDataFiltro([
        ...dataFiltro,
        { _id: avisos[i]._id, titulo: avisos[i].titulo },
      ]);
      // dataFiltro.push({ _id: avisos[i]._id, titulo: avisos[i].titulo });
    }
  }, [avisos]);

  return (
    <Grid container className="sub-conteiner-home-emp">
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={dataUser}
      />
      <Grid
        item
        className="cont-header-home-emp"
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <HeaderHome />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className="cont-card-perfil-home-emp"
      >
        <CardPerfil
          // nombre={nombreuser}
          imageURL={
            usuario ? (usuario.logoURL ? usuario.logoURL : null) : null
          }
          titulo="Comienza a reclutar a los mejores talentos SAP de Chile."
          subtitle="Crea tu primer aviso aquí."
          textBtn="Publicar Aviso"
          to="/empresas/avisos"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className="cont-cards-home-emp"
      >
        <Grid container className="sub-cont-cards-home">
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            className="items-cards-home"
          >
            <CardA image white titulo="Nuevos usuarios hoy" />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            className="items-cards-home"
          >
            <CardA white titulo="Mis avisos" value={totalavisos} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            className="items-cards-home"
          >
            <CardA
              degradado
              titulo="N° de postulantes"
              value={totalpostulantes}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            className="items-cards-home"
          >
            <CardA
              degradado
              titulo="Postulaciones no leidas"
              value={postulantesnoleidos}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        className="cont-table-home-emp"
      > 
        <Table
          postulados={postulados}
          dataFiltro={dataFiltro}
          setQuery={setQuery}
          query={query}
          setDataUser={setDataUser}
          setOpenModal={setOpenModal}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        className={`cont-card-left-home-emp `}
      >
        {avisos.length === 0 ? (
          <CardAvisosEmpty />
        ) : (
          <CardAvisos data={avisos} />
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
