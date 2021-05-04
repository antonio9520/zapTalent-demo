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
  obtenerTotalUsuariosDiaAction,
} from "../../redux/actions/actions-emp/postuladosAction";
import { DialogCVPDF } from "../../componentsEmp";

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
  const totalUsuariosDias = useSelector(
    (state) => state.postulados.totalUsuariosDias
  );
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [dataFiltro, setDataFiltro] = useState([]);
  const [query, setQuery] = useState({ leido: false });

  useEffect(() => {
    if (usuario) {
      if (avisos.length === 0) {
        dispatch(
          obtenerAvisoAction({ skip: 0, query: { _id: usuario.idemp } })
        );
      }

      dispatch(obtenerPostuladosAction({ _id: usuario.idemp, skip: 0, query }));

      dispatch(obtenerTotalUsuariosAction());

      dispatch(obtenerTotalAvisosAction(usuario.idemp));

      dispatch(obtenerTotalPostulantesAction(usuario.idemp));

      dispatch(obtenerTotalPostNoLeidosAction(usuario.idemp));

      dispatch(obtenerTotalUsuariosDiaAction());
    }

    // eslint-disable-next-line
  }, [usuario]);

  useEffect(() => {
    if (usuario) {
      dispatch(obtenerPostuladosAction({ _id: usuario.idemp, skip: 0, query }));
    }

    // eslint-disable-next-line
  }, [query]);
  // const adns = [];
  // const trabajos = [];
  useEffect(() => {
    for (let i = 0; i < avisos.length; i++) {
      // setDataFiltro([
      //   ...dataFiltro,
      //   { _id: avisos[i]._id, titulo: avisos[i].titulo },
      // ]);
      dataFiltro.push({ _id: avisos[i]._id, titulo: avisos[i].titulo });
    }
  }, [avisos]);

  return (
    <>
      {new Date(usuario?.fechaTerminoEmp) < new Date() ? (
        <div className="contenedor-cuenta-caducada">
          <p>Su plan ha caducado</p>
          <p>Contáctese con ZAPTalent para restablecer el servicio</p>
        </div>
      ) : new Date(usuario?.fechaTermino) < new Date() ? (
        <div className="contenedor-cuenta-caducada">
          <p>Su cuenta de usuario ha caducado</p>
          <p>Contáctese con su administrador ZAPTalent para restablecer su perfil</p>
        </div>
      ) : (
        <Grid container className="sub-conteiner-home-emp">
          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            data={dataUser}
            setIdUser={setIdUser}
            setOpen={setOpen}
          />
          <DialogCVPDF
            open={open}
            setOpen={setOpen}
            setIdUser={setIdUser}
            idUser={idUser}
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
              empresas
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
                <CardA
                  image
                  white
                  titulo="Nuevos usuarios hoy"
                  value={totalUsuariosDias}
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
      )}
    </>
  );
};

export default Home;
