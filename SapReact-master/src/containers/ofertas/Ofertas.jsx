import React, { useEffect, useState, useRef } from "react";
import "./Ofertas.css";
import { Card, Header, Filtros } from "./components";
import { BusinessCenterOutlined } from "@material-ui/icons";
import {
  obtenerOferLaboralesAction,
  filtrarOferLaboralesAction,
} from "../../redux/actions/ofertasLaboralesAction";
import { obtenerPostulacionesAction } from "../../redux/actions/postAction";
import { useSelector, useDispatch } from "react-redux";
import shortid from "shortid";

const Ofertas = () => {
  const dispatch = useDispatch();
  const ofertasLaborales = useSelector(
    (state) => state.ofertasLaborales.ofertasLaborales
  );
  const postulaciones = useSelector(
    (state) => state.postulaciones.postulaciones
  );
  const usuario = useSelector((state) => state.auth.usuario);
  const loading = useSelector((state) => state.ofertasLaborales.loading);
  const loadingPost = useSelector((state) => state.postulaciones.loading);
  const [open, setOpen] = useState(false);
  const [skip, setSkip] = useState(0);
  const [indexTab, setindexTab] = useState(0);

  useEffect(() => {
    if (usuario) {
      dispatch(obtenerPostulacionesAction(usuario._id));
    }
  }, [usuario]);

  useEffect(() => {
    if (usuario) {
      const cargarOfertasLaborales = () =>
        dispatch(obtenerOferLaboralesAction(skip));
      if (skip === ofertasLaborales.length) {
        cargarOfertasLaborales();
      }
    }

    // eslint-disable-next-line
  }, [usuario, skip]);

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    const alto = scrollHeight - 150;
    if (offsetHeight + scrollTop > alto) {
      setSkip(ofertasLaborales.length);
    }
  };
  useEffect(() => {
    if (indexTab === 2) {
      dispatch(filtrarOferLaboralesAction({ estado: "Activo" }));
      console.log("filtra");
    }
  }, [indexTab]);
  return (
    <>
      <div className="ofertas-laborales">
        <div className="titulo-page">
          <BusinessCenterOutlined className="icon-page-header-user" />
          <h1>Ofertas Laborales</h1>
        </div>
        <div className="cont-header-of-laborales">
          <Header
            setOpen={setOpen}
            indexTab={indexTab}
            setindexTab={setindexTab}
          />
        </div>

        <div className="cont-card-of-laborales" onScroll={handleScroll}>
          {indexTab === 0
            ? ofertasLaborales.map((item, index) => (
                <Card data={item} key={item._id} />
              ))
            : null}
          {indexTab === 1
            ? postulaciones.map((item, index) => (
                <Card data={item} key={item._id} />
              ))
            : null}{" "}
          {indexTab === 2
            ? ofertasLaborales.map((item, index) => (
                <Card data={item} key={item._id} />
              ))
            : null}
          {loading || loadingPost ? (
            <div className="div-cargando-avisos">
              <p>Cargando...</p>
            </div>
          ) : indexTab === 1 ? (
            <div className="div-cargando-avisos">
              <p>No Tienes mas postulaciones</p>
            </div>
          ) : indexTab === 0 ? (
            <div className="div-cargando-avisos">
              <p>No quedan mas ofertas laborales</p>
            </div>
          ) : null}
        </div>
        <Filtros open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Ofertas;
