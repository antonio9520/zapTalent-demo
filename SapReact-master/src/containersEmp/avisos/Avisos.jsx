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
import { setearTipoPlan } from "../../assets/setTipoPlan";
import { obtenerTotalAvisosAction } from "../../redux/actions/actions-emp/postuladosAction";

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
  const [index, setIndex] = useState(0);
  const [skip, setSkip] = useState(0);
  const [query, setQuery] = useState({});
  const [_switch, setSwitch] = useState(false);
  const [tipoPlan, setTipoPlan] = useState({});
  const [disabledNewAviso, setDisabledNewAviso] = useState(true);
  const [totalavisos, setTotalAvisos] = useState(0);

  const cargarAvisos = async () => {
    
    switch (index) {
      case 0:
        query._id = usuario.idemp;
        dispatch(obtenerAvisoAction({ skip, query }));
        break;
      case 1:
       
        query.activo = true;
        query._id = usuario.idemp;
        dispatch(obtenerAvisoAction({ skip, query }));

        break;
      case 2:
        query.caducado = true;
        query._id = usuario.idemp;
        dispatch(obtenerAvisoAction({ skip, query }));
        break;
      default:
        break;
    }
  };

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;

    if (offsetHeight + scrollTop === scrollHeight) {
      setSkip(avisos.length);
    }
  };
  useEffect(() => {
    if (usuario) {
      cargarAvisos();
      dispatch(obtenerTotalAvisosAction(usuario.idemp));
      setTipoPlan(setearTipoPlan(usuario.tipoPlan));
    }

    // eslint-disable-next-line
  }, [usuario, skip, _switch, index]);

  useEffect(() => {
    if (tipoPlan.totalAvisos || tipoPlan.totalAvisos === 0) {
      if (tipoPlan.totalAvisos === 0) {
        setDisabledNewAviso(false);
        return;
      }

      if (tipoPlan.totalAvisos - avisos.length < 1) {
        setDisabledNewAviso(true);
      } else {
        setDisabledNewAviso(false);
      }
      setTotalAvisos(avisos.length);
    }
  }, [tipoPlan, avisos]);

  return (
    <>
      <div className="cont-avisos-emp" onScroll={handleScroll}>
        <div className="cont-header-avisos-emp">
          <Header
            setOpenModal={setOpenModal}
            setIndex={setIndex}
            index={index}
            setQuery={setQuery}
            _switch={_switch}
            setSkip={setSkip}
            setSwitch={setSwitch}
            query={query}
            disabledNewAviso={disabledNewAviso}
            tipoPlan={tipoPlan}
            totalavisos={totalavisos}
          />
        </div>

        <div className="cont-cards-avisos-emp">
          {!loading && avisos.length === 0 ? (
            <div className="no-avisos-msg-emp">
              <p>No tienes avisos</p>
            </div>
          ) : (
            avisos.map((item, index) => (
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
                disabledNewAviso={disabledNewAviso}
                tipoPlan={tipoPlan}
                totalavisos={totalavisos}
              />
            ))
          )}
          {loading ? (
            <div className="div-cargando-avisos">
              <p>Cargando...</p>
            </div>
          ) : null}
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
    </>
  );
};

export default Avisos;
