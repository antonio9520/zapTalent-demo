import React, { forwardRef, useState, useEffect } from "react";
import "./Four.css";
import {
  Button,
  IconButton as CustomIconButton,
} from "../../../../../../components";
import { LinearProgress, makeStyles, IconButton } from "@material-ui/core";
import { Close, Add } from "@material-ui/icons";
import shortid from "shortid";
import Perfil from "./perfil/Perfil";
import Loader from "react-loader-spinner";
import validator from "validator";
import { formatRut, RutFormat, validateRut } from "@fdograph/rut-utilities";

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

const Four = forwardRef(
  ({ setStep, closeModal, guardarEmpresa, perfiles, setPerfiles }, ref) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [initDefault, setInitDefault] = useState(true);
    const [_switch, setSwitch] = useState(false);
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
      console.log(perfiles);
    };
    const addPerfil = () => {
      const container = document.getElementById("cont-perfil-add-emp-admin");
      setPerfiles([
        ...perfiles,
        {
          id: shortid(),
          tipoPlan: "",
          rut: "",
          nombres: "",
          apellidos: "",
          email: "",
          password: "",
          fechaInicio: null,
          fechaTermino: null,
        },
      ]);
      setTimeout(() => {
        container.scrollTop = "12000";
      }, 100);
    };

    const recargar = () => {
      setCargando(true);
      setTimeout(() => {
        setCargando(false);
      }, 1000);
    };
    const nextStep = async () => {
      if (errores.length === 0) {
        guardarEmpresa();
      }
    };
    useEffect(() => {
      if (perfiles.length === 0) {
        addPerfil();
      }
    }, []);
    const mapearDatos = () => {
      perfiles.map((item) => {
        let rutvalidado = validateRut(item.rut.toLocaleLowerCase());
        const emailv = validator.isEmail(item.email);
        if (item.tipoPlan === "") {
          errores.push(item.id);
        } else if (item.rut.trim() === "") {
          errores.push(item.id);
        } else if (rutvalidado === false) {
          errores.push(item.id);
        } else if (item.nombres === "") {
          errores.push(item.id);
        } else if (item.apellidos === "") {
          errores.push(item.id);
        } else if (item.email.trim() === "") {
          errores.push(item.id);
        } else if (emailv === false) {
          errores.push(item.id);
        } else if (item.password.trim() === "") {
          errores.push(item.id);
        } else if (item.password.lenth < 6) {
          errores.push(item.id);
        } else if (item.fechaInicio === null) {
          errores.push(item.id);
        } else if (item.fechaTermino === null) {
          errores.push(item.id);
        } else if (
          Date.parse(item.fechaInicio) > Date.parse(item.fechaTermino)
        ) {
          errores.push(item.id);
        }
      });
      setErrores2(errores);
    };
    useEffect(() => {
      if (initDefault === false) {
        if (errores.length > 0) {
          return;
        } else {
          guardarEmpresa();
        }
      }
    }, [_switch]);
    return (
      <div className="four-add-emp-admin" ref={ref}>
        <p className="p1">Perfiles de usuario</p>
        <div className="center" id="cont-perfil-add-emp-admin">
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
              {perfiles.map((item, index) => (
                <Perfil
                  key={index}
                  data={item}
                  perfiles={perfiles}
                  setPerfiles={setPerfiles}
                  recargar={recargar}
                  errores2={errores2}
                />
              ))}
              <div className="item-add-perfil">
                <IconButton
                  size="small"
                  className={classes.addButton}
                  onClick={addPerfil}
                >
                  <Add />
                </IconButton>
                <p>Agregar otro usuario</p>
              </div>
            </>
          )}
        </div>
        <div className="bottom">
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

export default Four;
