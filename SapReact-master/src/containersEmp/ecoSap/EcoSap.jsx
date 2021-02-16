import React, { useState, useEffect } from "react";
import "./EcoSap.css";
import { Card, Filtro, Header, FiltroDrawer } from "./components";
import { Modal } from "../home/components";
import clientAxios from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { obtenerAvisoAction } from "../../redux/actions/actions-emp/avisosAction";

const EcoSap = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const avisos = useSelector((state) => state.aviso.avisos);
  const [skip, setSkip] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [openModalDrawer, setOpenModalDrawer] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [loading, setLoading] = useState(false);
  const usuario = useSelector((state) => state.authEmp.usuario);
  const [query, setQuery] = useState({});
  const [_switch, setSwitch] = useState(false);

  const cargarUsuarios = async () => {
    if (skip === 0) {
      setCargando(true);
    } else {
      setLoading(true);
    }
    console.log(query);
    try {
      const respuesta = await clientAxios.put(`/api/ecoSap/${skip}`, query);
      if (skip === 0) {
        setUsuarios(respuesta.data);
      } else {
        for (let i = 0; i < respuesta.data.length; i++) {
          setUsuarios((usuarios) => [...usuarios, respuesta.data[i]]);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
    setLoading(false);
  };

  const cargarPostulados = async () => {
    if (skip === 0) {
      setCargando(true);
    } else {
      setLoading(true);
    }
    let _id = usuario._id;
    try {
      const respuesta = await clientAxios.put(
        `/api/postulacion/postulados/${_id}/${skip}`,
        query
      );
      if (skip === 0) {
        setUsuarios(respuesta.data);
      } else {
        for (let i = 0; i < respuesta.data.length; i++) {
          setUsuarios((usuarios) => [...usuarios, respuesta.data[i]]);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
    setLoading(false);
  };

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    const alto = scrollHeight - 150;
    if (offsetHeight + scrollTop > alto) {
      console.log("scroll");
      setSkip(usuarios.length);
    }
  };
  console.log(usuarios);

  useEffect(() => {
    if (value === 0) {
      cargarUsuarios();
    } else {
      cargarPostulados();
      if (avisos.length === 0) {
        const cargarAvisos = () =>
          dispatch(obtenerAvisoAction({ _id: usuario._id, skip: 0 }));
        cargarAvisos();
      }
    }
    setOpenModalDrawer(false);
  }, [skip, value, _switch]);

  return (
    <div className="eco-sap-empresas">
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={dataUser}
      />
      <div className="top-eco-sap-emp">
        <div className="header-eco-sap-emp">
          <Header
            value={value}
            setValue={setValue}
            setSkip={setSkip}
            setUsuarios={setUsuarios}
            _switch={_switch}
            setSwitch={setSwitch}
            setQuery={setQuery}
            setOpen={setOpenModalDrawer}
          />
        </div>
        <div className="space-top-eco-sap-emp"></div>
      </div>
      <div className="bottom-eco-sap-emp">
        <div className="content-eco-sap" onScroll={handleScroll}>
          {cargando ? (
            <div className="div-cargando-avisos" style={{ height: "77vh" }}>
              <p>Cargando...</p>
            </div>
          ) : (
            usuarios.map((item, index) => (
              <Card
                key={index}
                data={item}
                setOpenModal={setOpenModal}
                setDataUser={setDataUser}
              />
            ))
          )}
          {loading ? (
            <div className="div-cargando-avisos">
              <p>Cargando...</p>
            </div>
          ) : null}
        </div>
        <div className="filtros-eco-sap-emp">
          <Filtro
            value={value}
            query={query}
            setQuery={setQuery}
            setSkip={setSkip}
            skip={skip}
            _switch={_switch}
            setSwitch={setSwitch}
            dataFiltro={avisos}
          />
        </div>
      </div>
      <FiltroDrawer
        value={value}
        query={query}
        setQuery={setQuery}
        setSkip={setSkip}
        skip={skip}
        _switch={_switch}
        setSwitch={setSwitch}
        dataFiltro={avisos}
        open={openModalDrawer}
        setOpen={setOpenModalDrawer}
      />
    </div>
  );
};

export default EcoSap;
