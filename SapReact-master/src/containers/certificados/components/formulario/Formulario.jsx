import React, { useState } from "react";
import "./Formulario.css";
import {
  IconButton,
  TextField,
  InputAdornment,
  ListItem,
  MenuItem,
  LinearProgress,
} from "@material-ui/core";
import { Close, CloudUpload } from "@material-ui/icons";
import { CustomInput, CustomSelectB, Tooltip } from "../../../../components";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";
import { useSelector, useDispatch } from "react-redux";
import { paises } from "../../../../assets/paises";
import { agregarCertificadoAction } from "../../../../redux/actions/certificadoAction";
import { estudios_data } from "../../../../assets/estudios";

const Formulario = (props) => {
  const { setOpenModal } = props;
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);
  const loading = useSelector((state) => state.certificado.cargando);
  // let loading = true;
  //data
  const [idusuario] = useState(usuario._id);
  const [certificacion, setCertificacion] = useState("");
  const [universidad, setUniversidad] = useState(null);
  const [pais, setPais] = useState(null);
  const [obs, setObs] = useState("");
  const [fecha, setValueI] = useState(null);
  const [active, setActive] = useState("Egresado");
  //errores
  const [errorCert, setErrorCert] = useState(false);
  const [errorUniver, setErrorUniver] = useState(false);
  const [errorPais, setErrorPais] = useState(false);
  const [errorObs, setErrorObs] = useState(false);
  const [errorFecha, setErrorFecha] = useState(false);

  //file
  const [file, setFile] = useState(null);
  const certificadoURL = file;

  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const guardarCertificado = () => {
    if (certificacion.trim() === "") {
      setErrorCert(true);
      return;
    }
    if (universidad === null) {
      setErrorUniver(true);
      return;
    }
    if (pais === null) {
      setErrorPais(true);
      return;
    }
    if (obs.trim() === "") {
      setErrorObs(true);
      return;
    }
    if (fecha === null) {
      setErrorFecha(true);
      return;
    }

    dispatch(
      agregarCertificadoAction({
        idusuario,
        certificacion,
        universidad,
        pais,
        obs,
        fecha,
        estado: active,
        certificadoURL,
      })
    ).then((res) => (res === true ? setOpenModal(false) : null));
  };

  const changeInit = (value) => {
    if (errorFecha) {
      setErrorFecha(false);
    }
    setValueI(value);
  };

  return (
    <div className="cont-form-cert">
      <div className="cont-btn-close-cert">
        <IconButton onClick={() => setOpenModal(false)}>
          <Close />
        </IconButton>
      </div>
      <div className="top-form-cert">
        <p>Ingresa un certificado</p>
      </div>
      <div className="center-form-cert">
        <div className="item-center-cert">
          <CustomInput
            label="Certificación"
            defaultValue={certificacion}
            type="text"
            name="certificado"
            error={errorCert}
            onChange={(e) => {
              if (errorCert) {
                setErrorCert(false);
              }
              setCertificacion(e.target.value);
            }}
            helpertext="Certificado no puede estar vacio"
          />
        </div>
        <div className="item-center-cert">
          <CustomSelectB
            label="Universidad/Instituto"
            onChange={(e) => {
              setErrorUniver(false);
              setUniversidad(e.target.value);
            }}
            name="university"
            value={universidad}
            error={errorUniver}
            helpertext="Seleccione un item"
          >
           {estudios_data.map((item, index) => (
              <MenuItem
                className="custom-menu-item"
                key={index}
                value={item.institucion}
              >
                {item.institucion}
              </MenuItem>
            ))}
          </CustomSelectB>
        </div>
        <div className="item-center-cert-date">
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <div className="cont-date-left-cert">
              <KeyboardDatePicker
                error={errorFecha}
                fullWidth
                size="small"
                label="Inicio"
                openTo="year"
                views={["year", "month"]}
                value={fecha}
                helperText={errorFecha ? "Seleccione una fecha" : null}
                maxDate={new Date()}
                onChange={(newValue) => changeInit(newValue)}
                InputProps={{
                  className: "input-date-picker-inicio",
                  readOnly: true,
                }}
                className="date-picker-inicio"
                InputLabelProps={{ className: "input-label-date-form" }}
              />
            </div>
          </MuiPickersUtilsProvider>
          <div className="cont-date-right-cert">
            <CustomSelectB
              label="País"
              onChange={(e) => {
                setErrorPais(false);
                setPais(e.target.value);
              }}
              name="country"
              value={pais}
              error={errorPais}
              helpertext="Seleccione un país"
            >
              {paises.map((item, index) => (
                <MenuItem
                  className="custom-menu-item"
                  key={index}
                  value={item.name}
                >
                  {item.name}
                </MenuItem>
              ))}
            </CustomSelectB>
          </div>
        </div>
        <div className="campo-radio-estudio">
          <p className="p1-estado-estudios">Estado</p>
          <div className="cont-radio-estudios">
            <div
              className={
                active === "Egresado"
                  ? "cont-div-radio-estudio-active egresado"
                  : "cont-div-radio-estudio egresado"
              }
              onClick={() => setActive("Egresado")}
            >
              <p>Egresado</p>
            </div>
          </div>
          <div className="cont-radio-estudios">
            <div
              className={
                active === "Titulado"
                  ? "cont-div-radio-estudio-active titulado"
                  : "cont-div-radio-estudio titulado"
              }
              onClick={() => setActive("Titulado")}
            >
              <p>Titulado</p>
            </div>
          </div>
          <div className="cont-radio-estudios">
            <div
              className={
                active === "Estudiando"
                  ? "cont-div-radio-estudio-active estudiando"
                  : "cont-div-radio-estudio estudiando"
              }
              onClick={() => setActive("Estudiando")}
            >
              <p>Estudiando</p>
            </div>
          </div>
          <div className="cont-radio-estudios">
            <div
              className={
                active === "No Finalizado"
                  ? "cont-div-radio-estudio-active no-finalizado"
                  : "cont-div-radio-estudio no-finalizado"
              }
              onClick={() => setActive("No Finalizado")}
            >
              <p>No Finalizado</p>
            </div>
          </div>
        </div>
        <div className="item-center-cert">
          <TextField
            error={errorObs}
            fullWidth
            id="standard-multiline-static"
            label="Observaciones"
            multiline
            rows={2}
            onChange={(e) => {
              if (errorObs) {
                setErrorObs(false);
              }
              setObs(e.target.value);
            }}
            InputLabelProps={{ className: "multiline-form-estudios" }}
            InputProps={{ className: "multiline-form-estudios" }}
          />
        </div>
        <div className="item-center-cert-upload">
          <input
            type="file"
            id="raised-button-file"
            onChange={(e) => fileChange(e)}
            style={{ display: "none" }}
            accept="application/pdf, image/png, .jpeg, .jpg, image/gif, .doc, .docx"
          />
          <TextField
            fullWidth
            size="small"
            id="input-with-icon-textfield"
            label="Certificado"
            value={file ? file.name : null}
            defaultValue="Selecciona un archivo"
            InputLabelProps={{
              className: "input-file-estudios",
            }}
            InputProps={{
              readOnly: true,
              className: "input-file-estudios",
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Subir archivo pdf">
                    <IconButton>
                      <label
                        htmlFor="raised-button-file"
                        style={{ cursor: "pointer" }}
                      >
                        <CloudUpload className="icon-file-estudios" />
                      </label>
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className="bottom-form-cert">
        <ListItem
          button
          className="btn-form-estudio"
          onClick={guardarCertificado}
        >
          <p>Guardar</p>
        </ListItem>
      </div>
      {loading ? (
        <>
          <div className="overlay-loading"></div>
          <div
            className="linear-progres-global"
          >
            <LinearProgress className="progres-editar-perfil" />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Formulario;
