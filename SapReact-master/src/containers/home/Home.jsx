import React, { useEffect, useState } from "react";
import "./Home.css";
import { Grid } from "@material-ui/core";
import { HeaderHome, CardPerfil, Table, ModalAviso } from "./components";
import { CardA, CardB } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { ModalEditar } from "../adnSap/components";
import { CardAdnNew, CardJobNew } from "../perfil/components";
import { obtenerAdnAction } from "../../redux/actions/adnAction";
import { obtenerCertificadosAction } from "../../redux/actions/certificadoAction";
import { obtenerTrabajosAction } from "../../redux/actions/trabajoAction";
import { ModalEditar as ModalEditarTrabajo } from "../../containers/trabajos/components";
import { obtenerEstudiosAction } from "../../redux/actions/estudioAction";
import clientAxios from "../../config/axios";
import { porcentajePerfil } from "../../assets/porcentajePerfil";

const Home = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);
  const adns = useSelector((state) => state.adn.adns);
  const trabajos = useSelector((state) => state.trabajo.trabajos);
  const certificados = useSelector((state) => state.certificado.certificados);
  const estudios = useSelector((state) => state.estudio.estudios);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [openEditarTrabajo, setOpenEditarTrabajo] = useState(false);
  const [dataTrabajos, setDataTrabajos] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [ofertasCount, setOfertasCount] = useState(0);
  const [ultimaActCV, setUltimaActCV] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [dataOL, setDataOL] = useState(null);
  const [dataEditar, setDataEditar] = useState(null);
  const [cardT1, setCardT1] = useState("");
  const [cardT2, setCardT2] = useState("");
  const [_switch, setSwitch] = useState(false);
  const [_switch2, setSwitch2] = useState(false);
  const [empSugeridos, setEmpSugeridos] = useState([]);
  const [skip, setSkip] = useState(0);
  const [totalEmpSugeridos, setTotalEmpSugeridos] = useState(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});
  const [loading, setLoading] = useState(true);
  const [porcentaje, setPorcentaje] = useState(0);

  // const adns = [];
  // const trabajos = [];

  let nombreuser;

  if (usuario) {
    nombreuser = usuario.nombres.split(" ")[0];
  }
  const cargarData = async () => {
    if (estudios.length === 0) {
      await dispatch(obtenerEstudiosAction(usuario._id));
    }
    if (certificados.length === 0) {
      await dispatch(obtenerCertificadosAction(usuario._id));
    }
    if (adns.length === 0) {
      await dispatch(obtenerAdnAction(usuario._id));
    }
    if (trabajos.length === 0) {
      await dispatch(obtenerTrabajosAction(usuario._id));
    }
  };
  useEffect(() => {
    if (usuario) {
      cargarData();
    }
    //eslint-disable-next-line
  }, [usuario]);

  const cargarCounters = async () => {
    try {
      const resultPostCount = await clientAxios.get(
        `/api/homeCounter/totalPostulaciones/${usuario._id}`
      );
      setPostCount(resultPostCount.data);

      const resultOfertasCount = await clientAxios.get(
        `/api/homeCounter/totalAvisos`
      );
      setOfertasCount(resultOfertasCount.data);

      if (usuario.dateActCV) {
        const fechaInicio = new Date(usuario.dateActCV).getTime();
        const fechaFin = new Date().getTime();

        const diff = fechaFin - fechaInicio;
        setUltimaActCV(Math.round(diff / (1000 * 60 * 60 * 24)));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (usuario) {
      cargarPorcentaje();
    }
  }, [trabajos, certificados, estudios]);
  
  useEffect(() => {
    if (usuario) {
      if (usuario.sexo === "Masculino") {
        setCardT1("typeA1");
        setCardT2("typeA2");
      } else if (usuario.sexo === "Femenino") {
        setCardT1("typeB1");
        setCardT2("typeB2");
      }
      cargarCounters();
    }
  }, [usuario]);

  const cargarPorcentaje = () => {
    let confirmaremail = usuario.activo === 0 ? true : false;
    let cv = usuario.cvURL ? true : false;
    let modulos = usuario.modulos.length > 0 ? true : false;
    let trab = trabajos.length > 0 ? true : false;
    let cert = certificados.length > 0 ? true : false;
    let est = estudios.length > 0 ? true : false;

    const result = porcentajePerfil(
      confirmaremail,
      cv,
      modulos,
      trab,
      cert,
      est
    );

    setPorcentaje(result);
  };
  const evitarBug = () => {
    if (usuario) {
      dispatch(obtenerAdnAction(usuario._id));
    }
  };
  const empleosSugeridos = async () => {
    setLoading(true);
    query.skip = skip;
    if (usuario.modulos) query.modulos = usuario.modulos;
    if (usuario.industria) query.industria = usuario.industria;
    query.consultor = usuario.consultor;
    try {
      const result = await clientAxios.put(
        `/api/ofertasLaborales/empleosSugeridos`,
        query
      );
      setEmpSugeridos(result.data);
      const resultCount = await clientAxios.put(
        `/api/ofertasLaborales/total/empleosSugeridos`,
        query
      );
      setTotalEmpSugeridos(resultCount.data);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    if (usuario) {
      empleosSugeridos();
    }
  }, [usuario, skip, _switch2]);
  return (
    <div style={{ width: "100%", maxWidth: "1500px" }}>
      <ModalAviso
        data={dataOL}
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
      <ModalEditarTrabajo
        setOpenModalEditar={setOpenEditarTrabajo}
        openModalEditar={openEditarTrabajo}
        setDataEditar={setDataTrabajos}
        data={dataTrabajos}
      />
      <ModalEditar
        setOpenModalEditar={setOpenModalEditar}
        openModalEditar={openModalEditar}
        dataEditar={dataEditar}
        setDataEditar={setDataEditar}
        setSwitch={setSwitch}
        evitarBug={evitarBug}
      />
      <Grid container className="conteiner-home">
        <Grid
          item
          className="cont-header-home"
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
          className="cont-card-perfil-home"
        >
          <CardPerfil
            imageURL={
              usuario ? (usuario.imageURL ? usuario.imageURL : null) : null
            }
            porcentaje={porcentaje}
            nombre={nombreuser}
            titulo="Ya tienes tu perfil en ZAPTalent."
            subtitle="Sabías qué si completas tu perfil, tienes muchas más posibilidades
            de obtener ese empleo que tanto te mereces. Sólo te falta un poco..."
            textBtn="Completar"
            to="/perfil"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className="cont-cards-home"
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
              <CardA degradado titulo="N° de postulaciones" value={postCount} />
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
                titulo="N° de empleos sugeridos"
                value={totalEmpSugeridos}
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
                white
                titulo="N° de ofertas laborales disponibles"
                value={ofertasCount}
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
                image
                white
                titulo="Dias desde la ultima act. de tu CV"
                value={ultimaActCV}
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
          className="cont-table-home-jobs"
        >
          <Table
            setSkip={setSkip}
            setOpenModal={setOpenModal}
            setDataOL={setDataOL}
            data={empSugeridos}
            search={search}
            setSearch={setSearch}
            setSwitch2={setSwitch2}
            _switch2={_switch2}
            query={query}
            setQuery={setQuery}
            loading={loading}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={3}
          xl={3}
          className={`cont-card-left-home ${
            adns.length > 0 ? "adns-home-xs" : null
          }`}
        >
          {adns.length > 0 ? (
            <div className="cont-card-adn-new-home">
              <CardAdnNew
                data={adns}
                setOpenModalEditar={setOpenModalEditar}
                setDataEditar={setDataEditar}
              />
            </div>
          ) : (
            <CardB
              type={cardT1}
              to="/sap-adn"
              titulo="Comparte tu ADN SAP"
              desc="Y obtén ofertas laborales de acuerdo a tu ADN"
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={3}
          xl={3}
          className={`cont-card-right-home ${
            trabajos.length > 0 ? "trabajos-home-xs" : null
          }`}
        >
          {trabajos.length > 0 ? (
            <div className="cont-card-job-new-home">
              <CardJobNew
                data={trabajos}
                setOpenModalEditar={setOpenEditarTrabajo}
                setDataEditar={setDataTrabajos}
              />
            </div>
          ) : (
            <CardB
              type={cardT2}
              to="/trabajos"
              titulo="Comparte tu Experiencia"
              desc="Y obtendrás aquí anuncios de acuerdo a tu experiencia laboral"
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
