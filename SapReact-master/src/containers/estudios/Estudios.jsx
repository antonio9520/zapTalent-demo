import React, { useState, useEffect } from "react";
import "./Estudios.css";
import { Modal, CardEstudio, ModalEditar } from "./components";
import { CardInit, Spinner, ModalEliminar } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { obtenerEstudiosAction } from "../../redux/actions/estudioAction";
import Loader from "react-loader-spinner";

const Estudios = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);
  const loading = useSelector((state) => state.estudio.loading);
  const estudios = useSelector((state) => state.estudio.estudios);
  const [cardT1, setCardT1] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [dataEditar, setDataEditar] = useState(null);
  const [idEliminar, setIdEliminar] = useState("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (usuario) {
      if (usuario.sexo === "Masculino") {
        setCardT1("typeA1");
      } else if (usuario.sexo === "Femenino") {
        setCardT1("typeA2");
      }
    }
  }, [usuario]);

  useEffect(() => {
    if (estudios.length === 0) {
      if (usuario) {
        const cargarEstudios = () =>
          dispatch(obtenerEstudiosAction(usuario._id));
        cargarEstudios();
      }
    }
    // eslint-disable-next-line
  }, [usuario]);

  const datasort = estudios.sort(function (a, b) {
    a = new Date(a.diafin);
    b = new Date(b.diafin);
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
      ) : estudios.length === 0 ? (
        <div style={{ paddingTop: "75px", height: "100vh" }}>
          <CardInit
            setOpenModal={setOpenModal}
            type={cardT1}
            texto1="Comparte tu carrera y estudios"
            texto2="Amas tu carrera y lo sabemos. Compártenos tu información
        academica."
          />
          <Modal setOpenModal={setOpenModal} openModal={openModal} />
        </div>
      ) : (
        <>
          <div className="cont-title-certificados">
            <h1>Mis Estudios</h1>
          </div>
          <div className="conteiner-cards-estudio">
            <IconButton
              className="icon-btn-add-trabajos"
              onClick={() => setOpenModal(true)}
            >
              <Add />
            </IconButton>
            {datasort.map((item, index) => (
              <CardEstudio
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
              estudio
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

export default Estudios;
