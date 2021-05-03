import React, { useState, useEffect } from "react";
import "./Filtros.css";
import { Drawer, MenuItem, TextField, withStyles } from "@material-ui/core";
import { FilterList, HighlightOff } from "@material-ui/icons";
import { CustomSelect, Button, OutInput } from "../../../../components";
import { useDispatch } from "react-redux";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";
import { regiones } from "../../../../assets/regiones";
import { actEmpresa } from "../../../../assets/actEmpresa";
import { modulos } from "../../../../assets/modulos";
import NumberFormat from "react-number-format";

const CssTextField = withStyles({
  root: {
    backgroundColor: "#f3f8fe",
    maxHeight: "35px ",

    "& label": {
      fontSize: "12px",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      maxHeight: "35px",
      fontSize: "12px",
    },
    "& .MuiFormHelperText-root": {
      backgroundColor: "#fff3f2",
      border: "1px solid#FEB0A9",
      fontSize: "10px !important",
      width: "100%",
      color: "inherit !important",
      marginLeft: 0,
      borderBottomLeftRadius: "5px",
      borderBottomRightRadius: "5px",
      height: "20px",
      paddingLeft: "15px",
      marginTop: "-1px",
    },
  },
})(TextField);

const Filtros = ({
  open,
  setOpen,

  setindexTab,
  obtenerOfertas,
  setQuery,
  setSkip,
}) => {
  const dispatch = useDispatch();

  const [tipoConsultor, setTipoConsultor] = useState(null);
  const [anosExpMin, setAnosExpMin] = useState(null);
  const [anosExpMax, setAnosExpMax] = useState(null);
  const [anosExpError, setAnosExpError] = useState(false);
  const [area, setArea] = useState(null);
  const [minimo, setMinimo] = useState(null);
  const [maximo, setMaximo] = useState(null);
  const [errorminimo, setErrorMinimo] = useState(false);

  const [fechaini, setFechaIni] = useState(null);
  const [fechafin, setFechaFin] = useState(null);
  const [tipoContrato, setTipoContrato] = useState(null);
  const [comuna, setComuna] = useState(null);
  const [region, setRegion] = useState(null);
  const [_modulo, setModulos] = useState(null);
  const [_submodulo, setSubmodulos] = useState(null);
  const [tipoJornada, setTipoJornada] = useState(null);
  const comunas = regiones.find((item) => item.region === region);
  const submodulos = modulos.find((item) => item.modulo === _modulo);
  let query = {};
  const date1 = new Date(fechaini);
  date1.setDate(date1.getDate() - 1);
  const date2 = new Date(fechafin);
  date2.setDate(date2.getDate() - 1);

  const filtrar = () => {
    if (anosExpMin > anosExpMax) {
      setAnosExpError(true);
      return;
    }

    if (minimo > maximo) {
      setErrorMinimo(true);
      return;
    }
    if (tipoConsultor) query.tipoConsultor = tipoConsultor;

    if (anosExpMin) query.anosExpMin = anosExpMin;

    if (anosExpMax) query.anosExpMax = anosExpMax;

    if (area) query.area = area;

    if (minimo) query.minimo = minimo;

    if (maximo) query.maximo = maximo;

    if (fechaini) query.fechaini = date1;

    if (fechafin) query.fechafin = date2;

    if (tipoContrato) query.tipoContrato = tipoContrato;

    if (region) query.region = region;

    if (comuna) query.comuna = comuna;

    if (tipoJornada) {
      query.jornadaLaboral = tipoJornada;
    }
    if (_modulo) {
      query.modulos = _modulo;
    }
    if (_submodulo) {
      query.submodulos = _submodulo;
    }
    query.estado = "Activo";
    query.skip = 0;
    console.log(query);
    setindexTab(0);
    setSkip(0);
    setQuery(query);
    obtenerOfertas(query, 0);
    setOpen(false);
  };

  const limpiarFiltros = () => {
    setTipoConsultor(null);
    setAnosExpMin(null);
    setAnosExpMax(null);
    setArea(null);
    setFechaIni(null);
    setFechaFin(null);
    setMinimo(null);
    setMaximo(null);
    setModulos(null);
    setSubmodulos(null);

    setTipoContrato(null);
    setComuna(null);
    setRegion(null);
    setTipoJornada(null);
    setQuery({});
    setSkip(0);
    query = {};
    query.skip = 0;
    // dispatch(filtrarOferLaboralesAction({ skip: 0 })).then(() =>
    //   setOpen(false)
    // );
    obtenerOfertas(query, 0);
    setOpen(false);
  };
  useEffect(() => {
    setSubmodulos(null);
  }, [_modulo]);
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div className="cont-filtros-ofertas-laborales">
        <div className="item-1">
          <p>Filtros</p>
        </div>
        <div className="cont-filtros-of">
          <div className="item-2">
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
                  placeholder="Módulo"
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
                  placeholder="SubMódulo"
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
          <div className="item-2">
            <p>Años de experiencia SAP</p>

            <div className="item-doble-filtros-of">
              <div style={{ marginRight: "5px", flex: 1 }}>
                <OutInput
                  label="Año mínimo"
                  helpertext="Rango invalido"
                  funcOnChange={setAnosExpMin}
                  // defaultValue={nombres}
                  value={anosExpMin}
                  name="anosExp"
                  size="small"
                  type="number"
                  error={anosExpError}
                  funcionError={setAnosExpError}
                />
              </div>
              <div style={{ marginLeft: "5px", flex: 1 }}>
                <OutInput
                  label="Año Máximo"
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
          <div className="item-2">
            <p>Industria</p>
            <CustomSelect
              placeholder="Selecciona"
              size="small"
              onChange={setArea}
              value={area}
              name="area"
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
          <div className="item-2">
            <p>Renta</p>
            <div className="item-doble-filtros-of">
              <div style={{ marginRight: "5px", flex: 1 }}>
                <CssTextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={errorminimo}
                  label="Renta Mínima"
                  // helperText="Rango invalido"
                  value={minimo}
                  onChange={(e) => {
                    setErrorMinimo(false);
                    setMinimo(e.target.value);
                  }}
                  name="rentaMinima"
                  id="formatted-numberformat-input-d"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </div>
              <div style={{ marginLeft: "5px", flex: 1 }}>
                <CssTextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  // error={errormaximo}
                  label="Renta Máxima"
                  // helperText={pretencionMsg}
                  value={maximo}
                  onChange={(e) => {
                    // setErrorMaximo(false);
                    setMaximo(e.target.value);
                  }}
                  name="rentaMaxima"
                  id="formatted-numberformat-input-c"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="item-2">
            <p>Fecha Publicación</p>

            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
              <div className="item-doble-filtros-of">
                <div style={{ marginRight: "5px", flex: 1 }}>
                  <KeyboardDatePicker
                    // error={fechaInicioError}
                    fullWidth
                    size="small"
                    label="Fecha mínima"
                    minDate={new Date("2010-01-01")}
                    maxDate={new Date("2030-01-01")}
                    // helperText={
                    //   fechaInicioError ? "Fecha inicio no puede estar vacio" : null
                    // }
                    format="dd/MM/yyyy"
                    value={fechaini}
                    // maxDate={new Date()}
                    onChange={(newValue) => {
                      setFechaIni(newValue);
                    }}
                    InputProps={{
                      className: "input-date-picker-inicio",
                      readOnly: true,
                    }}
                    className="date-picker-inicio"
                    InputLabelProps={{ className: "input-label-date-form" }}
                  />
                </div>
                <div style={{ marginLeft: "5px", flex: 1 }}>
                  <KeyboardDatePicker
                    // error={fechaInicioError}
                    fullWidth
                    size="small"
                    label="Fecha Máxima"
                    minDate={new Date("2010-01-01")}
                    maxDate={new Date("2030-01-01")}
                    // helperText={
                    //   fechaInicioError ? "Fecha inicio no puede estar vacio" : null
                    // }
                    format="dd/MM/yyyy"
                    value={fechafin}
                    // maxDate={new Date()}
                    onChange={(newValue) => {
                      setFechaFin(newValue);
                    }}
                    InputProps={{
                      className: "input-date-picker-inicio",
                      readOnly: true,
                    }}
                    className="date-picker-inicio"
                    InputLabelProps={{ className: "input-label-date-form" }}
                  />
                </div>
              </div>
            </MuiPickersUtilsProvider>
          </div>
          <div className="item-2">
            <p>Tipo Contrato</p>
            <CustomSelect
              placeholder="Selecciona"
              size="small"
              onChange={setTipoContrato}
              value={tipoContrato}
              name="area"
            >
              <MenuItem className="custom-menu-item" value="Plazo fijo">
                Plazo fijo
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Aprendizaje">
                Aprendizaje
              </MenuItem>
              <MenuItem className="custom-menu-item" value="A trato">
                A trato
              </MenuItem>
              <MenuItem className="custom-menu-item" value="De temporada">
                De temporada
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Indefinido">
                Indefinido
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Otro">
                Otro
              </MenuItem>
            </CustomSelect>
          </div>

          <div className="item-2">
            <p>Geográfico</p>
            <div className="item-doble-filtros-of">
              <div style={{ marginRight: "5px", flex: 1 }}>
                <CustomSelect
                  placeholder="Región"
                  size="small"
                  onChange={setRegion}
                  value={region}
                  // error={errorconsultor}
                  // helpertext="Seleccione un tipo de consultor"
                  // funcionError={setErrorConsultor}
                  name="region"
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
              <div style={{ marginLeft: "5px", flex: 1 }}>
                <CustomSelect
                  placeholder="Comuna"
                  size="small"
                  onChange={setComuna}
                  value={comuna}
                  name="comuna"
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
          <div className="item-2">
            <p>Tipo Jornada</p>
            <CustomSelect
              placeholder="Selecciona"
              size="small"
              onChange={setTipoJornada}
              value={tipoJornada}
            >
              <MenuItem className="custom-menu-item" value="60 horas semanales">
                60 horas semanales
              </MenuItem>
              <MenuItem className="custom-menu-item" value="45 horas semanales">
                45 horas semanales
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Bisemanal">
                Bisemanal
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Part-time">
                Part-time
              </MenuItem>
              <MenuItem
                className="custom-menu-item"
                value="Jornada extraordinaria"
              >
                Jornada extraordinaria
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Desde casa">
                Desde casa
              </MenuItem>
              <MenuItem className="custom-menu-item" value="Teletrabajo">
                Teletrabajo
              </MenuItem>
            </CustomSelect>
          </div>
          <div className="item-11">
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
      </div>
    </Drawer>
  );
};

export default Filtros;

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      // onChange={(e) => onChange(e.target.value)}
      thousandSeparator
      isNumericString
      prefix="$ "
    />
  );
}
