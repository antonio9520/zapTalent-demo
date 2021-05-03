import React, { useState } from "react";
import "./Formulario.css";
import {
  IconButton,
  TextField,
  ListItem,
  MenuItem,
  FormControl,
  Input,
  FormHelperText,
  LinearProgress,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { CustomInput, CustomSelectB } from "../../../../components";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";
import { useSelector, useDispatch } from "react-redux";
import { paises } from "../../../../assets/paises";
import { actEmpresa } from "../../../../assets/actEmpresa";
import { agregarTrabajoAction } from "../../../../redux/actions/trabajoAction";
import { editarUsuarioAction } from "../../../../redux/actions/authAction";
import { data_cargo } from "../../../../assets/cargos";
import validator from "validator";
import InputMask from "react-input-mask";
import NumberFormat from "react-number-format";

const Formulario = (props) => {
  const { setOpenModal } = props;
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);
  const loading = useSelector((state) => state.trabajo.cargando);
  const [_switch, setSwitch] = useState(false);
  // const loading = true;
  //data
  const [inidate, setValueI] = useState(null);
  const [findate, setValueT] = useState(null);
  const [nomempresa, setEmpresa] = useState("");
  const [actempresa, setActEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [idusuario] = useState(usuario ? usuario._id : null);
  const [areapuesto, setAreaPuesto] = useState("");
  const [subarea, setSubArea] = useState("");
  const [pais, setPais] = useState("");
  const [personacargo, setPersonaCargo] = useState(null);
  const [manejopresupuesto, setManejoPresupuesto] = useState(null);
  const [expzap, setExpZap] = useState(null);
  const [refnombre, setRefNombre] = useState(null);
  const [email, setEmail] = useState(null);
  const [refphone, setRefPhone] = useState("");
  const [refrelacion, setRefRelacion] = useState(null);
  const [reflogros, setRefLogros] = useState(null);
  //errores
  const [empresaError, setEmpresaError] = useState(false);
  const [actEmpresaError, setActEmpresaError] = useState(false);
  const [cargoError, setCargoError] = useState(false);
  const [areaError, setAreaError] = useState(false);
  const [subAreaError, setSubAreaError] = useState(false);
  const [iniDateError, setIniDateError] = useState(false);
  const [finDateError, setFinDateError] = useState(false);
  const [paisError, setPaisError] = useState(false);
  const [perCargoError, setPerCargoError] = useState(false);
  const [fechamsg, setFechaMsg] = useState("");
  const [manPreError, setManPressError] = useState(false);
  const [refNombreError, setRefNombreError] = useState(false);
  const [refRelaError, setRefRelaError] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorphone, setErrorPhone] = useState(false);

  const pattern = new RegExp(
    /^[a-zA-ZÀ-ÿ\-\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\-\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\-\u00f1\u00d1]+$/g
  );
  const pattern2 = new RegExp(
    /^[a-zA-ZÀ-ÿ\-\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\-\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\-\u00f1\u00d1]+$/g
  );

  const validacion = () => {
    let numberPhone = refphone.replace(/\D/g, "");
    if (nomempresa === "") {
      setEmpresaError(true);
      return;
    }
    if (actempresa === "") {
      setActEmpresaError(true);
      return;
    }
    if (cargo === "") {
      setCargoError(true);
      return;
    }
    if (areapuesto === "") {
      setAreaError(true);
      return;
    }
    if (subarea === "") {
      setSubAreaError(true);
      return;
    }
    if (inidate === null) {
      setIniDateError(true);
      return;
    }
    if (!_switch) {
      if (findate === null) {
        setFinDateError(true);
        setFechaMsg("Fecha termino no puede estar vacio");
        return;
      }
      if (Date.parse(inidate) > Date.parse(findate)) {
        setFinDateError(true);
        setFechaMsg("Fecha Termino no puede ser menor a la fecha Inicial");
        return;
      }
    }

    if (pais === "") {
      setPaisError(true);
      return;
    }
    if (personacargo !== null) {
      if (personacargo !== "") {
        if (personacargo < 0) {
          setPerCargoError(true);
          return;
        }
      }
    }
    if (manejopresupuesto !== null) {
      if (manejopresupuesto !== "") {
        if (manejopresupuesto < 0) {
          setManPressError(true);
          return;
        }
      }
    }
    if (refnombre !== null) {
      if (refnombre !== "") {
        if (pattern.test(refnombre.trim()) === false) {
          setRefNombreError(true);
          return;
        }
      }
    }
    if (email !== null) {
      if (email !== "") {
        const emailv = validator.isEmail(email);
        if (emailv === false) {
          setErrorEmail(true);
          return;
        }
      }
    }

    if (refphone !== "") {
      if (numberPhone.length < 11) {
        setErrorPhone(true);
        return;
      }
    }

    if (refrelacion !== null) {
      if (refrelacion !== "") {
        if (pattern2.test(refrelacion.trim()) === false) {
          setRefRelaError(true);
          return;
        }
      }
    }

    guardarTrabajo();
  };

  const guardarTrabajo = () => {
    let fechaTermino;
    if (_switch) {
      fechaTermino = "2100-11-07T23:38:52.946Z";
    } else {
      fechaTermino = findate;
    }
    let industria = usuario.industria;
    industria.push(actempresa);
    dispatch(
      agregarTrabajoAction({
        idusuario,
        nomempresa,
        actempresa,
        cargo,
        areapuesto,
        subarea,
        pais,
        personacargo,
        manejopresupuesto,
        expzap,
        refnombre,
        email,
        refphone,
        refrelacion,
        reflogros,
        inidate,
        findate: fechaTermino,
      })
    ).then((res) => (res === true ? setOpenModal(false) : null));
  };

  const changeInit = (value) => {
    setIniDateError(false);
    setValueI(value);
  };

  const changeFin = (value) => {
    setFinDateError(false);
    setValueT(value);
  };

  console.log(_switch);
  let sub_cargo = data_cargo.find((item) => item.cargo === areapuesto);

  return (
    <div className="cont-form-trabajo">
      <div className="top-form-trabajo">
        <div className="close-btn-form-estudios">
          <IconButton onClick={() => setOpenModal(false)}>
            <Close />
          </IconButton>
        </div>
        <p>Ingresa un trabajo</p>
      </div>
      <div className="center-form-trabajo">
        <div className="item-form-trabajo">
          <CustomInput
            label="Empresa"
            onChange={(e) => {
              setEmpresaError(false);
              setEmpresa(e.target.value);
            }}
            name="company"
            type="text"
            defaultValue={nomempresa}
            error={empresaError}
            helpertext="Empresa no puede estar vacio"
          />
        </div>
        <div className="item-form-trabajo">
          <CustomSelectB
            label="Actividad de la empresa"
            onChange={(e) => {
              setActEmpresaError(false);
              setActEmpresa(e.target.value);
            }}
            name="company-activity"
            value={actempresa}
            error={actEmpresaError}
            helpertext="Actividad empresa no puede estar vacio"
          >
            {actEmpresa.map((item, index) => (
              <MenuItem
                className="custom-menu-item"
                key={index}
                value={item.Seleccionar}
              >
                {item.Seleccionar}
              </MenuItem>
            ))}
          </CustomSelectB>
        </div>
        <div className="item-form-trabajo">
          <CustomInput
            label="Cargo"
            onChange={(e) => {
              setCargoError(false);
              setCargo(e.target.value);
            }}
            name="cargo"
            defaultValue={cargo}
            value={cargo}
            error={cargoError}
            helperText="Cargo no puede estar vacio"
          />
        </div>
        <div className="item-form-trabajo">
          <CustomSelectB
            label="Área del puesto"
            onChange={(e) => {
              setAreaError(false);
              setAreaPuesto(e.target.value);
            }}
            name="area"
            value={areapuesto}
            error={areaError}
            helperText="Área no puede estar vacio"
          >
            {data_cargo.map((item, index) => (
              <MenuItem
                className="custom-menu-item"
                key={index}
                value={item.cargo}
              >
                {item.cargo}
              </MenuItem>
            ))}
          </CustomSelectB>
        </div>
        <div className="item-form-trabajo">
          <CustomSelectB
            label="Sub-Área"
            onChange={(e) => {
              setSubAreaError(false);
              setSubArea(e.target.value);
            }}
            name="sub-area"
            value={subarea}
            error={subAreaError}
            helperText="Sub-Área no puede estar vacio"
          >
            {sub_cargo ? (
              sub_cargo.sub_cargo.map((item, index) => (
                <MenuItem className="custom-menu-item" key={index} value={item}>
                  {item}
                </MenuItem>
              ))
            ) : (
              <MenuItem className="custom-menu-item" value={null}>
                Seleccione una Área
              </MenuItem>
            )}
          </CustomSelectB>
        </div>
        <div className="item-form-trabajo">
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <div className="left-date-trabajo">
              <KeyboardDatePicker
                error={iniDateError}
                fullWidth
                size="small"
                label="Inicio"
                openTo="year"
                helperText={
                  iniDateError ? "Fecha inicio no puede estar vacio" : null
                }
                views={["year", "month"]}
                value={inidate}
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
            <div className="right-date-trabajo">
              <KeyboardDatePicker
                error={finDateError}
                size="small"
                fullWidth
                label="Término"
                openTo="year"
                views={["year", "month"]}
                value={findate}
                maxDate={new Date()}
                helperText={finDateError ? fechamsg : null}
                onChange={(newValue) => changeFin(newValue)}
                InputProps={{
                  className: "input-date-picker-inicio",
                  readOnly: true,
                }}
                disabled={_switch}
                className="date-picker-inicio"
                InputLabelProps={{ className: "input-label-date-form" }}
              />
            </div>
            <div className="cont-trabajo-actual">
              <input
                type="checkbox"
                name="recordarme"
                id=""
                onChange={() => setSwitch(!_switch)}
              />
              <label>Trabajo actual.</label>
            </div>
          </MuiPickersUtilsProvider>
        </div>
        <div className="item-form-trabajo">
          <CustomSelectB
            label="País"
            onChange={(e) => {
              setPaisError(false);
              setPais(e.target.value);
            }}
            name="country"
            value={pais}
            error={paisError}
            helperText="País no puede estar vacio"
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
        <div className="item-form-trabajo">
          <div className="left-date-trabajo">
            <TextField
              fullWidth
              label="Personas a cargo (opcional)"
              onChange={(e) => {
                setPerCargoError(false);
                setPersonaCargo(e.target.value);
              }}
              id="formatted-numberformat-input-2"
              InputProps={{
                inputComponent: NumberFormatCustom2,
                className: "multiline-form-estudios ",
              }}
              value={personacargo}
              error={perCargoError}
              InputLabelProps={{
                className: "multiline-form-estudios manpre-form-trabajos",
              }}
              helperText={perCargoError ? "Introduzca un numero valido" : null}
            />
          </div>
          <div className="right-date-trabajo-manpre"> 
            <TextField
              fullWidth
              label="Manejo de presupuesto (opcional)"
              value={manejopresupuesto}
              onChange={(e) => {
                setManPressError(false);
                setManejoPresupuesto(e.target.value);
              }}
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
                className: "multiline-form-estudios ",
              }}
              error={manPreError}
              InputLabelProps={{
                className: "multiline-form-estudios manpre-form-trabajos",
              }}
              helperText={manPreError ? "Introduzca un numero valido" : null}
            />
          </div>
        </div>
        <div className="item-form-trabajo">
          <CustomInput
            label="Experiencia en SAP. (opcional)"
            onChange={(e) => setExpZap(e.target.value)}
            name="exp-zap"
            type="text"
            defaultValue={expzap}
          />
        </div>
        <div className="item-form-trabajo-sub">
          <p>Referencias</p>
        </div>
        <div className="item-form-trabajo">
          <div className="left-date-trabajo">
            <CustomInput
              label="Nombre (opcional)"
              onChange={(e) => {
                setRefNombreError(false);
                setRefNombre(e.target.value);
              }}
              name="name"
              type="text"
              defaultValue={refnombre}
              value={refnombre}
              error={refNombreError}
              helpertext="Nombre no puede contener numeros"
            />
          </div>
          <div className="right-date-trabajo">
            <CustomInput
              label="Email (opcional)"
              onChange={(e) => {
                setErrorEmail(false);
                setEmail(e.target.value);
              }}
              name="email"
              type="text"
              defaultValue={email}
              value={email}
              error={errorEmail}
              helpertext="Email no valido"
            />
          </div>
        </div>
        <div className="item-form-trabajo">
          <div className="left-date-trabajo">
            <FormControl
              fullWidth
              className="formcontrol-phone-trabajos"
              size="small"
              error={errorphone}
            >
              <Input
                value={refphone}
                defaultValue={refphone}
                onChange={(e) => {
                  setErrorPhone(false);
                  setRefPhone(e.target.value);
                }}
                name="textmask"
                id="formatted-text-mask-input"
                inputComponent={InputMaskCustom}
              />
              {errorphone ? (
                <FormHelperText className="helper-text-custom-input">
                  Numero de teléfono invalido
                </FormHelperText>
              ) : null}
            </FormControl>
          </div>
          <div className="right-date-trabajo">
            <CustomInput
              label="Relación (opcional)"
              onChange={(e) => {
                setRefRelaError(false);
                setRefRelacion(e.target.value);
              }}
              name="ref-relacion"
              type="text"
              defaultValue={refrelacion}
              value={refrelacion}
              error={refRelaError}
              helpertext="Relación no puede contener numeros"
            />
          </div>
        </div>
        <div className="item-form-trabajo">
          <TextField
            fullWidth
            id="standard-multiline-static"
            label="Logros (opcional)"
            onChange={(e) => setRefLogros(e.target.value)}
            name="logros"
            type="text"
            defaultValue={reflogros}
            multiline 
            rows={2}
            InputLabelProps={{ className: "multiline-form-estudios" }}
            InputProps={{ className: "multiline-form-estudios" }}
          />
        </div>
      </div>
      <div className="bottom-form-trabajo">
        <ListItem button className="btn-form-estudio" onClick={validacion}>
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

const InputMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <InputMask
      {...other}
      className="input-mask-phone-perfil"
      mask="+(999) 9999 9999"
      placeholder="+(569) 7890 7890"
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
    />
  );
};

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
      isAllowed={(values) => {
        const { floatValue } = values;
        return floatValue >= 0 && floatValue <= 1000000000;
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

function NumberFormatCustom2(props) {
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
      isAllowed={(values) => {
        const { floatValue } = values;
        return floatValue >= 0 && floatValue <= 1000000000;
      }}
      thousandSeparator
      isNumericString
    />
  );
}
