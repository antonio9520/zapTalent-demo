import React, { useState, useEffect } from "react";
import "./Card.css";
import icontrabajo from "../../../../resources/images/SapMitrabajos/icon-enterprise.svg";
import {
  BusinessCenter,
  Flight,
  Home,
  EventAvailable,
  EventBusy,
  Room,
  AccountCircle,
  QueryBuilder,
  EventSeat,
  Description,
  AccountTree,
} from "@material-ui/icons";
import { Button, Hidden } from "@material-ui/core";
import { Tooltip } from "../../../../components";
import NumberFormat from "react-number-format";
import {
  crearPostulacionAction,
  eliminarPostulacionAction,
} from "../../../../redux/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";

const Card = ({ data, setOpen, setIdEmp, setOpenModalAviso, setIdAviso }) => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);
  const postulaciones = useSelector(
    (state) => state.postulaciones.postulaciones
  );

  const {
    fechaInicio,
    fechaTermino,
    adns,
    fechaContratacion,
    titulo,
    _id,
    profesion,
    area,
    tipoConsultor,
    jornadaLaboral,
    tipoContrato,
    anosExpSap,
    cantidadVacantes,
    region,
    ciudad,
    dispResidencia,
    dispViajar,
    renta,
    beneficios,
    descripcion,
    estado,
    anosExp,
    razonSocial,
    logoURL,
    idusuario,
    // idemp,
    eliminado,
    idaviso,
  } = data;

  const [active, setActive] = useState(0);
  const [postulado, setPostulado] = useState(false);
  const [_switch, setSwitch] = useState(false);

  const MESES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const inicio = new Date(fechaInicio);
  const termino = new Date(fechaTermino);
  const now = new Date();
  const contratacion = new Date(fechaContratacion);

  const postular = () => {
    setSwitch(true);
    if (usuario) {
      dispatch(
        crearPostulacionAction({
          idaviso: _id,
          iduser: usuario._id,
          idemp: idusuario,
          titulo: titulo,
        })
      ).then(() => setSwitch(false));
    }
  };
  const cancelarPostulacion = async () => {
    setSwitch(true);
    const eliminar = await setearIdPost();

    if (eliminar) {
      await dispatch(
        eliminarPostulacionAction({ id_post: eliminar, _id })
      ).then((res) => (res ? setPostulado(false) : null));
    }
    setSwitch(false);
  };
  const eliminarPostulacion = async () => {
    await dispatch(
      eliminarPostulacionAction({ id_post: _id, _id: _id })
    ).then((res) => (res ? setPostulado(false) : null));
  };

  const setearIdPost = () => {
    let id_post;
    postulaciones.map((item) => {
      if (item._id === _id) {
        id_post = item.id_post;
      }
    });
    return id_post;
  };

  useEffect(() => {
    // postulaciones.map((item) => {
    //   if (item._id === _id) {
    //     setPostulado(true);
    //   }
    // });
    let result = postulaciones.filter((item) => item._id === _id);
    console.log(result);
    if (result[0]) {
      setPostulado(true);
    } else {
      setPostulado(false);
    }
  }, [postulaciones]);

  return (
    <>
      {eliminado ? (
        <div className="cont-aviso-eliminado-postulacion">
          <div className="item-2">
            <p>Aviso eliminado</p>
            <p>{titulo}</p>
            <p>
              <span style={{ textTransform: "uppercase" }}>
                #{idaviso.slice(18)}
              </span>
            </p>
          </div>
          <Button
            className="btn-cancelar-postular-ofertas-laborales"
            onClick={eliminarPostulacion}
          >
            <p>cancelar postulación</p>
          </Button>
        </div>
      ) : (
        <>
          <Hidden xsDown>
            <div className="card-ofertas-laborales">
              <div className="top-card-ofertas-laborales">
                <div className="item-1">
                  {data.logoURL ? (
                    <div className="logo-emp-of">
                      <img src={data.logoURL} alt="icon-trabajo" />
                    </div>
                  ) : (
                    <div>
                      <img src={icontrabajo} alt="icon-trabajo" />
                    </div>
                  )}
                </div>
                <div className="item-2">
                  <Tooltip title={`Ver Aviso: ${titulo}`} placement="top">
                    <h1
                      onClick={() => {
                        setIdAviso(data._id);
                        setIdEmp(idusuario);
                        setOpenModalAviso(true);
                      }}
                      style={{ cursor: "pointer" }}
                      className={
                        titulo
                          ? titulo.length > 22
                            ? "name-submod-large-card-ol"
                            : null
                          : null
                      }
                    >
                      {titulo}
                    </h1>
                  </Tooltip>
                  <p>{profesion}</p>
                  <Tooltip title="Ver información de empresa">
                    <p
                      onClick={() => {
                        setOpen(true);
                        setIdEmp(idusuario);
                      }}
                    >
                      {razonSocial}
                    </p>
                  </Tooltip>
                  <p>{area}</p>
                  <div>
                    {anosExp ? (
                      <p>{anosExp} años de experiencia</p>
                    ) : (
                      <p>Sin experiencia laboral</p>
                    )}
                  </div>
                </div>
                <div className="item-3">
                  <Tooltip title="Tipo de consultor">
                    <div>
                      <AccountCircle className="icon-card-ofertas-laborales" />
                      <p style={{ color: "#2B7DE6", fontWeight: "600" }}>
                        {tipoConsultor}
                      </p>
                    </div>
                  </Tooltip>

                  <Tooltip title="Tipo de Jornada">
                    <div>
                      <QueryBuilder className="icon-card-ofertas-laborales" />
                      <p>{jornadaLaboral}</p>
                    </div>
                  </Tooltip>
                  <Tooltip title="Fecha de contratación">
                    <div>
                      <BusinessCenter className="icon-card-ofertas-laborales" />
                      <p>
                        {fechaContratacion
                          ? contratacion.getDate() +
                            "/" +
                            contratacion.getMonth() +
                            "/" +
                            contratacion.getFullYear()
                          : null}
                      </p>
                    </div>
                  </Tooltip>
                  <Tooltip title="Disponibilidad de viajar">
                    <div>
                      <Flight className="icon-card-ofertas-laborales" />
                      {dispViajar ? <p>Si</p> : <p>No</p>}
                    </div>
                  </Tooltip>
                </div>

                <div className="item-4">
                  <Tooltip title="Experiencia SAP">
                    <div>
                      <AccountTree className="icon-card-ofertas-laborales" />
                      {anosExpSap ? (
                        <p style={{ color: "#2B7DE6", fontWeight: "600" }}>
                          {anosExpSap} Años
                        </p>
                      ) : (
                        <p style={{ color: "#2B7DE6", fontWeight: "600" }}>
                          Sin Experiencia
                        </p>
                      )}
                    </div>
                  </Tooltip>
                  <Tooltip title="Tipo de contrato">
                    <div>
                      <Description className="icon-card-ofertas-laborales" />
                      <p>{tipoContrato ? tipoContrato.value : null}</p>
                    </div>
                  </Tooltip>
                  <Tooltip title="Cantidad de Vacantes">
                    <div>
                      <EventSeat className="icon-card-ofertas-laborales" />
                      <p>{cantidadVacantes}</p>
                    </div>
                  </Tooltip>
                  <Tooltip title="Disponibilidad de cambio de residencia">
                    <div>
                      <Home className="icon-card-ofertas-laborales" />
                      {dispResidencia ? <p>Si</p> : <p>No</p>}
                    </div>
                  </Tooltip>
                </div>
                <div className="item-5">
                  <h5>Módulos y Submódulos</h5>
                  <div className="modulos-card-ofertas-laborales">
                    {adns
                      ? adns.map((item, index) => (
                          <Modulos
                            key={index}
                            data={item}
                            setActive={setActive}
                            num={index}
                            active={active}
                          />
                        ))
                      : null}
                  </div>
                  <div className="submodulos-card-ofertas-laborales">
                    {adns
                      ? adns[active].submodulos.map((item, index) => (
                          <SubModulos key={index} data={item} />
                        ))
                      : null}
                  </div>
                </div>
                <div className="item-6">
                  <div>
                    <textarea readOnly>{descripcion}</textarea>
                  </div>
                </div>
              </div>
              <div className="bottom-card-ofertas-laborales">
                <div className="item-1">
                  <EventAvailable className="icon-card-ofertas-laborales" />
                  <p>
                    {fechaInicio
                      ? MESES[inicio.getMonth()] +
                        " " +
                        inicio.getDate() +
                        " - " +
                        inicio.getFullYear()
                      : null}
                  </p>
                  <EventBusy className="icon-card-ofertas-laborales" />
                  <p>
                    {fechaTermino
                      ? MESES[termino.getMonth()] +
                        " " +
                        termino.getDate() +
                        " - " +
                        termino.getFullYear()
                      : null}
                  </p>
                </div>
                <div className="item-2">
                  <Room className="icon-card-ofertas-laborales" />
                  <p>
                    {ciudad}, {region}
                  </p>
                </div>
                <div className="item-3">
                  <p>
                    Salario:
                    {renta === 0 ? (
                      " A convenir"
                    ) : (
                      <NumberFormat
                        value={renta}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" $"}
                      />
                    )}
                  </p>
                  {postulado ? (
                    <Button
                      className="btn-cancelar-postular-ofertas-laborales"
                      onClick={cancelarPostulacion}
                      disabled={_switch}
                    >
                      <p>Cancelar Postulación</p>
                      {_switch ? (
                        <div className="loader-btn-postular">
                          <Loader
                            type="Oval"
                            color="#fff"
                            height={20}
                            width={20}
                            visible={_switch}
                            //  timeout={3000} //3 secs
                          />
                        </div>
                      ) : null}
                    </Button>
                  ) : (
                    <Button
                      className="btn-postular-ofertas-laborales"
                      style={{
                        opacity:
                          estado !== "Activo" || termino < now ? 0.5 : null,
                      }}
                      onClick={postular}
                      disabled={_switch || estado !== "Activo" || termino < now}
                    >
                      <p>Postular</p>
                      {_switch ? (
                        <div className="loader-btn-postular">
                          <Loader
                            type="Oval"
                            color="#fff"
                            height={20}
                            width={20}
                            visible={_switch}
                            //  timeout={3000} //3 secs
                          />
                        </div>
                      ) : null}
                    </Button>
                  )}
                </div>
              </div>
              <Tooltip
                title={`Estado: ${
                  termino < now ? "Exede la fecha de termino" : estado
                }`}
                placement="top"
              >
                <div
                  className="indicador-estado-oferta-laboral"
                  style={{
                    backgroundColor:
                      termino < now
                        ? "#EC4134"
                        : estado === "Activo"
                        ? "#00B526"
                        : estado === "Proceso Finalizado"
                        ? "#EC4134"
                        : estado === "Cancelado"
                        ? "#EC4134"
                        : null,
                  }}
                ></div>
              </Tooltip>
            </div>
          </Hidden>
          {/**CARD RESPONSIVA */}
          <Hidden smUp>
            <div className="card-ofertas-laborales-xs">
              <div className="top">
                <div className="left">
                  {data.logoURL ? (
                    <div className="logo-emp-of">
                      <img src={data.logoURL} alt="icon-trabajo" />
                    </div>
                  ) : (
                    <div>
                      <img src={icontrabajo} alt="icon-trabajo" />
                    </div>
                  )}
                </div>
                <div className="rigth">
                  <Tooltip title={`Ver Aviso: ${titulo}`} placement="top">
                    <h1
                      onClick={() => {
                        setIdAviso(data._id);
                        setIdEmp(idusuario);
                        setOpenModalAviso(true);
                      }}
                      style={{ cursor: "pointer" }}
                      className={
                        titulo
                          ? titulo.length > 18
                            ? "name-submod-large-card-ol"
                            : null
                          : null
                      }
                    >
                      {titulo}
                    </h1>
                  </Tooltip>
                  <p>{profesion}</p>
                  <Tooltip title="Ver información de empresa">
                    <p
                      onClick={() => {
                        setOpen(true);
                        setIdEmp(idusuario);
                      }}
                    >
                      {razonSocial}
                    </p>
                  </Tooltip>
                  <p>{area}</p>
                  <div>
                    {anosExp ? (
                      <p>{anosExp} años de experiencia</p>
                    ) : (
                      <p>Sin experiencia laboral</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="center">
                <h5>Módulos y submodulos</h5>
                <div className="modulos-card-ofertas-laborales">
                  {adns
                    ? adns.map((item, index) => (
                        <Modulos
                          key={index}
                          data={item}
                          setActive={setActive}
                          num={index}
                          active={active}
                        />
                      ))
                    : null}
                </div>
                <div className="submodulos-card-ofertas-laborales">
                  {adns
                    ? adns[active].submodulos.map((item, index) => (
                        <SubModulos key={index} data={item} />
                      ))
                    : null}
                </div>
              </div>
              <div className="bottom">
                <div className="item-1">
                  <div className="left">
                    <EventAvailable className="icon-card-ofertas-laborales" />
                    <p>
                      {fechaInicio
                        ? MESES[inicio.getMonth()] +
                          " " +
                          inicio.getDate() +
                          " - " +
                          inicio.getFullYear()
                        : null}
                    </p>
                  </div>
                  <div className="rigth">
                    <EventBusy className="icon-card-ofertas-laborales" />
                    <p>
                      {fechaTermino
                        ? MESES[termino.getMonth()] +
                          " " +
                          termino.getDate() +
                          " - " +
                          termino.getFullYear()
                        : null}
                    </p>
                  </div>
                </div>
                <div className="item-2">
                  <Room className="icon-card-ofertas-laborales" />
                  <p>
                    {ciudad}, {region}
                  </p>
                </div>
                <div className="item-3">
                  <p>
                    Salario:
                    {renta === 0 ? (
                      " A convenir"
                    ) : (
                      <NumberFormat
                        value={renta}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={" $"}
                      />
                    )}
                  </p>
                </div>
              </div>
              <Tooltip
                title={`Estado: ${
                  termino < now ? "Exede la fecha de termino" : estado
                }`}
                placement="top"
              >
                <div
                  className="indicador-estado-oferta-laboral"
                  style={{
                    backgroundColor:
                      termino < now
                        ? "#EC4134"
                        : estado === "Activo"
                        ? "#00B526"
                        : estado === "Proceso Finalizado"
                        ? "#EC4134"
                        : estado === "Cancelado"
                        ? "#EC4134"
                        : null,
                  }}
                ></div>
              </Tooltip>
            </div>
          </Hidden>
        </>
      )}
    </>
  );
};

export default Card;

const Modulos = ({ data, num, setActive, active }) => {
  const [activeM, setActiveM] = useState(false);

  const handleClick = () => {
    setActiveM(!activeM);
    setActive(num);
  };
  useEffect(() => {
    if (num === active) {
      setActiveM(true);
    } else {
      setActiveM(false);
    }
  }, [active]);
  return (
    <>
      <Tooltip title={data.desc ? data.desc : ""} placement="top">
        <div
          className={activeM ? "modulo-activo-ol" : "modulo-inactivo-ol"}
          onClick={handleClick}
        >
          <p className={data.modulo.length > 6 ? "name-submod-large" : null}>
            {data.modulo}
          </p>
        </div>
      </Tooltip>
    </>
  );
};

const SubModulos = ({ data }) => {
  return (
    <>
      <Tooltip title={data.desc ? data.desc : ""} placement="top">
        <div
          className={"modulo-activo-ol"}
          style={{ position: "relative", marginTop: "3px" }}
        >
          <p className={data.submodulo.length > 6 ? "name-submod-large" : null}>
            {data.submodulo}
          </p>
        </div>
      </Tooltip>
    </>
  );
};
