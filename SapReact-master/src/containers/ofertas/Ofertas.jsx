import React, { useEffect, useState } from "react";
import "./Ofertas.css";
import { Card, Header, Filtros } from "./components";
import { BusinessCenterOutlined } from "@material-ui/icons";
import { filtrarOferLaboralesAction } from "../../redux/actions/ofertasLaboralesAction";
import { obtenerPostulacionesAction } from "../../redux/actions/postAction";
import { useSelector, useDispatch } from "react-redux";

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
  const [cargando, setCargando] = useState(false);
  const [open, setOpen] = useState(false);
  const [skip, setSkip] = useState(0);
  const [indexTab, setindexTab] = useState(0);
  // let query = {};
  const [query, setQuery] = useState({});

  useEffect(() => {
    if (usuario) {
      dispatch(obtenerPostulacionesAction(usuario._id));
    }
  }, [usuario]);

  useEffect(() => {
    obtenerOfertas({ skip: 0 }, 0);
  }, [usuario]);

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    const alto = scrollHeight - 150;
    if (offsetHeight + scrollTop > alto) {
      console.log("scroll");
      setSkip(ofertasLaborales.length);
    }
  };
  const obtenerOfertas = async (querie, index) => {
    // console.log(query);
    console.log(querie);
    if (index === 0) {
      setCargando(true);
      // console.log(query);
      await dispatch(filtrarOferLaboralesAction(querie)).then(() =>
        setOpen(false)
      );
      setTimeout(() => {
        setCargando(false);
      }, 500);

      // console.log("index: 0");
    } else if (index === 1) {
      // console.log("index: 1");
    } else if (index === 2) {
      setCargando(true);
      await dispatch(filtrarOferLaboralesAction({ skip: 0, estado: "Activo" }));
      setTimeout(() => {
        setCargando(false);
      }, 500);
      // console.log("index: 2");
    } else if (index === 3) {
      setCargando(true); // console.log("index: 3");
      await dispatch(
        filtrarOferLaboralesAction({
          skip: 0,
          estado: "Proceso Finalizado",
        })
      );
      setTimeout(() => {
        setCargando(false);
      }, 500);
    }
  };
  const obtenerOfertasMore = (querie, index, skip) => {
    console.log(query);
    console.log(querie);
    if (index === 0) {
      querie.skip = skip;
      dispatch(filtrarOferLaboralesAction(querie)).then(() => setOpen(false));
    } else if (index === 1) {
    } else if (index === 2) {
      dispatch(filtrarOferLaboralesAction({ skip, estado: "Activo" }));
    } else if (index === 3) {
      dispatch(
        filtrarOferLaboralesAction({
          skip,
          estado: "Proceso Finalizado",
        })
      );
    }
  };
  useEffect(() => {
    console.log("skip");
    if (skip > 0) {
      obtenerOfertasMore(query, indexTab, skip);
    }
  }, [skip]);

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
            setSkip={setSkip}
            obtenerOfertas={obtenerOfertas}
            query={query}
          />
        </div>

        <div className="cont-card-of-laborales" onScroll={handleScroll}>
          {cargando ? (
            <div className="div-cargando-avisos">
              <p>Cargando...</p>
            </div>
          ) : indexTab === 0 || indexTab === 2 || indexTab === 3 ? (
            ofertasLaborales.map((item) => <Card data={item} key={item._id} />)
          ) : null}
          {indexTab === 1
            ? postulaciones.map((item) => <Card data={item} key={item._id} />)
            : null}

          {(loading || loadingPost) && !cargando ? (
            <div className="div-cargando-avisos">
              <p>Cargando...</p>
            </div>
          ) : !cargando ? (
            indexTab === 1 ? (
              <div className="div-cargando-avisos">
                <p>No Tienes mas postulaciones</p>
              </div>
            ) : !cargando ? (
              indexTab === 0 || indexTab === 2 || indexTab === 3 ? (
                <div className="div-cargando-avisos">
                  <p>No quedan mas ofertas laborales</p>
                </div>
              ) : null
            ) : null
          ) : null}
        </div>
        <Filtros
          open={open}
          setOpen={setOpen}
          query={query}
          setindexTab={setindexTab}
          obtenerOfertas={obtenerOfertas}
          setQuery={setQuery}
          setSkip={setSkip}
        />
      </div>
    </>
  );
};

export default Ofertas;
