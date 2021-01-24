/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import "./Perfil.css";
import { makeStyles } from "@material-ui/core";
import {
  CardPerfilNew,
  ModalRRSS,
  Modal,
  ModalHab,
  CardJobNew,
  CardCert,
  CardAdnNew,
  CardPost,
} from "./components";
import { CardInitPerfil } from "../../components";
import { obtenerAdnAction } from "../../redux/actions/adnAction";
import { useSelector, useDispatch } from "react-redux";
import { obtenerEstudiosAction } from "../../redux/actions/estudioAction";
import { obtenerTrabajosAction } from "../../redux/actions/trabajoAction";
import { obtenerCertificadosAction } from "../../redux/actions/certificadoAction";

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
  const certificados = useSelector((state) => state.certificado.certificados);
  const estudios = useSelector((state) => state.estudio.estudios);
  const adns = useSelector((state) => state.adn.adns);
  const cargandoadn = useSelector((state) => state.adn.loading);
  const trabajos = useSelector((state) => state.trabajo.trabajos);
  const [screenw, setScreenW] = useState(window.innerWidth);
  const [cardSexo, setCardSexo] = useState("");
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
  const [postulaciones, setPostulaciones] = useState([]);

  useEffect(() => {
    if (usuario) {
      if (usuario.sexo === "Masculino") {
        setCardSexo("typeMasc");
      } else if (usuario.sexo === "Femenino") {
        setCardSexo("typeFeme");
      }
    }
  }, [usuario]);

  useEffect(() => {
    if (estudios.length === 0) {
      if (usuario) {
        const cargarEstudios = () =>
          dispatch(obtenerEstudiosAction(usuario._id));
        cargarEstudios();
      }
    }
    // eslint-disable-next-line
  }, [usuario]);
  useEffect(() => {
    if (certificados.length === 0) {
      if (usuario) {
        const cargarCertificados = () =>
          dispatch(obtenerCertificadosAction(usuario._id));
        cargarCertificados();
      }
    }
    // eslint-disable-next-line
  }, [usuario]);
  useEffect(() => {
    if (adns.length === 0) {
      if (!_switch) {
        if (usuario) {
          dispatch(obtenerAdnAction(usuario._id));
        }
      }
    }
  }, [usuario, _switch]);

  useEffect(() => {
    if (trabajos.length === 0) {
      if (usuario) {
        const cargarTrabajos = () =>
          dispatch(obtenerTrabajosAction(usuario._id));
        cargarTrabajos();
      }
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

  useEffect(() => {
    setTimeout(() => {
      setPostulaciones(datapost);
    }, 1000);
  }, []);
  return (
    <div className="cont-new-perfil">
      <ModalRRSS
        setOpenModalRRSS={setOpenModalRRSS}
        openModalRRSS={openModalRRSS.open}
        type={openModalRRSS.type}
        action={openModalRRSS.action}
        url={openModalRRSS.url}
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
      {/* <h1>perfil</h1> */}
      <div className="left-new-perfil">
        <div className="item-1">
          <CardInitPerfil
            type={cardSexo}
            imgOne
            colorOne
            title="¿Cuál es tu Profesión?"
            desc="Muéstranos tu carrera y/o profesión."
            txtBtn="Comenzar"
            link="/estudios"
          />
        </div>
        <div className="item-1"></div>
        <div className="item-1">
          {postulaciones.length > 0 ? (
            <CardPost data={postulaciones} />
          ) : (
            <CardInitPerfil
              type={cardSexo}
              imgTwo
              colorTwo
              title="Mis Postulaciones Laborales"
              desc="Tus últimas postulaciones laborales."
              txtBtn="Ver ofertas laborales"
              link="/ofertas-laborales"
            />
          )}
        </div>
        <div className="item-1">
          {cargandoadn ? null : adns.length > 0 ? (
            <CardAdnNew data={adns} />
          ) : (
            <CardInitPerfil
              type={cardSexo}
              imgThree
              colorTwo
              title="Comparte tu ADN SAP"
              desc="Ingresa tu ADN y da a conocer tu talento SAP."
              txtBtn="Comenzar"
              link="/sap-adn"
            />
          )}
        </div>
        <div className="item-1">
          {trabajos.length > 0 ? (
            <CardJobNew data={trabajos} />
          ) : (
            <CardInitPerfil
              type={cardSexo}
              imgFour
              colorOne
              title="Experiencia Laboral"
              desc="Cuéntanos en donde haz trabajado y cuánta experiencia tienes."
              txtBtn="Comenzar"
              link="/trabajos"
            />
          )}
        </div>
        <div className="item-1">
          {trabajos.length > 0 ? (
            <CardCert data={certificados} />
          ) : (
            <CardInitPerfil
              type={cardSexo}
              imgFive
              colorOne
              title="Revela Certificación"
              desc="Tus certificaciones tienen un lugar importante acá."
              txtBtn="Comenzar"
              link="/certificaciones"
            />
          )}
        </div>
      </div>
      <div className="right-new-perfil">
        <CardPerfilNew
          openModalRRSS={openModalRRSS}
          setOpenModalRRSS={setOpenModalRRSS}
          setOpenModal={setOpenModal}
          setActive={setActive}
          setActiveStep={setActiveStep}
          habilidades={usuario ? usuario.habilidades : null}
          setOpenModalHab={setOpenModalHab}
        />
      </div>
    </div>
  );
};

export default Perfil;

const datapost = [
  {
    tipoContrato: {
      value: "Otro",
      desc: "denase",
    },
    fechaInicio: "2021-06-20T01:49:00.000Z",
    fechaTermino: "2021-10-17T00:49:00.000Z",
    adns: [
      {
        id: "pCQPyAsMjP",
        modulo: "CO",
        submodulos: [
          {
            submodulo: "PC",
          },
          {
            submodulo: "CEL",
          },
        ],
      },
      {
        id: "Yc9qy7xb6",
        modulo: "QM",
        submodulos: [
          {
            submodulo: "QC",
          },
          {
            submodulo: "PT",
          },
        ],
      },
      {
        id: "X2ycq907A",
        modulo: "HCM",
        submodulos: [
          {
            submodulo: "CM",
          },
        ],
      },
      {
        id: "Pa4-CaM4q",
        modulo: "BASIS",
        submodulos: [
          {
            submodulo: "BASIS",
          },
        ],
      },
      {
        id: "XRHKLvLk6",
        modulo: "PM",
        submodulos: [
          {
            submodulo: "WCM",
          },
        ],
      },
    ],
    fechaContratacion: "2021-05-22T01:49:00.000Z",
    beneficios: [
      {
        id: "fzgoXC8pt",
        beneficio: "tercero",
      },
      {
        id: "IEQP7-6De",
        beneficio: "quintuple beneficio",
      },
      {
        id: "0yXWaHGFl",
        beneficio: "2536",
      },
      {
        id: "TXeUAYzLW",
        beneficio: "Lindo pueblo",
      },
      {
        id: "HDZNLnuhA",
        beneficio: "2363",
      },
      {
        id: "JZkpN1u5z",
        beneficio: "sds",
      },
    ],
    creacion: "2021-01-23T20:35:38.000Z",
    _id: "6009e42416e2ea0b0cad4fe4",
    idusuario: "5ff2847d8b24b60880de835a",
    titulo: "Programador Javascript",
    profesion: "Ingeniero en Informatica",
    area: "Desarrollo Tecnologico",
    anosExp: "5",
    tipoConsultor: "Training",
    jornadaLaboral: "Part-time",
    cantidadVacantes: "3",
    pais: "Chile",
    region: "Ñuble",
    ciudad: "Quillón",
    dispResidencia: true,
    dispViajar: false,
    renta: 1035000,
    descripcion:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    estado: "Activo",
    __v: 0,
  },
];
