import React, { forwardRef, useState, useEffect } from "react";
import "./Styles.css";
import {
  Button,
  IconButton as IconButtonCustom,
  CustomSelectB,
  CustomInput,
  Tooltip,
} from "../../../../components";
import {
  LinearProgress,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Close, Add } from "@material-ui/icons";
import NumberFormat from "react-number-format";
import shortid from "shortid";

const StepFour = forwardRef((props, ref) => {
  const {
    setStep,
    closeModal,
    renta,
    setRenta,
    beneficios,
    setBeneficios,
    descripcion,
    setDescripcion,
    estado,
    setEstado,
    guardarAvisoEditado,
    cargando,
  } = props;

  const [initDefault, setInitDefault] = useState(true);
  const [errorRenta, setErrorRenta] = useState(false);
  const [errorBeneficios, setErrorBeneficios] = useState(false);
  const [errorDescripcion, setErrorDescripcion] = useState(false);
  const [_switch, setSwitch] = useState(false);
  const [errores, setErrores] = useState([]);
  const [errores2, setErrores2] = useState([]);
  const [convenir, setConvenir] = useState(false);

  const validacion = async () => {
    if (!convenir) {
      if (renta < 1) {
        setErrorRenta(true);
      }
    }

    if (descripcion === "") {
      setErrorDescripcion(true);
    }
    setErrores([]);
    await mapearDatos();
    setInitDefault(false);
    setTimeout(() => {
      setSwitch(!_switch);
    }, 100);
  };

  const mapearDatos = () => {
    beneficios.map((item) => {
      if (item.beneficio === "") {
        errores.push(item.id);
      }
    });
    setErrores2(errores);
  };
  const añadirBeneficio = () => {
    const container = document.getElementById(
      "cont-inputs-beneficio-aviso-emp"
    );

    setBeneficios([...beneficios, { id: shortid.generate(), beneficio: "" }]);
    setTimeout(() => {
      container.scrollTop = "1000";
    }, 100);
  };
  useEffect(() => {
    if (initDefault === false) {
      if (errorRenta || errorBeneficios || errorDescripcion) {
        return;
      } else {
        guardarAvisoEditado();
      }
    }
  }, [_switch]);

  useEffect(() => {
    if (renta === 0) {
      setConvenir(true);
    }
  }, []);
  return (
    <div className="container-nuevo-aviso-emp" ref={ref}>
      <div className="form-nuevo-aviso-emp">
        <h1>Renta del empleo</h1>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, paddingRight: "10px" }}>
            <p className="p1">Renta ofrecida</p>
            <div style={{ marginTop: "14px" }}>
              <TextField
                fullWidth
                placeholder="$ 000.000"
                value={renta}
                disabled={convenir}
                onChange={(e) => {
                  setErrorRenta(false);
                  setRenta(e.target.value);
                }}
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  className: "multiline-form-estudios ",
                }}
                error={errorRenta}
                InputLabelProps={{
                  className: "multiline-form-estudios manpre-form-trabajos",
                }}
                helperText={errorRenta ? "Introduzca un numero valido" : null}
              />
              <div className="cont-a-convenir-actual">
                <input
                  type="checkbox"
                  name="recordarme"
                  id=""
                  checked={convenir}
                  onChange={() => {
                    setConvenir(!convenir);
                    setRenta(0);
                  }}
                />
                <label>A convenir.</label>
              </div>
            </div>
          </div>
          <div
            className="cont-beneficios-avisos-emp"
            style={{ flex: 1, paddingLeft: "10px" }}
          >
            <p className="p1">Beneficios</p>
            <div className="sub-beneficios-avisos-emp">
              <div
                className="cont-inputs-beneficio-aviso-emp"
                id="cont-inputs-beneficio-aviso-emp"
              >
                {beneficios.map((item, index) => (
                  <InputBeneficio
                    key={index}
                    data={item}
                    numero={index + 1}
                    setBeneficios={setBeneficios}
                    beneficios={beneficios}
                    errores2={errores2}
                    setSwitch={setSwitch}
                  />
                ))}
              </div>
              <div className="cont-add-beneficio-avisos-emp">
                <IconButtonCustom
                  bg="primary"
                  size="small"
                  onClick={añadirBeneficio}
                >
                  <Add />
                </IconButtonCustom>
                <p>Añadir beneficio</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-inputs-form-emp">
          <p className="p1" style={{ marginTop: "40px", marginBottom: "20px" }}>
            Sobre el trabajo
          </p>
          <TextField
            fullWidth
            id="standard-multiline-static"
            label="Describa el empleo"
            onChange={(e) => {
              setErrorDescripcion(false);
              setDescripcion(e.target.value);
            }}
            name="logros"
            type="text"
            error={errorDescripcion}
            value={descripcion}
            // defaultValue={reflogros}
            helperText={errorDescripcion ? "No puede estar vacio" : null}
            multiline
            rows={2}
            InputLabelProps={{ className: "multiline-form-estudios" }}
            InputProps={{ className: "multiline-form-estudios" }}
          />
        </div>
        <div
          className="container-inputs-form-emp"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "100px",
          }}
        >
          <p style={{ margin: "0", fontSize: "14px", color: "#7d7f80" }}>
            Estado:{" "}
          </p>
          <div
            style={{
              display: "flex",
              marginLeft: "20px",
              alignItems: "center",
            }}
          >
            <div
              className={
                estado === "Activo"
                  ? "div-tipo-consultor-active"
                  : "div-tipo-consultor"
              }
              style={{ backgroundColor: "#187EE6" }}
              onClick={() => setEstado("Activo")}
            >
              <p>Activo</p>
            </div>
            <div
              className={
                estado === "Proceso Finalizado"
                  ? "div-tipo-consultor-active"
                  : "div-tipo-consultor"
              }
              style={{ backgroundColor: "#909090" }}
              onClick={() => setEstado("Proceso Finalizado")}
            >
              <p>Proceso Finalizado</p>
            </div>
            <div
              className={
                estado === "Cancelado"
                  ? "div-tipo-consultor-active"
                  : "div-tipo-consultor"
              }
              style={{ backgroundColor: "#BCBCBC" }}
              onClick={() => setEstado("Cancelado")}
            >
              <p>Cancelado</p>
            </div>
          </div>
        </div>
        <div className="cont-btns-form-emp">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep("three")}
          >
            Atras
          </Button>
          <Button variant="contained" color="primary" onClick={validacion}>
            Guardar
          </Button>
        </div>
      </div>
      <div className="cont-icon-close-formulario">
        <IconButton
          bg="close"
          size="small"
          customcolor="close"
          onClick={closeModal}
        >
          <Close className="icon-close" />
        </IconButton>
      </div>
      {cargando ? (
        <>
          <div className="overlay-loading"></div>
          <div className="linear-progres-global">
            <LinearProgress className="progres-editar-perfil" />
          </div>
        </>
      ) : null}
    </div>
  );
});

