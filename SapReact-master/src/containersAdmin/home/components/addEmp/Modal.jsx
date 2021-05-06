import React, { useState } from "react";
import { Modal, Fade, Backdrop, makeStyles } from "@material-ui/core";
import { One, Two, Three, Four, Five } from "./steps";
import { agregarEmpresaAction } from "../../../../redux/actions/actions-admin/empresasAction";
import { useDispatch } from "react-redux";
import clientAxios from "../../../../config/axios";
import clienteAxios from "../../../../config/axios";

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
  const { setOpen, open, setOpenAlert } = props;
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
  //STEP FOUR
  const [perfiles, setPerfiles] = useState([]);
  //guardar aviso
  const [loading, setLoading] = useState(false);
  const [numSave, setNumSave] = useState(0);
  const guardarEmpresa = async () => {
    setLoading(true);
    const logoURL = file;
    try {
      const idemp = await dispatch(
        agregarEmpresaAction({
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
      );
      console.log(idemp);
      if (idemp) {
        for (let i = 0; i < perfiles.length; i++) {
          setNumSave(i + 1);
          perfiles[i].email = perfiles[i].email.toLocaleLowerCase();
          await clientAxios.post("/api/usuarioEmpresa", {
            perfil: perfiles[i],
            idemp,
          });
        }
      }
      setTimeout(() => {
        setLoading(false);
        setStep("five");
      }, 1000);
    } catch (error) {
      console.log(error);
      setOpenAlert(true);
      closeModal();
    }
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
    setPerfiles([]);
    setLoading(false);
    setNumSave(0);
    setTimeout(() => {
      setStep("one");
    }, 300);
  };
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
            />
          ) : step === "four" ? (
            <Four
              setStep={setStep}
              closeModal={closeModal}
              guardarEmpresa={guardarEmpresa}
              perfiles={perfiles}
              setPerfiles={setPerfiles}
              loading={loading}
              setLoading={setLoading}
              numSave={numSave}
            />
          ) : step === "five" ? (
            <Five closeModal={closeModal} />
          ) : null}
        </>
      </Fade>
    </Modal>
  );
};

export default CustomModal;

let dataPerfil = [
  {
    id: "cbfCfz6hV",
    tipoPerfil: "admin",
    rut: "18.822.161-0",
    nombres: "nombre",
    apellidos: "apellidos",
    email: "Antonio.vidal95@hotmail.com",
    password: "aeh4tx09R",
    fechaInicio: "2021-03-21T22:59:28.388Z",
    fechaTermino: "2021-03-31T22:59:00.000Z",
  },
  {
    id: "TjtiCiOlR",
    tipoPerfil: "admin",
    rut: "12.529.998-9",
    nombres: "Abraham",
    apellidos: "vidal",
    email: "abrvc95@gmail.com",
    password: "ipTO7YHvK",
    fechaInicio: "2021-03-21T23:00:23.133Z",
    fechaTermino: "2021-04-24T00:00:00.000Z",
  },
];
