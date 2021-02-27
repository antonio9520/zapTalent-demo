import React, { useState } from "react";
import {
  Modal,
  Fade,
  Backdrop,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import { registrarUsuarioAction } from "../../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { RegistroA, RegistroA2, RegistroB, RegistroC, RegistroD } from "../";

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
  const {
    setOpenModal,
    openModal,
    setHidden,
    setNombres,
    setApellidos,
    setEmail,
    nombres,
    apellidos,
    emailA,
  } = props;

  const [view, setView] = useState("A");

  //reg-a
  const [rut, setRut] = useState("");
  const [passport, setPassport] = useState("");
  const [phone, setPhone] = useState("");
  const [ecivil, setEcivil] = useState("");
  const [nacion, setNacion] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [sexo, setSexo] = useState("");
  const [inputRut, setInputRut] = useState(true);
  //reg-b
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");
  //reg-c
  const [consultor, setConsultor] = useState("");
  const [anosExp, setAnosExp] = useState("");
  const [anosZap, setAnosZap] = useState("");
  const [pretencion, setPretencion] = useState("");

  const handleClose = () => {
    setOpenModal(false);
    setHidden(false);
    setRut("");
    setPassport("");
    setNombres("");
    setApellidos("");
    setPhone("");
    setEmail("");
    setEcivil("");
    setNacion("");
    setPassword("");
    setRpassword("");
    setRegion("");
    setComuna("");
    setDireccion("");
    setConsultor("");
    setAnosExp("");
    setAnosZap("");
    setSexo("");
    setTimeout(() => {
      setView("A");
    }, 300);
  };

  const registrarUsuario = () => {
    // handleClose();
    const email = emailA.toLocaleLowerCase();
    dispatch(
      registrarUsuarioAction({
        rut,
        passport,
        nombres,
        apellidos,
        phone,
        email,
        ecivil,
        nacion,
        password,
        sexo,
        region,
        comuna,
        direccion,
        consultor,
        anosExp,
        anosZap,
        pretencion,
      })
    ).then((res) => {
      console.log(res);
      if (res.dato) {
        setView("D");
      }
    });
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      // open={true}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        {view === "A" ? (
          <RegistroA
            setView={setView}
            rut={rut}
            passport={passport}
            nombres={nombres}
            apellidos={apellidos}
            phone={phone}
            email={emailA}
            password={password}
            rpassword={rpassword}
            setRut={setRut}
            setPassport={setPassport}
            setNombres={setNombres}
            setApellidos={setApellidos}
            setPhone={setPhone}
            setEmail={setEmail}
            setPassword={setPassword}
            setRpassword={setRpassword}
            handleClose={handleClose}
            inputRut={inputRut}
            setInputRut={setInputRut}
          />
        ) : view === "A2" ? (
          <RegistroA2
            setView={setView}
            ecivil={ecivil}
            nacion={nacion}
            sexo={sexo}
            setEcivil={setEcivil}
            setNacion={setNacion}
            setSexo={setSexo}
            handleClose={handleClose}
          />
        ) : view === "B" ? (
          <RegistroB
            setView={setView}
            region={region}
            comuna={comuna}
            direccion={direccion}
            setRegion={setRegion}
            setComuna={setComuna}
            setDireccion={setDireccion}
            handleClose={handleClose}
          />
        ) : view === "C" ? (
          <RegistroC
            setView={setView}
            consultor={consultor}
            anosExp={anosExp}
            anosZap={anosZap}
            pretencion={pretencion}
            setConsultor={setConsultor}
            setAnosExp={setAnosExp}
            setAnosZap={setAnosZap}
            setPretencion={setPretencion}
            registrarUsuario={registrarUsuario}
            handleClose={handleClose}
          />
        ) : view === "D" ? (
          <RegistroD setView={setView} handleClose={handleClose} />
        ) : null}
      </Fade>
    </Modal>
  );
};

export default CustomModal;
