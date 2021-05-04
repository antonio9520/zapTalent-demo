import React, { useState, useEffect } from "react";
import "./EcoSap.css";
import { Card, Filtro, Header, FiltroDrawer } from "./components";
import { Modal } from "../home/components";
import clientAxios from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { obtenerAvisoAction } from "../../redux/actions/actions-emp/avisosAction";
import { setearTipoPlan } from "../../assets/setTipoPlan";
import { DialogCVPDF } from "../../componentsEmp";

const EcoSap = (props) => {
  const {
    match: { params },
  } = props;
  const dispatch = useDispatch();

  const [value, setValue] = useState(params.index ? parseInt(params.index) : 0);
  const [usuarios, setUsuarios] = useState([]);
  const avisos = useSelector((state) => state.aviso.avisos);
  const [skip, setSkip] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [dataUser, setDataUser] = useState(null);
  const [openModalDrawer, setOpenModalDrawer] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [loading, setLoading] = useState(false);
  const usuario = useSelector((state) => state.authEmp.usuario);
  const [query, setQuery] = useState({});
  const [_switch, setSwitch] = useState(false);
  const [tipoPlan, setTipoPlan] = useState({});
  const [idavisos, setIdAviso] = useState(true);

  const cargarUsuarios = async () => {
    if (skip === 0) {
      setCargando(true);
    } else {
      setLoading(true);
    }

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

  const cargarPostulados = async (idaviso) => {
    if (skip === 0) {
      setCargando(true);
    } else {
      setLoading(true);
    }
    if (idavisos) {
      if (idaviso) {
        query._id = idaviso;
        setIdAviso(false);
      }
    }

    let _id = usuario.idemp;
    console.log(`skip: ${skip}`);
    try {
      const respuesta = await clientAxios.put(
        `/api/postulacion/postulados/${_id}/${skip}`,
        query
      );
      console.log(respuesta.data);
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
      setSkip(usuarios.length);
    }
  };

  useEffect(() => {
    if (usuario) {
      if (value === 0) {
        cargarUsuarios();
      } else {
        if (params.idaviso) {
          cargarPostulados(params.idaviso);
        } else {
          cargarPostulados();
        }

        if (avisos.length === 0) {
          dispatch(
            obtenerAvisoAction({ skip: 0, query: { _id: usuario.idemp } })
          );
        }
      }

      setTipoPlan(setearTipoPlan(usuario.tipoPlan));
    }

    setOpenModalDrawer(false);
  }, [skip, value, _switch, usuario, params.idaviso]);

  return (
    <>
      {new Date(usuario?.fechaTerminoEmp) < new Date() ? (
        <div className="contenedor-cuenta-caducada">
          <p>Su plan ha caducado</p>
          <p>Contáctese con ZAPTalent para restablecer el servicio</p>
        </div>
      ) : new Date(usuario?.fechaTermino) < new Date() ? (
        <div className="contenedor-cuenta-caducada">
          <p>Su cuenta de usuario ha caducado</p>
          <p>
            Contáctese con su administrador ZAPTalent para restablecer su perfil
          </p>
        </div>
      ) : (
        <div className="eco-sap-empresas">
          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            data={dataUser}
            setIdUser={setIdUser}
            setOpen={setOpen}
          />
          <DialogCVPDF
            open={open}
            setOpen={setOpen}
            setIdUser={setIdUser}
            idUser={idUser}
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
                query={query}
              />
            </div>
            <div className="space-top-eco-sap-emp"></div>
          </div>
          <div className="bottom-eco-sap-emp">
            <div className="content-eco-sap" onScroll={handleScroll}>
              {value === 0 && tipoPlan.totalUsers ? (
                cargando ? (
                  <div
                    className="div-cargando-avisos"
                    style={{ height: "77vh" }}
                  >
                    <p>Cargando...</p>
                  </div>
                ) : (
                  usuarios.map((item, index) => (
                    <Card
                      key={index}
                      data={item}
                      setOpenModal={setOpenModal}
                      setDataUser={setDataUser}
                      setOpen={setOpen}
                      setIdUser={setIdUser}
                    />
                  ))
                )
              ) : value === 1 && tipoPlan.userPost ? (
                cargando ? (
                  <div
                    className="div-cargando-avisos"
                    style={{ height: "77vh" }}
                  >
                    <p>Cargando...</p>
                  </div>
                ) : (
                  usuarios.map((item, index) => (
                    <Card
                      key={index}
                      data={item}
                      setOpenModal={setOpenModal}
                      setDataUser={setDataUser}
                      setOpen={setOpen}
                      setIdUser={setIdUser}
                    />
                  ))
                )
              ) : (
                <div className="act-plan-msg-eco">
                  <p>Plan no autorizado</p>
                  <p>Actualize su plan</p>
                </div>
              )}

              {loading ? (
                <div className="div-cargando-avisos">
                  <p>Cargando...</p>
                </div>
              ) : null}
            </div>
            <div className="filtros-eco-sap-emp">
              {value === 0 && tipoPlan.totalUsers ? (
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
              ) : value === 1 && tipoPlan.userPost ? (
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
              ) : null}
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
            setOpen={setOpenModalDrawer}
            open={openModalDrawer}
          />
        </div>
      )}
    </>
  );
};

export default EcoSap;
