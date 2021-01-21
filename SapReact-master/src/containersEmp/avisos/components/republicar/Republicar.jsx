import React, { useState, useEffect } from "react";
import "./Republicar.css";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";
import { Button } from "../../../../components";
import { LinearProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { editarAvisoAction } from "../../../../redux/actions/actions-emp/avisosAction";

const Republicar = ({ closeModal, data }) => {
  const dispatch = useDispatch();
  const [fechaInicioError, setFechaInicioError] = useState(false);
  const [fechaTerminoError, setFechaTerminoError] = useState(false);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaTermino, setFechaTermino] = useState(null);
  const [fechaMsg, setFechaMsg] = useState("");
  const [initDefault, setInitDefault] = useState(true);
  const [_switch, setSwitch] = useState(false);
  const [loading, setLoading] = useState(false);

  const validacion = () => {
    setLoading(true);
    if (fechaInicio === null) {
      setFechaInicioError(true);
    }
    if (fechaTermino === null) {
      setFechaTerminoError(true);
      setFechaMsg("Fecha Termino no puede estar vacio");
    } else {
      if (Date.parse(fechaInicio) > Date.parse(fechaTermino)) {
        setFechaTerminoError(true);
        setFechaMsg("Fecha Termino no puede ser menor a la fecha Inicial");
      }
    }
    setInitDefault(false);
    setTimeout(() => {
      setLoading(false);
      setSwitch(!_switch);
    }, 500);
  };

  useEffect(() => {
    if (initDefault === false) {
      if (fechaInicioError || fechaTerminoError) {
        return;
      } else {
        dispatch(
          editarAvisoAction({
            _id: data._id,
            fechaInicio,
            fechaTermino,
          })
        ).then((res) => (res === true ? closeModal() : null));
      }
    }
  }, [_switch]);
  return (
    <div className="republicar-avisos-emp">
      <div className="sub-republicar-avisos-emp">
        <h1>Republicar</h1>
        <div className="dates-republicar-avisos-emp">
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <div className="date-left-estudio">
              <KeyboardDatePicker
                error={fechaInicioError}
                fullWidth
                size="small"
                label="Inicio"
                minDate={new Date()}
                maxDate={new Date("2030-01-01")}
                helperText={
                  fechaInicioError ? "Fecha inicio no puede estar vacio" : null
                }
                format="dd/MM/yyyy"
                value={fechaInicio}
                // maxDate={new Date()}
                onChange={(newValue) => {
                  setFechaInicioError(false);
                  setFechaInicio(newValue);
                }}
                InputProps={{
                  className: "input-date-picker-inicio",
                  readOnly: true,
                }}
                className="date-picker-inicio"
                InputLabelProps={{ className: "input-label-date-form" }}
              />
            </div>
            <div className="date-right-estudio">
              <KeyboardDatePicker
                error={fechaTerminoError}
                size="small"
                fullWidth
                label="Término"
                format="dd/MM/yyyy"
                helperText={fechaTerminoError ? fechaMsg : null}
                value={fechaTermino}
                minDate={new Date()}
                maxDate={new Date("2030-01-01")}
                // maxDate={new Date()}
                onChange={(newValue) => {
                  setFechaTerminoError(false);
                  setFechaTermino(newValue);
                }}
                InputProps={{
                  className: "input-date-picker-inicio",
                  readOnly: true,
                }}
                className="date-picker-inicio"
                InputLabelProps={{ className: "input-label-date-form" }}
              />
            </div>
          </MuiPickersUtilsProvider>
        </div>
        <div className="cont-btns-form-emp">
          <Button variant="contained" color="primary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={validacion}>
            Guardar
          </Button>
        </div>
      </div>
      {loading ? (
        <>
          <div className="overlay-loading"></div>
          <div className="linear-progres-global">
            <LinearProgress className="progres-editar-perfil" />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Republicar;
