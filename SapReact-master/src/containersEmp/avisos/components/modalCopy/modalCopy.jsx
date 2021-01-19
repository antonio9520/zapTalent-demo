import React, { useState, useEffect } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import { StepOne, StepTwo, StepThree, StepFour } from "../stepsCopy";
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
  const { setOpenModalCopy, openModalCopy, data, setDataCopy } = props;
  console.log(data);
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
  const [adns, setAdns] = useState([
    { id: shortid.generate(), modulo: "", submodulos: [] },
  ]);
  //step three
  const [jornadaLaboral, setJornadaLaboral] = useState("");
  const [tipoContrato, setTipoContrato] = useState("");
  const [cantidadVacantes, setCantidadVacantes] = useState(null);
  const [fechaContratacion, setFechaContratacion] = useState(null);
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [region, setRegion] = useState("");
  const [dispViajar, setDispViajar] = useState(true);
  const [dispResidencia, setDispResidencia] = useState(false);
  //step four
  const [renta, setRenta] = useState(null);
  const [beneficios, setBeneficios] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Activo");

  //guardar aviso
  const guardarAviso = () => {
    dispatch(
      agregarAvisoAction({
        idusuario: usuario._id,
        titulo,
        profesion,
        area,
        anosExp,
        fechaInicio,
        fechaTermino,
        tipoConsultor,
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
      })
    ).then((res) => (res === true ? closeModal() : null));
  };

  const closeModal = () => {
    setOpenModalCopy(false);
    setTitulo("");
    setProfesion("");
    setArea("");
    setAnosExp(null);
    setFechaInicio(null);
    setFechaTermino(null);
    setTipoConsultor("Junior");
    //step two
    setAdns([{ id: shortid.generate(), modulo: "", submodulos: [] }]);
    //step three
    setJornadaLaboral("");
    setTipoContrato("");
    setCantidadVacantes(null);
    setFechaContratacion(null);
    setPais("");
    setCiudad("");
    setRegion("");
    setDispViajar(true);
    setDispResidencia(false);
    //step four
    setRenta(null);
    setBeneficios("");
    setDescripcion("");
    setEstado("Activo");
    setDataCopy(null);
    setTimeout(() => {
      setStep("one");
    }, 300);
  };

  useEffect(() => {
    if (data) {
      setTitulo(data.titulo);
      setProfesion(data.profesion);
      setArea(data.area);
      if (data.anosExp) {
        setAnosExp(data.anosExp);
      }
      setFechaInicio(data.fechaInicio);
      setFechaTermino(data.fechaTermino);
      setTipoConsultor(data.tipoConsultor);
      setAdns(data.adns);
      //step three
      setJornadaLaboral(data.jornadaLaboral);
      setTipoContrato(data.tipoContrato);
      setCantidadVacantes(data.cantidadVacantes);
      setFechaContratacion(data.fechaContratacion);
      setPais(data.pais);
      setCiudad(data.ciudad);
      setRegion(data.region);
      setDispViajar(data.dispViajar);
      setDispResidencia(data.dispResidencia);
      //step four
      setRenta(data.renta);
      setBeneficios(data.beneficios);
      setDescripcion(data.descripcion);
      setEstado(data.estado);
    }
  }, [data]);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModalCopy}
      // open={true}
      onClose={() => closeModal()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalCopy}>
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
