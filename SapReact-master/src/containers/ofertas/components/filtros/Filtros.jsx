import React, { useState } from "react";
import "./Filtros.css";
import { Drawer, MenuItem } from "@material-ui/core";
import { filtrarOferLaboralesAction } from "../../../../redux/actions/ofertasLaboralesAction";
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

const Filtros = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const [tipoConsultor, setTipoConsultor] = useState(null);
  const [anosExp, setAnosExp] = useState(null);
  const [area, setArea] = useState(null);
  const [minimo, setMinimo] = useState(null);
  const [maximo, setMaximo] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [tipoContrato, setTipoContrato] = useState(null);
  const [comuna, setComuna] = useState(null);
  const [region, setRegion] = useState(null);
  const [tipoJornada, setTipoJornada] = useState(null);
  const comunas = regiones.find((item) => item.region === region);
  const query = {};
  const date = new Date(fecha);
  date.setDate(date.getDate() - 1);
  const filtrar = () => {
    if (tipoConsultor) query.tipoConsultor = tipoConsultor;

    if (anosExp) query.anosExpSap = anosExp;

    if (area) query.area = area;

    if (minimo) query.minimo = minimo;

    if (maximo) query.maximo = maximo;

    if (fecha) query.fecha = date;

    if (tipoContrato) query.tipoContrato = tipoContrato;

    if (region) query.region = region;

    if (comuna) query.comuna = comuna;

    if (tipoJornada) {
      query.jornadaLaboral = tipoJornada;
    }

    dispatch(filtrarOferLaboralesAction(query)).then(() => setOpen(false));
  };

  const limpiarFiltros = () => {
    setTipoConsultor(null);
    setAnosExp(null);
    setArea(null);
    setMinimo(null);
    setMaximo(null);
    setFecha(null);
    setTipoContrato(null);
    setComuna(null);
    setRegion(null);
    setTipoJornada(null);
    dispatch(filtrarOferLaboralesAction({})).then(() => setOpen(false));
  };
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div className="cont-filtros-ofertas-laborales">
        <div className="item-1">
          <p>Filtros</p>
        </div>
        <div className="item-2">
          <p>ADN-SAP</p>
          <CustomSelect
            placeholder="Selecciona"
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
        </div>
        <div className="item-2">
          <p>Años de experiencia SAP</p>
          <OutInput
            // label="Nombres"
            // helpertext={nombresmsg}
            funcOnChange={setAnosExp}
            // defaultValue={nombres}
            value={anosExp}
            name="anosExp"
            size="small"
            type="number"
            // error={errornombre}
            // funcionError={setErrorNombre}
          />
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
            <OutInput
              label="Mínimo"
              // helpertext={nombresmsg}
              funcOnChange={setMinimo}
              // defaultValue={nombres}
              name="minimo"
              size="small"
              type="number"
              // error={errornombre}
              // funcionError={setErrorNombre}
            />
            <OutInput
              label="Maximo"
              // helpertext={nombresmsg}
              funcOnChange={setMaximo}
              // defaultValue={nombres}
              name="maximo"
              size="small"
              type="number"
              // error={errornombre}
              // funcionError={setErrorNombre}
            />
          </div>
        </div>
        <div className="item-2">
          <p>Fecha Publicación</p>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <KeyboardDatePicker
              // error={fechaInicioError}
              fullWidth
              size="small"
              label="Inicio"
              minDate={new Date("2010-01-01")}
              maxDate={new Date("2030-01-01")}
              // helperText={
              //   fechaInicioError ? "Fecha inicio no puede estar vacio" : null
              // }
              format="dd/MM/yyyy"
              value={fecha}
              // maxDate={new Date()}
              onChange={(newValue) => {
                setFecha(newValue);
              }}
              InputProps={{
                className: "input-date-picker-inicio",
                readOnly: true,
              }}
              className="date-picker-inicio"
              InputLabelProps={{ className: "input-label-date-form" }}
            />
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
        {/* <div className="item-2">
          <p>Cargo</p>
          <CustomSelect placeholder="Selecciona" size="small">
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
        </div> */}
        <div className="item-2">
          <p>Geografico</p>
          <div className="item-doble-filtros-of">
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
        <div className="item-2">
          <p>Tipo Jornada</p>
          <CustomSelect
            placeholder="Selecciona"
            size="small"
            onChange={setTipoJornada}
            value={tipoJornada}
            name="tipoJornada"
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
          <Button variant="contained" color="primary" onClick={limpiarFiltros}>
            <p style={{ margin: 0 }}>Limpiar</p>
          </Button>
          <Button variant="contained" color="primary" onClick={filtrar}>
            <p style={{ margin: 0 }}>Filtrar</p>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default Filtros;
