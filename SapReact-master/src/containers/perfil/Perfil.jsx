/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import "./Perfil.css";
import { Grid, makeStyles, Fab } from "@material-ui/core";
import {
  Header,
  CardPerfil,
  Habilidades,
  CardB2,
  Modal,
  CardEst,
  CardAdn,
  CardJob,
  ModalHab,
  CardHabilidades,
  ModalProfesion,
  CardProfesion,
  ModalRRSS,
} from "./components";
import { AccountCircle } from "@material-ui/icons";
import { CardB } from "../../components";
import { obtenerAdnAction } from "../../redux/actions/adnAction";
import { useSelector, useDispatch } from "react-redux";
import { obtenerEstudiosAction } from "../../redux/actions/estudioAction";
import { obtenerTrabajosAction } from "../../redux/actions/trabajoAction";
import { ModalEditar } from "../adnSap/components";
import { Tooltip } from "../../components";

const useStyles = makeStyles((theme) => ({
  itemRightsubCont: {
    height: "100%",
  },
}));
const Perfil = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [openModalProfesion, setOpenModalProfesion] = useState(false);
  const [dataEditar, setDataEditar] = useState(null);
  const usuario = useSelector((state) => state.auth.usuario);
  const estudios = useSelector((state) => state.estudio.estudios);
  const adns = useSelector((state) => state.adn.adns);
  const trabajos = useSelector((state) => state.trabajo.trabajos);
  const [screenw, setScreenW] = useState(window.innerWidth);
  const [cardT1, setCardT1] = useState("");
  const [cardT2, setCardT2] = useState("");
  const [cardh, setCardH] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalHab, setOpenModalHab] = useState(false);
  const [dataProfesion, setDataProfesion] = useState(null);
  const [_switch, setSwitch] = useState(false);
  const [active, setActive] = useState("one");
  const [activeStep, setActiveStep] = useState(0);
  const [openModalRRSS, setOpenModalRRSS] = useState({
    open: false,
    type: "Instagram",
  });
  useEffect(() => {
    if (usuario) {
      if (usuario.sexo === "Masculino") {
        setCardT1("typeA1");
        setCardT2("typeA2");
        setCardH("typeA");
      } else if (usuario.sexo === "Femenino") {
        setCardT1("typeB1");
        setCardT2("typeB2");
        setCardH("typeB");
      }
    }
  }, [usuario]);

  useEffect(() => {
    if (usuario) {
      const cargarEstudios = () => dispatch(obtenerEstudiosAction(usuario._id));
      cargarEstudios();
    }

    // eslint-disable-next-line
  }, [usuario]);

  useEffect(() => {
    if (!_switch) {
      if (usuario) {
        dispatch(obtenerAdnAction(usuario._id));
      }
    }
  }, [usuario, _switch]);

  useEffect(() => {
    if (usuario) {
      const cargarTrabajos = () => dispatch(obtenerTrabajosAction(usuario._id));
      cargarTrabajos();
    }
    //eslint-disable-next-line
  }, [usuario]);

  useEffect(() => {
    if (estudios) {
      estudios.map((item) => {
        if (usuario.profesion) {
          if (usuario.profesion._id === item._id) {
            setDataProfesion(item);
          }
        }
      });
    }
  }, [estudios]);

  window.addEventListener("resize", function (event) {
    if (window.innerWidth > 1280 && window.innerWidth < 1920) {
      setScreenW(window.innerWidth);
      console.log(screenw);
    }
  });

  console.log(dataProfesion);
  return (
    <div
      className={
        adns.length > 0 || trabajos.length > 0
          ? "cont-perfil-big"
          : "cont-perfil"
      }
    >
      <ModalProfesion
        setOpenModalProfesion={setOpenModalProfesion}
        openModalProfesion={openModalProfesion}
      />
      <Modal
        setOpenModal={setOpenModal}
        openModal={openModal}
        active={active}
        setActive={setActive}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      <ModalHab setOpenModalHab={setOpenModalHab} openModalHab={openModalHab} />
      <ModalEditar
        setOpenModalEditar={setOpenModalEditar}
        openModalEditar={openModalEditar}
        dataEditar={dataEditar}
        setDataEditar={setDataEditar}
        setSwitch={setSwitch}
      />
      <ModalRRSS
        setOpenModalRRSS={setOpenModalRRSS}
        openModalRRSS={openModalRRSS.open}
        type={openModalRRSS.type}
        action={openModalRRSS.action}
        url={openModalRRSS.url}
      />
      <Grid container className="conteiner-mu-perfil">
        <Grid item xs={12} sm={12} md={12} className="item-header-mu-perfil">
          <Header />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={adns.length > 0 || trabajos.length > 0 ? 12 : 12}
          lg={
            adns.length > 0 || trabajos.length > 0
              ? screenw < 1620
                ? 8
                : 6
              : 8
          }
          xl={adns.length > 0 || trabajos.length > 0 ? 6 : 8}
          className="item-left-mui-perfil"
        >
          <Grid container className="sub-container-mui-perfil">
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              className="sub-item-left-mui-left"
            >
              <CardPerfil
                setOpenModal={setOpenModal}
                setOpenModalRRSS={setOpenModalRRSS}
                openModalRRSS={openModalRRSS}
                setActive={setActive}
                setActiveStep={setActiveStep}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              className="sub-item-right-mui-perfil"
            >
              {estudios.length > 0 ? (
                <div
                  style={{
                    overflow: "auto",
                    maxHeight: "100%",
                    width: "100%",
                    padding: "0px 10px 5px 5px",
                  }}
                >
                  {usuario.profesion ? (
                    dataProfesion ? (
                      <CardProfesion
                        typeA
                        data={dataProfesion}
                        texto={usuario.profesion.name}
                        setOpenModalProfesion={setOpenModalProfesion}
                      />
                    ) : null
                  ) : (
                    <CardB2
                      typeA
                      texto="¿Cual es tu profesión?"
                      onClick={() => setOpenModalProfesion(true)}
                    />
                  )}
                  {estudios.map((item, index) => {
                    if (usuario.profesion) {
                      if (usuario.profesion._id === item._id) {
                        return null;
                      } else {
                        return <CardEst key={index} data={item} />;
                      }
                    } else {
                      return <CardEst key={index} data={item} />;
                    }
                  })}
                </div>
              ) : (
                <>
                  <CardB2 link typeA texto="¿Cual es tu profesión?" />
                  <CardB2 link typeB texto="¿Estudios superiores?" />
                  <CardB2 link typeB texto="¿Tienes cursos?" />
                </>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              className="sub-item-bottom-mui-perfil"
            >
              {usuario ? (
                usuario.habilidades[0] ? (
                  <CardHabilidades
                    habilidades={usuario.habilidades}
                    setOpenModalHab={setOpenModalHab}
                  />
                ) : (
                  <Habilidades type={cardh} setOpenModalHab={setOpenModalHab} />
                )
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        {adns.length > 0 || trabajos.length > 0 ? (
          <>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={screenw < 1620 ? 4 : 3}
              xl={3}
              className={
                adns.length > 0
                  ? "item-right-1-mui-perfil"
                  : "item-right-1-mui-perfil-null"
              }
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
              lg={screenw < 1620 ? 4 : 3}
              xl={3}
              className={
                trabajos.length > 0
                  ? "item-right-1-mui-perfil-2"
                  : "item-right-1-mui-perfil-null-2"
              }
            >
              {trabajos.length > 0 ? (
                <CardJob data={trabajos} />
              ) : (
                <CardB
                  type={cardT2}
                  to="/trabajos"
                  titulo="Comparte tu Experiencia"
                  desc="Y obtendrás aquí anuncios de acuerdo a tu Experiencia laboral"
                />
              )}
            </Grid>
          </>
        ) : (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={4}
            xl={4}
            className="item-right-mui-perfil"
          >
            <Grid container className="item-right-ss-mui-perfil">
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={12}
                xl={12}
                className="item-right-1-mui-perfil-null"
              >
                <CardB
                  type={cardT1}
                  to="/sap-adn"
                  titulo="Comparte tu ADN SAP"
                  desc="Y obtén ofertas laborales de acuerdo a tu ADN"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={12}
                xl={12}
                className="item-right-12-mui-prtfil"
              >
                <CardB
                  type={cardT2}
                  to="/trabajos"
                  titulo="Comparte tu Experiencia"
                  desc="Y obtendrás aquí anuncios de acuerdo a tu experiencia laboral"
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>

    </div>
  );
};

export default Perfil;
