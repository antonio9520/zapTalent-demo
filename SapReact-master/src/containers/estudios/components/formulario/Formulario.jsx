import React, { useState, useEffect } from "react";
import "./Formulario.css";
import { CustomInput, CustomSelectB, Tooltip } from "../../../../components";
import {
  IconButton,
  ListItem,
  TextField,
  InputAdornment,
  MenuItem,
  LinearProgress,
} from "@material-ui/core";
import { Close, CloudUpload } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";
import { useSelector, useDispatch } from "react-redux";
import { paises } from "../../../../assets/paises";
import { agregarEstudioAction } from "../../../../redux/actions/estudioAction";
import { estudios_data } from "../../../../assets/estudios";
import { areaEstudio } from "../../../../assets/areaEstudio";

const Formulario = (props) => {
  const { setOpenModal } = props;
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);
  const loading = useSelector((state) => state.estudio.cargando);
  const [file, setFile] = useState(null);
  
  //data
  const [idusuario] = useState(usuario ? usuario._id : null);
  const [tipoestudio, setTipoEstudio] = useState(null);
  const [carrera, setCarrera] = useState("");
  const [institucion, setInstitucion] = useState(null);
  const [areaestudio, setAreaEstudio] = useState(null);
  const [escalanotas, setEscalaNotas] = useState(null);
  const [promedio, setPromedio] = useState("");
  const [pais, setPais] = useState(null);
  const [observacion, setObservacion] = useState("");
  const [active, setActive] = useState("Egresado");
  const [diainicio, setValueI] = useState(null);
  const [diafin, setValueT] = useState(null);
  const [inputText, setInputText] = useState(false);
  // errores
  const [tipoestudioError, setTipoEstudioError] = useState(false);
  const [carreraError, setCarreraError] = useState(false);
  const [institucionError, setInstitucionError] = useState(false);
  const [areaestudioError, setAreaEstudioError] = useState(false);
  const [escalanotasError, setEscalaNotasError] = useState(false);
  const [promedioError, setPromedioError] = useState(false);
  const [paisError, setPaisError] = useState(false);
  const [observacionError, setObservacionError] = useState(false);
  const [diainicioError, setDiaInicioError] = useState(false);
  const [diafinError, setDiaFinError] = useState(false);
  const [fechamsg, setFechaMsg] = useState("");
  const [promediomsg, setPromedioMsg] = useState("");

  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const estudioURL = file;
  const guardarEstudio = () => {
    if (tipoestudio === null) {
      setTipoEstudioError(true);
      return;
    }
    if (carrera === "") {
      setCarreraError(true);
      return;
    }
    if (institucion === null) {
      setInstitucionError(true);
      return;
    }
    if (areaestudio === null) {
      setAreaEstudioError(true);
      return;
    }
    if (diainicio === null) {
      setDiaInicioError(true);
      return;
    }
    if (diafin === null) {
      setDiaFinError(true);
      setFechaMsg("Fecha termino no puede estar vacio");
      return;
    }
    if (Date.parse(diainicio) > Date.parse(diafin)) {
      setDiaFinError(true);
      setFechaMsg("Fecha Termino no puede ser menor a la fecha Inicial");
      return;
    }
    if (escalanotas === null) {
      setEscalaNotasError(true);
      return;
    }
    if (promedio.trim() === "") {
      setPromedioError(true);
      setPromedioMsg("Promedio no puede estar vacio");
      return;
    } else if (validarPromedio(escalanotas, promedio)) {
      setPromedioError(true);
      setPromedioMsg("Rango invalido");
      return;
    }
    if (pais === null) {
      setPaisError(true);
      return;
    }
    // if (observacion.trim() === "") {
    //   setObservacionError(true);
    //   return;
    // }
    let carreras = usuario.carreras;
    carreras.push({ carrera, tipoestudio });

    // dispatch(
    //   agregarEstudioAction({
    //     idusuario,
    //     tipoestudio,
    //     carrera,
    //     institucion,
    //     areaestudio,
    //     escalanotas,
    //     promedio: promedio.toUpperCase(),
    //     pais,
    //     observacion,
    //     estado: active,
    //     diainicio,
    //     diafin,
    //     estudioURL,
    //   })
    // ).then((res) =>
    //   res === true
    //     ? dispatch(
    //         editarUsuarioAction({ _id: usuario._id, carreras })
    //       ).then((res) => (res === true ? setOpenModal(false) : null))
    //     : null
    // );
    dispatch(
      agregarEstudioAction({
        idusuario,
        tipoestudio,
        carrera,
        institucion,
        areaestudio,
        escalanotas,
        promedio: promedio.toUpperCase(),
        pais,
        observacion,
        estado: active,
        diainicio,
        diafin,
        estudioURL,
      })
    ).then((res) => (res === true ? setOpenModal(false) : null));
  };

  const validarPromedio = (key, value) => {
    switch (key) {
      case "1-5":
        if (value > 5 || value < 1) {
          return true;
        } else {
          return false;
        }
      case "1-7":
        if (value > 7 || value < 1) {
          return true;
        } else {
          return false;
        }
      case "1-10":
        if (value > 10 || value < 1) {
          return true;
        } else {
          return false;
        }
      case "1-100":
        if (value > 100 || value < 1) {
          return true;
        } else {
          return false;
        }
      case "1-20":
        if (value > 20 || value < 1) {
          return true;
        } else {
          return false;
        }
      case "A-F":
        return false;
      default:
        return false;
    }
  };
  const changeInit = (value) => {
    setDiaInicioError(false);
    setValueI(value);
  };

  const changeFin = (value) => {
    setDiaFinError(false);
    setValueT(value);
  };
  let data_carrera = estudios_data.find(
    (item) => item.institucion === institucion
  );

  //Change Input
  useEffect(() => {
    if (escalanotas) {
      if (escalanotas === "A-F") {
        setInputText(true);
        setPromedio("");
      } else {
        setInputText(false);
        setPromedio("");
      }
    }
  }, [escalanotas]);
  return (
    <div className="cont-form-estudios">
      <div className="close-btn-form-estudios">
        <IconButton onClick={() => setOpenModal(false)}>
          <Close />
        </IconButton>
      </div>
      <div className="top-form-estudios">
        <p className="p1-form-estudios">Ingresa un nuevo estudio</p>
      </div>
      <div className="center-form-estudios">
        <div className="campo-form-estudio">
          <CustomSelectB
            label="Tipo de estudio"
            onChange={(e) => {
              setTipoEstudioError(false);
              setTipoEstudio(e.target.value);
            }}
            name="tipo-estudio"
            value={tipoestudio}
            error={tipoestudioError}
            helpertext="Tipo de estudio no puede estar vacio"
          >
            <MenuItem className="custom-menu-item" value="Enseñanza Media">
              Enseñanza Media
            </MenuItem>
            <MenuItem
              className="custom-menu-item"
              value="Técnico/Universitario"
            >
              Tecnico/Universitario
            </MenuItem>
            <MenuItem className="custom-menu-item" value="PostGrado">
              PostGrado
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
          </CustomSelectB>
        </div>
        <div className="campo-form-estudio">
          <CustomSelectB
            label="Universidad/Instituto/Colegio"
            onChange={(e) => {
              setInstitucionError(false);
              setInstitucion(e.target.value);
            }}
            name="university"
            value={institucion}
            error={institucionError}
            helpertext="Universidad, Instituto no puede estar vacio"
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
        <div className="campo-form-estudio">
          <CustomSelectB
            label="Carrera/Título"
            onChange={(e) => {
              setCarreraError(false);
              setCarrera(e.target.value);
            }}
            name="carrera"
            value={carrera}
            error={carreraError}
            helpertext="Carrera no puede estar vacio"
          >
            {data_carrera ? (
              data_carrera.carreras.map((item, index) => (
                <MenuItem className="custom-menu-item" key={index} value={item}>
                  {item}
                </MenuItem>
              ))
            ) : (
              <MenuItem className="custom-menu-item" value={null}>
                Seleccione una institución
              </MenuItem>
            )}
          </CustomSelectB>
        </div>

        <div className="campo-form-estudio">
          <CustomSelectB
            label="Área de estudio"
            onChange={(e) => {
              setAreaEstudioError(false);
              setAreaEstudio(e.target.value);
            }}
            name="area-estudio"
            value={areaestudio}
            error={areaestudioError}
            helpertext="Área de estudio no puede estar vacio"
          >
            {areaEstudio.map((item, index) => (
              <MenuItem key={index} className="custom-menu-item" value={item}>
                {item}
              </MenuItem>
            ))}
          </CustomSelectB>
        </div>
        <div className="campo-date-form-estudio">
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <div className="date-left-estudio">
              <KeyboardDatePicker
                error={diainicioError}
                fullWidth
                size="small"
                label="Inicio"
                openTo="year"
                helperText={
                  diainicioError ? "Fecha inicio no puede estar vacio" : null
                }
                views={["year", "month"]}
                value={diainicio}
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
            <div className="date-right-estudio">
              <KeyboardDatePicker
                error={diafinError}
                size="small"
                fullWidth
                label="Término"
                openTo="year"
                helperText={diafinError ? fechamsg : null}
                views={["year", "month"]}
                value={diafin}
                maxDate={new Date()}
                onChange={(newValue) => changeFin(newValue)}
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
        <div className="campo-form-estudio-notas">
          <div className="div-1">
            <CustomSelectB
              label="Escala de notas"
              onChange={(e) => {
                setEscalaNotasError(false);
                setEscalaNotas(e.target.value);
              }}
              name="escala-notas"
              value={escalanotas}
              error={escalanotasError}
              helpertext="Escala de notas no puede estar vacio"
            >
              <MenuItem className="custom-menu-item" value="1-5">
                De 1 a 5
              </MenuItem>
              <MenuItem className="custom-menu-item" value="1-7">
                De 1 a 7
              </MenuItem>
              <MenuItem className="custom-menu-item" value="1-10">
                De 1 a 10
              </MenuItem>
              <MenuItem className="custom-menu-item" value="1-20">
                De 1 a 20
              </MenuItem>
              <MenuItem className="custom-menu-item" value="1-100">
                De 1 a 100
              </MenuItem>
              <MenuItem className="custom-menu-item" value="A-F">
                De A a F
              </MenuItem>
            </CustomSelectB>
          </div>
          <div className="div-2">
            {inputText ? (
              <CustomInput
                label="Promedio"
                // type="number"
                type="text"
                onKeyPress={(e) => {
                  if (promedioError) {
                    setPromedioError(false);
                  }
                  let letras = "ABCDEFabcdef";
                  let key = e.keyCode || e.which;
                  let tecla = String.fromCharCode(key).toString();

                  let especiales = [8, 13];
                  let tecla_especial = false;
                  console.log(tecla);
                  for (let i = 0; i < especiales.length; i++) {
                    if (key == especiales[i]) {
                      console.log(key);
                      tecla_especial = true;
                      break;
                    }
                  }
                  if (letras.indexOf(tecla) == -1 && !tecla_especial) {
                    console.log("no permitido");
                    return false;
                  }
                  setPromedio(tecla);
                }}
                name="promedio"
                defaultValue={promedio.toUpperCase()}
                value={promedio.toUpperCase()}
                helpertext={promediomsg}
                error={promedioError}
                inputProps={{ maxLength: "1" }}
              />
            ) : (
              <CustomInput
                label="Promedio"
                // type="number"
                type="number"
                onChange={(e) => {
                  if (promedioError) {
                    setPromedioError(false);
                  }
                  setPromedio(e.target.value);
                }}
                name="promedio"
                defaultValue={promedio.toUpperCase()}
                value={promedio.toUpperCase()}
                helpertext={promediomsg}
                error={promedioError}
                // inputProps={{ maxLength: "1" }}
              />
            )}
          </div>
        </div>
        <div className="campo-form-estudio">
          <CustomSelectB
            label="País"
            onChange={(e) => {
              setPaisError(false);
              setPais(e.target.value);
            }}
            name="country"
            value={pais}
            error={paisError}
            helpertext="País no puede estar vacio"
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
        <div className="campo-form-estudio-multiline">
          <TextField
            error={observacionError}
            fullWidth
            id="standard-multiline-static"
            label="Observaciones"
            multiline
            helperText={
              observacionError ? "Observaciones no puede estar vacio" : null
            }
            rows={2}
            onChange={(e) => {
              if (observacionError) {
                setObservacionError(false);
              }
              setObservacion(e.target.value);
            }}
            InputLabelProps={{ className: "multiline-form-estudios" }}
            InputProps={{ className: "multiline-form-estudios" }}
          />
        </div>
        <div className="campo-form-estudio">
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
                  <Tooltip title="Subir archivo">
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
      <div className="bottom-form-estudios">
        <ListItem button className="btn-form-estudio" onClick={guardarEstudio}>
          <p style={{ color: "white" }}>Guardar</p>
        </ListItem>
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

export default Formulario;