export default StepFour;

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

const InputBeneficio = ({
  numero,
  data,
  setBeneficios,
  beneficios,
  errores2,
}) => {
  const [error, setError] = useState(false);
  const [initDefault, setInitDefault] = useState(true);

  const deleteBeneficio = () => {
    const result = beneficios.filter((item) => item.id !== data.id);
    setBeneficios(result);
  };

  const changeText = (e) => {
    setError(false);
    setBeneficios(
      beneficios.map((it) =>
        it.id === data.id ? { ...it, [e.target.name]: e.target.value } : it
      )
    );
  };
  console.log(beneficios);
  useEffect(() => {
    if (initDefault === false) {
      if (errores2.length > 0) {
        const valor = errores2.filter((item) => item === data.id);

        if (valor.length > 0) {
          setError(true);
        } else {
          setError(false);
        }
      }
    }
    setInitDefault(false);
  }, [errores2]);

  return (
    <div style={{ marginBottom: "10px" }}>
      <CustomInput
        label={`Beneficio ${numero}`}
        onChange={changeText}
        value={data.beneficio}
        error={error}
        name="beneficio"
        endAdornment={
          <Tooltip title="Eliminar beneficio" placement="top">
            <InputAdornment position="end">
              <IconButton
                size="small"
                className="btn-delete-input-beneficio-emp"
                onClick={deleteBeneficio}
              >
                <Close className="icon-close" />
              </IconButton>
            </InputAdornment>
          </Tooltip>
        }
      />
    </div>
  );
};
