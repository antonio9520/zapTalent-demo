import React, { useEffect, useState } from "react";
import "./Home.css";
import { Grid } from "@material-ui/core";
import { HeaderHome, CardPerfil } from "../../containers/home/components";
import { CardA } from "../../components";
import { CardAvisos, Table, Modal } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { obtenerAvisoAction } from "../../redux/actions/actions-emp/avisosAction";
import { obtenerPostuladosAction } from "../../redux/actions/actions-emp/postuladosAction";

const Home = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.authEmp.usuario);
  const avisos = useSelector((state) => state.aviso.avisos);
  const postulados = useSelector((state) => state.postulados.postulados);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (usuario) {
      const cargarAvisos = () =>
        dispatch(obtenerAvisoAction({ _id: usuario._id, skip: 0 }));
      cargarAvisos();
      const cargarPostulados = () =>
        dispatch(obtenerPostuladosAction({ _id: usuario._id, skip: 0 }));
      cargarPostulados();
    }

    // eslint-disable-next-line
  }, [usuario]);
  // const adns = [];
  // const trabajos = [];
  return (
    <Grid container className="sub-conteiner-home-emp">
      <Modal openModal={openModal} setOpenModal={setOpenModal}/>
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
            <CardA white titulo="Mis avisos" />
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
            <CardA degradado titulo="N° de postulantes" />
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
            <CardA degradado titulo="Postulaciones no leidas" />
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
        <Table postulados={postulados} setOpenModal={setOpenModal}/>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        className={`cont-card-left-home-emp `}
      >
        <CardAvisos data={avisos} />
      </Grid>
    </Grid>
  );
};

export default Home;
