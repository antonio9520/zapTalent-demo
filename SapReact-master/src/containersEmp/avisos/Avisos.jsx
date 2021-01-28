import React, { useState, useEffect } from "react";
import "./Avisos.css";
import {
  Header,
  Card,
  Modal,
  ModalEditar,
  ModalCopy,
  ModalRep,
} from "./components";
import { obtenerAvisoAction } from "../../redux/actions/actions-emp/avisosAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import { ModalEliminar } from "../../components";

const Avisos = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.authEmp.usuario);
  const avisos = useSelector((state) => state.aviso.avisos);
  const loading = useSelector((state) => state.aviso.loading);
  const [openModal, setOpenModal] = useState(false);
  const [idEliminar, setIdEliminar] = useState("");
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [dataEditar, setDataEditar] = useState(null);
  const [openModalCopy, setOpenModalCopy] = useState(false);
  const [dataCopy, setDataCopy] = useState(null);
  const [openModalRep, setOpenModalRep] = useState(false);

  useEffect(() => {
    if (usuario) {
      const cargarTrabajos = () => dispatch(obtenerAvisoAction(usuario._id));
      cargarTrabajos();
    }

    // eslint-disable-next-line
  }, [usuario]);

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
      ) : (
        <div className="cont-avisos-emp">
          <div className="cont-header-avisos-emp">
            <Header setOpenModal={setOpenModal} />
          </div>

          <div className="cont-cards-avisos-emp">
            {avisos.map((item, index) => (
              <Card
                data={item}
                key={index}
                setIdEliminar={setIdEliminar}
                setOpenModalEliminar={setOpenModalEliminar}
                setOpenModalEditar={setOpenModalEditar}
                setDataEditar={setDataEditar}
                setOpenModalCopy={setOpenModalCopy}
                setDataCopy={setDataCopy}
                setOpenModalRep={setOpenModalRep}
              />
            ))}
          </div>
          <Modal setOpenModal={setOpenModal} openModal={openModal} />
          <ModalEliminar
            aviso
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
          <ModalCopy
            setOpenModalCopy={setOpenModalCopy}
            openModalCopy={openModalCopy}
            setDataCopy={setDataCopy}
            data={dataCopy}
          />
          <ModalRep
            openModalRep={openModalRep}
            setOpenModalRep={setOpenModalRep}
            data={dataEditar}
            setDataEditar={setDataEditar}
          />
        </div>
      )}
    </>
  );
};

export default Avisos;
