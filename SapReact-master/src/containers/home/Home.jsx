import React, { useEffect, useState } from "react";
import "./Home.css";
import { Grid } from "@material-ui/core";
import { HeaderHome, CardPerfil, Table, ModalAviso } from "./components";
import { CardA, CardB } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { CardAdn, CardJob } from "../perfil/components";
import { ModalEditar } from "../adnSap/components";
import { obtenerAdnAction } from "../../redux/actions/adnAction";
import { obtenerTrabajosAction } from "../../redux/actions/trabajoAction";
import { filtrarOferLaboralesAction } from "../../redux/actions/ofertasLaboralesAction";

const Home = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);
  const adns = useSelector((state) => state.adn.adns);
  const trabajos = useSelector((state) => state.trabajo.trabajos);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataOL, setDataOL] = useState(null);
  const [dataEditar, setDataEditar] = useState(null);
  const [cardT1, setCardT1] = useState("");
  const [cardT2, setCardT2] = useState("");
  const [screenw, setScreenW] = useState(window.innerWidth);
  const [_switch, setSwitch] = useState(false);
  const [skip, setSkip] = useState(0);
  // const adns = [];
  // const trabajos = [];
  useEffect(() => {
    if (usuario) {
      if (usuario.sexo === "Masculino") {
        setCardT1("typeA1");
        setCardT2("typeA2");
      } else if (usuario.sexo === "Femenino") {
        setCardT1("typeB1");
        setCardT2("typeB2");
      }
    }
  }, [usuario]);

  let nombreuser;

  if (usuario) {
    nombreuser = usuario.nombres.split(" ")[0];
  }

  window.addEventListener("resize", function (event) {
    if (window.innerWidth > 1280 && window.innerWidth < 1920) {
      setScreenW(window.innerWidth);
      console.log(screenw);
    }
  });
  useEffect(() => {
    if (usuario) {
      dispatch(obtenerAdnAction(usuario._id));
    }
    //eslint-disable-next-line
  }, [usuario]);

  useEffect(() => {
    if (usuario) {
      const cargarTrabajos = () => dispatch(obtenerTrabajosAction(usuario._id));
      cargarTrabajos();
    }
    //eslint-disable-next-line
  }, [usuario]);
  useEffect(() => {
    dispatch(filtrarOferLaboralesAction({ skip }));
  }, [usuario, skip]);
  return (
    <div
      className={
        adns.length > 0 || trabajos.length > 0 ? "cont-home-big" : null
      }
      style={{ width: "100%", maxWidth: "1500px" }}
    >
      <ModalAviso
        data={dataOL}
        setOpenModal={setOpenModal}
        openModal={openModal}
      />
      <ModalEditar
        setOpenModalEditar={setOpenModalEditar}
        openModalEditar={openModalEditar}
        dataEditar={dataEditar}
        setDataEditar={setDataEditar}
        setSwitch={setSwitch}
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
            // imageURL={
            //   usuario ? (usuario.imageURL ? usuario.imageURL : null) : null
            // }
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
              <CardA degradado titulo="N° de postulaciones" />
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
              <CardA degradado titulo="N° de empleos sugeridos" />
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
              <CardA white titulo="N° de ofertas laborales disponibles" />
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
              <CardA image white titulo="Última actualización de tu CV" />
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
            <CardAdn
              data={adns}
              setOpenModalEditar={setOpenModalEditar}
              setDataEditar={setDataEditar}
              setSwitch={setSwitch}
            />
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
            <CardJob data={trabajos} />
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
