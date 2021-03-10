import React, { useEffect, useState } from "react";
import "./Ofertas.css";
import {
  Card,
  Header,
  FiltroDrawer,
  Modal,
  Filtro,
  ModalAviso,
  ReEmail,
} from "./components";
import { BusinessCenterOutlined } from "@material-ui/icons";
import { filtrarOferLaboralesAction } from "../../redux/actions/ofertasLaboralesAction";
import { obtenerPostulacionesAction } from "../../redux/actions/postAction";
import { useSelector, useDispatch } from "react-redux";

const Ofertas = (props) => {
  const {
    match: { params },
  } = props;
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
  const [openModal, setOpenModal] = useState(false);
  const [openModalAviso, setOpenModalAviso] = useState(false);
  const [idAviso, setIdAviso] = useState(null);
  const [idEmp, setIdEmp] = useState(null);
  const [skip, setSkip] = useState(0);
  const [indexTab, setindexTab] = useState(
    params.indice ? parseInt(params.indice) : 0
  );
  const [search, setSearch] = useState("");
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
      setSkip(ofertasLaborales.length);
    }
  };
  const obtenerOfertas = async (querie, index) => {
    if (index === 3) {
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
    } else if (index === 0) {
      querie.skip = 0;
      querie.estado = "Activo";
      querie.activo = true;

      setCargando(true);
      await dispatch(filtrarOferLaboralesAction(querie));
      setTimeout(() => {
        setCargando(false);
      }, 500);
      // console.log("index: 2");
    } else if (index === 2) {
      setCargando(true); // console.log("index: 3");
      querie.skip = 0;
      querie.estado = "Proceso Finalizado";
      querie.caducado = true;
      await dispatch(filtrarOferLaboralesAction(querie));
      setTimeout(() => {
        setCargando(false);
      }, 500);
    }
  };
  const obtenerOfertasMore = (querie, index, skip) => {
    if (index === 3) {
      querie.skip = skip;
      dispatch(filtrarOferLaboralesAction(querie)).then(() => setOpen(false));
    } else if (index === 1) {
    } else if (index === 0) {
      querie.skip = skip;
      querie.estado = "Activo";
      querie.activo = true;
      dispatch(filtrarOferLaboralesAction(querie));
    } else if (index === 2) {
      querie.skip = 0;
      querie.estado = "Proceso Finalizado";
      querie.caducado = true;
      dispatch(
        filtrarOferLaboralesAction({
          skip,
          estado: "Proceso Finalizado",
        })
      );
    }
  };

  useEffect(() => {
    if (skip > 0) {
      obtenerOfertasMore(query, indexTab, skip);
    }
  }, [skip]);

  return (
    <div className="ofertas-laborales">
      {usuario ? (
        usuario.activo === 1 ? (
          <>
            <Modal
              setOpen={setOpenModal}
              open={openModal}
              setIdEmp={setIdEmp}
              idEmp={idEmp}
            />
            <ModalAviso
              setOpen={setOpenModalAviso}
              open={openModalAviso}
              setIdAviso={setIdAviso}
              idAviso={idAviso}
              idEmp={idEmp}
              setIdEmp={setIdEmp}
            />
            <div className="titulo-page">
              <BusinessCenterOutlined className="icon-page-header-user" />
              <h1>Ofertas Laborales</h1>
            </div>
            <div className="cont-header-of-laborales-top">
              <div className="cont-header-of-laborales">
                <Header
                  setOpen={setOpen}
                  indexTab={indexTab}
                  setindexTab={setindexTab}
                  setSkip={setSkip}
                  obtenerOfertas={obtenerOfertas}
                  query={query}
                  setQuery={setQuery}
                  search={search}
                  setSearch={setSearch}
                />
              </div>
              <div className="empty-header-of"></div>
            </div>

            <div className="cont-cards-filtro-ofertas">
              <div className="cont-card-of-laborales" onScroll={handleScroll}>
                {cargando ? (
                  <div className="div-cargando-avisos">
                    <p>Cargando...</p>
                  </div>
                ) : indexTab === 0 || indexTab === 2 || indexTab === 3 ? (
                  ofertasLaborales.map((item) => (
                    <Card
                      data={item}
                      key={item._id}
                      setOpen={setOpenModal}
                      setOpenModalAviso={setOpenModalAviso}
                      setIdEmp={setIdEmp}
                      setIdAviso={setIdAviso}
                    />
                  ))
                ) : null}
                {indexTab === 1
                  ? postulaciones.map((item) => (
                      <Card
                        data={item}
                        key={item._id}
                        setOpen={setOpenModal}
                        setOpenModalAviso={setOpenModalAviso}
                        setIdEmp={setIdEmp}
                        setIdAviso={setIdAviso}
                      />
                    ))
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
              <div className="cont-filtro-of-laborales">
                <Filtro
                  open={open}
                  setOpen={setOpen}
                  query={query}
                  setindexTab={setindexTab}
                  obtenerOfertas={obtenerOfertas}
                  setQuery={setQuery}
                  setSkip={setSkip}
                />
              </div>
            </div>
            <FiltroDrawer
              open={open}
              setOpen={setOpen}
              query={query}
              setindexTab={setindexTab}
              obtenerOfertas={obtenerOfertas}
              setQuery={setQuery}
              setSkip={setSkip}
            />
          </>
        ) : (
          <ReEmail email={usuario.email} />
        )
      ) : null}
    </div>
  );
};

export default Ofertas;
