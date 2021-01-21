import React, { useState, useEffect } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import { StepOne, StepTwo, StepThree, StepFour } from "../stepsEdit";
import shortid from "shortid";
import { useDispatch, useSelector } from "react-redux";
import { editarAvisoAction } from "../../../../redux/actions/actions-emp/avisosAction";

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
  const { setOpenModalEditar, openModalEditar, data, setDataEditar } = props;
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

  //guardar aviso
  const guardarAvisoEditado = () => {
    dispatch(
      editarAvisoAction({
        _id: data._id,
        // idusuario: usuario._id,
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
    setOpenModalEditar(false);
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
    setDataEditar(null);
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
      //step two
      setAnosExpZap(data.anosExpSap);
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
      open={openModalEditar}
      // open={true}
      onClose={() => closeModal()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalEditar}>
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
              guardarAvisoEditado={guardarAvisoEditado}
              cargando={cargando}
            />
          ) : null}
        </>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
