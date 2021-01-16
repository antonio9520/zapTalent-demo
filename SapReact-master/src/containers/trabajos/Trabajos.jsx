import React, { useState, useEffect } from "react";
import "./Trabajos.css";
import { CardInit, ModalEliminar, Spinner } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { Modal, CardJob, ModalEditar } from "./components";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { obtenerTrabajosAction } from "../../redux/actions/trabajoAction";
import Loader from "react-loader-spinner";

const Trabajos = () => {
  const usuario = useSelector((state) => state.auth.usuario);
  const trabajos = useSelector((state) => state.trabajo.trabajos);
  const loading = useSelector((state) => state.trabajo.loading);
  const dispatch = useDispatch();
  const [cardT1, setCardT1] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [idEliminar, setIdEliminar] = useState("");
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [dataEditar, setDataEditar] = useState(null);

  useEffect(() => {
    if (usuario) {
      if (usuario.sexo === "Masculino") {
        setCardT1("typeD1");
      } else if (usuario.sexo === "Femenino") {
        setCardT1("typeD2");
      }
    }
  }, [usuario]);

  useEffect(() => {
    if (usuario) {
      const cargarTrabajos = () => dispatch(obtenerTrabajosAction(usuario._id));
      cargarTrabajos();
    }

    // eslint-disable-next-line
  }, [usuario, openModalEditar, openModal]);

  const datasort = trabajos.sort(function (a, b) {
    a = new Date(a.findate);
    b = new Date(b.findate);
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
      ) : trabajos.length === 0 ? (
        <div style={{ paddingTop: "75px", height: "100vh" }}>
          <CardInit
            setOpenModal={setOpenModal}
            type={cardT1}
            texto1="Comparte tu Experiencia"
            texto2="Como eres nuevo en ZAPTalent, queremos conocerte. Compartenos tu identidad SAP haciendo click en el botón, nosotros te ayudamos..."
          />
          <Modal setOpenModal={setOpenModal} openModal={openModal} />
        </div>
      ) : (
        <>
          <div className="cont-title-certificados">
            <h1>Mis Trabajos</h1>
          </div>
          <div className="conteiner-cards-job">
            <Fab
              className="icon-btn-add-trabajos"
              onClick={() => setOpenModal(true)}
            >
              <Add />
            </Fab>
            {datasort.map((item, index) => (
              <CardJob
                key={index}
                data={item}
                setIdEliminar={setIdEliminar}
                setOpenModalEliminar={setOpenModalEliminar}
                setOpenModalEditar={setOpenModalEditar}
                setDataEditar={setDataEditar}
              />
            ))}
            <ModalEditar
              setOpenModalEditar={setOpenModalEditar}
              openModalEditar={openModalEditar}
              setDataEditar={setDataEditar}
              data={dataEditar}
            />
            <Modal setOpenModal={setOpenModal} openModal={openModal} />
            <ModalEliminar
              trabajo
              openModalEliminar={openModalEliminar}
              setOpenModalEliminar={setOpenModalEliminar}
              idEliminar={idEliminar}
              setIdEliminar={setIdEliminar}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Trabajos;
