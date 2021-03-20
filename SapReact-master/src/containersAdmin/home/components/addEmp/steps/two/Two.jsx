import React, { forwardRef, useState, useEffect } from "react";
import "./Two.css";
import {
  Button,
  IconButton as CustomIconButton,
} from "../../../../../../components";
import { LinearProgress, IconButton, makeStyles } from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";
import Card from "./card/Card";
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
});

const Two = forwardRef(
  ({ setStep, closeModal, direcciones, setDirecciones }, ref) => {
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
    const mapearDatos = () => {
      direcciones.map((item) => {
        if (item.direccion === "") {
          errores.push(item.id);
        } else if (item.region === "") {
          errores.push(item.id);
        } else if (item.comuna === "") {
          errores.push(item.id);
        }
      });
      setErrores2(errores);
    };

    const addDireccion = () => {
      const container = document.getElementById("cont-direccion-add-emp-admin");
      setDirecciones([
        ...direcciones,
        { id: shortid(), region: "", comuna: "", direccion: "" },
      ]);
      setTimeout(() => {
        container.scrollTop = "12000";
      }, 100);
    };

    const nextStep = async () => {
      if (errores.length === 0) {
        setStep("three");
      }
    };

    useEffect(() => {
      if (direcciones.length === 0) {
        addDireccion();
      }
    }, []);

    return (
      <div className="two-add-emp-admin" ref={ref}>
        <p className="p1">Registro de empresa</p>
        <p className="p2">Dirección(es)</p>
        <div className="center" id="cont-direccion-add-emp-admin">
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
            direcciones.map((item, index) => (
              <Card
                key={index}
                num={index + 1}
                data={item}
                direcciones={direcciones}
                setDirecciones={setDirecciones}
                errores2={errores2}
                recargar={recargar}
              />
            ))
          )}
          <div className="item-add-direccion">
            <IconButton
              size="small"
              className={classes.addButton}
              onClick={addDireccion}
            >
              <Add />
            </IconButton>
            <p>Agregar otra dirección</p>
          </div>
        </div>
        <div className="bottom">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStep("one")}
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

export default Two;
