import React, { useState, useEffect } from "react";
import "./Certificados.css";
import { CardInit, Spinner, ModalEliminar } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { obtenerCertificadosAction } from "../../redux/actions/certificadoAction";
import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Card, Modal, ModalEditar } from "./components";
import Loader from "react-loader-spinner"; 


const Certificados = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);
  const loading = useSelector((state) => state.certificado.loading);
  const certificados = useSelector((state) => state.certificado.certificados);
  const [cardT1, setCardT1] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [idEliminar, setIdEliminar] = useState("");
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [dataEditar, setDataEditar] = useState(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (usuario) {
      if (usuario.sexo === "Masculino") {
        setCardT1("typeB1");
      } else if (usuario.sexo === "Femenino") {
        setCardT1("typeB2");
      }
    }
  }, [usuario]);

  useEffect(() => {
    if (usuario) {
      const cargarCertificados = () =>
        dispatch(obtenerCertificadosAction(usuario._id));
      cargarCertificados();
    }
    // eslint-disable-next-line
  }, [usuario]);  

  const datasort = certificados.sort(function (a, b) {
    a = new Date(a.fecha);
    b = new Date(b.fecha);
    return a > b ? -1 : a < b ? 1 : 0;
  });
  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Loader
            type="Oval"
            color="#00BFFF"
            height={100}
            width={100}
            visible={loading}
            //  timeout={3000} //3 secs
          />
        </div>
      ) : certificados.length === 0 ? (
        <div style={{ paddingTop: "75px", height: "100vh" }}>
          <CardInit
            setOpenModal={setOpenModal}
            type={cardT1}
            texto1="Ingresa tus certificaciones"
            texto2="Mostrar tus conocimientos laterales te hace un profesional mas completo, carga tus certificaciones aquí."
          />
          <Modal setOpenModal={setOpenModal} openModal={openModal} />
        </div>
      ) : (
        <>
          <div className="cont-title-certificados">
            <h1>Mis Certificaciones</h1>
          </div>
          <div class="conteiner-cards-certificados">
            <IconButton
              className="icon-btn-add-trabajos"
              onClick={() => setOpenModal(true)}
            >
              <Add />
            </IconButton>
            {datasort.map((item, index) => (
              <Card
                key={index}
                data={item}
                setIdEliminar={setIdEliminar}
                setOpenModalEliminar={setOpenModalEliminar}
                setOpenModalEditar={setOpenModalEditar}
                setDataEditar={setDataEditar}
              />
            ))}
            <Modal setOpenModal={setOpenModal} openModal={openModal} />
            <ModalEliminar
              certificado
              openModalEliminar={openModalEliminar}
              setOpenModalEliminar={setOpenModalEliminar}
              idEliminar={idEliminar}
              setIdEliminar={setIdEliminar}
            />
            <ModalEditar
              setOpenModalEditar={setOpenModalEditar}
              openModalEditar={openModalEditar}
              setDataEditar={setDataEditar}
              data={dataEditar}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Certificados;
