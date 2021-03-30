import React, { useState, useEffect } from "react";
import "./EditDate.css";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";
import { Button } from "../../../../components";
import { LinearProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { editarEmpresaAction } from "../../../../redux/actions/actions-admin/empresasAction";

const Republicar = ({ closeModal, data }) => {
  const dispatch = useDispatch();
  const [fechaTerminoError, setFechaTerminoError] = useState(false);
  const [fechaTermino, setFechaTermino] = useState(
    data ? data.fechaTermino : null
  );
  const [initDefault, setInitDefault] = useState(true);
  const [_switch, setSwitch] = useState(false);
  const [loading, setLoading] = useState(false);

  const validacion = () => {
    setLoading(true);

    if (fechaTermino === null) {
      setFechaTerminoError(true);
    }
    setInitDefault(false);
    setTimeout(() => {
      setLoading(false);
      setSwitch(!_switch);
    }, 500);
  };

  useEffect(() => {
    if (initDefault === false) {
      if (fechaTerminoError) {
        return;
      } else {
        dispatch(
          editarEmpresaAction({
            _id: data._id,
            fechaTermino,
          })
        ).then((res) => (res === true ? closeModal() : null));
      }
    }
  }, [_switch]);
  
  return (
    <div className="republicar-avisos-emp">
      <div className="sub-republicar-avisos-emp">
        <h1>Editar fecha de término</h1>
        <div className="dates-republicar-avisos-emp">
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <KeyboardDatePicker
              error={fechaTerminoError}
              size="small"
              fullWidth
              label="Fecha de término"
              format="dd/MM/yyyy"
              helperText={
                fechaTerminoError ? "Fecha Termino no puede estar vacio" : null
              }
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
