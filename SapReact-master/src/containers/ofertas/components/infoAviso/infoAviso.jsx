import React, { forwardRef, useState, useEffect } from "react";
import "./infoAviso.css";
import {
  withStyles,
  Tabs,
  Tab,
  IconButton,
  Button,
  makeStyles,
} from "@material-ui/core";
import userimage from "../../../../resources/images/SAPTalent/icon-new-user.svg";
import { Aviso, AdnSap, Detalles, Renta } from "./containers";
import { Close } from "@material-ui/icons";
import { Tooltip } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import clienteAxios from "../../../../config/axios";
import Loader from "react-loader-spinner";
import {
  crearPostulacionAction,
  eliminarPostulacionAction,
} from "../../../../redux/actions/postAction";
const AntTabs = withStyles({
  root: {
    marginTop: "8px",
  },
  indicator: {
    backgroundColor: "#197EE6",
    height: "4px",
    top: "35px",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 80,
    minHeight: 30,
    padding: "5px",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "12px",
    fontFamily: ["Roboto"].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: 60,
      fontSize: "10px",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles(() => ({
  button: {
    padding: "7px 50px",
  },
  button2: {
    backgroundColor: "#019371",
  },
}));

const InfoEmp = forwardRef((props, ref) => {
  const { closeModal, idAviso, idEmp } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const usuario = useSelector((state) => state.auth.usuario);
  const postulaciones = useSelector(
    (state) => state.postulaciones.postulaciones
  );
  const [loading, setLoading] = useState(true);
  const [postulado, setPostulado] = useState(false);
  const [_switch, setSwitch] = useState(false);
  const [value, setValue] = useState(0);
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const { _id, idusuario, titulo } = data;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (idAviso && idEmp) {
      obtenerDatos();
    }
  }, [idEmp, idAviso]);

  const obtenerDatos = async () => {
    setLoading(true);
    try {
      const result = await clienteAxios.get(`/api/avisos/${idAviso}`);
      setData(result.data);

      const result2 = await clienteAxios.get(`/api/usuarioEmpresa/${idEmp}`);
      setData2(result2.data);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const postular = () => {
    setSwitch(true);
    if (usuario) {
      dispatch(
        crearPostulacionAction({
          idaviso: _id,
          iduser: usuario._id,
          idemp: idusuario,
          titulo: titulo,
        })
      ).then(() => setSwitch(false));
    }
  };
  const cancelarPostulacion = async () => {
    setSwitch(true);
    const eliminar = await setearIdPost();

    if (eliminar) {
      await dispatch(
        eliminarPostulacionAction({ id_post: eliminar, _id })
      ).then((res) => (res ? setPostulado(false) : null));
    }
    setSwitch(false);
  };
  const setearIdPost = () => {
    let id_post;
    postulaciones.map((item) => {
      if (item._id === _id) {
        id_post = item.id_post;
      }
    });
    return id_post;
  };
  useEffect(() => {
    postulaciones.map((item) => {
      if (item._id === _id) {
        setPostulado(true);
      }
    });
  }, [postulaciones, data]);
  return (
    <div ref={ref} className="info-user-of-emp" style={{ height: "600px" }}>
      {loading ? (
        <div className="loader-info-user-emp" style={{ height: "600px" }}>
          <Loader
            type="Oval"
            color="#00BFFF"
            height={100}
            width={100}
            visible={loading}
            //  timeout={3000} //3 secs
          />
        </div>
      ) : (
        <>
          <div className="top">
            <div>
              {data2.logoURL ? (
                <img src={data2.logoURL} alt="userimage" />
              ) : (
                <img
                  style={{ width: "120px", height: "120px" }}
                  src={userimage}
                  alt="userimage"
                />
              )}
              {/* <img
                style={{ width: "120px", height: "120px" }}
                src={userimage}
                alt="userimage"
              /> */}
            </div>
            <div className="cont-p">
              <p className="p1">
                {data2.razonSocial ? data2.razonSocial : null}
              </p>
              <p className="p2">{data2.giro ? data2.giro : null}</p>
              {/* <div className="exp-adn">
                <p>Experiencia {usuario.anosZap} años</p>
              </div> */}
              <p className="p3">{data2.rut ? data2.rut : null}</p>
            </div>
            <Tooltip title="Cerrar" placement="top">
              <IconButton
                className="btn-close-info-of-emp"
                onClick={() => closeModal()}
              >
                <Close style={{ width: "15px" }} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="bottom">
            <div className="tab-menu-emp-user">
              <AntTabs
                value={value}
                onChange={handleChange}
                aria-label="ant example"
              >
                <AntTab label="Aviso" />
                <AntTab style={{ marginLeft: "20px" }} label="ADN SAP" />
                <AntTab style={{ marginLeft: "20px" }} label="Detalles" />
                <AntTab
                  style={{ marginLeft: "20px" }}
                  label="Renta y beneficios"
                />
              </AntTabs>
            </div>
            <div className="containers-infoAviso-of">
              <div className="cont-containers-infoAviso-of">
                {value === 0 ? (
                  <Aviso data={data} data2={data2} />
                ) : value === 1 ? (
                  <AdnSap data={data} />
                ) : value === 2 ? (
                  <Detalles data={data} />
                ) : value === 3 ? (
                  <Renta data={data} />
                ) : null}
              </div>
              <div className="cont-btn-post-infoAviso-of">
                {postulado ? (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={cancelarPostulacion}
                    disabled={_switch}
                    className={classes.button2}
                  >
                    Cancelar Postulación
                    {_switch ? (
                      <div className="loader-btn-postular">
                        <Loader
                          type="Oval"
                          color="#fff"
                          height={20}
                          width={20}
                          visible={_switch}
                          //  timeout={3000} //3 secs
                        />
                      </div>
                    ) : null}
                  </Button>
                ) : (
                  <Button
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={postular}
                    disabled={_switch}
                  >
                    Postular
                    {_switch ? (
                      <div className="loader-btn-postular">
                        <Loader
                          type="Oval"
                          color="#fff"
                          height={20}
                          width={20}
                          visible={_switch}
                          //  timeout={3000} //3 secs
                        />
                      </div>
                    ) : null}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default InfoEmp;
