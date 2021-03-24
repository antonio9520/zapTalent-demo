import React, { useState, useEffect } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import { One, Two, Three } from "./steps";
import { editarEmpresaAction } from "../../../../redux/actions/actions-admin/empresasAction";
import { useDispatch } from "react-redux";

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
  const { setOpen, open, setOpenAlert, setDataEditar, dataEditar } = props;

  console.log(dataEditar);

  const [step, setStep] = useState("one");
  //STEP ONE
  const [image, setImage] = useState({
    preimage: null,
    name: "",
  });
  const [file, setFile] = useState(null);
  const [tipoPlan, setTipoPlan] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [rut, setRut] = useState("");
  const [giro, setGiro] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaTermino, setFechaTermino] = useState(null);
  const [resena, setResena] = useState("");
  //STEP TWO
  const [direcciones, setDirecciones] = useState([]);
  //STEP THREE
  const [telefonos, setTelefonos] = useState([]);
  //guardar aviso
  const [loading, setLoading] = useState(false);

  const guardarEmpresa = async () => {
    setLoading(true);
    let logoURL;

    if (file) {
      logoURL = file;
    }

    await dispatch(
      editarEmpresaAction({
        _id: dataEditar._id,
        logoURL,
        tipoPlan,
        razonSocial,
        rut,
        giro,
        fechaInicio,
        fechaTermino,
        resena,
        direcciones,
        telefonos,
      })
    ).then((res) => (res ? closeModal() : null));

    setLoading(false);
  };

  const closeModal = () => {
    setOpen(false);
    setImage({
      preimage: null,
      name: "",
    });
    setFile(null);
    setTipoPlan("");
    setRazonSocial("");
    setRut("");
    setGiro("");
    setFechaInicio(null);
    setFechaTermino(null);
    setResena("");
    setDirecciones([]);
    setTelefonos([]);
    setLoading(false);
    setDataEditar(null);
    setTimeout(() => {
      setStep("one");
    }, 300);
  };
  useEffect(() => {
    if (dataEditar) {
      setRazonSocial(dataEditar.razonSocial);
      setTipoPlan(dataEditar.tipoPlan);
      setRut(dataEditar.rut);
      setGiro(dataEditar.giro);
      setFechaInicio(dataEditar.fechaInicio);
      setFechaTermino(dataEditar.fechaTermino);
      setResena(dataEditar.resena);
      setDirecciones(dataEditar.direcciones);
      setTelefonos(dataEditar.telefonos);
      if (dataEditar.logoURL) {
        setImage({
          preimage: dataEditar.logoURL,
          name: "",
        });
      }
    }
  }, [dataEditar]);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      disableBackdropClick
      // open={true}
      onClose={() => closeModal()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <>
          {step === "one" ? (
            <One
              setStep={setStep}
              closeModal={closeModal}
              tipoPlan={tipoPlan}
              setTipoPlan={setTipoPlan}
              razonSocial={razonSocial}
              setRazonSocial={setRazonSocial}
              rut={rut}
              setRut={setRut}
              giro={giro}
              setGiro={setGiro}
              fechaInicio={fechaInicio}
              setFechaInicio={setFechaInicio}
              fechaTermino={fechaTermino}
              setFechaTermino={setFechaTermino}
              resena={resena}
              setResena={setResena}
              image={image}
              setImage={setImage}
              file={file}
              setFile={setFile}
            />
          ) : step === "two" ? (
            <Two
              setStep={setStep}
              closeModal={closeModal}
              direcciones={direcciones}
              setDirecciones={setDirecciones}
            />
          ) : step === "three" ? (
            <Three
              setStep={setStep}
              closeModal={closeModal}
              telefonos={telefonos}
              setTelefonos={setTelefonos}
              guardarEmpresa={guardarEmpresa}
              loading={loading}
              setLoading={setLoading}
            />
          ) : null}
        </>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
