import React, { useState } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import { StepOne, StepTwo, StepThree, StepFour } from "../stepsNew";
import shortid from "shortid";
import { useDispatch, useSelector } from "react-redux";
import { agregarAvisoAction } from "../../../../redux/actions/actions-emp/avisosAction";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const CustomModal = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { setOpenModal, openModal } = props;
  const usuario = useSelector((state) => state.authEmp.usuario);
  const cargando = useSelector((state) => state.aviso.cargando);
  const [step, setStep] = useState("one");
  //step one
  const [titulo, setTitulo] = useState("");
  const [profesion, setProfesion] = useState("");
  const [area, setArea] = useState("");
  const [anosExp, setAnosExp] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaTermino, setFechaTermino] = useState(null);
  const [tipoConsultor, setTipoConsultor] = useState("Junior");
  //step two
  const [anosExpSap, setAnosExpZap] = useState(null);
  const [adns, setAdns] = useState([
    { id: shortid.generate(), modulo: "", submodulos: [] },
  ]);
  //step three
  const [jornadaLaboral, setJornadaLaboral] = useState("");
  const [tipoContrato, setTipoContrato] = useState({ value: "", desc: "" });
  const [cantidadVacantes, setCantidadVacantes] = useState(null);
  const [fechaContratacion, setFechaContratacion] = useState(null);
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [region, setRegion] = useState("");
  const [dispViajar, setDispViajar] = useState(true);
  const [dispResidencia, setDispResidencia] = useState(false);
  //step four
  const [renta, setRenta] = useState(null);
  const [beneficios, setBeneficios] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Activo");

  const dataSubmodulos = () => {
    let submodulos = [];
    let modulos = [];
    adns.map((item) => {
      modulos.push(item.modulo);
      console.log(item);
      item.submodulos.map((item) => {
        submodulos.push(item.submodulo);
      });
    });
    return { modulos, submodulos };
  };

  //guardar aviso
  const guardarAviso = async () => {
    let submod = await dataSubmodulos();
    dispatch(
      agregarAvisoAction({
        idusuario: usuario._id,
        nameuser: usuario.nameuser,
        titulo,
        profesion,
        area,
        anosExp,
        fechaInicio,
        fechaTermino,
        tipoConsultor,
        anosExpSap,
        adns: adns,
        jornadaLaboral,
        tipoContrato,
        cantidadVacantes,
        fechaContratacion,
        pais,
        region,
        ciudad,
        dispResidencia,
        dispViajar,
        renta,
        beneficios,
        descripcion,
        estado,
        submodulos: submod.submodulos,
        modulos: submod.modulos,
      })
    ).then((res) => (res === true ? closeModal() : null));
  };
  // console.log(usuario);
  const closeModal = () => {
    setOpenModal(false);
    setTitulo("");
    setProfesion("");
    setArea("");
    setAnosExp(null);
    setFechaInicio(null);
    setFechaTermino(null);
    setTipoConsultor("Junior");
    //step two
    setAnosExpZap(null);
    setAdns([{ id: shortid.generate(), modulo: "", submodulos: [] }]);
    //step three
    setJornadaLaboral("");
    setTipoContrato({ value: "", desc: "" });
    setCantidadVacantes(null);
    setFechaContratacion(null);
    setPais("");
    setCiudad("");
    setRegion("");
    setDispViajar(true);
    setDispResidencia(false);
    //step four
    setRenta(null);
    setBeneficios([]);
    setDescripcion("");
    setEstado("Activo");
    setTimeout(() => {
      setStep("one");
    }, 300);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      // open={true}
      onClose={() => closeModal()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <>
          {step === "one" ? (
            <StepOne
              setStep={setStep}
              closeModal={closeModal}
              titulo={titulo}
              setTitulo={setTitulo}
              profesion={profesion}
              setProfesion={setProfesion}
              area={area}
              setArea={setArea}
              fechaInicio={fechaInicio}
              setFechaInicio={setFechaInicio}
              fechaTermino={fechaTermino}
              setFechaTermino={setFechaTermino}
              tipoConsultor={tipoConsultor}
              setTipoConsultor={setTipoConsultor}
              anosExp={anosExp}
              setAnosExp={setAnosExp}
            />
          ) : step === "two" ? (
            <StepTwo
              setStep={setStep}
              closeModal={closeModal}
              adns={adns}
              setAdns={setAdns}
              anosExpSap={anosExpSap}
              setAnosExpZap={setAnosExpZap}
            />
          ) : step === "three" ? (
            <StepThree
              setStep={setStep}
              closeModal={closeModal}
              jornadaLaboral={jornadaLaboral}
              setJornadaLaboral={setJornadaLaboral}
              tipoContrato={tipoContrato}
              setTipoContrato={setTipoContrato}
              cantidadVacantes={cantidadVacantes}
              setCantidadVacantes={setCantidadVacantes}
              fechaContratacion={fechaContratacion}
              setFechaContratacion={setFechaContratacion}
              pais={pais}
              setPais={setPais}
              ciudad={ciudad}
              setCiudad={setCiudad}
              region={region}
              setRegion={setRegion}
              dispViajar={dispViajar}
              setDispViajar={setDispViajar}
              dispResidencia={dispResidencia}
              setDispResidencia={setDispResidencia}
            />
          ) : step === "four" ? (
            <StepFour
              setStep={setStep}
              closeModal={closeModal}
              renta={renta}
              setRenta={setRenta}
              beneficios={beneficios}
              setBeneficios={setBeneficios}
              descripcion={descripcion}
              setDescripcion={setDescripcion}
              estado={estado}
              setEstado={setEstado}
              guardarAviso={guardarAviso}
              cargando={cargando}
            />
          ) : null}
        </>
      </Fade>
    </Modal>
  );
};

export default CustomModal;

const data = [
  {
    id: "d_G_kgXeK",
    modulo: "BI",
    submodulos: [
      {
        submodulo: "BI",
        nivel: "Avanzado",
      },
    ],
  },
  {
    id: "yQKDlrt6b",
    modulo: "MM",
    submodulos: [
      {
        submodulo: "PUR",
        nivel: "No Maneja",
      },
      {
        submodulo: "IV",
        nivel: "Medio",
      },
      {
        submodulo: "SRV",
        nivel: "Básico",
      },
    ],
  },
  {
    id: "O1E44nz62",
    modulo: "QM",
    submodulos: [
      {
        submodulo: "IM",
        nivel: "Medio",
      },
      {
        submodulo: "CA",
        nivel: "No Maneja",
      },
    ],
  },
];
