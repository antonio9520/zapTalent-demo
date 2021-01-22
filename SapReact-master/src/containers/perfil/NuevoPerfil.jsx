/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import "./Perfil.css";
import { Grid, makeStyles, Fab } from "@material-ui/core";
import { CardPerfilNew } from "./components";
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
    <div className="cont-new-perfil">
      {/* <h1>perfil</h1> */}
      <div className="left-new-perfil">
        <div className="item-1"></div>
        <div className="item-1"></div>
        <div className="item-1"></div>
        <div className="item-1"></div>
        <div className="item-1"></div>
        <div className="item-1"></div>
      </div>
      <div className="right-new-perfil">
        <CardPerfilNew />
      </div>
    </div>
  );
};

export default Perfil;
