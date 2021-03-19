import React, { forwardRef, useState, useEffect } from "react";
import "./One.css";
import {
  Button,
  Tooltip,
  IconButton as CustomIconButton,
  CustomInput,
  CustomSelectB,
} from "../../../../../../components";
import {
  LinearProgress,
  IconButton,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";
import { Publish, Close } from "@material-ui/icons";
import imgUser from "../../../../../../resources/ZAPTalent-Icon-Empty.svg";
import { formatRut, RutFormat, validateRut } from "@fdograph/rut-utilities";

const useStyles = makeStyles({
  iconButton: {
    "&.MuiIconButton-root": {
      position: "absolute",
      top: 0,
      backgroundColor: "#000",
    },
  },
});

const One = forwardRef(
  (
    {
      setStep,
      closeModal,
      razonSocial,
      setRazonSocial,
      rut,
      setRut,
      giro,
      setGiro,
      fechaInicio,
      setFechaInicio,
      fechaTermino,
      setFechaTermino,
      resena,
      setResena,
      tipoPlan,
      setTipoPlan,
      image,
      setImage,
      file,
      setFile,
    },
    ref
  ) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [fechaMsg, setFechaMsg] = useState("");
    const [rutmsg, setRutMsg] = useState("");

    //ERRORES
    const [resenaError, setResenaError] = useState(false);
    const [rutError, setRutError] = useState(false);
    const [giroError, setGiroError] = useState(false);
    const [inicioError, setInicioError] = useState(false);
    const [terminoError, setTerminoError] = useState(false);
    const [tipoPlanError, setTipoPlanError] = useState(false);
    const [razonSocialError, setRazonSocialError] = useState(false);
    const [initDefault, setInitDefault] = useState(true);
    const [_switch, setSwitch] = useState(false);

    const formatRut2 = () => {
      try {
        document.getElementById("input-rut-empresa-admin").value = rut;
      } catch (error) {
        console.log(error);
      }
    };

    const changeRut = (e) => {
      if (rutError === true) {
        setRutError(false);
      }
      setRut(formatRut(e.target.value, RutFormat.DOTS_DASH));
    };

    const fileChange = (e) => {
      if (e.target.value) {
        setImage({
          preimage: URL.createObjectURL(e.target.files[0]),
          name: e.target.value,
        });
        setFile(e.target.files[0]);
      }
    };
    //VALIDACION
    const validacion = () => {
      setLoading(true);
      if (razonSocial.trim() === "") {
        setRazonSocialError(true);
      }

      const rutvalidado = validateRut(rut.toLocaleLowerCase());
      if (rut.trim() === "") {
        setRutMsg("Rut no puede estar vacio");
        setRutError(true);
      } else if (rutvalidado === false) {
        setRutMsg("El rut no es valido");
        setRutError(true);
      }
      if (giro.trim() === "") {
        setGiroError(true);
      }
      if (fechaInicio === null) {
        setInicioError(true);
      }
      if (fechaTermino === null) {
        setTerminoError(true);
        setFechaMsg("Fecha Termino no puede estar vacio");
      } else {
        if (Date.parse(fechaInicio) > Date.parse(fechaTermino)) {
          setTerminoError(true);
          setFechaMsg("Fecha Termino no puede ser menor a la fecha Inicial");
        }
      }
      if (tipoPlan.trim() === "") {
        setTipoPlanError(true);
      }
      if (resena.trim() === "") {
        setResenaError(true);
      }
      setInitDefault(false);
      setTimeout(() => {
        setLoading(false);
        setSwitch(!_switch);
      }, 500);
    };

    useEffect(() => {
      if (initDefault === false) {
        if (
          resenaError ||
          rutError ||
          giroError ||
          inicioError ||
          terminoError ||
          tipoPlanError ||
          razonSocialError
        ) {
          return;
        } else {
          setStep("two");
        }
      }
    }, [_switch]);
    return (
      <div className="one-add-emp-admin" ref={ref}>
        <div className="top">
          <p className="p1">Crear usuario empresa</p>
          <div className="img-add-emp-admin">
            {image.preimage ? (
              <div className="cont-img-add-new-emp">
                <img
                  className="img-one-add-emp"
                  alt="user-img"
                  src={image.preimage}
                ></img>
              </div>
            ) : (
              <div className="cont-img-add-new-emp">
                <img
                  src={imgUser}
                  className="img-one-add-emp"
                  alt="user-imge"
                />
              </div>
            )}
            <>
              <input
                type="file"
                id="button-file-logo-admin"
                onChange={(e) => fileChange(e)}
                style={{ display: "none" }}
                accept="image/*"
              />

              <Tooltip title="Subir logo">
                <IconButton className="btn-upload-logo-admin">
                  <label
                    htmlFor="button-file-logo-admin"
                    className="label-btn-add-photo"
                  >
                    <div
                      style={{
                        width: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#187ce2",
                        borderRadius: "50%",
                      }}
                    >
                      <Publish
                        style={{
                          width: "40px",
                        }}
                      />
                    </div>
                  </label>
                </IconButton>
              </Tooltip>
            </>
          </div>
        </div>
        <div className="center">
          <div className="item">
            <CustomInput
              label="Razón Social"
              helpertext="Introduzca un nuemero valido"
              error={razonSocialError}
              type="text"
              value={razonSocial}
              onChange={(e) => {
                setRazonSocialError(false);
                setRazonSocial(e.target.value);
              }}
            />
          </div>
          <div className="item">
            <CustomInput
              label="Rut"
              id="input-rut-empresa-admin"
              error={rutError}
              helpertext={rutmsg}
              type="text"
              // value={rut}
              onChange={changeRut}
              onBlur={formatRut2}
            />
          </div>
          <div className="item">
            <CustomInput
              label="Giro"
              helpertext="Introduzca un nuemero valido"
              error={giroError}
              type="text"
              value={giro}
              onChange={(e) => {
                setGiroError(false);
                setGiro(e.target.value);
              }}
            />
          </div>
          <div className="item-dates">
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
              <div className="date-left-estudio">
                <KeyboardDatePicker
                  error={inicioError}
                  fullWidth
                  size="small"
                  label="Inicio"
                  minDate={new Date()}
                  maxDate={new Date("2030-01-01")}
                  helperText={
                    inicioError ? "Fecha inicio no puede estar vacio" : null
                  }
                  format="dd/MM/yyyy"
                  value={fechaInicio}
                  // maxDate={new Date()}
                  onChange={(newValue) => {
                    setInicioError(false);
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
                  error={terminoError}
                  size="small"
                  fullWidth
                  label="Término"
                  format="dd/MM/yyyy"
                  helperText={terminoError ? fechaMsg : null}
                  value={fechaTermino}
                  minDate={new Date()}
                  maxDate={new Date("2030-01-01")}
                  // maxDate={new Date()}
                  onChange={(newValue) => {
                    setTerminoError(false);
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
          <div className="item">
            <CustomSelectB
              label="Tipo de plan"
              helpertext="no puede estar vacio"
              error={tipoPlanError}
              value={tipoPlan}
              onChange={(e) => {
                setTipoPlanError(false);
                setTipoPlan(e.target.value);
              }}
            >
              <MenuItem className="custom-menu-item" value="1">
                Estandar
              </MenuItem>
              <MenuItem className="custom-menu-item" value="2">
                Estandar 5+
              </MenuItem>
              <MenuItem className="custom-menu-item" value="3">
                Estandar 5+ Plus
              </MenuItem>
              <MenuItem className="custom-menu-item" value="4">
                Avanzado
              </MenuItem>
              <MenuItem className="custom-menu-item" value="5">
                Avanzado Plus
              </MenuItem>
            </CustomSelectB>
          </div>
          <div className="item">
            <TextField
              fullWidth
              id="resena-add-empresa-admin"
              label="Reseña de la empresa"
              name="resena"
              type="text"
              error={resenaError}
              value={resena}
              onChange={(e) => {
                setResenaError(false);
                setResena(e.target.value);
              }}
              // defaultValue={reflogros}
              helperText={resenaError ? "No puede estar vacio" : null}
              multiline
              rows={2}
              InputLabelProps={{ className: "multiline-form-estudios" }}
              InputProps={{ className: "multiline-form-estudios" }}
            />
          </div>
        </div>
        <div className="bottom">
          <Button variant="contained" color="primary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={validacion}>
            Siguiente
          </Button>
        </div>
        {loading ? (
          <>
            <div className="overlay-loading"></div>
            <div className="linear-progres-global">
              <LinearProgress className="progres-editar-perfil" />
            </div>
          </>
        ) : null}
        <div className="cont-icon-close-formulario">
          <CustomIconButton
            bg="close"
            size="small"
            customcolor="close"
            onClick={closeModal}
          >
            <Close className="icon-close" />
          </CustomIconButton>
        </div>
      </div>
    );
  }
);

export default One;
