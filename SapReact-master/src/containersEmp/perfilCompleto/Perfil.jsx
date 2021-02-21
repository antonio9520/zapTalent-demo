/* eslint-disable no-lone-blocks */
import React, { useRef, useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import "./Perfil.css";
import { Tooltip } from "../../components";
import {
  CardPerfilNew,
  CardJobNew,
  CardCert,
  CardAdnNew,
  CardPost,
  CardProNew,
  CardEst,
  Drawer,
} from "../../containers/perfil/components";
import logo from "../../resources/images/SPAimages/icon-card-cv-saptalent.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  obtenerUserInfoAction,
  obtenerEstudiosUserInfoAction,
  obtenertrabajosUserInfoAction,
  obtenerCertificadosUserInfoAction,
  obtenerAdnUserInfoAction,
} from "../../redux/actions/actions-emp/infoUserAction";
import { obtenerPostulacionesEmpresaAction } from "../../redux/actions/actions-emp/postuladosAction";
import Loader from "react-loader-spinner";

const Perfil = (props) => {
  const {
    match: { params },
  } = props;
  const { id } = params;
  console.log(id);
  const componentRef = useRef();

  const dispatch = useDispatch();

  const [openModalRRSS, setOpenModalRRSS] = useState({
    open: false,
    type: "Instagram",
  });
  /** */
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cardSexo, setCardSexo] = useState("");
  const [dataProfesion, setDataProfesion] = useState(null);
  const [_switch, setSwitch] = useState(false);
  const [active, setActive] = useState("one");
  const [activeStep, setActiveStep] = useState(0);

  /*DATOS REDUX**/
  const usuarioemp = useSelector((state) => state.authEmp.usuario);
  const postulaciones = useSelector((state) => state.userInfo.postulaciones);
  const loadingPost = useSelector((state) => state.userInfo.loadingPost);
  const usuario = useSelector((state) => state.userInfo.usuario);
  const loading = useSelector((state) => state.userInfo.loading);
  const estudios = useSelector((state) => state.userInfo.estudios);
  const loadingEst = useSelector((state) => state.userInfo.loadingEst);
  const trabajos = useSelector((state) => state.userInfo.trabajos);
  const loadingTrab = useSelector((state) => state.userInfo.loadingTrab);
  const certificados = useSelector((state) => state.userInfo.certificados);
  const loadingCert = useSelector((state) => state.userInfo.loadingCert);
  const adns = useSelector((state) => state.userInfo.adns);
  const loadingAdn = useSelector((state) => state.userInfo.loadingAdn);
  // const estudios = [];
  console.log(usuario);
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
    if (!usuario._id) {
      dispatch(obtenerUserInfoAction(id));
    }
  }, []);

  useEffect(() => {
    if (estudios.length === 0) {
      if (usuario) {
        const cargarEstudios = () =>
          dispatch(obtenerEstudiosUserInfoAction(usuario._id));
        cargarEstudios();
      }
    }
    // eslint-disable-next-line
  }, [usuario]);
  useEffect(() => {
    if (certificados.length === 0) {
      if (usuario) {
        const cargarCertificados = () =>
          dispatch(obtenerCertificadosUserInfoAction(usuario._id));
        cargarCertificados();
      }
    }
    // eslint-disable-next-line
  }, [usuario]);

  useEffect(() => {
    if (adns.length === 0) {
      if (!_switch) {
        if (usuario) {
          dispatch(obtenerAdnUserInfoAction(usuario._id));
        }
      }
    }
  }, [usuario, _switch]);

  useEffect(() => {
    if (trabajos.length === 0) {
      if (usuario) {
        const cargarTrabajos = () =>
          dispatch(obtenertrabajosUserInfoAction(usuario._id));
        cargarTrabajos();
      }
    }

    //eslint-disable-next-line
  }, [usuario]);
  useEffect(() => {
    if (usuario && usuarioemp) {
      if (postulaciones.length === 0) {
        if (usuario) {
          const cargarPostulaciones = () =>
            dispatch(
              obtenerPostulacionesEmpresaAction({
                iduser: usuario._id,
                idemp: usuarioemp._id,
              })
            );
          cargarPostulaciones();
        }
      }
    }
    //eslint-disable-next-line
  }, [usuario]);

  //   useEffect(() => {
  //     if (postulaciones.length === 0) {
  //       if (usuario) {
  //         dispatch(obtenerPostulacionesAction(usuario._id));
  //       }
  //     }
  //   }, [usuario]);

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
  }, [usuario, estudios]);

  return (
    <div className="cont-new-perfil">
      <Tooltip title="Ver información de perfil">
        <IconButton
          className="btn-open-drawer-perfil"
          onClick={() => setOpenDrawer(true)}
        >
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Drawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        openModalRRSS={openModalRRSS}
        setOpenModalRRSS={setOpenModalRRSS}
        setActive={setActive}
        setActiveStep={setActiveStep}
        habilidades={usuario ? usuario.habilidades : null}
      />

      <div className="left-new-perfil" ref={componentRef}>
        <div className="titulo-page">
          <img src={logo} alt="SAP"></img>
          <h1>Perfil</h1>
        </div>
        <div className="item-1">
          {usuario ? (
            dataProfesion ? (
              <CardProNew
                data={dataProfesion}
                name={usuario.profesion.name}
                link="/estudios"
                empresas
              />
            ) : loading ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Loader
                  type="Oval"
                  color="#00BFFF"
                  height={50}
                  width={50}
                  visible={loading}
                  //  timeout={3000} //3 secs
                />
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0 40px",
                  textAlign: "center",
                }}
                className="perfil-1-emp"
              >
                <p style={{ color: "white" }}>No hay información de usuario.</p>
              </div>
            )
          ) : null}
        </div>
        <div
          className="item-1"
          style={{
            backgroundColor: "inherit",
            boxShadow: "inherit",
            overflow: "visible",
          }}
        >
          <div
            style={{
              overflow: estudios.length > 0 ? "auto" : "visible",
              maxHeight: "100%",
              width: "100%",
              padding: estudios.length > 0 ? "10px 10px 10px 10px" : "0",
            }}
          >
            {estudios.length > 0
              ? estudios.map((item, index) => {
                  return <CardEst key={index} data={item} empresas />;
                })
              : loading
              ? null
              : null}
          </div>
        </div>
        <div className="item-1">
          {postulaciones.length > 0 ? (
            <CardPost data={postulaciones} empresas />
          ) : loadingPost ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Loader
                type="Oval"
                color="#00BFFF"
                height={50}
                width={50}
                visible={loadingPost}
                //  timeout={3000} //3 secs
              />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 40px",
                textAlign: "center",
              }}
              className="perfil-5-emp"
            >
              <p style={{ color: "white" }}>
                No hay información de postulaciones.
              </p>
            </div>
          )}
        </div>
        <div className="item-1">
          {adns.length > 0 ? (
            <CardAdnNew empresas data={adns} />
          ) : loadingAdn ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Loader
                type="Oval"
                color="#00BFFF"
                height={50}
                width={50}
                visible={loadingAdn}
                //  timeout={3000} //3 secs
              />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 40px",
                textAlign: "center",
              }}
              className="perfil-2-emp"
            >
              <p style={{ color: "white" }}>No hay información de AdnSap.</p>
            </div>
          )}
        </div>
        <div className="item-1">
          {trabajos.length > 0 ? (
            <CardJobNew empresas data={trabajos} />
          ) : loadingTrab ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Loader
                type="Oval"
                color="#00BFFF"
                height={50}
                width={50}
                visible={loadingTrab}
                //  timeout={3000} //3 secs
              />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 40px",
                textAlign: "center",
              }}
              className="perfil-3-emp"
            >
              <p style={{ color: "white" }}>
                No hay información de experiencia laboral.
              </p>
            </div>
          )}
        </div>
        <div className="item-1">
          {certificados.length > 0 ? (
            <CardCert empresas data={certificados} />
          ) : loadingCert ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Loader
                type="Oval"
                color="#00BFFF"
                height={50}
                width={50}
                visible={loadingCert}
                //  timeout={3000} //3 secs
              />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 40px",
                textAlign: "center",
              }}
              className="perfil-4-emp"
            >
              <p style={{ color: "white" }}>
                No hay información de certificados.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="right-new-perfil">
        <CardPerfilNew
          empresas
          openModalRRSS={openModalRRSS}
          setOpenModalRRSS={setOpenModalRRSS}
          setActive={setActive}
          setActiveStep={setActiveStep}
          habilidades={usuario ? usuario.habilidades : null}
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
