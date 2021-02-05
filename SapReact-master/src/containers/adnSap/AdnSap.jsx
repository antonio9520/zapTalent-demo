import React, { useState, useEffect } from "react";
import "./AdnSap.css";
import { CardInit, ModalEliminar } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Card, ModalEditar } from "./components";
import { obtenerAdnAction } from "../../redux/actions/adnAction";
import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Loader from "react-loader-spinner";

const AdnSap = () => {
  const dispatch = useDispatch();

  const usuario = useSelector((state) => state.auth.usuario);
  const loading = useSelector((state) => state.adn.loading);
  const adns = useSelector((state) => state.adn.adns);
  const [cardT1, setCardT1] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [idEliminar, setIdEliminar] = useState("");
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [dataEditar, setDataEditar] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [_switch, setSwitch] = useState(false);

  useEffect(() => {
    if (usuario) {
      if (usuario.sexo === "Masculino") {
        setCardT1("typeC1");
      } else if (usuario.sexo === "Femenino") {
        setCardT1("typeC2");
      }
    }
  }, [usuario]);

  useEffect(() => {
    if (adns.length === 0) {
      if (!_switch) {
        if (usuario) {
          dispatch(obtenerAdnAction(usuario._id));
        }
      }
    }
  }, [usuario]); 

  const evitarBug = () => {
    if (usuario) {
      dispatch(obtenerAdnAction(usuario._id));
    }
  };
  // console.log(adns);
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
      ) : adns.length === 0 ? (
        <div style={{ paddingTop: "75px", height: "100vh" }}>
          <CardInit
            setOpenModal={setOpenModal}
            type={cardT1}
            texto1="Muéstranos tu ADN SAP"
            texto2="Como eres nuevo en ZAPTalent, queremos conocerte. Compartenos tu identidad SAP haciendo click en el botón, nosotros te ayudamos..."
          />
          <Modal
            setOpenModal={setOpenModal}
            openModal={openModal}
            adns={adns}
          />
        </div>
      ) : (
        <>
          <div className="cont-title-certificados">
            <h1>Mi ADN SAP</h1>
          </div>
          <div className="cont-cards-adn">
            <div className="cont-btn-add-adn">
              <IconButton
                className="btn-add-adn"
                onClick={() => setOpenModal(true)}
              >
                <Add />
              </IconButton>
            </div>
            {adns.map((item, index) => (
              <Card
                data={item}
                key={index}
                setIdEliminar={setIdEliminar}
                setOpenModalEliminar={setOpenModalEliminar}
                setOpenModalEditar={setOpenModalEditar}
                setDataEditar={setDataEditar}
                setSwitch={setSwitch}
              />
            ))}

            <ModalEliminar
              adnsap
              openModalEliminar={openModalEliminar}
              setOpenModalEliminar={setOpenModalEliminar}
              idEliminar={idEliminar}
              setIdEliminar={setIdEliminar}
            />
            <ModalEditar
              setOpenModalEditar={setOpenModalEditar}
              openModalEditar={openModalEditar}
              dataEditar={dataEditar}
              setDataEditar={setDataEditar}
              setSwitch={setSwitch}
              evitarBug={evitarBug}
            />
            <Modal
              setOpenModal={setOpenModal}
              openModal={openModal}
              adns={adns}
            />
          </div>
        </>
      )}
    </>
  );
};

export default AdnSap;

const dataed = {
  submodulos: [
    {
      name: "MD",
      obs: "",
      nivel: "Medio",
      desc: "Datos maestros",
    },
  ],
  _id: "5fd466601ae9231f18ee88be",
  name: "SD",
  desc: "Ventas y distribución",
  idcert: "51654654343",
  obs: null,
  iduser: "5f9f1680f0ce9c2ed45074c2",
  __v: 1,
};
