import React, { useState } from "react";
// import "./Filtro.css";
import { CustomSelect, Button, OutInput } from "../../../../components";
import { MenuItem, Drawer } from "@material-ui/core";
import { HighlightOff, FilterList } from "@material-ui/icons";
import { modulos } from "../../../../assets/modulos";
import { regiones } from "../../../../assets/regiones";
import { actEmpresa } from "../../../../assets/actEmpresa";
import { estudios_data as carreras } from "../../../../assets/estudios";

const Filtro = ({
  value,
  setQuery,
  query,
  setSkip,
  skip,
  _switch,
  setSwitch,
  dataFiltro,
  open,
  setOpen,
}) => {
  const [anuncio, setAnuncio] = useState(null);
  const [tipoConsultor, setTipoConsultor] = useState(null);
  const [_modulo, setModulos] = useState(null);
  const [_submodulo, setSubmodulos] = useState(null);
  const [carrera, setCarrera] = useState(null);
  const [nivel, setNivel] = useState(null);
  const [industria, setIndustria] = useState(null);
  const [sexo, setSexo] = useState(null);
  const [comuna, setComuna] = useState(null);
  const [region, setRegion] = useState(null);
  const [anosExpMin, setAnosExpMin] = useState(null);
  const [anosExpMax, setAnosExpMax] = useState(null);

  const comunas = regiones.find((item) => item.region === region);
  const submodulos = modulos.find((item) => item.modulo === _modulo);

  const filtrar = () => {
    if (tipoConsultor) query.tipoConsultor = tipoConsultor;
    if (_modulo) query.modulo = _modulo;
    if (_submodulo) query.submodulo = _submodulo;
    if (carrera) query.carrera = carrera;
    if (nivel) query.nivel = nivel;
    if (industria) query.industria = industria;
    if (sexo) query.sexo = sexo;
    if (comuna) query.comuna = comuna;
    if (region) query.region = region;
    if (anosExpMin) query.anosExpMin = anosExpMin;
    if (anosExpMax) query.anosExpMax = anosExpMax;
    if (skip > 0) {
      setSkip(0);
    } else {
      setSwitch(!_switch);
    }
  };
  let data_carrera = carreras.find((item) => item.institucion === "Otros");

  const limpiarFiltros = () => {
    setQuery({});
    setAnuncio(null);
    setTipoConsultor(null);
    setModulos(null);
    setSubmodulos(null);
    setCarrera(null);
    setNivel(null);
    setIndustria(null);
    setSexo(null);
    setComuna(null);
    setRegion(null);
    setAnosExpMin(null);
    setAnosExpMax(null);
    setSkip(0);
    setSwitch(!_switch);
    return;
  };
  const setIdAviso = (id) => {
    setQuery({ ...query, _id: id });
  };
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div className="cont-filtro-eco-sap-emp">
        <div className="title-filtros-eco-sap">
          <h1>Filtros</h1>
        </div>
        {value === 1 ? (
          <div className="item">
            <p>Anuncio</p>
            <CustomSelect
              onChange={setAnuncio}
              value={anuncio}
              size="small"
              placeholder="Selecciona un anuncio"
            >
              <MenuItem
                value=""
                className="custom-menu-item"
                onClick={() => setIdAviso(null)}
              >
                <em>Ninguno</em>
              </MenuItem>
              {dataFiltro.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    className="custom-menu-item"
                    value={item.titulo}
                    onClick={() => setIdAviso(item._id)}
                  >
                    {item.titulo + " #"}
                    <span style={{ textTransform: "uppercase" }}>
                      {item._id.slice(18)}
                    </span>
                  </MenuItem>
                );
              })}
            </CustomSelect>
          </div>
        ) : null}

        <div className="item">
          <p>ADN-SAP</p>
          <CustomSelect
            placeholder="Tipo Consultor"
            size="small"
            onChange={setTipoConsultor}
            value={tipoConsultor}
            // error={errorconsultor}
            // helpertext="Seleccione un tipo de consultor"
            // funcionError={setErrorConsultor}
            name="consultor"
          >
            <MenuItem className="custom-menu-item" value="Training">
              Training
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Junior">
              Junior
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Semi Senior">
              Semi Senior
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Senior">
              Senior
            </MenuItem>
          </CustomSelect>

          <div className="item-doble-filtros-of">
            <div style={{ marginRight: "5px", flex: 1 }}>
              <CustomSelect
                placeholder="Modulo"
                size="small"
                onChange={setModulos}
                value={_modulo}
                // error={errorconsultor}
                // helpertext="Seleccione un tipo de consultor"
                // funcionError={setErrorConsultor}
                name="consultor"
              >
                {modulos.map((item, index) => (
                  <MenuItem
                    key={index}
                    className="custom-menu-item"
                    value={item.modulo}
                  >
                    {item.modulo}
                  </MenuItem>
                ))}
              </CustomSelect>
            </div>
            <div style={{ marginLeft: "5px", flex: 1 }}>
              <CustomSelect
                placeholder="SubModulo"
                size="small"
                onChange={setSubmodulos}
                value={_submodulo}
                // error={errorconsultor}
                // helpertext="Seleccione un tipo de consultor"
                // funcionError={setErrorConsultor}
                name="consultor"
              >
                {submodulos ? (
                  submodulos.submodulos.map((item, index) => (
                    <MenuItem
                      key={index}
                      className="custom-menu-item"
                      value={item.submodulo}
                    >
                      {item.submodulo}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem className="custom-menu-item" value={null}>
                    Seleccione un modulo
                  </MenuItem>
                )}
              </CustomSelect>
            </div>
          </div>
        </div>
        <div className="item">
          <p>Años de experiencia SAP</p>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, paddingRight: "5px" }}>
              <OutInput
                label="Año mínimo"
                // helpertext={nombresmsg}
                funcOnChange={setAnosExpMin}
                // defaultValue={nombres}
                value={anosExpMin}
                name="anosExp"
                size="small"
                type="number"
                // error={errornombre}
                // funcionError={setErrorNombre}
              />
            </div>
            <div style={{ flex: 1, paddingLeft: "5px" }}>
              <OutInput
                label="Año maximo"
                // helpertext={nombresmsg}
                funcOnChange={setAnosExpMax}
                // defaultValue={nombres}
                value={anosExpMax}
                name="anosExp"
                size="small"
                type="number"
                // error={errornombre}
                // funcionError={setErrorNombre}
              />
            </div>
          </div>
        </div>
        <div className="item">
          <p>Industria</p>
          <CustomSelect
            size="small"
            placeholder="Selecciona"
            onChange={setIndustria}
            value={industria}
          >
            {actEmpresa.map((item, index) => (
              <MenuItem
                key={index}
                className="custom-menu-item"
                value={item.Seleccionar}
              >
                {item.Seleccionar}
              </MenuItem>
            ))}
          </CustomSelect>
        </div>
        <div className="item">
          <p>Carrera</p>
          <CustomSelect
            size="small"
            placeholder="Selecciona"
            onChange={setCarrera}
            value={carrera}
          >
            {data_carrera
              ? data_carrera.carreras.map((item, index) => (
                  <MenuItem
                    key={index}
                    className="custom-menu-item"
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))
              : null}
          </CustomSelect>
        </div>
        {carrera ? (
          <div className="item">
            <p>Nivel de estudio</p>
            <CustomSelect
              size="small"
              placeholder="Selecciona"
              onChange={setNivel}
              value={nivel}
            >
              <MenuItem className="custom-menu-item" value="Secundario">
                Secundario
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Terciario">
                Terciario
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Universitario">
                Universitario
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Postgrado">
                Postgrado
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Master">
                Master
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Doctorado">
                Doctorado
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Otros">
                Otros
              </MenuItem>
            </CustomSelect>
          </div>
        ) : null}

        <div className="item">
          <p>Género</p>
          <CustomSelect
            size="small"
            placeholder="Selecciona"
            onChange={setSexo}
            value={sexo}
          >
            <MenuItem className="custom-menu-item" value="Masculino">
              Masculino
            </MenuItem>
            <MenuItem className="custom-menu-item" value="Femenino">
              Femenino
            </MenuItem>
          </CustomSelect>
        </div>

        <div className="item">
          <p>Geografico</p>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, paddingRight: "5px" }}>
              <CustomSelect
                size="small"
                placeholder="Región"
                onChange={setRegion}
                value={region}
              >
                {regiones.map((item, index) => (
                  <MenuItem
                    className="custom-menu-item"
                    key={index}
                    value={item.region}
                  >
                    {item.region}
                  </MenuItem>
                ))}
              </CustomSelect>
            </div>
            <div style={{ flex: 1, paddingLeft: "5px" }}>
              <CustomSelect
                size="small"
                placeholder="Comuna"
                onChange={setComuna}
                value={comuna}
              >
                {comunas ? (
                  comunas.comunas.map((item, index) => (
                    <MenuItem
                      className="custom-menu-item"
                      key={index}
                      value={item}
                    >
                      {item}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem className="custom-menu-item" value="">
                    Seleccione una región
                  </MenuItem>
                )}
              </CustomSelect>
            </div>
          </div>
        </div>

        <div className="item-bottom">
          <Button
            variant="contained"
            color="secondary"
            onClick={limpiarFiltros}
            endIcon={<HighlightOff style={{ color: "white" }} />}
          >
            <p style={{ margin: 0, color: "white" }}>Limpiar</p>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={filtrar}
            endIcon={<FilterList />}
          >
            <p style={{ margin: 0 }}>Filtrar</p>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default Filtro;
