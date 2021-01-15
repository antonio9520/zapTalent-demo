import React, { useState } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import { StepOne, StepTwo, StepThree, StepFour } from "../stepsNew";
import shortid from "shortid";
import { modulos } from "../../../../assets/modulos";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const CustomModal = (props) => {
  const classes = useStyles();
  const { setOpenModal, openModal } = props;
  const [step, setStep] = useState("two");
  //step one
  const [titulo, setTitulo] = useState("");
  const [profesion, setProfesion] = useState("");
  const [area, setArea] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaTermino, setFechaTermino] = useState(null);
  const [tipoConsultor, setTipoConsultor] = useState("Junior");
  //step two
  const [adns, setAdns] = useState([
    { id: shortid.generate(), modulo: "", submodulos: [] },
  ]);
  const [selectModulo, setSelectModulo] = useState(modulos);
  //step three
  const [jornadaLaboral, setJornadaLaboral] = useState("");
  const [tipoContrato, setTipoContrato] = useState("");
  const [cantidadVacantes, setCantidadVacantes] = useState(0);
  const [fechaContratacion, setFechaContratacion] = useState(null);
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [region, setRegion] = useState("");
  const [dispViajar, setDispViajar] = useState(true);
  const [dispResidencia, setDispResidencia] = useState(false);
  //step four
  const [renta, setRenta] = useState(0);
  const [beneficios, setBeneficios] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Activo");

  const closeModal = () => {
    setOpenModal(false);
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
          />
        ) : step === "two" ? (
          <StepTwo
            setStep={setStep}
            closeModal={closeModal}
            adns={adns}
            setAdns={setAdns}
            selectModulo={selectModulo}
            setSelectModulo={setSelectModulo}
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
          />
        ) : null}
      </Fade>
    </Modal>
  );
};

export default CustomModal;
