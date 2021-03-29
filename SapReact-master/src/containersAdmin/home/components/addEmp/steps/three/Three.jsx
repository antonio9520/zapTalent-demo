import React, { forwardRef, useState, useEffect } from "react";
import "./Three.css";
import {
  CustomInput,
  Button,
  IconButton as CustomIconButton,
} from "../../../../../../components";
import {
  LinearProgress,
  FormControl,
  Input,
  FormHelperText,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Close, PhoneIphone, Add } from "@material-ui/icons";
import InputMask from "react-input-mask";
import shortid from "shortid";
import Loader from "react-loader-spinner";

const useStyles = makeStyles({
  addButton: {
    backgroundColor: "#187ce2",
    color: "white",
    boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.2)",
    transition: "0.5s all ease-in-out",
    "&:hover": {
      backgroundColor: "#105296",
      transition: "0.5s all ease-in-out",
      transform: "scale(1.1)",
    },
  },
  icon: {
    color: "#9A99A1",
    marginRight: 10,
  },
});

const Three = forwardRef(
  ({ setStep, closeModal, telefonos, setTelefonos }, ref) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [errores, setErrores] = useState([]);
    const [errores2, setErrores2] = useState([]);

    const validacion = () => {
      setLoading(true);
      setErrores([]);
      mapearDatos();
      setTimeout(() => {
        nextStep();
        setLoading(false);
      }, 500);
    };

    const recargar = () => {
      setCargando(true);
      setTimeout(() => {
        setCargando(false);
      }, 1000);
    };

    const addTelefono = () => {
      setTelefonos([...telefonos, { id: shortid(), telefono: "" }]);
    };

    const mapearDatos = () => {
      telefonos.map((item) => {
        if (item.telefono === "") {
          errores.push(item.id);
        }
      });
      setErrores2(errores);
    };
    const nextStep = async () => {
      if (errores.length === 0) {
        setStep("four");
      }
    };
    useEffect(() => {
      if (telefonos.length === 0) {
        addTelefono();
      }
    }, []);
    return (
      <div className="three-add-emp-admin" ref={ref}>
        <p className="p1">Registro de empresa</p>
        <p className="p2">Teléfono(s)</p>
        <div className="center">
          {cargando ? (
            <div className="loading-add-empresa-admin">
              <Loader
                type="Oval"
                color="#00BFFF"
                height={35}
                width={35}
                visible={cargando}
                //  timeout={3000} //3 secs
              />
            </div>
          ) : (
            <>
              {telefonos.map((item, index) => (
                <Telefono
                  key={index}
                  data={item}
                  setTelefonos={setTelefonos}
                  telefonos={telefonos}
                  recargar={recargar}
                  errores2={errores2}
                  num={index + 1}
                />
              ))}
              <div className="item-add-telefono">
                <IconButton
                  size="small"
                  className={classes.addButton}
                  onClick={addTelefono}
                >
                  <Add />
                </IconButton>
                <p>Agregar otro teléfono</p>
              </div>
            </>
          )}
        </div>
        <div className="bottom">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep("two")}
          >
            Atras
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

export default Three;

const Telefono = ({
  data,
  setTelefonos,
  telefonos,
  recargar,
  errores2,
  num,
}) => {
  const { id, telefono } = data;
  const classes = useStyles();
  const [errorphone, setErrorPhone] = useState(false);
  const [phone, setPhone] = useState(telefono);
  const [phonemsg, setPhoneMsg] = useState("");
  const [initDefault, setInitDefault] = useState(true);

  const handleDelete = async () => {
    if (telefonos.length === 1) {
      return;
    } else {
      await setTelefonos(telefonos.filter((i) => i.id !== id));
      recargar();
    }
  };
  const changeTelefono = (e) => {
    telefonos.map((item) => {
      if (item.id === id) {
        item.telefono = e.target.value;
      }
    });

    setPhone(e.target.value);
  };

  useEffect(() => {
    if (initDefault === false) {
      if (errores2.length > 0) {
        const valor = errores2.filter((item) => item === data.id);

        if (valor.length > 0) {
          setErrorPhone(true);
          document.getElementById(id).scrollIntoView();
        } else {
          setErrorPhone(false);
        }
      }
    }
    setInitDefault(false);
  }, [errores2]);

  return (
    <div className="telefono-add-emp-admin" id={id}>
      <PhoneIphone fontSize="small" className={classes.icon} />
      {/* <FormControl fullWidth size="small" error={errorphone}>
    
        <Input
          // value={phone}
          defaultValue={phone}
          onChange={(e) => {
            setErrorPhone(false);
            changeTelefono(e);
          }}
          endAdornment={
            <IconButton size="small" onClick={handleDelete}>
              <Close fontSize="small" />
            </IconButton>
          }
          name="textmask"
          id={id}
          // inputComponent={InputMaskCustom}
        />
        {errorphone ? (
          <FormHelperText className="helper-text-custom-input">
            {phonemsg}
          </FormHelperText>
        ) : null}
      </FormControl> */}

      <CustomInput
        label={`Teléfono ${num}`}
        helpertext={phonemsg}
        error={errorphone}
        type="text"
        defaultValue={phone}
        value={phone}
        onChange={(e) => {
          setErrorPhone(false);
          changeTelefono(e);
        }}
        endAdornment={
          <IconButton size="small" onClick={handleDelete}>
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

const InputMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <InputMask
      {...other}
      className="input-mask-phon-emp-admin"
      mask="+(999) 9999 9999"
      placeholder="+(569) 7890 7890"
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
    />
  );
};
